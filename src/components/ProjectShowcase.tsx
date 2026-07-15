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

type ProjectShowcaseProps = {
  projects: Project[];
  showLinks?: boolean;
};

function ShowcaseItem({
  project,
  index,
  showLinks,
}: {
  project: Project;
  index: number;
  showLinks: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const reversed = index % 2 === 1;
  const imageUrl = getProjectImageUrl(project);
  const num = String(index + 1).padStart(2, "0");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ["0%", "0%"] : ["5%", "-5%"],
  );

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE_LUXURY }}
      className="showcase-item relative"
    >
      <span
        className={`section-number-outline absolute top-0 ${
          reversed ? "right-0 lg:right-8" : "left-0 lg:left-8"
        } -z-10 select-none`}
        aria-hidden="true"
      >
        {num}
      </span>

      <div
        className={`grid items-center gap-16 lg:grid-cols-2 lg:gap-24 xl:gap-36 ${
          reversed ? "lg:[direction:rtl]" : ""
        }`}
      >
        <Link
          href={`/projets/${project.slug}`}
          className={`group block ${reversed ? "lg:[direction:ltr]" : ""}`}
        >
          <motion.div style={{ y: imageY }} className="showcase-image-wrap">
            <ProjectLogo
              src={imageUrl}
              alt={`Logo du projet ${project.title}`}
              className="border-0 bg-transparent"
              sizes="(max-width: 1024px) 100vw, 45vw"
              padding="lg"
            />
          </motion.div>
        </Link>

        <div className={`${reversed ? "lg:[direction:ltr]" : ""}`}>
          <div className="flex items-center gap-4">
            <span className="section-number">{num}</span>
            <ScrollLine className="hidden max-w-[60px] flex-1 sm:block" />
          </div>

          <Link href={`/projets/${project.slug}`} className="group mt-8 block">
            <h3 className="text-display text-[clamp(2.125rem,5.5vw,4.25rem)] text-foreground transition-opacity duration-500 group-hover:opacity-75">
              {project.title}
            </h3>
            <div className="showcase-hover-line mt-6 h-px w-full max-w-xs bg-accent/50" />
            <p className="showcase-desc text-base leading-[1.85] text-muted">
              {project.description}
            </p>
            <p className="mt-6 line-clamp-2 text-sm leading-[1.8] text-muted/80 lg:hidden">
              {project.description}
            </p>
          </Link>

          <p className="mt-6 hidden font-mono text-[0.625rem] tracking-wider text-muted/50 lg:block">
            {project.tech.slice(0, 4).join(" · ")}
          </p>

          {showLinks && (
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-minimal"
                >
                  Voir le site
                  <ArrowUpRight size={13} />
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
                className="link-underline inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                Code
                <ArrowUpRight size={13} />
              </a>
            </div>
          )}

          <Link
            href={`/projets/${project.slug}`}
            className="link-underline mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Détails du projet
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectShowcase({
  projects,
  showLinks = true,
}: ProjectShowcaseProps) {
  return (
    <div className="space-y-36 lg:space-y-52">
      {projects.map((project, index) => (
        <ShowcaseItem
          key={project.id}
          project={project}
          index={index}
          showLinks={showLinks}
        />
      ))}
    </div>
  );
}
