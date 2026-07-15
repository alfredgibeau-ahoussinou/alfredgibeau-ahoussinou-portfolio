"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
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
        !!target.closest("a, button, [role='button'], input, textarea, select")
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
      className="pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hovering ? 2.2 : 1,
      }}
      transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.25 } }}
    >
      <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
    </motion.div>
  );
}
