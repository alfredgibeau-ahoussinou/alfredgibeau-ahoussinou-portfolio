"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

type LinkPremiumProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  showArrow?: boolean;
  className?: string;
};

export function LinkPremium({
  href,
  children,
  external = false,
  showArrow = true,
  className = "",
}: LinkPremiumProps) {
  const content = (
    <span className={`cta-premium group ${className}`}>
      <span className="link-center-underline">{children}</span>
      {showArrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1.5"
          aria-hidden="true"
        />
      )}
    </span>
  );

  if (external) {
    return (
      <Magnetic strength={0.2}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={0.2}>
      <Link href={href}>{content}</Link>
    </Magnetic>
  );
}
