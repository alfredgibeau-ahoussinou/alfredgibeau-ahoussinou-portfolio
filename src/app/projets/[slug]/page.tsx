import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailContent } from "@/components/ProjectDetailContent";
import { getProjectBySlug, projects } from "@/data/projects";
import { getProjectImageUrl } from "@/lib/images";
import { profile } from "@/data/profile";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };

  return {
    title: `${project.title} — ${profile.name}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: getProjectImageUrl(project) }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projectIndex = projects.findIndex((p) => p.slug === slug) + 1;

  return (
    <main>
      <ProjectDetailContent project={project} projectIndex={projectIndex} />
    </main>
  );
}
