"use client";

import { motion } from "framer-motion";
import { EASE_LUXURY } from "@/lib/motion";
import { LinkPremium } from "./LinkPremium";
import { SectionHeading } from "./SectionHeading";

export function HomeCTA() {
  return (
    <section className="page-section border-t border-border-subtle">
      <div className="page-container">
        <SectionHeading
          number="03"
          label="Collaboration"
          title="Un projet en tête ?"
          subtitle="Discutons de votre vision — produit web, intégration IA ou mission technique."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_LUXURY }}
          className="mt-20 flex justify-center lg:mt-24"
        >
          <LinkPremium href="/contact">Me contacter</LinkPremium>
        </motion.div>
      </div>
    </section>
  );
}
