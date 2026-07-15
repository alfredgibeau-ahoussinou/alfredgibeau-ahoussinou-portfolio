import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Projets — ${profile.name}`,
  description:
    "Portfolio de projets web, mobile et full-stack — sites vitrines, APIs, PWAs et outils IA.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="page-section pt-32">
        <div className="page-container">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Portfolio
          </p>
          <h1 className="mt-6 font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
            Tous les projets
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.8] text-muted">
            {projects.length} réalisations — du front au back, des sites vitrines
            aux plateformes interactives et outils IA.
          </p>
        </div>
      </section>
      <ProjectsGrid />
    </main>
  );
}
