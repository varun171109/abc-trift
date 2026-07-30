import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-px py-24 text-center">
      <p className="eyebrow-tag text-xs text-clay mb-2">Lot Not Found</p>
      <h1 className="font-display text-5xl mb-4">404</h1>
      <p className="text-ink/55 dark:text-bone/55 mb-8">This piece must have already been rehomed.</p>
      <Link href="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
