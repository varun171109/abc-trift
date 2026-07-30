import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";
import { getAllProducts } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <Suspense fallback={null}>
      <ShopClient products={products} />
    </Suspense>
  );
}
