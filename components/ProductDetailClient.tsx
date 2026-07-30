"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import { buildWhatsAppLink, whatsAppMessageForProduct } from "@/lib/whatsapp";

const conditionInfo: Record<Product["condition"], { score: number; note: string }> = {
  "Like New": { score: 5, note: "No visible signs of wear. Looks fresh out of the store." },
  Excellent: { score: 4, note: "Very light wear, if any. Nothing that stands out." },
  Good: { score: 3, note: "Gently worn with minor, honestly-noted imperfections." },
  Fair: { score: 2, note: "Noticeably worn but fully wearable — priced to match." },
};

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const info = conditionInfo[product.condition];

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container-px py-10 lg:py-14">
      <nav className="text-xs text-ink/45 dark:text-bone/45 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-clay">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-clay">Shop</Link>
        <span>/</span>
        <span className="text-ink/70 dark:text-bone/70">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] rounded-tag overflow-hidden bg-sand dark:bg-moss-soft">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="hangtag absolute top-4 left-4 bg-bone/95 dark:bg-ink/90 text-ink dark:text-bone px-3 py-1.5 rounded-tag text-[10px] eyebrow-tag shadow-card">
              {product.lot}
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative h-20 w-16 rounded-tag overflow-hidden border-2 transition-colors ${
                  activeImage === i ? "border-clay" : "border-transparent"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow-tag text-xs text-ink/45 dark:text-bone/45">{product.brand}</p>
          <h1 className="font-display text-3xl sm:text-4xl mt-2 tracking-tight">{product.name}</h1>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="font-tag text-2xl">
              {siteConfig.currency}
              {product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <>
                <span className="font-tag text-base text-ink/35 dark:text-bone/35 line-through">
                  {siteConfig.currency}
                  {product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-sage-dark dark:text-sage-light">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off retail
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink/70 dark:text-bone/70">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-sand/50 dark:bg-moss-soft/60 rounded-tag p-4">
              <p className="text-xs eyebrow-tag text-ink/50 dark:text-bone/50">Size</p>
              <p className="font-medium mt-1">{product.size}</p>
            </div>
            <div className="bg-sand/50 dark:bg-moss-soft/60 rounded-tag p-4">
              <p className="text-xs eyebrow-tag text-ink/50 dark:text-bone/50">Color</p>
              <p className="font-medium mt-1">{product.color}</p>
            </div>
          </div>

          {/* Condition rating */}
          <div className="mt-6 bg-sand/50 dark:bg-moss-soft/60 rounded-tag p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs eyebrow-tag text-ink/50 dark:text-bone/50">Condition</p>
              <p className="font-medium text-sm">{product.condition}</p>
            </div>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={`h-1.5 flex-1 rounded-full ${
                    n <= info.score ? "bg-clay" : "bg-ink/10 dark:bg-bone/15"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-ink/55 dark:text-bone/55 mt-2">{info.note}</p>
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={handleAdd} className="btn-primary flex-1">
              {added ? "Added to Bag ✓" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className={`h-[50px] w-[50px] flex items-center justify-center rounded-tag border transition-colors ${
                wishlisted ? "border-clay text-clay" : "border-ink/20 dark:border-bone/25"
              }`}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7">
                <path d="M12 20.5s-7.5-4.6-10-9.3C.6 8 1.9 4.5 5.3 3.6c2-.5 4 .3 5.2 2 .4.5.9 1.1 1.5 1.1.6 0 1.1-.6 1.5-1.1 1.2-1.7 3.2-2.5 5.2-2 3.4.9 4.7 4.4 3.3 7.6-2.5 4.7-10 9.3-10 9.3Z" />
              </svg>
            </button>
          </div>

          <a
            href={buildWhatsAppLink(whatsAppMessageForProduct(product))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full border border-sage/50 text-sage-dark dark:text-sage-light rounded-tag py-3 text-sm font-medium hover:bg-sage/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.1.2-.3.2-.5.1-1.5-.7-2.4-1.3-3.4-2.9-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L9.1 8.1c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
            </svg>
            Order via WhatsApp
          </a>

          <p className="text-xs text-ink/45 dark:text-bone/45 mt-4">
            Only 1 of this piece in stock — once it sells, it's gone for good.
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl sm:text-3xl mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
