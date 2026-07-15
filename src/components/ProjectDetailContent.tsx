"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { getProjectImageUrl } from "@/lib/images";
import { EASE_LUXURY } from "@/lib/motion";
import { ProjectLogo } from "./ProjectLogo";
import { ScrollLine } from "./ScrollLine";
import { TextReveal } from "./TextReveal";

type ProjectDetailContentProps = {
  project: Project;
  projectIndex: number;
};

export function ProjectDetailContent({
  project,
  projectIndex,
}: ProjectDetailContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const imageUrl = getProjectImageUrl(project);
  const num = String(projectIndex).padStart(2, "0");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ["0%", "0%"] : ["0%", "10%"],
  );

  return (
    <section ref={containerRef} className="page-section-xl pt-36">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: EASE_LUXURY }}
        >
          <Link
            href="/projets"
            className="btn-link-action link-underline inline-flex"
          >
            <ArrowUpRight size={14} strokeWidth={1.5} className="-rotate-90" />
            Retour aux projets
          </Link>
        </motion.div>
      </div>

      <div className="page-container relative mt-16 sm:mt-20">
        <span
          className="section-number-outline absolute -top-4 right-0 hidden select-none lg:block"
          aria-hidden="true"
        >
          {num}
        </span>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20 xl:gap-24">
          <motion.div
            style={{ y: imageY }}
            className="showcase-image-wrap lg:sticky lg:top-36 lg:self-start"
          >
            <ProjectLogo
              src={imageUrl}
              alt={`Logo du projet ${project.title}`}
              className="border-0 bg-transparent"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
              padding="lg"
            />
          </motion.div>

          <div>
            <div className="flex items-center gap-4">
              <span className="section-number">{num}</span>
              <ScrollLine className="max-w-[56px] flex-1" />
              <span className="text-label-accent">Projet</span>
            </div>

            <TextReveal
              as="h1"
              text={project.title}
              className="text-display mt-6 text-[clamp(2.25rem,5.5vw,4.75rem)] text-foreground sm:mt-8"
              delay={0.1}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: EASE_LUXURY }}
              className="text-body mt-10 max-w-2xl sm:text-lg"
            >
              {project.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE_LUXURY }}
              className="mt-16 border-t border-border-subtle pt-12 sm:mt-20 sm:pt-16"
            >
              <p className="text-label">Stack technique</p>
              <ul className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
                {project.tech.map((tech) => (
                  <li key={tech} className="tech-pill">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12, ease: EASE_LUXURY }}
              className="mt-12 flex flex-wrap items-center gap-5 sm:mt-16 sm:gap-6"
            >
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-minimal"
                >
                  Voir le site
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </a>
              ) : (
                <span className="text-label text-muted/65">
                  Pas de déploiement public
                </span>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link-action link-underline"
              >
                Code source
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
