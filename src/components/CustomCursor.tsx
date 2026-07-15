"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { EASE_LUXURY } from "@/lib/motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.35 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (coarse || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [role='button'], input, textarea, select"),
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[10000] hidden md:block"
      style={{ x: springX, y: springY }}
      animate={{
        opacity: visible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.2, ease: EASE_LUXURY } }}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          width: hovering ? 40 : 24,
          height: hovering ? 40 : 24,
        }}
        transition={{ duration: 0.3, ease: EASE_LUXURY }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/20"
      />
      <div className="absolute left-1/2 top-1/2 h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/80" />
    </motion.div>
  );
}
