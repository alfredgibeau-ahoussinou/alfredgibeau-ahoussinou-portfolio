"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortraitFrame } from "./PortraitFrame";

export function AboutPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ["0%", "0%"] : ["8%", "-8%"],
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="lg:sticky lg:top-36 lg:self-start"
    >
      <PortraitFrame
        priority
        variant="about"
        sizes="(max-width: 1024px) 85vw, 38vw"
        className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
      />
      <p className="mt-10 hidden font-mono text-[0.5625rem] tracking-[0.22em] text-muted/40 uppercase lg:block">
        Portrait · Atelier
      </p>
    </motion.div>
  );
}
