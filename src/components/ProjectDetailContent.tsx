"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
  const imageUrl = getProjectImageUrl(project);
  const num = String(projectIndex).padStart(2, "0");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  return (
    <section ref={containerRef} className="relative pt-32 pb-32">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE_LUXURY }}
        >
          <Link
            href="/projets"
            className="link-underline inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Retour aux projets
          </Link>
        </motion.div>
      </div>

      <div className="page-container relative mt-20">
        <span
          className="section-number-outline absolute -top-8 right-0 hidden lg:block"
          aria-hidden="true"
        >
          {num}
        </span>

        <div className="grid gap-20 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
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

          <div className="lg:pt-8">
            <div className="sticky top-32 z-10 pb-8 lg:static lg:top-auto">
              <div className="flex items-center gap-4">
                <span className="section-number">{num}</span>
                <span className="text-label-accent">Projet</span>
              </div>

              <motion.div style={{ opacity: titleOpacity }}>
                <TextReveal
                  as="h1"
                  text={project.title}
                  className="text-display mt-8 text-[clamp(2.75rem,6vw,5rem)] text-foreground"
                  delay={0.1}
                />
              </motion.div>

              <ScrollLine className="mt-10 max-w-[180px]" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE_LUXURY }}
              className="mt-12 text-lg leading-[1.9] text-muted sm:text-xl"
            >
              {project.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_LUXURY }}
              className="mt-20 border-t border-border-subtle pt-16"
            >
              <p className="text-label">Stack technique</p>
              <ul className="mt-8 flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <li key={tech} className="tech-pill">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_LUXURY }}
              className="mt-16 flex flex-wrap items-center gap-5"
            >
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-minimal"
                >
                  Voir le site
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span className="text-label text-muted/60">
                  Pas de déploiement public
                </span>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                Code source
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
