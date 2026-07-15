"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectImageUrl } from "@/lib/images";
import { ProjectLogo } from "./ProjectLogo";

type ProjectCardProps = {
  project: Project;
  index?: number;
  variant?: "grid" | "featured" | "list";
};

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-[0.8125rem]"
        >
          Voir le site
          <ArrowUpRight size={13} />
        </a>
      ) : (
        <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted/70">
          Pas de déploiement public
        </span>
      )}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline inline-flex items-center gap-1.5 text-[0.8125rem] text-muted transition-colors hover:text-foreground"
      >
        Code
        <ArrowUpRight size={13} />
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={featured && isWide ? "md:col-span-2" : ""}
    >
      <Link href={`/projets/${project.slug}`} className="group block">
        <div className="card-premium overflow-hidden">
          <ProjectLogo
            src={imageUrl}
            alt={`Logo du projet ${project.title}`}
            className="image-hover border-0 bg-surface/50"
            sizes={
              isWide
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 50vw"
            }
            padding={featured ? "lg" : "md"}
          />
        </div>

        <div className="mt-7 flex items-start justify-between gap-6">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[0.625rem] tracking-wider text-muted/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={`text-display text-foreground transition-opacity duration-300 group-hover:opacity-75 ${
                  featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                }`}
              >
                {project.title}
              </h3>
            </div>
            <p
              className={`mt-4 leading-[1.75] text-muted ${
                featured ? "max-w-xl text-base" : "line-clamp-2 text-sm"
              }`}
            >
              {project.description}
            </p>
          </div>
          <ArrowUpRight
            size={featured ? 22 : 18}
            className="mt-1 shrink-0 text-muted/60 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      </Link>
      <ProjectLinks project={project} />
    </motion.article>
  );
}
