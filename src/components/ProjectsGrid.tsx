"use client";

import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid() {
  return (
    <section className="page-section border-t border-border pt-0">
      <div className="page-container">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
