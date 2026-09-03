---
name: VIVERE
description: Roman/Stoic wellness-coaching brand site, gold inscriptional type on obsidian
colors:
  obsidian: "#12100c"
  obsidian-deep: "#0a0906"
  panel: "#1a1712"
  panel-2: "#221d16"
  marble: "#eae4d6"
  marble-dim: "#b3ab97"
  stone: "#8f8570"
  gold: "#c8a24c"
  gold-bright: "#e8cd83"
  gold-deep: "#92702f"
  line: "rgba(200, 162, 76, 0.16)"
  line-soft: "rgba(234, 228, 214, 0.10)"
typography:
  display:
    fontFamily: "Cinzel, Trajan Pro, Georgia, serif"
    fontSize: "clamp(2.4rem, 4.8vw, 4.6rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "0.01em"
  display-sm:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "clamp(1.8rem, 3.4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "0.015em"
  label:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "0.72rem"
    fontWeight: 600
    letterSpacing: "0.34em"
  body:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "1.02rem"
    lineHeight: 1.6
rounded:
  none: "0px"
spacing:
  section-y: "clamp(6rem, 9vw, 9rem)"
  container-max: "88rem"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.gold-bright}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-line-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
  input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.marble}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
---

# Design System: VIVERE

## 1. Overview

**Creative North Star: "The Reliquary" — a coin held up to lamplight in a dark room.**

VIVERE's visual system is a Roman inscriptional aesthetic applied to a wellness-coaching brand: aged gold set against near-black obsidian, restrained to the point of austerity, with every ornament earning its place the way an engraving earns a coin's face. The system is built outward from two real physical objects (the gold wordmark logo and Samuel's three bronze challenge coins), not from a mood board; type, color, and motion all justify themselves by reference to metal, stone, and inscription rather than to contemporary web trends. It explicitly rejects generic fitness-influencer visual language (neon gradients, hype-typography, stock gym photography), clinical wellness-app aesthetics (teal, checklists, soft rounded cards), and the disposable brightness of a 2026 SaaS landing page. Nothing here should look "recently designed"; it should look like it could have shipped in 1998 or 2038.

**Key Characteristics:**
- Locked dark theme: obsidian base, no light mode, no exceptions.
- One accent color (gold) carrying the entire hierarchy; everything else is neutral.
- Zero border-radius anywhere; every edge is a hard, cut edge.
- Cinzel (display, inscriptional caps) against EB Garamond (body, humanist serif): a contrast pairing, not a near-duplicate.
- Motion is slow, physical, and expensive-feeling (0.4–1.3s durations, expo/soft easing), never bouncy.

## 2. Colors

A near-monochrome obsidian field lit by a single warm metal accent; the palette has no secondary or tertiary hue, only tonal steps of black, bone, and gold.

### Primary
- **Aged Gold** (`#c8a24c`): the entire accent vocabulary — CTAs, active states, hairline rules, numerals, section mottos, focus rings. Used sparingly against the dark field so it reads as inscribed metal, not decoration.
- **Bright Gold** (`#e8cd83`): hover/highlight state for gold elements (buttons, sheen animation peak). Never a resting-state color.
- **Deep Gold** (`#92702f`): the shadow end of the gold ramp, used in the sheen gradient and gold-foil text; not applied as a flat fill anywhere.

### Neutral
- **Obsidian** (`#12100c`): base page background.
- **Obsidian Deep** (`#0a0906`): darkest sections (footer) for the furthest tonal recession.
- **Panel** (`#1a1712`) / **Panel Hover** (`#221d16`): lifted surfaces — form inputs, the "message received" confirmation card. The only two colors that read as "raised" rather than "base."
- **Marble** (`#eae4d6`): primary text color, warm off-white, never pure white.
- **Marble Dim** (`#b3ab97`): secondary text (subheads, body copy, nav links at rest).
- **Stone** (`#8f8570`): tertiary text — captions, helper text, timestamps. Lightened from the original `#837a68` (4.48:1 on obsidian, 4.21:1 on panel) to clear WCAG AA 4.5:1 on both surfaces.
- **Line** (`rgba(200,162,76,0.16)`) / **Line Soft** (`rgba(234,228,214,0.10)`): hairline borders; gold-tinted line for structural borders, marble-tinted for the quieter dividers (nav underline).

### Named Rules
**The One-Accent Rule.** Gold is the only saturated color in the system. If a new element needs emphasis, it earns gold or it stays neutral; it never gets a second hue.
**The No-Pure-White Rule.** Text is never `#fff`; marble (`#eae4d6`) is the ceiling. Pure white against obsidian reads as a screen, not as engraved stone.

## 3. Typography

**Display Font:** Cinzel (with Trajan Pro, Georgia fallback)
**Body Font:** EB Garamond (with Georgia fallback)

**Character:** Cinzel is a Roman-inscriptional capitals face; used almost exclusively as uppercase, wide-tracked small text (labels, nav, buttons, numerals) or as large-scale sentence-case display type. EB Garamond is the humanist serif underneath it, carrying long-form body copy at a comfortable reading size. The pairing is a deliberate contrast: geometric, chiseled display against warm, literary body, the same axis a stonemason's inscription and its accompanying manuscript would use.

### Hierarchy
- **Display** (600 weight, `clamp(2.4rem, 4.8vw, 4.6rem)`, 1.08 line-height): the hero H1 only; sentence case, not the all-caps label treatment.
- **Display Small** (600 weight, `clamp(1.8rem, 3.4vw, 3rem)`, 1.12 line-height): sub-section headings (Contact title, phase headline).
- **Label** (600 weight, `0.72rem`, 0.34em tracking, uppercase): the inscriptional small-caps treatment — nav links, form field labels, section eyebrows, button text. Used deliberately, not as a default kicker on every section.
- **Body** (400 weight, `1.02rem`, 1.6 line-height, EB Garamond): paragraph copy, capped conceptually around 65–75ch in the two-column layouts.
- **Numeral** (Cinzel, 600 weight): Roman/Arabic numerals for the disciplines (I/II/III) and phases (01–04); a real sequence, so the numbering is earned rather than decorative.

### Named Rules
**The Small-Caps-Only Rule.** Cinzel at body-adjacent sizes is always uppercase with wide tracking (≥0.2em); it is never set as sentence-case running text below display size.

## 4. Elevation

Flat by design; the system conveys depth through tonal layering (obsidian → obsidian-deep → panel) and a single soft radial "coin halo" glow, never through drop shadows or card elevation. The one exception is `backdrop-blur` on the scrolled nav and the mobile menu overlay, which reads as glass/haze rather than a lifted surface.

### Named Rules
**The No-Shadow Rule.** No `box-shadow` appears anywhere in the system. Depth comes from background-color steps (obsidian/panel/panel-2) and opacity, never from a drop shadow.

## 5. Components

### Buttons
- **Shape:** hard rectangular edges, 0px radius, no exceptions.
- **Primary (solid):** gold background (`#c8a24c`), obsidian text, `16px 32px` padding, Cinzel label-scale text (0.72rem, 0.28em tracking, uppercase). A short gold hairline beside the label extends on hover (5→8 units) as the only decorative motion.
- **Secondary (line):** transparent fill, `1px solid` gold at 40% opacity, gold text; on hover, inverts to solid gold fill with obsidian text.
- **Hover / Focus:** color-only transitions (500ms, soft-expo ease), plus a "magnetic" cursor-follow drift (±20px, spring-damped) on desktop pointer devices; `active:scale-98` on press. Focus-visible gets a 1px gold outline with 3px offset.

### Chips / Toggle Pills (the "Focus" selector in the contact form)
- **Style:** `1px solid` border, label-scale Cinzel text, unselected state uses `border-line` + marble-dim text; selected state is solid gold fill with obsidian text (mirrors the primary button).
- **State:** `aria-pressed` toggle, no icon, text-only.

### Inputs / Fields
- **Style:** `panel/50%` background, `1px solid line` border, no radius, generous `14px/16px` padding, marble text on stone placeholder.
- **Focus:** border shifts to solid gold, background solidifies from `panel/50%` to full `panel`. No glow/ring.
- **Error:** border turns solid gold but switches to a dashed style (focus stays solid) so the two states differ by more than color alone, plus a gold caption below the field wired via `aria-describedby`.

### Navigation
- **Style:** fixed header, transparent until 32px of scroll, then gains an obsidian/85% blurred background and a soft hairline border. Wordmark in tracked Cinzel caps on the left; label-scale nav links, right-aligned social icons, and a bordered "Begin" button on the right. Mobile collapses to a two-bar hamburger that morphs into an X, opening a full-screen obsidian/97% blurred overlay with large uppercase links staggered in on open.

### Coin (signature component)
The three challenge-coin images are the brand's core visual motif: circular, transparent-background WebP renders composited over a soft radial gold "halo" glow, staged at three parallax depths in the hero (near/mid/far, cursor-tracked) and flipped in 3D on hover/focus/tap elsewhere on the page to reveal their reverse face. This is the one place the system allows a real drop-shadow-like glow (`coin-halo`), because it represents actual light on actual metal rather than UI chrome.

## 6. Do's and Don'ts

### Do:
- **Do** keep gold as the only saturated color in any new component; neutrals do everything else.
- **Do** set all interactive text (buttons, labels, nav) in Cinzel, uppercase, ≥0.2em tracking.
- **Do** keep every corner hard (0px radius) — buttons, inputs, panels, images.
- **Do** use tonal steps (obsidian / obsidian-deep / panel / panel-2) for depth, never a box-shadow.
- **Do** gate every new animation behind the existing `prefers-reduced-motion` handling already in `globals.css` and each Motion component.
- **Do** reserve numbered sequences (I/II/III, 01–04) for things that are actually ordered; don't add a fourth "01 · Section" eyebrow purely as decoration.

### Don't:
- **Don't** introduce a second accent hue (no blue links, no green success states) — success/error both resolve through gold + copy, not color-coding.
- **Don't** add rounded corners, card shadows, or glassmorphic panels anywhere outside the two existing blurred-nav-on-scroll cases. The step-number badge (Phases) and the Foundation/Edge program badges (Tracks) are square, not pill-shaped, for this reason; only the coin motif itself is licensed to be circular.
- **Don't** reach for generic fitness-influencer or SaaS-marketing patterns: gradient text beyond the existing gold-sheen treatment, countdown urgency, stock gym photography, hero-metric stat blocks, or pricing-card grids.
- **Don't** use pure white (`#fff`) for text; marble (`#eae4d6`) is the ceiling.
- **Don't** reuse gold for both "focus" and "error" states on the same field without another signal — pair the shared hue with a second cue (border style, icon) as the input component now does.
