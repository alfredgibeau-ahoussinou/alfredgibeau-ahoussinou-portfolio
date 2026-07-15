"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: reduced ? 1 : 0.1,
        duration: reduced ? 0 : 1,
        smoothWheel: !reduced,
        touchMultiplier: reduced ? 1 : 1,
        wheelMultiplier: reduced ? 1 : 0.9,
      }}
    >
      {children}
    </ReactLenis>
  );
}
