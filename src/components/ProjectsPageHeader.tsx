"use client";

import { motion } from "framer-motion";
import { EASE_LUXURY } from "@/lib/motion";
import { ScrollLine } from "./ScrollLine";
import { TextReveal } from "./TextReveal";

export function ProjectsPageHeader() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_LUXURY }}
        className="flex items-center gap-5"
      >
        <span className="section-number">01</span>
        <span className="text-label-accent">Portfolio</span>
      </motion.div>

      <TextReveal
        as="h1"
        text="Tous les projets"
        className="text-display mt-10 text-[clamp(2.75rem,7vw,5.5rem)] text-foreground"
        delay={0.15}
      />

      <ScrollLine className="mt-12 max-w-[200px]" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_LUXURY }}
        className="mt-10 max-w-2xl text-[0.9375rem] leading-[1.9] text-muted"
      >
        Une sélection de produits web et mobile — conçus avec rigueur,
        présentés comme une galerie.
      </motion.p>
    </>
  );
}
