import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    name: "Meera K.",
    location: "Bengaluru",
    quote:
      "The condition grading is actually accurate, which never happens with thrift sites. My jacket looked exactly like the photos.",
  },
  {
    name: "Arjun T.",
    location: "Chennai",
    quote:
      "Found a lot number I still think about. Ordered a cardigan on a Tuesday, wore it out that weekend. Fast shipping too.",
  },
  {
    name: "Diya S.",
    location: "Mumbai",
    quote:
      "Feels more like a curated closet than a thrift store. I've stopped buying fast fashion since I found this place.",
  },
];

export default function Testimonials() {
  return (
    <section className="container-px py-14 lg:py-20">
      <SectionHeading eyebrow="Word on the Street" title="What our customers say" align="center" />
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="bg-sand/50 dark:bg-moss-soft/60 rounded-tag p-6 flex flex-col gap-4"
          >
            <div className="flex gap-0.5 text-clay" aria-hidden>
              {"★★★★★"}
            </div>
            <blockquote className="text-sm leading-relaxed text-ink/75 dark:text-bone/75">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-auto text-xs eyebrow-tag text-ink/50 dark:text-bone/50">
              {t.name} — {t.location}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
