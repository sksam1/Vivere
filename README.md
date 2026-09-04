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
| `coin-press-on.webp`, `coin-stay-course.webp`, `coin-philippians.webp` | The three coins (hero + creed) |
| `coach-cutout.webp` | Samuel's portrait (arched niche in About) |
| `daniel-avatar.webp` | Testimonial avatar |
| `vivere-logo.webp` | Original gold VIVERE logo (reference) |

Coins are transparent circular images, so they composite cleanly on the dark theme.

## Social cards

Link previews are generated at build time by
[`app/lib/og-card.tsx`](app/lib/og-card.tsx), rendered per route via the
`opengraph-image` / `twitter-image` file conventions (home and
`/wellness-core`). Cinzel is vendored as ttf in `assets/fonts` because the
renderer cannot read the woff2 that `next/font` caches. Editing the card is a
code change, not an asset swap.

## Social links

Set once in `app/content.ts` under `site.social` (Instagram + LinkedIn). They
render in the nav, contact block, and footer.

## The inquiry form

Visitors submit **name + email + message** (plus an optional focus tag). The API
route [`app/api/inquiry/route.ts`](app/api/inquiry/route.ts):

1. **Validates** server-side and blocks bots via a honeypot.
2. **Stores** every inquiry (name, email, focus, message, timestamp) durably,
   before the email is attempted, so a Resend outage costs a notification
   rather than the lead.
3. **Emails** the owner via Resend, with the visitor's address as `reply-to`.

### Where inquiries are stored

[`app/lib/inquiry-store.ts`](app/lib/inquiry-store.ts) holds both the inquiry
records and the rate-limit counters. Both need state that outlives one
serverless instance, so both live in Redis (Upstash, via the Vercel marketplace
integration). It reads `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`,
or the `KV_REST_API_*` pair, whichever the integration sets.

With no store configured the module degrades rather than failing: inquiries go
to `.data/inquiries.jsonl` and rate limiting falls back to per-instance memory.
That keeps `npm run dev` working with no setup, and keeps a misconfigured
deploy taking inquiries instead of dropping them. If the store is reachable but
errors mid-request, the same fallbacks apply, so a Redis outage never takes the
form offline.

Read what has come in:

```bash
npm run inquiries        # latest 50, newest first
npm run inquiries -- 200 # latest 200
```

It reads Redis when credentials are present and the dev file log otherwise.

### Enabling email delivery

1. Create a free account at [resend.com](https://resend.com).
2. Add `RESEND_API_KEY` to `.env.local`, set `OWNER_EMAIL` to Samuel's inbox.
3. `viverehumanperformance.com` is verified for sending in Resend, so
   `FROM_EMAIL` is `VIVERE <hello@viverehumanperformance.com>`. Only fall back
   to the sandbox sender `onboarding@resend.dev` on an unverified domain.

Without a key, inquiries are still validated and logged, just not emailed.

### Abuse controls

The endpoint spends two finite resources per call: Samuel's attention and the
Resend send quota. It is guarded by a honeypot field, per-field length caps
(name 100, email 254, message 5000), a 16 KB body ceiling checked before the
JSON is parsed, and rate limits of 5 submissions per IP per 10 minutes plus a
global 60 per hour.

The counters live in the shared Redis store, so every instance enforces the
same ceiling rather than each warm lambda keeping its own. With no store
configured they fall back to per-instance memory, which is a speed bump rather
than a wall.

## Deploying to Vercel

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Add `RESEND_API_KEY`, `OWNER_EMAIL`, `FROM_EMAIL` in Vercel → Settings →
Environment Variables. The Redis credentials come from the marketplace
integration and need no manual entry.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — ESLint
- `npm run inquiries` — print stored inquiries, newest first
