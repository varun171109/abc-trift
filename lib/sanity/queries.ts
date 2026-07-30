import { client } from "./client";
import { urlFor } from "./image";
import type { Product } from "@/data/products";

// Raw shape as it comes back from Sanity before we resolve image URLs.
type SanityProduct = {
  _id: string;
  slug: { current: string };
  lot: string;
  name: string;
  brand: string;
  category: Product["category"];
  size: Product["size"];
  color: string;
  condition: Product["condition"];
  price: number;
  originalPrice?: number;
  description: string;
  images: any[];
  isNew?: boolean;
  featured?: boolean;
};

const PRODUCT_FIELDS = `
  _id, slug, lot, name, brand, category, size, color, condition,
  price, originalPrice, description, images, isNew, featured
`;

// Only fetch pieces marked in-stock — untick "In Stock" in the Studio to hide a sold item.
const ALL_PRODUCTS_QUERY = `*[_type == "product" && inStock == true] | order(_createdAt desc) { ${PRODUCT_FIELDS} }`;
const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] { ${PRODUCT_FIELDS} }`;

function mapProduct(raw: SanityProduct): Product {
  return {
    id: raw.slug?.current || raw._id,
    lot: raw.lot,
    name: raw.name,
    brand: raw.brand,
    category: raw.category,
    size: raw.size,
    color: raw.color,
    condition: raw.condition,
    price: raw.price,
    originalPrice: raw.originalPrice,
    images: (raw.images || []).map((img) => urlFor(img).width(900).height(1100).fit("crop").url()),
    description: raw.description,
    isNew: raw.isNew,
    featured: raw.featured,
  };
}

// Revalidate every 60s so new/edited products in the Studio show up on the
// live site without needing a full redeploy.
export async function getAllProducts(): Promise<Product[]> {
  try {
    const raw = await client.fetch<SanityProduct[]>(
      ALL_PRODUCTS_QUERY,
      {},
      { next: { revalidate: 60 } }
    );
    return raw.map(mapProduct);
  } catch (err) {
    console.error("Sanity fetch failed (getAllProducts):", err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const raw = await client.fetch<SanityProduct | null>(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: 60 } }
    );
    return raw ? mapProduct(raw) : null;
  } catch (err) {
    console.error("Sanity fetch failed (getProductBySlug):", err);
    return null;
  }
}

export function getRelatedProducts(product: Product, all: Product[], count = 4) {
  return all
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(all.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, count);
}
