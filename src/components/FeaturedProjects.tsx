"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProjects } from "@/data/projects";
import { EASE_LUXURY } from "@/lib/motion";
import { LinkPremium } from "./LinkPremium";
import { ProjectShowcase } from "./ProjectShowcase";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="page-section-xl border-t border-border-subtle">
      <div className="page-container">
        <SectionHeading
          number="02"
          label="Sélection"
          title="Projets en vedette"
          subtitle="Trois réalisations — ingénierie web, mobile et intelligence artificielle au service du produit."
        />

        <div className="mt-28 lg:mt-36">
          <ProjectShowcase projects={featured} showLinks={false} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_LUXURY }}
          className="mt-32 flex justify-center lg:mt-44"
        >
          <LinkPremium href="/projets">Voir tous les projets</LinkPremium>
        </motion.div>
      </div>
    </section>
  );
}
