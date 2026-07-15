"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_LUXURY } from "@/lib/motion";

export function ScrollIndicator() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.7, ease: EASE_LUXURY }}
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      aria-hidden="true"
    >
      <span className="text-label origin-center rotate-90 whitespace-nowrap">
        Scroll
      </span>
      <div className="relative h-14 w-px overflow-hidden bg-border-subtle">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: EASE_LUXURY,
          }}
          className="absolute inset-x-0 h-1/2 bg-accent/60"
        />
      </div>
    </motion.div>
  );
}
