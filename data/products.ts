// Product data now lives in Sanity (see /studio to manage it) — this file
// only holds the shared TypeScript shape used across the site.

export type Condition = "Like New" | "Excellent" | "Good" | "Fair";

export type Product = {
  id: string;
  lot: string;
  name: string;
  brand: string;
  category: "Outerwear" | "Tops" | "Bottoms" | "Dresses" | "Denim" | "Accessories";
  size: "XS" | "S" | "M" | "L" | "XL";
  color: string;
  condition: Condition;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  isNew?: boolean;
  featured?: boolean;
};

export const sizes: Product["size"][] = ["XS", "S", "M", "L", "XL"];
export const categories: Product["category"][] = [
  "Outerwear",
  "Tops",
  "Bottoms",
  "Dresses",
  "Denim",
  "Accessories",
];
