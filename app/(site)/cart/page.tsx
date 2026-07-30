"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink, whatsAppMessageForCart } from "@/lib/whatsapp";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-px py-20 text-center">
        <p className="eyebrow-tag text-xs text-clay mb-2">Your Bag</p>
        <h1 className="font-display text-3xl sm:text-4xl mb-4">It's empty in here</h1>
        <p className="text-ink/55 dark:text-bone/55 mb-8">Find something worth rehoming.</p>
        <Link href="/shop" className="btn-primary">Shop All</Link>
      </div>
    );
  }

  const shipping = subtotal > 999 ? 0 : 79;

  return (
    <div className="container-px py-10 lg:py-16">
      <p className="eyebrow-tag text-xs text-clay mb-2">Your Bag</p>
      <h1 className="font-display text-3xl sm:text-4xl mb-10">Shopping Cart</h1>

      <div className="grid lg:grid-cols-[1fr_340px] gap-12">
        <div className="space-y-6">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 pb-6 border-b border-ink/10 dark:border-bone/10">
              <Link href={`/product/${product.id}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-tag bg-sand">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="96px" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/product/${product.id}`} className="font-medium hover:text-clay">{product.name}</Link>
                    <p className="text-xs text-ink/50 dark:text-bone/50 mt-1">
                      {product.brand} · Size {product.size} · {product.condition}
                    </p>
                  </div>
                  <span className="font-tag text-sm shrink-0">
                    {siteConfig.currency}{(product.price * quantity).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-ink/15 dark:border-bone/20 rounded-tag">
                    <button className="w-8 h-8" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease quantity">−</button>
                    <span className="w-8 text-center text-sm font-tag">{quantity}</span>
                    <button className="w-8 h-8" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="text-xs text-ink/45 dark:text-bone/45 hover:text-clay">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-sand/50 dark:bg-moss-soft/60 rounded-tag p-6 h-fit space-y-4">
          <h2 className="eyebrow-tag text-xs text-ink/50 dark:text-bone/50">Order Summary</h2>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-tag">{siteConfig.currency}{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="font-tag">{shipping === 0 ? "Free" : `${siteConfig.currency}${shipping}`}</span>
          </div>
          <div className="border-t border-ink/10 dark:border-bone/10 pt-4 flex justify-between font-medium">
            <span>Total</span>
            <span className="font-tag">{siteConfig.currency}{(subtotal + shipping).toLocaleString("en-IN")}</span>
          </div>
          <a
            href={buildWhatsAppLink(whatsAppMessageForCart(items, subtotal))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.1.2-.3.2-.5.1-1.5-.7-2.4-1.3-3.4-2.9-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L9.1 8.1c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
            </svg>
            Checkout via WhatsApp
          </a>
          <p className="text-[11px] text-ink/40 dark:text-bone/40 text-center">
            Opens WhatsApp with your order pre-filled — we'll confirm delivery details and payment there.
          </p>
        </div>
      </div>
    </div>
  );
}
