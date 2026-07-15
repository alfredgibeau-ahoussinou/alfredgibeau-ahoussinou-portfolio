"use client";

import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projets" className="border-t border-border px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          label="Portfolio"
          title="Projets récents"
          subtitle="Une sélection de sites, applications et outils que j'ai conçus et développés — du front au back."
        />

        <div className="mt-16 divide-y divide-border">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
