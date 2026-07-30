"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}
