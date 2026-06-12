# Home Page Warm Redesign — Design

**Date:** 2026-06-12
**Scope:** Redesign the Griplog website **home page only** (`index.html`) into a light, warm visual system. Other pages (features, privacy, roadmap, duotimer, url-builder) are out of scope for now and must remain visually unchanged.

## Goal

Replace the current dark, photo-led home page with a light/warm design built on the iOS app's warm color palette. The feel is a **blend**: Semantical's restraint and breathing room for the layout and hero, Things' (Cultured Code) soft rounded cards for the feature/principle/companion showcases.

## Direction (decisions locked during brainstorming)

- **Theme:** Light/warm only. No dark mode, no toggle.
- **Character:** A blend — Semantical restraint for hero/layout, Things' soft cards for content sections.
- **Hero:** Clean cream hero, **no photo**. App screenshot provides the visual interest.
- **Typography:** New pairing — **Fraunces** (variable serif) for display, **Inter** for body/UI. Drop CabinetGrotesk and Protest Strike from this page.
- **Principles section:** Rendered as soft cards (consistent with features/companion).

## Visual System

### Palette (light, derived from the iOS warm tokens)

Defined as CSS custom properties on `:root` in the new stylesheet so the page is themeable from one place and reusable later.

| Token | Value | Use |
|---|---|---|
| `--surface` | warm cream, ~`#FDFBF7` (from `SurfaceSecondary` light family) | page background |
| `--surface-raised` | `#FFFFFF` (`SurfaceRaised`) | cards, raised panels |
| `--fill` | `#E9E4DB` (`FillWarm`) | subtle fills, input/placeholder backgrounds |
| `--fill-secondary` | `#F0ECE4` (`FillSecondary`) | lighter fills, bands |
| `--separator` | `#E4DED4` (`SeparatorWarm`) | hairline borders/dividers |
| `--text` | `#1F1B16` (`TextPrimaryWarm`) | primary text |
| `--text-secondary` | `#6E665B` (`TextSecondaryWarm`) | secondary text/metadata |
| `--text-tertiary` | `#9C9388` (`TextTertiaryWarm`) | captions, labels, disabled |
| `--accent` | `#F8213D` | primary CTA, badge dot, link hover, small highlights |
| `--accent-pressed` | `#D5172F` (`AccentPressed` light) | pressed/hover state of accent button |
| `--on-accent` | `#FFFFFF` | text/icons on accent fill |

Accent is used **sparingly** (Semantical restraint): the primary CTA button, the "Coming Soon" badge dot, link hovers, and small labels — never as large color fields.

### Typography

- **Display — Fraunces** (variable serif), loaded from Google Fonts. Used for the hero headline and section titles at a calm weight with a touch of its soft optical character. Confident, not shouty; upright (not italic).
- **Body / UI — Inter**, loaded from Google Fonts. Paragraphs, labels, buttons, nav.
- Remove the `Protest+Strike` `@import` and all CabinetGrotesk usage from this page's stylesheet.

### Spacing & shape (the blend)

- Generous vertical rhythm and wide margins (Semantical breathing room).
- Soft rounded cards (~16–20px radius) with gentle, warm-tinted shadows for content sections (Things soft cards).
- Mobile-first responsive; bento grid collapses to a single column on narrow screens.

## Page Structure (section by section)

Existing content and section lineup are preserved; each section is re-treated. Top to bottom:

1. **Header** — Sticky, minimal. Cream, transparent at top, gains a subtle warm hairline border + light frost on scroll (replacing the current dark-frost behavior). "Griplog" wordmark in Fraunces; nav links (Features, DuoTimer) in Inter. The existing header-scroll script is preserved.

2. **Hero** — Clean cream, no photo. Centered: "Coming Soon" badge (warm pill, crimson dot), large Fraunces headline, Inter subtitle, email signup form. Below it, an **app screenshot** on a soft white card with a gentle shadow as the hero's visual interest (use an existing `images/*.png`, e.g. `routePreview.png` or `statusRows.png`).

3. **Features** — Bento grid kept (one large card + four smaller). Each becomes a soft white rounded card: warm shadow, generous padding, label in crimson/tertiary uppercase Inter, Fraunces title, Inter description, screenshot inside. Subtle hover lift on cards. "See all features →" link styled via a class (no inline styles).

4. **Principles** ("Built different") — Three soft white cards (consistent card language): icon, Fraunces subhead, Inter copy.

5. **Companion apps** — DuoTimer card kept, restyled as a soft white card; the scroll-in IntersectionObserver animation is preserved.

6. **CTA** ("Ready to get started?") — Cream section, centered Fraunces headline + the email form again. May use a subtle warm-tinted band (`--fill-secondary`) to separate it from the footer.

7. **Footer** — Minimal, cream, warm hairline top border, secondary-text links.

## Components & Interaction

- **Email signup form** (hero + CTA) — White input with warm border (`--separator`), Inter text; crimson primary button ("Get Early Access") with `--on-accent` text and `--accent-pressed` on hover/press. Existing loading/success/error/back states preserved and restyled. The Loops submission JS is untouched.
- **Soft cards** — White surface, ~16–20px radius, warm-tinted soft shadow; interactive ones lift slightly on hover (stronger shadow + 1–2px rise).
- **Buttons & links** — Primary = crimson fill. Nav/secondary links = warm text, crimson on hover; subtle underlines.
- **Badge** ("Coming Soon") — Warm pill (light-fill background, warm border) with the pulsing crimson dot.
- **Animations** — Keep the existing fade-in-up entrance and companion scroll-in observer; soften durations for a calm feel. Respect `prefers-reduced-motion` (disable transform-based motion).
- **Responsive** — Mobile-first; bento grid → single column on narrow screens; hero screenshot scales down; generous touch targets.

## Technical Approach

- **Branch:** Create `redesign-warm-home` off `main`. Nothing merges to `main` until the user decides.
- **Files touched:**
  - `index.html` — restructure markup as needed, swap stylesheet links, add Google Fonts links, remove inline styles.
  - `css/home.css` — **new**, self-contained: own reset, `:root` tokens, all section styles.
- **Files left untouched:** `css/styles.css` and `css/index2.css` remain in place so the other (still-dark) pages don't break. `index.html` stops linking those two and links `css/home.css` instead.
- **Fonts:** Add Google Fonts `<link>` for Fraunces + Inter in `<head>`; remove the Protest Strike import / CabinetGrotesk usage from this page.
- **No inline CSS** (standing project rule): current `style="..."` attributes (the "See all features" link, the `display:none` form-state buttons/divs) move into `home.css` classes. JS toggles visibility via an `.is-hidden` class / `style.display` as today, so behavior is unchanged.
- **Content/JS preserved:** copy stays as-is; the Loops form handler, header-scroll script, and companion IntersectionObserver are kept.

## Verification

- Serve locally; screenshot the page at desktop and mobile widths to confirm the warm look, card shadows, and hero screenshot read correctly.
- Confirm the email form's success/error/loading/back states still render (restyled).
- Confirm `prefers-reduced-motion` disables entrance transforms.
- Confirm the other pages (features, privacy, roadmap, duotimer) are visually unchanged.

## Out of Scope

- All pages other than the home page.
- Dark mode / theme toggle.
- `url-builder` and `redirect` utility tools.
- Copy/content rewrites (content is preserved as-is).
