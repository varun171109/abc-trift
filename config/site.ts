// ────────────────────────────────────────────────────────────────
// SITE / BRAND CONFIGURATION
// Change everything about the brand from this one file.
// Every page and component reads from here — nothing is hardcoded.
// ────────────────────────────────────────────────────────────────

export const siteConfig = {
  // Brand identity
  brandName: "ABC Thrifting",
  shortName: "ABC", // used in tight spaces (mobile logo, favicon text)
  tagline: "Sustainable Style, Unique Finds.",
  description:
    "Curated secondhand fashion for people who'd rather stand out than blend in. One-of-one pieces, hand-picked and quality-checked.",

  // Logo — replace `logoImage` with a real path (e.g. "/images/logo.png") once ready.
  // While logoImage is null, the navbar/footer show the text placeholder below.
  logoImage: null as string | null,
  logoPlaceholderText: "Logo Here",

  // Contact & socials — update freely
  email: "hello@abcthrifting.com",
  phone: "+91 98765 43210",
  address: "12 Thrift Lane, Chennai, Tamil Nadu, India",

  // WhatsApp number used for "Order via WhatsApp" buttons.
  // Country code + number, no spaces, no "+" (e.g. "919585171109").
  whatsappNumber: "919585171109",

  socials: {
    instagram: "https://instagram.com/abcthrifting",
    tiktok: "https://tiktok.com/@abcthrifting",
    pinterest: "https://pinterest.com/abcthrifting",
    facebook: "https://facebook.com/abcthrifting",
  },

  // Newsletter
  newsletterHeadline: "Get first dibs on new drops",
  newsletterSubtext: "One email a week. Restocks, new lots, and 10% off your next find.",

  // Nav
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=new" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  currency: "₹",
} as const;

export type SiteConfig = typeof siteConfig;
