# VIVERE — Wellness & Human Performance

A high-end, single-page site for **VIVERE** (Latin, "to live"), the wellness and
human-performance practice of coach **Samuel Korgi**. Roman / Stoic / timeless:
gold inscriptional type on obsidian, built around Samuel's three challenge coins.
Positioning is health as the core, discipline as the edge. Includes a working
inquiry form that logs submissions and emails the owner, with no mail app required
on the visitor's end.

## Page structure

Hero → Ethos → Three Disciplines (scroll-pinned) → How We Work (4 phases) →
The Coins → Programs (Track A / Track B) → Testimonial → About → Contact.

## Signature interactions

- **Ember field** ([`EmberField.tsx`](app/components/EmberField.tsx)) canvas gold
  motes behind the hero. Pauses offscreen and when the tab is hidden; skipped
  entirely under `prefers-reduced-motion`.
- **Coin depth parallax** in the hero: three coins tracked at separate depths.
- **Coin flip** ([`CoinFlip.tsx`](app/components/CoinFlip.tsx)): each coin turns
  in 3D to reveal the moment it is carried for. Hover, focus, or tap.
- **Scroll-pinned disciplines**: the section pins while I / II / III advance.
- **Masked headlines** ([`MaskHeadline.tsx`](app/components/MaskHeadline.tsx)).
  Note: the scroll trigger must sit on the outer mask element, not the inner
  translated line, or the observer never fires.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19**
- **Tailwind CSS v4** — design tokens in [`app/globals.css`](app/globals.css)
- **Motion** (Framer Motion) — scroll reveals, cursor-tracking coins, parallax
- **Lenis** — smooth scrolling (auto-disabled for `prefers-reduced-motion`)
- **Resend** — transactional email for inquiries
- Fonts: **Cinzel** (Roman inscriptional display) + **EB Garamond** (body), via `next/font`

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

## Editing content

**All copy lives in one file:** [`app/content.ts`](app/content.ts) — headline,
buzzwords, ethos, disciplines, phases, the three coins, tracks, bio, testimonial,
socials. Change the words there and every section updates.

House style: no em-dashes in visible copy.

**Images** are in [`public/assets/`](public/assets):

| File | Used for |
|------|----------|
| `coin-press-on.png`, `coin-stay-course.png`, `coin-philippians.png` | The three coins (hero + creed) |
| `coach-cutout.png` | Samuel's portrait (arched niche in About) |
| `daniel-avatar.jpg` | Testimonial avatar |
| `vivere-logo.png` | Original gold VIVERE logo (reference / OG) |

Coins are transparent circular PNGs, so they composite cleanly on the dark theme.

## Social links

Set once in `app/content.ts` under `site.social` (Instagram + LinkedIn). They
render in the nav, contact block, and footer.

## The inquiry form

Visitors submit **name + email + message** (plus an optional focus tag). The API
route [`app/api/inquiry/route.ts`](app/api/inquiry/route.ts):

1. **Validates** server-side and blocks bots via a honeypot.
2. **Logs** every inquiry (name, email, message, timestamp) — to
   `.data/inquiries.jsonl` in dev, and to server logs in production.
3. **Emails** the owner via Resend, with the visitor's address as `reply-to`.

### Enabling email delivery

1. Create a free account at [resend.com](https://resend.com).
2. Add `RESEND_API_KEY` to `.env.local`, set `OWNER_EMAIL` to Samuel's inbox.
3. Until a domain is verified in Resend, keep the sandbox `FROM_EMAIL`. After
   verifying `viverehp.com`, switch it to `VIVERE <hello@viverehp.com>`.

Without a key, inquiries are still validated and logged, just not emailed.

## Deploying to Vercel

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Add `RESEND_API_KEY`, `OWNER_EMAIL`, `FROM_EMAIL` in Vercel → Settings →
Environment Variables. Production's filesystem is ephemeral, so the `.data`
log isn't durable there; email + the Vercel log stream are the record. For a
permanent inquiry store, wire the route to Vercel Postgres or KV (a `// TODO`
marker is in the route).

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — ESLint
