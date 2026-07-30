import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.brandName} — home`}
      className={`flex items-center gap-2 shrink-0 ${className}`}
    >
      {siteConfig.logoImage ? (
        <Image
          src={siteConfig.logoImage}
          alt={siteConfig.brandName}
          width={36}
          height={36}
          className="h-8 w-8 object-contain"
        />
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-tag border border-dashed border-ink/40 dark:border-bone/40 text-[9px] leading-tight text-center eyebrow-tag text-ink/60 dark:text-bone/60">
          {siteConfig.logoPlaceholderText.split(" ")[0]}
        </span>
      )}
      <span className="font-display text-xl sm:text-2xl tracking-tight">
        {siteConfig.brandName}
      </span>
    </Link>
  );
}
