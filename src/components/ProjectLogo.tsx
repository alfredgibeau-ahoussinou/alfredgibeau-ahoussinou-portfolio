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
  sm: "inset-[18%]",
  md: "inset-[20%]",
  lg: "inset-[22%]",
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
      <div className={`absolute ${paddingClasses[padding]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-contain object-center"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
