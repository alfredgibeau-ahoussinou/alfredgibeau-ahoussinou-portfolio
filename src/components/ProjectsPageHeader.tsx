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
        transition={{ duration: 0.65, ease: EASE_LUXURY }}
        className="flex items-center gap-4 sm:gap-5"
      >
        <span className="section-number">01</span>
        <span className="text-label-accent">Portfolio</span>
      </motion.div>

      <TextReveal
        as="h1"
        text="Tous les projets"
        className="text-display mt-8 text-[clamp(2.25rem,6vw,5rem)] text-foreground sm:mt-10"
        delay={0.12}
      />

      <ScrollLine className="mt-10 max-w-[160px] sm:mt-12" />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.35, ease: EASE_LUXURY }}
        className="text-body mt-8 max-w-2xl sm:mt-10"
      >
        Une sélection de produits web et mobile — conçus avec rigueur,
        présentés comme une galerie.
      </motion.p>
    </>
  );
}
