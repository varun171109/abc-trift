import Link from "next/link";
import Logo from "./Logo";
import { siteConfig } from "@/config/site";

const socialIcons: Record<string, JSX.Element> = {
  instagram: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 3c.3 2 1.6 3.5 3.6 3.8v2.8c-1.4.1-2.7-.3-3.8-1.1v6.5c0 3.2-2.6 5.5-5.6 5.5-3.1 0-5.6-2.4-5.6-5.5 0-3 2.4-5.4 5.4-5.5v3c-1.3.1-2.4 1.2-2.4 2.5 0 1.4 1.2 2.6 2.6 2.6 1.5 0 2.7-1.2 2.7-2.6V3h3.1Z" />
    </svg>
  ),
  pinterest: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 18c1-3.5 1.5-5.5 1.5-5.5m0 0c-.5-.8-.7-2.6.3-3.5.9-.8 2.4-.4 2.6.9.2 1.2-.7 2.9-1 3.9-.3 1 .3 1.9 1.3 1.9 1.7 0 2.8-2.1 2.8-4.1 0-2-1.5-3.6-4-3.6-2.9 0-4.6 2.1-4.6 4.2 0 .8.3 1.6.7 2.1" />
    </svg>
  ),
  facebook: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M14 9.5h2.5V6.8H14c-1.9 0-3.3 1.5-3.3 3.4v1.8H8.5v2.7h2.2V21h2.8v-6.3h2.3l.4-2.7h-2.7v-1.5c0-.6.5-1 1.5-1Z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="bg-sand/70 dark:bg-moss-soft border-t border-ink/10 dark:border-bone/10">
      <div className="container-px py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-ink/60 dark:text-bone/60 max-w-xs leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="flex gap-3 mt-5">
            {Object.entries(siteConfig.socials).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={key}
                className="h-9 w-9 flex items-center justify-center rounded-full border border-ink/15 dark:border-bone/20 hover:bg-ink hover:text-bone dark:hover:bg-bone dark:hover:text-ink transition-colors"
              >
                {socialIcons[key]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow-tag text-xs text-ink/50 dark:text-bone/50 mb-4">Shop</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/shop" className="hover:text-clay">All Products</Link></li>
            <li><Link href="/shop?sort=new" className="hover:text-clay">New Arrivals</Link></li>
            <li><Link href="/wishlist" className="hover:text-clay">Wishlist</Link></li>
            <li><Link href="/cart" className="hover:text-clay">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow-tag text-xs text-ink/50 dark:text-bone/50 mb-4">Company</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-clay">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-clay">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow-tag text-xs text-ink/50 dark:text-bone/50 mb-4">Get In Touch</h3>
          <ul className="space-y-2.5 text-sm text-ink/70 dark:text-bone/70">
            <li>{siteConfig.email}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10 dark:border-bone/10">
        <div className="container-px py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink/45 dark:text-bone/45">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <p className="font-tag">Rehomed with care.</p>
        </div>
      </div>
    </footer>
  );
}
