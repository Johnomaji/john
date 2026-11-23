# Placeholder checklist

Every placeholder in the site, and what to do with it. All of them live in
[`content/profile.ts`](content/profile.ts) and are marked `// TODO` there, so
`grep -n TODO content/profile.ts` gives you the same list in file order.

Nothing here is invented. Where a fact wasn't supplied it was left as obviously
fake copy — `"Replace this with…"`, `"20XX"`, `"Month 20XX"` — so an unfinished
entry can't be mistaken for a real claim. **Anything in Blocking is currently
visible on the live page as placeholder text.**

---

## Blocking — do not deploy publicly until these are done

- [ ] **`profile.email`** — currently `hello@example.com`. Shown in the hero social row, the contact section (as large display text), the footer, the CV header, and the JSON-LD. This is the single most visible placeholder on the site.
- [x] **`profile.siteUrl`** — `https://johnomaji.com`, confirmed. Canonical URLs, Open Graph tags, `sitemap.xml`, `robots.txt`, and the JSON-LD all derive from it.
- [ ] **`education[1]`** — "Replace this with your earlier degree or diploma". Either fill in your first degree or delete the entry.
- [ ] **`certifications[0]`** — "Replace this with a certification name". Fill in a real certification, or set `certifications = []` to hide the subsection on both the homepage and the CV.
- [ ] **`speakingEvents`** — both entries are placeholders ("Replace this with your talk title" / "Event name" / "Month 20XX"). Replace with real events, or set the array to `[]`. Set `timing: "upcoming"` on anything not yet delivered.
- [ ] **`videos`** — all three are placeholders. Replace with real videos (`youtubeId` is the 11-character id from the watch URL), or set to `[]` to remove the whole Content section.
- [ ] **`testimonials`** — all three are placeholders. Replace with real quotes **and get written permission for each**, or set to `[]` to remove the section.
- [ ] **`content.channelHref`** and **`content.handle`** — your YouTube channel URL and handle. Null until set.
- [ ] **`socials`** — YouTube, LinkedIn, and X all have `href: ""` and are hidden everywhere until filled. GitHub (`abijay440`) is already real.

---

## Dates — currently showing `20XX`

Visible on the venture cards, the experience timeline, and the CV.

- [ ] **`ventures` → Creed IT** — start year (`period`)
- [ ] **`ventures` → IdomaSpeak** — start year (`period`)
- [ ] **`experience` → Creed IT** — start year (`period`)
- [ ] **`experience` → IdomaSpeak** — start year (`period`)
- [ ] **`education[0]` → M.Sc. Software Engineering, Iconic University** — start year and expected completion, e.g. `"2024 — 2026"`
- [ ] **`projects` → IdomaSpeak** — year work started

Creed Academy is already correct at `2018 — Present`.

---

## Links

- [ ] **`ventures` → Creed IT** — `href` and `hrefLabel` (the card shows no link until set)
- [ ] **`ventures` → Creed Academy** — `href` and `hrefLabel`
- [ ] **`ventures` → IdomaSpeak** — `href` and `hrefLabel` (landing page or app store)
- [ ] **`speaking.onePagerHref`** — speaker one-sheet PDF. Put the file in `public/` and link it, or leave `null`.
- [ ] **`seo.twitterHandle`** — e.g. `@johnnyomaji`. Until set, the Twitter card omits the creator tag.

---

## Assets

- [ ] **`profile.photo`** — a professional portrait. Save to `public/`, then set `photo: "/johnny.jpg"`. Until then the hero shows a "JO" monogram, which is deliberate and presentable — but a real photo is worth far more on a personal brand site.
- [ ] **`profile.cvPdf`** — optional. Leave `null` and "Download CV" routes to `/cv`, where the print dialog produces the PDF. Set it only once you've exported a real file to `public/`.
- [ ] **`speaking.reel.youtubeId`** — speaker reel video id. The booking panel shows an empty-state placeholder until set.
- [ ] **`profile.phone`** — optional. `null` hides it from the CV entirely.

---

## Proof points — only fill in with real numbers

Each venture has two factual highlights and a slot for a third that was left
deliberately empty. **Do not estimate.** An unverifiable number on a page an
investor reads is worse than two solid points.

- [ ] **Creed IT** — a third highlight (a sector you focus on, or projects shipped)
- [ ] **Creed Academy** — students taught, cohorts run, or schools partnered with
- [ ] **IdomaSpeak** — launch status, waitlist size, or app store links
- [ ] **`experience` → Creed IT** — a quantified achievement
- [ ] **`experience` → Creed Academy** — number of students or cohorts since 2018

---

## Worth adding, not blocking

- [ ] **`experience`** — earlier employment, freelance, or contract roles. The timeline currently starts at your founder roles; anything before that is missing.
- [ ] **`awards`** — currently `[]`, so the subsection is hidden. Add entries only if real.
- [ ] **`projects`** — only two entries (IdomaSpeak, Creed Academy), both drawn from your ventures. Add client work or side projects you can show publicly. A copy-paste shape is in the comment below the array.
- [ ] **`speakingTopics`** — four topics derived from your actual work. Edit them to match what you genuinely want to be invited to speak about.
- [ ] **`about.paragraphs`** — written from what you told me. Read them in your own voice and adjust; this is the section people actually read.
- [ ] **`profile.cvSummary`** — the Profile block at the top of `/cv`. Check it reads the way you'd want a recruiter to read it.

---

## Before the first deploy

- [ ] Work through Blocking above
- [ ] Verify `johnomaji.com` in Resend (Domains → Add domain, then add the DNS records it shows wherever the domain's DNS is hosted)
- [ ] Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` in Vercel, then **send yourself a test message through the live form**. Without the first two, the production form shows visitors an error rather than faking success.
- [ ] Open `/cv`, print to PDF, and check the page breaks land sensibly
- [ ] Check both light and dark mode, and a real phone
- [ ] Paste the deployed URL into a social card validator to confirm the OG image renders
