"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-tag bg-sand dark:bg-moss-soft">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* swing tag */}
          <div className="hangtag absolute top-3 left-3 bg-bone/95 dark:bg-ink/90 text-ink dark:text-bone px-2.5 py-1 rounded-tag text-[10px] eyebrow-tag shadow-card origin-top-left group-hover:animate-swing">
            {product.lot}
          </div>

          {product.isNew && (
            <span className="absolute top-3 right-3 bg-clay text-bone text-[10px] eyebrow-tag px-2 py-1 rounded-tag">
              New
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-bone/95 dark:bg-ink/90 flex items-center justify-center shadow-card transition-transform hover:scale-105"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={wishlisted ? "#A8522E" : "none"}
              stroke={wishlisted ? "#A8522E" : "currentColor"}
              strokeWidth="1.8"
            >
              <path d="M12 20.5s-7.5-4.6-10-9.3C.6 8 1.9 4.5 5.3 3.6c2-.5 4 .3 5.2 2 .4.5.9 1.1 1.5 1.1.6 0 1.1-.6 1.5-1.1 1.2-1.7 3.2-2.5 5.2-2 3.4.9 4.7 4.4 3.3 7.6-2.5 4.7-10 9.3-10 9.3Z" />
            </svg>
          </button>
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] eyebrow-tag text-ink/45 dark:text-bone/45">{product.brand}</p>
            <p className="text-[11px] eyebrow-tag text-sage-dark dark:text-sage-light">{product.condition}</p>
          </div>
          <h3 className="text-sm font-medium leading-snug truncate">{product.name}</h3>
          <p className="text-xs text-ink/50 dark:text-bone/50">Size {product.size}</p>
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="font-tag text-sm">
              {siteConfig.currency}
              {product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="font-tag text-xs text-ink/35 dark:text-bone/35 line-through">
                {siteConfig.currency}
                {product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="mt-2.5 w-full text-xs tracking-wide border border-ink/15 dark:border-bone/20 rounded-tag py-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-ink hover:text-bone dark:hover:bg-bone dark:hover:text-ink sm:block hidden"
      >
        Quick Add
      </button>
      <button
        onClick={() => addToCart(product)}
        className="mt-2.5 w-full text-xs tracking-wide border border-ink/15 dark:border-bone/20 rounded-tag py-2 sm:hidden"
      >
        Quick Add
      </button>
    </div>
  );
}
