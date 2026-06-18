# CLAUDE.md

Guidance for Claude Code (and any AI assistant) working in this repository.

## Project

MekBites — a premium, mobile-first marketing site for an Indian makhana (fox
nuts) snack brand. Single-page React app built with Vite. No backend, no router,
no state library; everything is local component state.

Tagline: "Modern Day Snacking". Audience: health-conscious Indian snackers, all
age groups, family-friendly. Tone: friendly, premium, modern, trustworthy.

## Commands

```bash
npm install      # install dependencies
npm run dev      # Vite dev server with HMR (default http://localhost:5173)
npm run build    # production build -> /dist
npm run preview  # serve the production build locally
npm run lint     # run ESLint
npm run deploy   # build + publish /dist to the gh-pages branch (GitHub Pages)
```

There are no tests in this project. After meaningful changes, verify with
`npm run build` (must succeed) and a visual check via `npm run dev`.

## Deployment (GitHub Pages)

Site is published via the [gh-pages](https://www.npmjs.com/package/gh-pages)
package, which pushes the built `dist/` folder to a dedicated `gh-pages`
branch on `origin`.

- `vite.config.js` has **no `base` override** (defaults to `/`) — correct
  because the site is served from the custom domain root (`mekbites.in/`),
  not from `https://<user>.github.io/mekbites/`. Only set a `base` path again
  if the custom domain is ever removed and the `github.io/<repo>/` URL
  becomes the canonical one.
- `npm run deploy` runs `predeploy` (`npm run build`) automatically, then
  `gh-pages -d dist`, which commits and pushes `dist/` to `gh-pages`.
- One-time GitHub setup (already done for this repo): in
  **Settings → Pages**, source is the `gh-pages` branch, root folder.
- Just run `npm run deploy` whenever you want to publish the latest build —
  it does not happen automatically on push to `master`.

### Custom domain (mekbites.in)

- `public/CNAME` contains `mekbites.in`. Vite copies everything in `public/`
  into `dist/` on every build, so the CNAME file survives each
  `npm run deploy` (the `gh-pages` branch is otherwise fully overwritten each
  time). **Don't delete this file** or GitHub Pages will forget the custom
  domain after the next deploy.
- The custom domain is also registered in the repo's GitHub Pages settings
  (`Settings → Pages → Custom domain`), which must match `public/CNAME`.
- DNS records configured at the domain registrar/DNS provider for
  `mekbites.in`:

  | Type  | Host/Name | Value                   |
  |-------|-----------|-------------------------|
  | A     | `@`       | `185.199.108.153`       |
  | A     | `@`       | `185.199.109.153`       |
  | A     | `@`       | `185.199.110.153`       |
  | A     | `@`       | `185.199.111.153`       |
  | AAAA  | `@`       | `2606:50c0:8000::153`   |
  | AAAA  | `@`       | `2606:50c0:8001::153`   |
  | AAAA  | `@`       | `2606:50c0:8002::153`   |
  | AAAA  | `@`       | `2606:50c0:8003::153`   |
  | CNAME | `www`     | `marutibandagar9121.github.io` |

  (AAAA records are optional but recommended for IPv6 support. A records
  must point at all four of GitHub's IPs, not just one.)
- Live URL: `https://mekbites.in/` (and `https://www.mekbites.in/` once the
  `www` CNAME propagates). DNS changes can take anywhere from a few minutes
  to ~48 hours to propagate. HTTPS is auto-provisioned by GitHub once DNS is
  verified — enforce it in **Settings → Pages → Enforce HTTPS** as soon as
  it's available (it's grayed out until the cert is issued).

## Architecture

Plain React 19 + Vite. The whole site is one page composed of section
components. Data is fully separated from presentation.

```
index.html            # entry, font <link>s (Fraunces + Outfit), SEO meta
public/favicon.svg     # inline SVG brand mark
src/
  main.jsx             # React root, imports index.css
  App.jsx              # all section components + the App composition
  data.js              # ALL site content (single source of truth)
  index.css            # design tokens (:root) + every section's styles
```

### The three files that matter

- **`src/data.js`** — the content layer. Products, flavours, benefits, FAQs,
  testimonials, Instagram tiles, and brand contact details (phone, email,
  Instagram handle) all live here as exported arrays/objects. Copy changes go
  here, never hard-coded into JSX.
- **`src/App.jsx`** — one file holding every section as a named function
  component (`Nav`, `Hero`, `Marquee`, `Why`, `Products`, `Benefits`, `About`,
  `Testimonials`, `Instagram`, `Contact`, `Faq`, `Newsletter`, `Footer`,
  `WhatsAppFloat`), with `App` at the bottom composing them in order. Two shared
  helpers live at the top: `useScrolled` (nav background on scroll) and
  `Reveal` (IntersectionObserver scroll-in animation wrapper).
- **`src/index.css`** — design system. The `:root` block holds all design
  tokens (see below). Section styles follow, grouped by clearly-labelled
  comment banners that match the component names.

### Data flow worth knowing

- Product "Enquire" buttons call `onEnquire(name)` passed from `App`, which sets
  a `prefill` string and smooth-scrolls to `#contact`. The `Contact` component
  watches `prefill` via `useEffect` and fills the product + message fields.
- Section anchors (`#why`, `#products`, `#benefits`, `#about`, `#contact`,
  `#faq`, `#top`) drive nav links and smooth scrolling. Keep IDs stable.

## Conventions

- **Content vs. code.** Adding a product, FAQ, benefit, or testimonial means
  editing `src/data.js` only. Don't add markup for new items unless the shape of
  the data itself changes. If you change a data object's shape, update the one
  component that consumes it.
- **Styling is plain CSS**, not Tailwind/CSS-modules. Use the existing class
  vocabulary and the comment-banner structure in `index.css`. Derive every
  colour, radius, and shadow from the `:root` tokens — do not introduce new raw
  hex values for brand colours.
- **One file for sections.** Keep section components in `App.jsx` unless a
  component grows large or is reused; only then extract it to its own file.
- **Animations** go through the `Reveal` wrapper for scroll-in, or CSS
  keyframes already defined in `index.css`. All motion must stay inside the
  existing `@media (prefers-reduced-motion: reduce)` guard.
- **Accessibility floor:** keep visible focus states, `aria-label`s on
  icon-only controls, real `<label>`s on form fields, and `aria-hidden` on
  purely decorative elements. Don't regress these.
- **Responsive:** mobile-first. Breakpoints live at the bottom of `index.css`
  (940px and 640px). Test both widths after layout changes.

## Brand tokens (defined in `src/index.css` `:root`)

| Token        | Value     | Use                          |
|--------------|-----------|------------------------------|
| `--orange`   | `#FF5A36` | primary CTA, accents         |
| `--teal`     | `#007B7F` | secondary, benefits section  |
| `--green`    | `#5FBF4A` | health/positive accents      |
| `--cream`    | `#F8F3EA` | page background              |
| `--white`    | `#FFFFFF` | cards/surfaces               |
| `--ink`      | `#1c1a17` | text, footer, marquee        |

Type: **Fraunces** (display, `.display` class) + **Outfit** (body). Loaded via
`<link>` in `index.html` — if you add weights, update that link.

## Placeholders to replace (important)

This site ships with **emoji standing in for real images** so it runs with zero
external assets. When real assets exist:

1. **Product images** — currently `<span className="emoji">` in the `Products`
   component, fed by the `emoji` field in `data.js`. Add an `img` path field per
   product, drop files in `public/`, and swap the span for an `<img>`.
2. **Logo** — an inline SVG inside `.logo-mark` (appears in both `Nav` and
   `Footer`) and in `public/favicon.svg`. Replace all three with the real
   MekBites logo.
3. **Instagram gallery** — `INSTA_TILES` in `data.js` are coloured emoji tiles;
   replace with real post thumbnails/embeds when available.

## Known limitations / good next tasks

- **Contact form and newsletter are front-end only** — they show a success
  state but send nothing. Wiring them to Formspree, an email service, or a
  backend endpoint lives in the respective `submit` handlers in `App.jsx`.
- No analytics, no real Instagram feed integration, no privacy-policy page (the
  footer link is a placeholder `#`).

## When making changes

1. Read `data.js` first to see if the change is content-only.
2. Keep edits minimal and within existing patterns; match the surrounding code.
3. Run `npm run build` and confirm it passes before considering the task done.
4. Don't add dependencies for things plain React/CSS already handle here.