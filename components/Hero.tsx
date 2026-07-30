import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand dark:bg-moss-soft">
      <div className="container-px grid lg:grid-cols-2 gap-10 lg:gap-6 items-center pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="order-2 lg:order-1 animate-fadeUp">
          <span className="eyebrow-tag text-xs text-clay">Lot 001 — Est. Thrift Co.</span>
          <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem] mt-3 tracking-tight">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink/65 dark:text-bone/65 max-w-md">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/shop?sort=new" className="btn-secondary">
              Browse Collection
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-ink/50 dark:text-bone/50">
            <span>1,200+ pieces rehomed</span>
            <span className="h-1 w-1 rounded-full bg-ink/30 dark:bg-bone/30" />
            <span>Quality-checked, always</span>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-tag overflow-hidden shadow-lift">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80"
              alt="Model wearing a curated secondhand outfit"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="hangtag absolute -bottom-5 -left-5 hidden sm:block bg-bone dark:bg-ink text-ink dark:text-bone px-4 py-3 rounded-tag shadow-lift animate-swing origin-top">
            <p className="eyebrow-tag text-[10px] text-clay">Featured Find</p>
            <p className="text-sm font-medium mt-0.5">Denim Trucker · ₹1,499</p>
          </div>
        </div>
      </div>
    </section>
  );
}
