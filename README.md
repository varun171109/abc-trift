# ABC Thrifting — Storefront

A modern, mobile-friendly thrift/secondhand fashion storefront built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Sanity** (for product management).

## Getting started

```bash
npm install
```

Create a `.env.local` file in the project root with:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=ubqsbvec
NEXT_PUBLIC_SANITY_DATASET=production
```

Then run:
```bash
npm run dev
```

Open http://localhost:3000 for the storefront, and http://localhost:3000/studio for the product dashboard.

## Managing products — no code required

Go to `/studio` on your deployed site (e.g. `https://your-site.vercel.app/studio`). Log in with the same account you used to create your Sanity project. From there:

- **Add Product** → fill in the form (name, brand, category, size, condition, price, description) → drag & drop photos → **Publish**
- New/edited products appear on the live site within about a minute (no redeploy needed)
- Untick **"In Stock"** on a product once it sells — it disappears from the shop automatically
- Tick **"Mark as New Arrival"** or **"Show in Featured Finds"** to control where a product appears on the homepage

## Deploying (Vercel)

1. Push this project to a GitHub repo
2. Import it into Vercel (vercel.com → Add New → Project)
3. **Before or after deploying**, add these two Environment Variables in Vercel → Settings → Environment Variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `ubqsbvec`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
4. In Sanity (sanity.io/manage → your project → API → CORS Origins), add your Vercel URL (e.g. `https://your-site.vercel.app`) so the site is allowed to read data
5. Redeploy if you added the env vars after the first deploy

## Rebranding — change everything from one file

Open **`config/site.ts`**. Every page reads from this file:

- `brandName` — shown in the navbar, footer, and page titles.
- `tagline`, `description` — hero headline and SEO description.
- `logoImage` — currently `null`, showing the "Logo Here" placeholder. Add your logo to `public/images/` and set `logoImage: "/images/your-logo.png"`.
- `email`, `phone`, `address`, `socials` — contact details.
- `whatsappNumber` — used by the "Order via WhatsApp" buttons (country code + number, no spaces or `+`).
- `nav` — the navbar links.

## Where things live

```
app/
  layout.tsx           Minimal root layout (html/body only)
  studio/               Embedded Sanity Studio dashboard (/studio)
  (site)/               All public pages — grouped so Studio stays chrome-free
    layout.tsx          Fonts, navbar, footer, providers
    page.tsx            Home
    shop/                Shop grid (fetches from Sanity, filters/search run client-side)
    product/[id]/        Product detail (fetched by slug from Sanity)
    about/  contact/     Static content pages
    cart/  wishlist/     Cart & wishlist pages
components/             Reusable UI (Navbar, Footer, ProductCard, CartDrawer, ShopClient, ...)
context/                React Context for cart, wishlist, and dark mode
lib/sanity/             Sanity client, image URL helper, GROQ queries
lib/whatsapp.ts         Builds pre-filled "Order via WhatsApp" links
sanity/schemaTypes/     Product schema — the fields shown in the Studio form
sanity.config.ts        Sanity Studio configuration
data/products.ts        Shared TypeScript types only (data itself lives in Sanity)
config/site.ts          Brand configuration
```

## What's real vs. what still needs wiring

- **Cart, wishlist, dark mode** — fully functional, persisted to the browser's `localStorage`.
- **Product management (Studio)** — fully functional, no code required to add/edit/remove products.
- **Ordering** — "Order via WhatsApp" buttons on the product page, cart page, and cart drawer open WhatsApp with a pre-filled order message to your number. No payment processing is wired up — you confirm payment (UPI, etc.) directly with the customer over WhatsApp.
- **Newsletter / contact forms** — UI only; connect a form backend (e.g. Formspree, an API route) to actually receive submissions.
- **Checkout / payments** — not built. If you outgrow WhatsApp ordering, the next step is a real payment gateway (e.g. Razorpay).

## Design system

- Colors, fonts, and the "hangtag" signature motif are defined in `tailwind.config.ts` and `app/(site)/globals.css`.
- Fonts: **Fraunces** (display), **Inter** (body), **Space Mono** (price tags / labels).
- Dark mode uses Tailwind's `class` strategy via `context/ThemeContext.tsx`.
