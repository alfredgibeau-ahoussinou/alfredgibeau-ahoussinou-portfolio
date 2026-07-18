"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectImageUrl } from "@/lib/images";
import { EASE_LUXURY } from "@/lib/motion";
import { ProjectLogo } from "./ProjectLogo";

type ProjectCardProps = {
  project: Project;
  index?: number;
  variant?: "grid" | "featured" | "list";
};

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-5">
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
  );
}

export function ProjectCard({
  project,
  index = 0,
  variant = "grid",
}: ProjectCardProps) {
  const imageUrl = getProjectImageUrl(project);
  const featured = variant === "featured";
  const isWide = featured && index === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: EASE_LUXURY,
      }}
      className={featured && isWide ? "md:col-span-2" : ""}
    >
      <Link href={`/projets/${project.slug}`} className="group block">
        <div className="showcase-image-wrap overflow-hidden">
          <ProjectLogo
            src={imageUrl}
            alt={`Logo du projet ${project.title}`}
            className="border-0 bg-surface/50"
            sizes={
              isWide
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 50vw"
            }
            logoScale={project.logoScale}
          />
        </div>

        <div className="mt-6 flex items-start justify-between gap-6 sm:mt-7">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
              <h3
                className={`text-display text-foreground transition-opacity duration-500 group-hover:opacity-80 ${
                  featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                }`}
              >
                {project.title}
              </h3>
            </div>
            <p
              className={`text-body mt-3 sm:mt-4 ${
                featured ? "max-w-xl" : "line-clamp-2"
              }`}
            >
              {project.description}
            </p>
          </div>
          <ArrowUpRight
            size={featured ? 20 : 16}
            strokeWidth={1.5}
            className="mt-1 shrink-0 text-muted/55 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      </Link>
      <ProjectLinks project={project} />
    </motion.article>
  );
}
