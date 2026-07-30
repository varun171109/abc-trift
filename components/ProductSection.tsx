import Link from "next/link";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

export default function ProductSection({
  eyebrow,
  title,
  subtitle,
  products,
  viewAllHref,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}) {
  return (
    <section className="container-px py-14 lg:py-20">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm eyebrow-tag border-b border-ink/30 dark:border-bone/30 hover:border-clay hover:text-clay pb-0.5 transition-colors shrink-0"
          >
            View All
          </Link>
        )}
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
