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
    <div className="mt-5 flex flex-wrap items-center gap-3">
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-surface"
        >
          Voir le site
          <ArrowUpRight size={14} />
        </a>
      ) : (
        <span className="text-sm text-muted">Pas de déploiement public</span>
      )}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-surface"
      >
        Code
        <ArrowUpRight size={14} />
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

  if (variant === "featured") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        <Link href={`/projets/${project.slug}`} className="group block">
          <ProjectLogo
            src={imageUrl}
            alt={`Logo du projet ${project.title}`}
            className="image-hover transition-colors duration-300 group-hover:border-foreground/20"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl text-foreground transition-opacity group-hover:opacity-70">
                {project.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {project.description}
              </p>
            </div>
            <ArrowUpRight
              size={20}
              className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </Link>
        <ProjectLinks project={project} />
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/projets/${project.slug}`} className="group block">
        <ProjectLogo
          src={imageUrl}
          alt={`Logo du projet ${project.title}`}
          className="image-hover transition-colors duration-300 group-hover:border-foreground/20"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          padding="sm"
        />
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl text-foreground transition-opacity group-hover:opacity-70">
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </Link>
      <ProjectLinks project={project} />
    </motion.article>
  );
}
