import Image from "next/image";
import { profile } from "@/data/profile";

type PortraitFrameProps = {
  priority?: boolean;
  sizes?: string;
  variant?: "hero" | "about";
  className?: string;
};

export function PortraitFrame({
  priority = false,
  sizes = "(max-width: 1024px) 80vw, 35vw",
  variant = "about",
  className = "",
}: PortraitFrameProps) {
  return (
    <div
      className={`portrait-artwork portrait-studio portrait-mask relative aspect-[3/4] overflow-hidden bg-[#0a0908] ${
        variant === "hero" ? "portrait-artwork--hero" : ""
      } ${className}`}
    >
      <Image
        src={profile.avatar}
        alt="Alfred Ahoussinou"
        fill
        priority={priority}
        className="portrait-image object-cover object-[center_16%]"
        sizes={sizes}
      />
      <div className="portrait-vignette absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/8"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_28%_12%,rgb(201_173_120_/_0.06),transparent_42%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-background via-background/75 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
