# Vendored fonts

`Cinzel-Regular.ttf` / `Cinzel-SemiBold.ttf` — from Google Fonts (Cinzel v26),
[SIL Open Font License 1.1](https://openfontlicense.org).

These exist only for the Open Graph cards in [`app/lib/og-card.tsx`](../../app/lib/og-card.tsx).
The site itself loads Cinzel through `next/font/google` in `app/layout.tsx`;
that path caches woff2, which Satori (the renderer behind `ImageResponse`)
cannot parse, so the OG cards need a ttf copy on disk.
