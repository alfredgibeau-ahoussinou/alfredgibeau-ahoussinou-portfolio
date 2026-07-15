"use client";

import { projects } from "@/data/projects";
import { ProjectShowcase } from "./ProjectShowcase";

export function ProjectsGrid() {
  return (
    <section className="page-section-xl border-t border-border-subtle pt-0 pb-8">
      <div className="page-container">
        <ProjectShowcase projects={projects} showLinks />
      </div>
    </section>
  );
}
