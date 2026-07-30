import SectionHeading from "./SectionHeading";

const reasons = [
  {
    title: "Hand-checked, not just listed",
    text: "Every piece is inspected for wear, stitching, and true condition before it's photographed — the grade you see is the grade you get.",
  },
  {
    title: "One-of-one, not mass-produced",
    text: "We source in small lots, so once a size or piece sells, it's gone. What you buy won't show up on someone else's feed next week.",
  },
  {
    title: "Fewer clothes in landfill",
    text: "Every rehomed piece is one less garment burned or buried. Thrifting is the lowest-effort climate action in your closet.",
  },
  {
    title: "Priced like it should be",
    text: "No markup theater. Prices are set by condition and rarity, not by a discount that was never real to begin with.",
  },
];

export default function WhyThrift() {
  return (
    <section className="bg-sand/60 dark:bg-moss-soft/60">
      <div className="container-px py-14 lg:py-20">
        <SectionHeading
          eyebrow="Why Thrift With Us"
          title="Secondhand, done properly."
          subtitle="We treat resale like a craft, not a clearance bin."
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div key={r.title} className="bg-bone dark:bg-moss rounded-tag p-5 shadow-card">
              <span className="font-tag text-xs text-clay">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-lg mt-3">{r.title}</h3>
              <p className="text-sm text-ink/60 dark:text-bone/60 mt-2 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
