"use client";

import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid() {
  return (
    <section className="page-section border-t border-border-subtle pt-0">
      <div className="page-container">
        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
