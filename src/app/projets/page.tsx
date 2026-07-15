import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ProjectsPageHeader } from "@/components/ProjectsPageHeader";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Projets — ${profile.name}`,
  description:
    "Portfolio de projets web, mobile et full-stack — sites vitrines, APIs, PWAs et outils IA.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="page-section-xl pt-36 pb-0">
        <div className="page-container">
          <ProjectsPageHeader />
        </div>
      </section>
      <ProjectsGrid />
    </main>
  );
}
