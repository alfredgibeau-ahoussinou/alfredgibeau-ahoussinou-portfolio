"use client";

import Image from "next/image";
import { useState } from "react";
import type { LogoScale } from "@/data/projects";

type ProjectLogoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  logoScale?: LogoScale;
};

const DEFAULT_SCALE: Required<LogoScale> = {
  maxWidth: 82,
  maxHeight: 72,
};

function isSvgSrc(src: string): boolean {
  return /\.svg($|\?)/i.test(src);
}

function resolveScale(logoScale?: LogoScale): Required<LogoScale> {
  return { ...DEFAULT_SCALE, ...logoScale };
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
  logoScale,
}: ProjectLogoProps) {
  const [failed, setFailed] = useState(false);
  const svg = isSvgSrc(src);
  const { maxWidth, maxHeight } = resolveScale(logoScale);
  const imageStyle = {
    maxWidth: `${maxWidth}%`,
    maxHeight: `${maxHeight}%`,
  } as const;
  const imageClass =
    "h-auto w-auto shrink-0 object-contain object-center [object-position:center_center]";

  return (
    <div
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-border-subtle bg-surface/80 ${className}`}
    >
      {failed ? (
        <LogoFallback alt={alt} />
      ) : svg ? (
        // next/image refuse l'optimisation SVG (400 sur Vercel) — img natif requis
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={imageClass}
          style={imageStyle}
          onError={() => setFailed(true)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes={sizes}
          priority={priority}
          className={imageClass}
          style={{ ...imageStyle, width: "auto", height: "auto" }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
