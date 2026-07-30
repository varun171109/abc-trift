"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/data/products";

type WishlistContextType = {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = "abc-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const toggleWishlist = (product: Product) =>
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );

  const isWishlisted = (productId: string) => items.some((p) => p.id === productId);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
