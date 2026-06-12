# Home Page Warm Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Griplog website home page (`index.html`) into a light/warm visual system — cream surfaces, warm-neutral text, crimson accent, Fraunces + Inter typography, soft rounded cards — leaving all other pages untouched.

**Architecture:** A new self-contained stylesheet `css/home.css` holds its own reset, `:root` CSS-variable tokens, and every section style. `index.html` stops linking the two old dark-theme sheets (`styles.css`, `index2.css`) and links only `home.css` plus a Google Fonts `<link>`. The existing `v2-*` class names and section markup are reused (low-risk), so `home.css` simply re-defines those classes for the warm light theme. Inline `style="..."` attributes are removed in favor of classes (standing project rule: no inline CSS). All JavaScript (Loops form handler, header-scroll, companion IntersectionObserver) is preserved.

**Tech Stack:** Static HTML + CSS, Google Fonts (Fraunces variable serif, Inter), no build step. Verification by serving locally (`python3 -m http.server`) and screenshotting via the Playwright MCP browser tools.

**Why no unit tests:** This is a static marketing page with no test framework and no logic changes — CSS/markup carry no testable behavior. Each task is verified by a **visual screenshot check** plus a **regression guard** that the other (still-dark) pages render unchanged. The one behavioral concern — the Loops email form's state toggling — is verified by confirming its JS is untouched and its state classes still resolve.

---

## Reference: full palette tokens (from the spec)

These are defined once in Task 2 and referenced by name thereafter. Do not hardcode these hex values anywhere except the `:root` block.

| Variable | Value |
|---|---|
| `--surface` | `#FDFBF7` |
| `--surface-raised` | `#FFFFFF` |
| `--fill` | `#E9E4DB` |
| `--fill-secondary` | `#F0ECE4` |
| `--separator` | `#E4DED4` |
| `--text` | `#1F1B16` |
| `--text-secondary` | `#6E665B` |
| `--text-tertiary` | `#9C9388` |
| `--accent` | `#F8213D` |
| `--accent-pressed` | `#D5172F` |
| `--on-accent` | `#FFFFFF` |
| `--radius-card` | `20px` |
| `--shadow-card` | `0 1px 2px rgba(31,27,22,0.04), 0 8px 24px rgba(31,27,22,0.06)` |
| `--shadow-card-hover` | `0 2px 4px rgba(31,27,22,0.06), 0 16px 40px rgba(31,27,22,0.10)` |
| `--maxw` | `1100px` |

---

## File Structure

**Create:**
- `css/home.css` — the entire warm-light stylesheet for the home page. Sections, in order: (1) font import note + reset, (2) `:root` tokens, (3) base/body + utilities, (4) header, (5) hero, (6) features, (7) principles, (8) companion, (9) CTA + footer, (10) form, (11) animations + responsive + reduced-motion.

**Modify:**
- `index.html` — `<head>`: swap stylesheet links, add Google Fonts; `<body>`: remove inline `style="..."` attributes (replace with classes), add the hero screenshot block. Markup class names otherwise unchanged.

**Untouched (regression guard):**
- `css/styles.css`, `css/index2.css`, and every other page (`features/`, `privacy/`, `roadmap/`, `duotimer/`, `url-builder/`).

---

## Task 1: Branch + stylesheet/font wiring

**Files:**
- Modify: `index.html` (lines ~78-81 head links; line 82 body class)
- Create: `css/home.css` (empty placeholder this task)

- [ ] **Step 1: Create the branch**

```bash
cd "/Users/fran/Documents/Projects/Griplog/Griplog Web"
git checkout -b redesign-warm-home
```

- [ ] **Step 2: Create an empty `css/home.css`**

```bash
printf '/* Griplog home page — warm light theme */\n' > css/home.css
```

- [ ] **Step 3: Swap the stylesheet links and add fonts in `index.html` `<head>`**

Replace these two lines (currently ~78-80):

```html
		<!-- Stylesheet -->
		<link rel="stylesheet" href="css/styles.css" />
		<link rel="stylesheet" href="css/index2.css" />
```

with:

```html
		<!-- Fonts -->
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
			rel="stylesheet"
		/>

		<!-- Stylesheet -->
		<link rel="stylesheet" href="css/home.css" />
```

- [ ] **Step 4: Verify the page loads with no console errors**

Start a local server (leave it running for later tasks):

```bash
cd "/Users/fran/Documents/Projects/Griplog/Griplog Web"
python3 -m http.server 8000
```

Using the Playwright MCP browser, navigate to `http://localhost:8000/` and capture console messages.
Expected: page loads; no 404 for `css/home.css` or the font URL; the page is currently unstyled (raw HTML) since `home.css` is empty. This confirms the wiring before styling begins.

- [ ] **Step 5: Commit**

```bash
git add index.html css/home.css
git commit -m "Wire home page to new home.css + Fraunces/Inter fonts"
```

---

## Task 2: Reset, tokens, and base typography

**Files:**
- Modify: `css/home.css` (append)

- [ ] **Step 1: Append the reset, `:root` tokens, and base styles to `css/home.css`**

```css
/* ---------- Reset ---------- */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

/* ---------- Tokens ---------- */
:root {
	--surface: #fdfbf7;
	--surface-raised: #ffffff;
	--fill: #e9e4db;
	--fill-secondary: #f0ece4;
	--separator: #e4ded4;
	--text: #1f1b16;
	--text-secondary: #6e665b;
	--text-tertiary: #9c9388;
	--accent: #f8213d;
	--accent-pressed: #d5172f;
	--on-accent: #ffffff;

	--radius-card: 20px;
	--shadow-card: 0 1px 2px rgba(31, 27, 22, 0.04), 0 8px 24px rgba(31, 27, 22, 0.06);
	--shadow-card-hover: 0 2px 4px rgba(31, 27, 22, 0.06), 0 16px 40px rgba(31, 27, 22, 0.1);
	--maxw: 1100px;

	--font-display: "Fraunces", Georgia, "Times New Roman", serif;
	--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* ---------- Base ---------- */
html {
	scroll-behavior: smooth;
}

body {
	font-family: var(--font-body);
	color: var(--text);
	background-color: var(--surface);
	line-height: 1.6;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
	font-family: var(--font-display);
	font-weight: 600;
	line-height: 1.1;
	letter-spacing: -0.01em;
	color: var(--text);
}

p {
	color: var(--text-secondary);
}

a {
	color: inherit;
	text-decoration: none;
}

img {
	display: block;
	max-width: 100%;
}

/* ---------- Utilities ---------- */
.is-hidden {
	display: none;
}

.v2-container {
	max-width: var(--maxw);
	margin: 0 auto;
	padding: 0 1.5rem;
}

.v2-container-narrow {
	max-width: 820px;
	margin: 0 auto;
	padding: 0 1.5rem;
}

.v2-section-title {
	font-size: clamp(1.75rem, 4vw, 2.75rem);
	text-align: center;
	margin-bottom: 2.5rem;
}
```

- [ ] **Step 2: Visual check**

Reload `http://localhost:8000/` in the Playwright browser and screenshot.
Expected: background is warm cream, text is warm near-black in Inter, headings render in the Fraunces serif. Layout is still a single unstyled column (sections not yet laid out) — that is expected at this stage.

- [ ] **Step 3: Commit**

```bash
git add css/home.css
git commit -m "Add reset, warm tokens, and base typography to home.css"
```

---

## Task 3: Header

**Files:**
- Modify: `css/home.css` (append)

The markup already present (do not change): `header.site-header > .site-header-inner > a.site-nav-logo + nav.site-nav-links > a.site-nav-link`. The existing scroll script toggles `.scrolled` on `.site-header`.

- [ ] **Step 1: Append header styles to `css/home.css`**

```css
/* ---------- Header ---------- */
.site-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	transition: background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
	border-bottom: 1px solid transparent;
}

.site-header.scrolled {
	background-color: rgba(253, 251, 247, 0.8);
	backdrop-filter: blur(12px) saturate(180%);
	-webkit-backdrop-filter: blur(12px) saturate(180%);
	border-bottom-color: var(--separator);
}

.site-header-inner {
	max-width: var(--maxw);
	margin: 0 auto;
	padding: 1rem 1.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.site-nav-logo {
	font-family: var(--font-display);
	font-weight: 700;
	font-size: 1.35rem;
	color: var(--text);
}

.site-nav-links {
	display: flex;
	gap: 1.5rem;
}

.site-nav-link {
	font-weight: 500;
	font-size: 0.95rem;
	color: var(--text-secondary);
	transition: color 0.2s ease;
}

.site-nav-link:hover {
	color: var(--accent);
}
```

- [ ] **Step 2: Visual check**

Reload and screenshot at the top of the page, then scroll down ~100px and screenshot again.
Expected: header is transparent over cream at the top; after scrolling it gains a frosted cream background + warm hairline border. Logo is Fraunces, nav links turn crimson on hover.

- [ ] **Step 3: Commit**

```bash
git add css/home.css
git commit -m "Style header for warm theme"
```

---

## Task 4: Hero (with app screenshot)

**Files:**
- Modify: `index.html` (hero section ~95-150 — add screenshot block)
- Modify: `css/home.css` (append)

- [ ] **Step 1: Add the hero screenshot block in `index.html`**

In the hero `<section class="v2-hero">`, immediately AFTER the closing `</div>` of `.v2-hero-content` (currently ~line 149) and BEFORE the section's closing `</section>`, insert:

```html
				<div class="v2-hero-shot">
					<img src="images/statusRows.png" alt="Griplog route status list" />
				</div>
```

- [ ] **Step 2: Append hero styles to `css/home.css`**

```css
/* ---------- Hero ---------- */
.v2-hero {
	padding: 9rem 1.5rem 4rem;
	text-align: center;
	background-color: var(--surface);
}

.v2-hero-content {
	max-width: 760px;
	margin: 0 auto;
}

.v2-hero-badge {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.4rem 0.9rem;
	background: var(--surface-raised);
	border: 1px solid var(--separator);
	border-radius: 999px;
	font-size: 0.85rem;
	font-weight: 600;
	color: var(--text-secondary);
	margin-bottom: 1.75rem;
}

.badge-dot {
	width: 8px;
	height: 8px;
	background: var(--accent);
	border-radius: 50%;
	animation: pulse 2s ease-in-out infinite;
}

.v2-hero-title {
	font-family: var(--font-display);
	font-weight: 600;
	font-size: clamp(2.5rem, 7vw, 4.5rem);
	line-height: 1.05;
	letter-spacing: -0.02em;
	margin-bottom: 1.5rem;
}

.gradient-text {
	color: var(--accent);
	-webkit-background-clip: initial;
	background: none;
	-webkit-text-fill-color: currentColor;
}

.v2-hero-subtitle {
	font-size: clamp(1.05rem, 2vw, 1.25rem);
	color: var(--text-secondary);
	max-width: 560px;
	margin: 0 auto 2rem;
}

.v2-hero-shot {
	max-width: 420px;
	margin: 4rem auto 0;
	background: var(--surface-raised);
	border-radius: var(--radius-card);
	border: 1px solid var(--separator);
	box-shadow: var(--shadow-card);
	padding: 0.75rem;
	overflow: hidden;
}

.v2-hero-shot img {
	border-radius: 12px;
	width: 100%;
}
```

Note: the markup keeps `<span class="gradient-text">Private. Simple. Fast.</span>`; the rule above turns the old white gradient into a solid crimson highlight for the warm theme.

- [ ] **Step 3: Visual check**

Reload and screenshot the hero.
Expected: cream hero, warm pill badge with pulsing crimson dot, large Fraunces headline with "Private. Simple. Fast." in crimson, subtitle in warm gray, the email form below, and the app screenshot sitting on a soft white card with a gentle shadow. No background photo.

- [ ] **Step 4: Commit**

```bash
git add index.html css/home.css
git commit -m "Style warm cream hero with app screenshot"
```

---

## Task 5: Email signup form + remove its inline styles

**Files:**
- Modify: `index.html` (both `.v2-newsletter-form-container` blocks: hero ~114-148 and CTA ~313-347)
- Modify: `css/home.css` (append)

The form-state elements currently carry `style="display: none"`. Replace each with the `is-hidden` class (defined in Task 2). The Loops JS sets `element.style.display` directly, which overrides the class, so toggling still works.

- [ ] **Step 1: Replace inline `display:none` styles with `is-hidden` in BOTH form containers**

In each of the two `.v2-newsletter-form-container` blocks, make these four replacements:

```html
<!-- before -->
<button type="button" class="newsletter-loading-button" style="display: none">
<!-- after -->
<button type="button" class="newsletter-loading-button is-hidden">
```
```html
<!-- before -->
<div class="newsletter-success" style="display: none">
<!-- after -->
<div class="newsletter-success is-hidden">
```
```html
<!-- before -->
<div class="newsletter-error" style="display: none">
<!-- after -->
<div class="newsletter-error is-hidden">
```
```html
<!-- before -->
<button class="newsletter-back-button" type="button" style="display: none">
<!-- after -->
<button class="newsletter-back-button is-hidden" type="button">
```

- [ ] **Step 2: Append form styles to `css/home.css`**

```css
/* ---------- Newsletter form ---------- */
.v2-newsletter-form-container {
	max-width: 460px;
	margin: 0 auto;
}

.newsletter-form {
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	justify-content: center;
}

.newsletter-form-input {
	flex: 1 1 240px;
	font-family: var(--font-body);
	font-size: 1rem;
	padding: 0.85rem 1rem;
	color: var(--text);
	background: var(--surface-raised);
	border: 1px solid var(--separator);
	border-radius: 12px;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.newsletter-form-input::placeholder {
	color: var(--text-tertiary);
}

.newsletter-form-input:focus {
	outline: none;
	border-color: var(--accent);
	box-shadow: 0 0 0 3px rgba(248, 33, 61, 0.12);
}

.newsletter-form-button,
.newsletter-loading-button {
	font-family: var(--font-body);
	font-size: 1rem;
	font-weight: 600;
	padding: 0.85rem 1.4rem;
	color: var(--on-accent);
	background: var(--accent);
	border: none;
	border-radius: 12px;
	cursor: pointer;
	transition: background-color 0.2s ease, transform 0.1s ease;
	white-space: nowrap;
}

.newsletter-form-button:hover,
.newsletter-loading-button:hover {
	background: var(--accent-pressed);
}

.newsletter-form-button:active {
	transform: translateY(1px);
}

.newsletter-success,
.newsletter-error {
	margin-top: 1rem;
	font-weight: 500;
	color: var(--text-secondary);
}

.newsletter-error {
	color: var(--accent);
}

.newsletter-back-button {
	margin-top: 1rem;
	font-family: var(--font-body);
	font-weight: 500;
	color: var(--text-secondary);
	background: none;
	border: none;
	cursor: pointer;
}

.newsletter-back-button:hover {
	color: var(--accent);
}
```

- [ ] **Step 3: Functional + visual check of form states**

Reload. Screenshot the resting form (white input + crimson button).
Then, in the Playwright browser, simulate the success-state markup toggle to confirm classes resolve, by running this in the page console:

```js
const c = document.querySelector('.v2-newsletter-form-container');
c.querySelector('.newsletter-form').style.display = 'none';
c.querySelector('.newsletter-error').style.display = 'flex';
```
Expected: the form hides and the error block becomes visible and styled in crimson — confirming the `style.display` override still drives state over the `is-hidden` class. Reload to reset.

- [ ] **Step 4: Commit**

```bash
git add index.html css/home.css
git commit -m "Style newsletter form and replace inline display styles with class"
```

---

## Task 6: Features bento grid (soft cards)

**Files:**
- Modify: `index.html` (the "See all features" link ~232-234)
- Modify: `css/home.css` (append)

Markup reused as-is: `.v2-features > .v2-container > .v2-feature-card` (one `.v2-feature-large` + four standard), each with `.v2-feature-content` (`.v2-feature-label`, `.v2-feature-title`/`.v2-feature-title-small`, `.v2-feature-description`/`-small`) and `.v2-feature-image` (some `.v2-feature-image-small`).

- [ ] **Step 1: Replace the inline-styled "See all features" link in `index.html`**

Replace (currently ~232-234):

```html
			<div style="text-align: center; margin-top: 3rem;">
				<a href="/features" style="color: rgba(255,255,255,0.4); font-size: 0.9rem; text-decoration: none; transition: color 0.2s ease;" onmouseover="this.style.color='rgba(255,255,255,0.8)'" onmouseout="this.style.color='rgba(255,255,255,0.4)'">See all features →</a>
			</div>
```

with:

```html
			<div class="v2-see-all">
				<a href="/features">See all features →</a>
			</div>
```

- [ ] **Step 2: Append features styles to `css/home.css`**

```css
/* ---------- Features ---------- */
.v2-features {
	padding: 5rem 0;
}

.v2-features .v2-container {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.5rem;
}

.v2-feature-card {
	background: var(--surface-raised);
	border: 1px solid var(--separator);
	border-radius: var(--radius-card);
	box-shadow: var(--shadow-card);
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.v2-feature-card:hover {
	box-shadow: var(--shadow-card-hover);
	transform: translateY(-2px);
}

.v2-feature-large {
	grid-column: 1 / -1;
	flex-direction: row;
	align-items: center;
}

.v2-feature-large .v2-feature-content {
	flex: 1;
}

.v2-feature-large .v2-feature-image {
	flex: 1;
}

.v2-feature-label {
	font-size: 0.8rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--accent);
	margin-bottom: 0.6rem;
}

.v2-feature-title {
	font-size: clamp(1.5rem, 3vw, 2rem);
	margin-bottom: 0.75rem;
}

.v2-feature-title-small {
	font-size: 1.25rem;
	margin-bottom: 0.6rem;
}

.v2-feature-description,
.v2-feature-description-small {
	color: var(--text-secondary);
	font-size: 0.98rem;
}

.v2-feature-image {
	background: var(--fill-secondary);
	border-radius: 14px;
	overflow: hidden;
}

.v2-feature-image img {
	width: 100%;
}

.v2-see-all {
	text-align: center;
	margin-top: 3rem;
}

.v2-see-all a {
	font-size: 0.95rem;
	font-weight: 500;
	color: var(--text-tertiary);
	transition: color 0.2s ease;
}

.v2-see-all a:hover {
	color: var(--accent);
}
```

- [ ] **Step 3: Visual check**

Reload and screenshot the features section.
Expected: soft white rounded cards floating on cream with warm shadows; the first card spans full width with text beside its image; the rest form a 2-column grid; labels are small crimson uppercase; titles in Fraunces; cards lift slightly on hover; "See all features →" link is warm gray, crimson on hover.

- [ ] **Step 4: Commit**

```bash
git add index.html css/home.css
git commit -m "Style features bento grid as soft cards"
```

---

## Task 7: Principles as soft cards

**Files:**
- Modify: `css/home.css` (append)

Markup reused: `.v2-principles > .v2-container-narrow > (h2.v2-section-title + .v2-principles-grid > .v2-principle*3)`, each `.v2-principle` having `.v2-principle-icon > img`, `h3`, `p`.

- [ ] **Step 1: Append principles styles to `css/home.css`**

```css
/* ---------- Principles ---------- */
.v2-principles {
	padding: 5rem 0;
	background: var(--surface);
}

.v2-principles .v2-container-narrow {
	max-width: var(--maxw);
}

.v2-principles-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1.5rem;
}

.v2-principle {
	background: var(--surface-raised);
	border: 1px solid var(--separator);
	border-radius: var(--radius-card);
	box-shadow: var(--shadow-card);
	padding: 2rem;
	text-align: center;
}

.v2-principle-icon {
	width: 56px;
	height: 56px;
	margin: 0 auto 1.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--fill);
	border-radius: 14px;
}

.v2-principle-icon img {
	width: 30px;
	height: 30px;
}

.v2-principle h3 {
	font-size: 1.2rem;
	margin-bottom: 0.6rem;
}

.v2-principle p {
	color: var(--text-secondary);
	font-size: 0.95rem;
}
```

- [ ] **Step 2: Visual check**

Reload and screenshot the "Built different" section.
Expected: three soft white cards in a row on cream, each with a warm-fill rounded icon tile, a Fraunces subhead, and warm-gray copy.

- [ ] **Step 3: Commit**

```bash
git add css/home.css
git commit -m "Style principles section as soft cards"
```

---

## Task 8: Companion apps section

**Files:**
- Modify: `css/home.css` (append)

Markup reused: `.v2-companion > .v2-companion-inner > (h2.v2-section-title + p.v2-companion-subtitle + .v2-companion-grid > a.v2-companion-card)`. The card has `.v2-companion-icon`, `.v2-companion-body` (`.v2-companion-eyebrow`, `.v2-companion-name`, `.v2-companion-desc`), and `.v2-companion-arrow`. The IntersectionObserver adds `.is-visible` to `.v2-companion-card`.

- [ ] **Step 1: Append companion styles to `css/home.css`**

```css
/* ---------- Companion ---------- */
.v2-companion {
	padding: 5rem 0;
}

.v2-companion-inner {
	max-width: 820px;
	margin: 0 auto;
	padding: 0 1.5rem;
	text-align: center;
}

.v2-companion-subtitle {
	color: var(--text-secondary);
	margin: -1.5rem 0 2.5rem;
}

.v2-companion-grid {
	display: grid;
	gap: 1.5rem;
}

.v2-companion-card {
	display: flex;
	align-items: center;
	gap: 1.25rem;
	text-align: left;
	background: var(--surface-raised);
	border: 1px solid var(--separator);
	border-radius: var(--radius-card);
	box-shadow: var(--shadow-card);
	padding: 1.5rem;
	opacity: 0;
	transform: translateY(16px);
	transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.25s ease;
}

.v2-companion-card.is-visible {
	opacity: 1;
	transform: translateY(0);
}

.v2-companion-card:hover {
	box-shadow: var(--shadow-card-hover);
}

.v2-companion-icon {
	width: 64px;
	height: 64px;
	border-radius: 16px;
	flex-shrink: 0;
}

.v2-companion-eyebrow {
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--accent);
}

.v2-companion-name {
	font-family: var(--font-display);
	font-weight: 600;
	font-size: 1.3rem;
	margin: 0.2rem 0 0.4rem;
}

.v2-companion-desc {
	color: var(--text-secondary);
	font-size: 0.95rem;
}

.v2-companion-arrow {
	margin-left: auto;
	font-size: 1.5rem;
	color: var(--text-tertiary);
	transition: color 0.2s ease, transform 0.2s ease;
}

.v2-companion-card:hover .v2-companion-arrow {
	color: var(--accent);
	transform: translateX(4px);
}
```

- [ ] **Step 2: Visual check**

Reload and scroll to the "Companion apps" section.
Expected: the DuoTimer card starts faded/offset, then fades and slides in as it scrolls into view (IntersectionObserver `.is-visible`). It is a soft white card with the DuoTimer icon, crimson eyebrow, Fraunces name, warm-gray description, and an arrow that turns crimson and nudges right on hover.

- [ ] **Step 3: Commit**

```bash
git add css/home.css
git commit -m "Style companion apps section"
```

---

## Task 9: CTA + footer

**Files:**
- Modify: `css/home.css` (append)

Markup reused: `.v2-cta > .v2-cta-content > (h2.v2-cta-title + p.v2-cta-subtitle + .v2-newsletter-form-container)`, then `footer.v2-footer > p > a*3`.

- [ ] **Step 1: Append CTA + footer styles to `css/home.css`**

```css
/* ---------- CTA ---------- */
.v2-cta {
	padding: 5rem 1.5rem;
	background: var(--fill-secondary);
	text-align: center;
}

.v2-cta-content {
	max-width: 640px;
	margin: 0 auto;
}

.v2-cta-title {
	font-size: clamp(2rem, 5vw, 3rem);
	margin-bottom: 0.75rem;
}

.v2-cta-subtitle {
	color: var(--text-secondary);
	margin-bottom: 2rem;
}

/* ---------- Footer ---------- */
.v2-footer {
	padding: 2.5rem 1.5rem;
	text-align: center;
	border-top: 1px solid var(--separator);
	background: var(--surface);
}

.v2-footer p {
	color: var(--text-tertiary);
	font-size: 0.9rem;
}

.v2-footer a {
	color: var(--text-secondary);
	transition: color 0.2s ease;
}

.v2-footer a:hover {
	color: var(--accent);
}
```

- [ ] **Step 2: Visual check**

Reload and screenshot the CTA + footer.
Expected: CTA sits on a subtle warm band (`--fill-secondary`) distinct from the cream above, Fraunces headline + the styled email form; footer is minimal with a warm hairline top border and warm-gray links that go crimson on hover.

- [ ] **Step 3: Commit**

```bash
git add css/home.css
git commit -m "Style CTA section and footer"
```

---

## Task 10: Animations, reduced-motion, responsive

**Files:**
- Modify: `css/home.css` (append)

The hero markup uses entrance animations referenced by the old stylesheet (`fadeInUp`, `fadeInDown`) plus `pulse` (used by `.badge-dot` in Task 4) — these keyframes must be defined in `home.css` now that the old sheets are unlinked.

- [ ] **Step 1: Append keyframes, entrance animations, reduced-motion, and responsive rules to `css/home.css`**

```css
/* ---------- Keyframes ---------- */
@keyframes pulse {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.5; }
}

@keyframes fadeInUp {
	from { opacity: 0; transform: translateY(20px); }
	to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
	from { opacity: 0; transform: translateY(-20px); }
	to { opacity: 1; transform: translateY(0); }
}

/* ---------- Entrance ---------- */
.v2-hero-badge {
	animation: fadeInDown 0.6s ease-out both;
}

.v2-hero-title {
	animation: fadeInUp 0.8s ease-out 0.1s both;
}

.v2-hero-subtitle {
	animation: fadeInUp 0.8s ease-out 0.2s both;
}

.v2-hero .v2-newsletter-form-container {
	animation: fadeInUp 0.8s ease-out 0.3s both;
}

.v2-hero-shot {
	animation: fadeInUp 0.9s ease-out 0.4s both;
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}

	.v2-companion-card {
		opacity: 1;
		transform: none;
	}
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
	.v2-features .v2-container {
		grid-template-columns: 1fr;
	}

	.v2-feature-large {
		flex-direction: column;
		align-items: stretch;
	}

	.v2-principles-grid {
		grid-template-columns: 1fr;
	}

	.v2-hero {
		padding-top: 7rem;
	}
}
```

- [ ] **Step 2: Visual check — desktop, mobile, reduced-motion**

1. Reload at desktop width; confirm hero elements fade/slide in on load and the badge dot pulses.
2. Resize the Playwright browser to 390×844 (mobile) and screenshot top-to-bottom: features collapse to one column, the large feature card stacks vertically, principles stack, hero padding looks right, nothing overflows horizontally.
3. Emulate reduced motion (Playwright: launch/emulate `prefers-reduced-motion: reduce`) and reload; confirm the companion card is visible immediately (not stuck faded) and entrance animations are effectively off.

- [ ] **Step 3: Commit**

```bash
git add css/home.css
git commit -m "Add entrance animations, reduced-motion support, and responsive rules"
```

---

## Task 11: Regression guard + final verification

**Files:**
- None modified (verification only)

- [ ] **Step 1: Confirm other pages are visually unchanged**

In the Playwright browser, visit each and screenshot:
- `http://localhost:8000/features/`
- `http://localhost:8000/privacy/`
- `http://localhost:8000/roadmap/`
- `http://localhost:8000/duotimer/`

Expected: each still renders in its original (dark) styling — i.e. unaffected by the redesign. Confirm none of them 404 and none accidentally pull in `home.css`.

- [ ] **Step 2: Confirm no stale references on the home page**

```bash
cd "/Users/fran/Documents/Projects/Griplog/Griplog Web"
grep -n "styles.css\|index2.css\|CabinetGrotesk\|Protest+Strike\|style=" index.html
```
Expected: **no output.** (No links to the old sheets, no leftover CabinetGrotesk/Protest font references, and no inline `style=` attributes remain on the home page.)

- [ ] **Step 3: Full-page home screenshot, light review**

Reload `http://localhost:8000/` and capture a full-page screenshot. Review top-to-bottom against the spec: warm cream throughout, soft white cards with warm shadows, crimson used sparingly (CTA button, badge dot, labels, hover states), Fraunces headlines + Inter body, hero screenshot present, no dark remnants.

- [ ] **Step 4: Stop the local server**

Stop the `python3 -m http.server 8000` process started in Task 1.

- [ ] **Step 5: Final commit (if any verification fixes were made)**

If Steps 1-3 surfaced issues, fix them inline and commit:

```bash
git add -A
git commit -m "Fix issues found during redesign verification"
```

If nothing needed fixing, this task adds no commit.

---

## Self-Review notes

- **Spec coverage:** Light/warm-only theme + tokens (Task 2); Fraunces/Inter, drop CabinetGrotesk/Protest (Tasks 1, 11 guard); header warm + scroll frost (Task 3); clean cream no-photo hero + app screenshot (Task 4); newsletter form restyle + states + no inline styles (Task 5); features bento as soft cards + "See all" link de-inlined (Task 6); principles as soft cards (Task 7); companion card + preserved IntersectionObserver (Task 8); CTA warm band + footer (Task 9); animations + `prefers-reduced-motion` + responsive (Task 10); other pages unchanged + no inline CSS guard (Task 11). New stylesheet only, old sheets untouched (Task 1). All spec sections map to a task.
- **No placeholders:** every code step shows the full CSS/HTML to add; line numbers are approximate and paired with exact strings to find.
- **Class-name consistency:** `home.css` targets the exact existing markup classes (`v2-*`, `site-*`, `newsletter-*`, `badge-dot`, `gradient-text`, `is-visible`) and the two new classes introduced here (`is-hidden` in Task 2, `v2-see-all` in Task 6, `v2-hero-shot` in Task 4) are each defined before/where used.
- **JS preserved:** the Loops handler, header-scroll (`.scrolled`), and companion observer (`.is-visible`) are untouched; Task 5 verifies the `style.display` override still beats the `is-hidden` class.
- **Standing rule honored:** no inline CSS — all inline `style=` attributes removed (Tasks 5, 6) and verified absent (Task 11 Step 2).
