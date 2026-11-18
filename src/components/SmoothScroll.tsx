"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type SmoothScrollProps = {
  children: React.ReactNode;
};

const subscribe = () => () => {};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => prefersReducedMotion(),
    () => true,
  );

  return (
    <ReactLenis
      root
      options={{
        lerp: reduced ? 1 : 0.1,
        duration: reduced ? 0 : 1,
        smoothWheel: !reduced,
        touchMultiplier: 1,
        wheelMultiplier: reduced ? 1 : 0.9,
      }}
    >
      {children}
    </ReactLenis>
  );
}
