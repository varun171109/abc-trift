"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeContext";

function IconSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.5 12H2M22 12h-2.5M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </svg>
  );
}
function IconMoon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}
function IconHeart({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.6 8 1.9 4.5 5.3 3.6c2-.5 4 .3 5.2 2 .4.5.9 1.1 1.5 1.1.6 0 1.1-.6 1.5-1.1 1.2-1.7 3.2-2.5 5.2-2 3.4.9 4.7 4.4 3.3 7.6-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  );
}
function IconBag() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 8h12l-1 12.5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
function IconMenu({ open }: { open: boolean }) {
  return open ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { items: wishItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-bone/90 dark:bg-moss/90 backdrop-blur border-b border-ink/10 dark:border-bone/10">
      <div className="container-px flex items-center justify-between h-16 lg:h-20">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm tracking-wide text-ink/80 dark:text-bone/80 hover:text-clay dark:hover:text-clay-light transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-tag hover:bg-ink/5 dark:hover:bg-bone/10 transition-colors"
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-tag hover:bg-ink/5 dark:hover:bg-bone/10 transition-colors"
          >
            <IconHeart filled={wishItems.length > 0} />
            {wishItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[10px] text-bone font-tag">
                {wishItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-tag hover:bg-ink/5 dark:hover:bg-bone/10 transition-colors"
          >
            <IconBag />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[10px] text-bone font-tag">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-tag hover:bg-ink/5 dark:hover:bg-bone/10 transition-colors"
          >
            <IconMenu open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-ink/10 dark:border-bone/10 bg-bone dark:bg-moss">
          <nav className="container-px flex flex-col py-4 gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-base border-b border-ink/5 dark:border-bone/5 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="flex items-center gap-2 py-2.5 text-base text-left"
            >
              {theme === "dark" ? <IconSun /> : <IconMoon />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
