"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectLogoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  padding?: "sm" | "md" | "lg";
};

const paddingClasses = {
  sm: "inset-[22%]",
  md: "inset-[18%]",
  lg: "inset-[15%]",
} as const;

function isSvgSrc(src: string): boolean {
  return /\.svg($|\?)/i.test(src);
}

function LogoFallback({ alt }: { alt: string }) {
  const label = alt.replace(/^Logo du projet\s+/i, "").trim();
  const initials = label
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-full w-full items-center justify-center px-4 text-center">
      <span className="font-mono text-xs tracking-[0.2em] text-muted/70 sm:text-sm">
        {initials || label.slice(0, 12) || "—"}
      </span>
    </div>
  );
}

export function ProjectLogo({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  padding = "md",
}: ProjectLogoProps) {
  const [failed, setFailed] = useState(false);
  const svg = isSvgSrc(src);

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden border border-border-subtle bg-surface/80 ${className}`}
    >
      <div className={`absolute ${paddingClasses[padding]} relative`}>
        {failed ? (
          <LogoFallback alt={alt} />
        ) : svg ? (
          // next/image refuse l'optimisation SVG (400 sur Vercel) — img natif requis
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-contain object-center"
            onError={() => setFailed(true)}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-contain object-center"
            sizes={sizes}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
