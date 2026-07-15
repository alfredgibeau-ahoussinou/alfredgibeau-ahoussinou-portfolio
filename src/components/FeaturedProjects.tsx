"use client";

import { motion } from "framer-motion";
import { getFeaturedProjects } from "@/data/projects";
import { EASE_LUXURY } from "@/lib/motion";
import { LinkPremium } from "./LinkPremium";
import { ProjectShowcase } from "./ProjectShowcase";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="page-section-xl section-fade-top border-t border-border-subtle">
      <div className="page-container">
        <SectionHeading
          number="02"
          label="Sélection"
          title="Projets en vedette"
          subtitle="Quatre réalisations — ingénierie web, mobile et intelligence artificielle au service du produit."
        />

        <div className="mt-24 sm:mt-32 lg:mt-40">
          <ProjectShowcase projects={featured} showLinks={false} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_LUXURY }}
          className="mt-28 flex justify-center sm:mt-36 lg:mt-44"
        >
          <LinkPremium href="/projets">Voir tous les projets</LinkPremium>
        </motion.div>
      </div>
    </section>
  );
}
