# Launch checklist

Everything still open before and after launch. All content lives in
[`content/profile.ts`](content/profile.ts); `grep -n TODO content/profile.ts`
lists what's left there in file order.

Nothing here is invented. Sections without real content yet — certifications,
speaking events, videos, testimonials — are set to `[]`, which hides them on
both the homepage and the CV and renumbers the remaining sections. Each array
has a comment showing the shape to add when you have the real thing.

---

## Before the first deploy

- [ ] **Mailbox for `hello@johnomaji.com`** — the site shows this address everywhere. Mail to it bounces until the mailbox exists.
- [ ] **Commit and push** — nothing since the Create Next App commit is in git yet, and there is no GitHub remote. Vercel deploys from GitHub.
- [ ] **Connect `johnomaji.com`** to the Vercel project.
- [ ] **Verify `johnomaji.com` in Resend** (Domains → Add domain, then add the DNS records it shows wherever the domain's DNS is hosted).
- [ ] **Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` in Vercel**, then **send yourself a test message through the live form**. Without the first two, the production form shows visitors an error rather than faking success. Until the `hello@` mailbox exists, point `CONTACT_TO_EMAIL` at an inbox you already read.

## After the first deploy

- [ ] Open `/cv`, print to PDF, and check the page breaks land sensibly
- [ ] Check both light and dark mode, and a real phone
- [ ] Paste the deployed URL into a social card validator to confirm the OG image renders

---

## Done

- [x] `profile.email` — `hello@johnomaji.com`
- [x] `profile.siteUrl` — `https://johnomaji.com`
- [x] Start years — Creed IT 2021, IdomaSpeak 2025, M.Sc. 2026
- [x] Earlier degree — B.Sc. Computer Science, Federal University of Agriculture, Makurdi
- [x] Speaking — DevFest and tech bootcamps named in `speaking.intro` and `speaking.cvSummary`
- [x] Placeholder certifications, speaking events, videos, and testimonials — hidden until real
- [x] Developer notes in the hero photo box and speaker reel — removed; both hide cleanly when empty

---

## Worth adding, not blocking

- [ ] **`education` → B.Sc.** — years, e.g. `period: "2012 — 2016"`. Shown without dates until set.
- [x] **`profile.photo`** — portrait at `public/johnny.jpg`. It's only 400×400, so it looks soft on retina screens; replace it with a larger original (around 1200×1500) when you have one.
- [ ] **`socials`** — YouTube, LinkedIn, and X have `href: ""` and stay hidden until filled. GitHub (`abijay440`) is already real.
- [ ] **`speakingEvents`** — the DevFest talk and bootcamps as entries (talk title, date, link) to show the Events list.
- [ ] **`speaking.reel.youtubeId`** — a speaker reel; the booking panel gains a video column when set.
- [ ] **`speaking.onePagerHref`** — speaker one-sheet PDF in `public/`.
- [ ] **`videos`**, **`content.channelHref`**, **`content.channelHandle`** — the Content section appears once `videos` has an entry.
- [ ] **`testimonials`** — real quotes, **with written permission for each**.
- [ ] **`certifications`**, **`awards`** — add entries only if real.
- [ ] **`ventures`** — `href` and `hrefLabel` for Creed IT, Creed Academy, and IdomaSpeak (cards show no link until set).
- [ ] **`seo.twitterHandle`** — e.g. `@johnnyomaji`. Until set, the Twitter card omits the creator tag.
- [ ] **`profile.cvPdf`** — optional. Leave `null` and "Download CV" routes to `/cv`, where the print dialog produces the PDF.
- [ ] **`profile.phone`** — optional. `null` hides it from the CV.
- [ ] **`experience`** — earlier employment, freelance, or contract roles.
- [ ] **`projects`** — client work or side projects you can show publicly. A copy-paste shape is in the comment below the array.

### Proof points — only fill in with real numbers

An unverifiable number on a page an investor reads is worse than two solid points.

- [ ] **Creed IT** — a third highlight (a sector you focus on, or projects shipped)
- [ ] **Creed Academy** — students taught, cohorts run, or schools partnered with
- [ ] **IdomaSpeak** — launch status, waitlist size, or app store links
- [ ] **`experience` → Creed IT** — a quantified achievement
- [ ] **`experience` → Creed Academy** — number of students or cohorts since 2018

### Read in your own voice

- [ ] **`about.paragraphs`** — the section people actually read
- [ ] **`profile.cvSummary`** and **`speakingTopics`** — check they read the way you'd want a recruiter or organiser to read them
