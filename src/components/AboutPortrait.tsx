"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { getAvatarUrl } from "@/lib/images";

export function AboutPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="portrait-artwork portrait-mask relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden bg-surface lg:mx-0 lg:max-w-none lg:sticky lg:top-36 lg:self-start"
    >
      <Image
        src={getAvatarUrl(1000)}
        alt={`Portrait de ${profile.name}`}
        fill
        priority
        className="object-cover object-top mix-blend-luminosity"
        sizes="(max-width: 1024px) 80vw, 35vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </motion.div>
  );
}
