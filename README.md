# johnomaji.com

Personal site and CV for John Omaji — founder, developer, educator, speaker.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion.

```bash
npm install
npm run dev     # http://localhost:3000
```

| Script          | Does                                            |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Dev server                                      |
| `npm run build` | Production build                                |
| `npm start`     | Serve the production build                      |
| `npm run lint`  | ESLint (Next 16 removed `next lint`, and `next build` no longer lints — run this separately) |

---

## Editing content

**Everything you can read on the site lives in [`content/profile.ts`](content/profile.ts).** Nothing in `src/` needs touching to change copy, add a job, add a talk, or swap a link.

The file is typed, so your editor will tell you if an entry is missing a field, and the build will fail rather than ship something broken.

| You want to change              | Edit this export                               |
| ------------------------------- | ---------------------------------------------- |
| Name, email, photo              | `profile`                                      |
| Hero headline and bio           | `profile.oneLiner`, `profile.heroBio`          |
| About narrative, pull quote     | `about`                                        |
| Creed IT / Academy / IdomaSpeak | `ventures`                                     |
| Timeline entries                | `experience`                                   |
| Degrees, certifications, awards | `education`, `certifications`, `awards`        |
| Talk topics and events          | `speakingTopics`, `speakingEvents`, `speaking` |
| YouTube videos and channel      | `videos`, `content`                            |
| Project cards                   | `projects`                                     |
| Skill groups                    | `skillGroups`                                  |
| Quotes                          | `testimonials`                                 |
| Contact copy, form topics       | `contact`                                      |
| Social links                    | `socials`                                      |
| Page title, description, keywords | `seo`                                        |
| The Profile paragraph on /cv    | `profile.cvSummary`                            |

### Sections hide themselves

`Content`, `Projects`, and `Testimonials` return `null` when their array is empty, and `Certifications` / `Awards` disappear from the CV the same way. So **to remove a section you aren't ready for, empty its array** — e.g. `export const testimonials: Testimonial[] = [];`. No component edits, no dead headings.

Likewise, a social platform with an empty `href` is filtered out of the header, footer, and CV automatically.

### Placeholders

Entries that are still unwritten say so loudly — `"Replace this with…"`, `"20XX"`, `"Month 20XX"` — so an unfinished entry can never be mistaken for a real claim. Every one is marked with a `// TODO` comment.

**[CHECKLIST.md](CHECKLIST.md) lists every placeholder still to fill in.** Work through it before going live.

---

## Adding your photo

1. Drop the file in `public/` — e.g. `public/johnny.jpg`. A 4:5 portrait around 1200×1500 works best; WebP is smaller than JPEG at the same quality.
2. In `content/profile.ts`:
   ```ts
   photo: "/johnny.jpg",
   photoAlt: "John Omaji",
   ```

Until you do, the hero renders a typographic "JO" monogram rather than a broken image or a grey box, so the site is presentable with no photo at all.

## Adding a CV PDF

The `/cv` page is already print-optimised for A4, so a PDF file is optional:

- **Leave `profile.cvPdf` as `null`** — "Download CV" sends visitors to `/cv`, where the **Download PDF** button opens the browser print dialog. Choose *Save as PDF*, margins *Default*, background graphics *off*.
- **Or ship a real file** — export the PDF once, save it as `public/john-omaji-cv.pdf`, then set:
  ```ts
  cvPdf: "/john-omaji-cv.pdf",
  ```
  Both the hero button and the `/cv` button now download that file directly. Re-export whenever you change `content/profile.ts`.

---

## Contact form

`POST /api/contact` validates with Zod, then emails via [Resend](https://resend.com).

**It works with no configuration.** If `RESEND_API_KEY` or `CONTACT_FROM_EMAIL` is missing, the route logs the message to the server console and returns success — so you can exercise the whole form locally without signing up for anything.

To actually receive mail:

1. Create a Resend account and verify the domain you'll send from.
2. Copy `.env.example` to `.env.local` and fill in:

   | Variable             | Required | Notes                                                                    |
   | -------------------- | -------- | ------------------------------------------------------------------------ |
   | `RESEND_API_KEY`     | yes      | From <https://resend.com/api-keys>                                        |
   | `CONTACT_FROM_EMAIL` | yes      | Must be on a domain verified in Resend, e.g. `John <hello@johnomaji.com>` |
   | `CONTACT_TO_EMAIL`   | no       | Where messages land. Defaults to `profile.email`                          |

3. Add the same variables in Vercel under **Settings → Environment Variables**.

`.env.local` is gitignored. Never commit a key.

### Spam protection

Three layers, no CAPTCHA and no third-party script:

- **Honeypot** — a `website` field hidden off-screen. Bots fill it; people never see it.
- **Time-to-submit** — anything submitted under 2 seconds after render is treated as scripted.
- **Rate limit** — 5 submissions per IP per 10 minutes.

Both bot signals return a silent `{ ok: true }` rather than an error, because a visible rejection just tells the script what to fix.

> The rate limiter is in-memory (`src/lib/rate-limit.ts`). It doesn't survive a restart and is per-instance, so on serverless it limits per warm lambda rather than globally. That's fine for a personal site. If it ever needs real guarantees, swap in Upstash Redis — it's one function to replace.

---

## Deploying to Vercel

1. Push the repo to GitHub.
2. In Vercel, **Add New → Project** and import it. Framework preset, build command, and output directory are all detected — don't override them.
3. Add the environment variables above.
4. Deploy.
5. Add your domain under **Settings → Domains** and point DNS at Vercel.
6. **Set `profile.siteUrl` to the real production URL and redeploy.** Canonical links, Open Graph tags, `sitemap.xml`, `robots.txt`, and the JSON-LD all derive from it, so a wrong value quietly poisons your SEO.

### What's generated for you

| Route                   | From                                                                          |
| ----------------------- | ----------------------------------------------------------------------------- |
| `/sitemap.xml`          | `src/app/sitemap.ts`                                                          |
| `/robots.txt`           | `src/app/robots.ts`                                                           |
| `/manifest.webmanifest` | `src/app/manifest.ts`                                                         |
| `/opengraph-image`      | `src/app/opengraph-image.tsx` — 1200×630 social card, rendered from `profile`  |
| `/icon`, `/apple-icon`  | `src/app/icon.tsx`, `src/app/apple-icon.tsx` — "JO" monogram                   |

All are static, built once, and regenerate themselves when you edit `content/profile.ts`.

---

## Project structure

```
content/profile.ts        ← all copy, typed. The only file you need for content edits.
src/app/
  layout.tsx              fonts, metadata, theme provider
  page.tsx                homepage — composes the sections in order
  globals.css             design tokens, base styles, print stylesheet
  cv/page.tsx             print-optimised A4 CV
  api/contact/route.ts    form handler
  icon · apple-icon · opengraph-image · manifest · robots · sitemap
src/components/
  sections/               one file per homepage section
  ui/                     button, pill, section shell, reveal, youtube embed
  site-header · site-footer · contact-form · theme-toggle · icons
src/lib/                  cn(), rate limiter
```

### Design system

Defined entirely in CSS custom properties at the top of `src/app/globals.css` — change a token there and it propagates everywhere, light and dark.

- **Palette** — warm paper and ink with an ochre accent. `--ochre` is reserved for large text, rules, and icons; `--ochre-ink` is the darker variant that meets WCAG AA for small text. Don't swap them.
- **Type** — Fraunces (display), Inter (body), JetBrains Mono (labels and metadata), self-hosted via `next/font`.
- **Dark mode** — class-based via `next-themes`, defaults to system preference.
- **Motion** — Framer Motion, every animation gated behind `prefers-reduced-motion`.
- **YouTube** — embeds use a click-to-load facade, so roughly a megabyte of YouTube JavaScript stays out of the initial page load.
