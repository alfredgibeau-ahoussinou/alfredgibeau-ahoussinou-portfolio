"use client";

import { motion } from "framer-motion";

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
        transition={{ duration: 0.5 }}
        className={`mb-6 flex items-center gap-4 ${centered ? "justify-center" : ""}`}
      >
        {number && <span className="section-number">{number}</span>}
        <span className="text-label">{label}</span>
        {!centered && <div className="line-accent hidden flex-1 max-w-[80px] sm:block" />}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className={`text-display text-[clamp(2rem,5vw,3.25rem)] text-foreground ${centered ? "mx-auto" : ""}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mt-5 max-w-xl text-base leading-[1.75] text-muted sm:text-[1.0625rem] ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
