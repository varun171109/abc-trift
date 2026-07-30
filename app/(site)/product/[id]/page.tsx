import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/sanity/queries";
import ProductDetailClient from "@/components/ProductDetailClient";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ${product.brand}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductBySlug(params.id);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  const related = getRelatedProducts(product, allProducts);

  return <ProductDetailClient product={product} related={related} />;
}
