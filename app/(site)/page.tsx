import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import WhyThrift from "@/components/WhyThrift";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { getAllProducts } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <>
      <Hero />
      {products.length === 0 ? (
        <div className="container-px py-16 text-center text-ink/50 dark:text-bone/50">
          <p>No products yet — add your first piece in the <a href="/studio" className="text-clay underline">Studio</a>.</p>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <ProductSection
              eyebrow="Handpicked"
              title="Featured Finds"
              subtitle="The pieces our team can't stop talking about right now."
              products={featured}
              viewAllHref="/shop"
            />
          )}
          <WhyThrift />
          {newArrivals.length > 0 && (
            <ProductSection
              eyebrow="Just In"
              title="New Arrivals"
              subtitle="Fresh lots, still smelling like the steamer."
              products={newArrivals}
              viewAllHref="/shop?sort=new"
            />
          )}
        </>
      )}
      <Testimonials />
      <Newsletter />
    </>
  );
}
