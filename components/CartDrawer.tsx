"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink, whatsAppMessageForCart } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-bone dark:bg-moss shadow-lift transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10 dark:border-bone/10">
          <h2 className="font-display text-xl">Your Bag ({items.length})</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            className="h-8 w-8 flex items-center justify-center rounded-tag hover:bg-ink/5 dark:hover:bg-bone/10"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-16">
              <p className="text-ink/50 dark:text-bone/50">Your bag is empty.</p>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="btn-secondary text-xs">
                Start shopping
              </Link>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-tag bg-sand">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-ink/50 dark:text-bone/50 mt-0.5">
                    Size {product.size} · {product.condition}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-ink/15 dark:border-bone/20 rounded-tag">
                      <button
                        className="w-7 h-7 text-sm"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-tag">{quantity}</span>
                      <button
                        className="w-7 h-7 text-sm"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-tag">
                      {siteConfig.currency}
                      {(product.price * quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  aria-label="Remove item"
                  className="text-ink/30 dark:text-bone/30 hover:text-clay self-start"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/10 dark:border-bone/10 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink/60 dark:text-bone/60">Subtotal</span>
              <span className="font-tag text-base">
                {siteConfig.currency}
                {subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <Link href="/cart" onClick={() => setIsOpen(false)} className="btn-primary w-full">
              View Bag & Checkout
            </Link>
            <a
              href={buildWhatsAppLink(whatsAppMessageForCart(items, subtotal))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-sage/50 text-sage-dark dark:text-sage-light rounded-tag py-2.5 text-xs font-medium hover:bg-sage/10 transition-colors"
            >
              Order via WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
