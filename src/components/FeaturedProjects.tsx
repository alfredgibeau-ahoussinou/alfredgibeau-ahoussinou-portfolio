"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="page-section border-t border-border">
      <div className="page-container">
        <SectionHeading
          label="Sélection"
          title="Projets en vedette"
          subtitle="Une sélection de réalisations récentes — applications web, mobile et plateformes full-stack."
        />

        <div className="mt-20 grid gap-16 md:grid-cols-2">
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
          className="mt-20 text-center"
        >
          <Link
            href="/projets"
            className="link-underline text-sm tracking-wide text-muted transition-colors hover:text-foreground"
          >
            Voir tous les projets →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
