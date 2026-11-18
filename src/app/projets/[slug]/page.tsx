import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialPortfolio } from "@/components/EditorialPortfolio";
import { getProjectBySlug, projects } from "@/data/projects";
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
    title: `${project.title} | ${profile.name}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.gallery[0] }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <EditorialPortfolio initialMode="case-study" initialSlug={slug} />;
}
