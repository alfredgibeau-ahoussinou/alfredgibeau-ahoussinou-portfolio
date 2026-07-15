"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group py-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl text-foreground transition-opacity group-hover:opacity-70 sm:text-2xl">
          {project.title}
        </h3>
        <span className="shrink-0 text-xs tabular-nums text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        {project.description}
      </p>

      <p className="mt-4 text-xs tracking-wide text-muted/70">
        {project.tech.join(" · ")}
      </p>

      <div className="mt-6 flex items-center gap-6 text-sm">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
        >
          GitHub
          <ArrowUpRight size={12} className="opacity-50" />
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
          >
            Site
            <ArrowUpRight size={12} className="opacity-50" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
