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
  sm: "p-8 sm:p-10",
  md: "p-10 sm:p-12",
  lg: "p-12 sm:p-16 md:p-20",
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
      <div className={`absolute inset-0 ${paddingClasses[padding]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-contain"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
