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
    reducedMotion ? ["0%", "0%"] : ["4%", "-4%"],
  );

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: EASE_LUXURY }}
      className="showcase-item relative pt-8 sm:pt-12"
    >
      <span
        className={`section-number-outline absolute top-0 ${
          reversed ? "right-0 lg:right-4" : "left-0 lg:left-4"
        } -z-10 select-none`}
        aria-hidden="true"
      >
        {num}
      </span>

      <div
        className={`grid items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28 ${
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
              logoScale={project.logoScale}
            />
          </motion.div>
        </Link>

        <div className={`${reversed ? "lg:[direction:ltr]" : ""}`}>
          <div className="flex items-center gap-4">
            <span className="section-number">{num}</span>
            <ScrollLine className="hidden max-w-[56px] flex-1 sm:block" />
          </div>

          <Link href={`/projets/${project.slug}`} className="group mt-6 block sm:mt-8">
            <h3 className="text-display text-[clamp(2rem,5vw,4rem)] text-foreground transition-opacity duration-500 group-hover:opacity-80">
              {project.title}
            </h3>
            <div className="showcase-hover-line mt-5 h-px w-full max-w-xs bg-accent/45" />
            <p className="showcase-desc text-body">{project.description}</p>
            <p className="text-body mt-5 line-clamp-3 lg:hidden">{project.description}</p>
          </Link>

          <p className="mt-5 hidden font-mono text-[0.625rem] tracking-[0.12em] text-muted/55 lg:block">
            {project.tech.slice(0, 4).join(" · ")}
          </p>

          {showLinks ? (
            <div className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10 sm:gap-6">
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
                Code
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          ) : (
            <Link
              href={`/projets/${project.slug}`}
              className="btn-link-action link-underline mt-8 inline-flex sm:mt-10"
            >
              Détails du projet
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          )}
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
    <div className="space-y-32 lg:space-y-44">
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
