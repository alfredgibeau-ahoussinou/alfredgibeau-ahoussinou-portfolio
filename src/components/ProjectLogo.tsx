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
  sm: "inset-[20%]",
  md: "inset-[18%]",
  lg: "inset-[16%]",
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
      className={`relative aspect-[4/3] overflow-hidden border border-border-subtle bg-surface/80 ${className}`}
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
