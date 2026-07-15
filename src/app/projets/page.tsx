import type { Metadata } from "next";
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
      <section className="page-section pt-36 pb-0">
        <div className="page-container">
          <div className="flex items-center gap-4">
            <span className="section-number">01</span>
            <span className="text-label-accent">Portfolio</span>
          </div>
          <h1 className="text-display mt-8 text-[clamp(2.5rem,6vw,4.5rem)] text-foreground">
            Tous les projets
          </h1>
          <div className="line-accent mt-10 max-w-[200px]" />
          <p className="mt-8 max-w-2xl text-base leading-[1.8] text-muted sm:text-[1.0625rem]">
            3 réalisations récentes — applications web, mobile et plateformes
            interactives.
          </p>
        </div>
      </section>
      <ProjectsGrid />
    </main>
  );
}
