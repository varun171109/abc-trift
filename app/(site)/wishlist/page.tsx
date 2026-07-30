"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="container-px py-10 lg:py-16">
      <p className="eyebrow-tag text-xs text-clay mb-2">Saved</p>
      <h1 className="font-display text-3xl sm:text-4xl mb-10">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ink/55 dark:text-bone/55 mb-8">Nothing saved yet — tap the heart on any piece.</p>
          <Link href="/shop" className="btn-primary">Browse Shop</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
