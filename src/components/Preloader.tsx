"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_LUXURY, prefersReducedMotion } from "@/lib/motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 580);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_LUXURY }}
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4, ease: EASE_LUXURY }}
            className="text-center"
          >
            <p className="font-serif text-2xl tracking-[-0.03em] text-foreground sm:text-[1.75rem]">
              Alfred
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE_LUXURY }}
              className="mx-auto mt-3 h-px w-10 origin-center bg-accent/55"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
