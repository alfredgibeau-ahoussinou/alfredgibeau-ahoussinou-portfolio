"use client";

import { motion } from "framer-motion";
import { EASE_LUXURY } from "@/lib/motion";
import { ScrollLine } from "./ScrollLine";

type SectionHeadingProps = {
  label: string;
  title: string;
  subtitle?: string;
  number?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  subtitle,
  number,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : ""}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: EASE_LUXURY }}
        className={`mb-6 flex items-center gap-4 sm:mb-8 sm:gap-5 ${centered ? "justify-center" : ""}`}
      >
        {number && <span className="section-number">{number}</span>}
        <span className="text-label">{label}</span>
        {!centered && (
          <ScrollLine className="hidden max-w-[72px] flex-1 sm:block" />
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.04, ease: EASE_LUXURY }}
        className={`text-display text-[clamp(2.25rem,5.5vw,4.25rem)] text-foreground ${centered ? "mx-auto max-w-3xl" : "max-w-4xl"}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.08, ease: EASE_LUXURY }}
          className={`text-body mt-6 max-w-xl sm:mt-8 ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
