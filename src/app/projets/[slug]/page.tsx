import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectLogo } from "@/components/ProjectLogo";
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

  const imageUrl = getProjectImageUrl(project);

  return (
    <main>
      <section className="pt-28">
        <div className="page-container">
          <Link
            href="/projets"
            className="link-underline inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Retour aux projets
          </Link>
        </div>

        <div className="page-container mt-10">
          <ProjectLogo
            src={imageUrl}
            alt={`Logo du projet ${project.title}`}
            className="mx-auto max-w-sm sm:max-w-md"
            sizes="(max-width: 768px) 100vw, 28rem"
            priority
            padding="lg"
          />
        </div>

        <div className="page-container page-section pt-16">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Projet
          </p>
          <h1 className="mt-6 font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-[1.85] text-muted">
            {project.description}
          </p>

          <div className="mt-14 border-t border-border pt-14">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Stack technique
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="border border-border px-4 py-2 text-sm text-foreground/80"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-surface"
              >
                Voir le site
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span className="text-sm text-muted">Pas de déploiement public</span>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-surface"
            >
              Code
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
