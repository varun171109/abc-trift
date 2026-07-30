export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow-tag text-xs text-clay mb-2">{eyebrow}</p>}
      <h2 className="font-display text-3xl sm:text-4xl tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-ink/60 dark:text-bone/60 text-sm sm:text-base">{subtitle}</p>}
    </div>
  );
}
