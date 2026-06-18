# MekBites — Modern Day Snacking

Premium, mobile-first React (Vite) website for the MekBites makhana brand.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> /dist
npm run preview  # preview the production build
```

## What's inside

Single-page site with: sticky glassy nav + mobile menu, animated hero, scrolling
benefit marquee, "Why MekBites", product cards (with click-to-prefill enquiry),
makhana benefits, brand story, testimonials, Instagram gallery, contact section
(form + WhatsApp + click-to-call), FAQ accordion, newsletter, footer, and a
floating WhatsApp button. Scroll-reveal animations and reduced-motion support
are built in.

## Where to edit things

- `src/data.js` — all content: products, flavours, benefits, FAQs, testimonials,
  and brand details (phone, email, Instagram). Change copy here, not in the JSX.
- `src/index.css` — design tokens at the top (`:root`) hold the full colour
  palette and radii. All section styling lives below.
- `src/App.jsx` — section components and interactivity.

## Swapping in real assets

Emojis are used as visual placeholders for product images and the logo so the
site works with zero external files. To use real images:

1. Drop files in `public/` (e.g. `public/products/tandoori.png`).
2. In `src/data.js`, add an `img` field to each product and reference
   `/products/tandoori.png`.
3. In `src/App.jsx`, replace the `<span className="emoji">` with an `<img>`.
4. For the logo, swap the inline SVG inside the `.logo-mark` span in `Nav` and
   `Footer` (and `public/favicon.svg`) with your uploaded MekBites logo.

## Notes

- The contact form and newsletter are front-end only (they show a success state
  but don't send anywhere yet). Wire them to your email service, Formspree, or a
  backend endpoint in the `submit` handlers.
- Brand colours: Orange `#FF5A36`, Teal `#007B7F`, Green `#5FBF4A`,
  Cream `#F8F3EA`, White `#FFFFFF`.
