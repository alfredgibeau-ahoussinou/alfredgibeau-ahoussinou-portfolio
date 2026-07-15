"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="page-section border-t border-border-subtle">
      <div className="page-container">
        <SectionHeading
          number="02"
          label="Sélection"
          title="Projets en vedette"
          subtitle="3 réalisations récentes — applications web, mobile et plateformes full-stack."
        />

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-x-12 md:gap-y-20 lg:gap-x-16">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              variant="featured"
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 flex justify-center"
        >
          <Link href="/projets" className="link-premium text-sm tracking-wide text-muted hover:text-foreground">
            Voir tous les projets
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
