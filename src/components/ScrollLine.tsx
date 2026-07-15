"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ScrollLineProps = {
  className?: string;
  direction?: "horizontal" | "vertical";
};

export function ScrollLine({
  className = "",
  direction = "horizontal",
}: ScrollLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.div
        style={
          direction === "horizontal"
            ? { scaleX: scale, originX: 0 }
            : { scaleY: scale, originY: 0 }
        }
        className={
          direction === "horizontal"
            ? "h-px w-full bg-gradient-to-r from-accent/50 via-border to-transparent"
            : "h-full w-px bg-gradient-to-b from-accent/50 via-border to-transparent"
        }
      />
    </div>
  );
}
