"use client";

import { SmoothScroll } from "./SmoothScroll";
import { Preloader } from "./Preloader";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SmoothScroll>
      <Preloader />
      {children}
    </SmoothScroll>
  );
}
