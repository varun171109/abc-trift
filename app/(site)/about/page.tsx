import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/config/site";

const team = [
  { name: "Add Name", role: "Founder & Curator" },
  { name: "Add Name", role: "Sourcing Lead" },
  { name: "Add Name", role: "Studio & Styling" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-px pt-10 pb-14 lg:pt-16 lg:pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="eyebrow-tag text-xs text-clay mb-2">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-tight">
            We started in a spare room, sorting bags of secondhand clothes.
          </h1>
          <p className="mt-5 text-ink/65 dark:text-bone/65 leading-relaxed">
            {siteConfig.brandName} began as a weekend project: a rail of thrifted pieces sold out of
            a spare room, styled and priced by hand, one lot at a time. What started as a way to keep
            good clothes out of landfill grew into a full closet — every piece still inspected,
            graded, and photographed by our own team before it goes live.
          </p>
          <p className="mt-4 text-ink/65 dark:text-bone/65 leading-relaxed">
            We're not trying to be a big-box resale platform. We're trying to be the shop where you
            trust the condition rating, recognize the person who picked it, and come back because the
            next lot might have your next favorite piece in it.
          </p>
        </div>
        <div className="relative aspect-[4/5] rounded-tag overflow-hidden shadow-lift">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1000&q=80"
            alt="Racks of curated secondhand clothing"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="bg-sand/60 dark:bg-moss-soft/60">
        <div className="container-px py-14 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-tag overflow-hidden shadow-lift">
            <Image
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000&q=80"
              alt="Sustainable fashion detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow-tag text-xs text-clay mb-2">Our Mission</p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
              Slow fashion shouldn't feel like a compromise.
            </h2>
            <p className="mt-5 text-ink/65 dark:text-bone/65 leading-relaxed">
              We believe sustainable style should feel as good as it does responsible. That means
              real quality checks, honest condition grades, and pieces worth keeping for years — not
              just a season. Every rehomed garment is a small vote against overproduction.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink/70 dark:text-bone/70">
              <li>· No item listed without a physical condition check</li>
              <li>· Small lots, sourced responsibly, sold once</li>
              <li>· Packaging kept minimal and recyclable</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-px py-14 lg:py-20">
        <SectionHeading eyebrow="The People" title="Meet the team" align="center" />
        <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative aspect-square rounded-tag overflow-hidden bg-sand dark:bg-moss-soft mb-4">
                <div className="absolute inset-0 flex items-center justify-center eyebrow-tag text-xs text-ink/40 dark:text-bone/40">
                  Photo Here
                </div>
              </div>
              <p className="font-medium">{member.name}</p>
              <p className="text-xs text-ink/50 dark:text-bone/50 mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
