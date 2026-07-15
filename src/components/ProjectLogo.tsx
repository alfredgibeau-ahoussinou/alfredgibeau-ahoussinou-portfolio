import Image from "next/image";

type ProjectLogoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  padding?: "sm" | "md" | "lg";
};

const paddingClasses = {
  sm: "p-6 sm:p-8",
  md: "p-8 sm:p-10",
  lg: "p-10 sm:p-14 md:p-16",
} as const;

export function ProjectLogo({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  padding = "md",
}: ProjectLogoProps) {
  return (
    <div
      className={`relative aspect-square overflow-hidden border border-border/40 bg-surface ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-contain ${paddingClasses[padding]}`}
        sizes={sizes}
      />
    </div>
  );
}
