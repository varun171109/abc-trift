import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://relic-trifts.vercel.app";
  const staticRoutes = ["", "/shop", "/about", "/contact"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
  const products = await getAllProducts();
  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.id}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...productRoutes];
}
