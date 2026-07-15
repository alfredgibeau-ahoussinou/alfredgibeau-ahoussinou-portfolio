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
  const projectIndex = projects.findIndex((p) => p.slug === slug) + 1;

  return (
    <main>
      <section className="pt-32">
        <div className="page-container">
          <Link
            href="/projets"
            className="link-underline inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Retour aux projets
          </Link>
        </div>

        <div className="page-container mt-16 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">
          <div className="card-premium overflow-hidden lg:sticky lg:top-32">
            <ProjectLogo
              src={imageUrl}
              alt={`Logo du projet ${project.title}`}
              className="border-0"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              padding="lg"
            />
          </div>

          <div className="page-section py-0 pt-4 lg:pt-0">
            <div className="flex items-center gap-4">
              <span className="section-number">
                {String(projectIndex).padStart(2, "0")}
              </span>
              <span className="text-label-accent">Projet</span>
            </div>

            <h1 className="text-display mt-8 text-[clamp(2.5rem,5vw,4rem)] text-foreground">
              {project.title}
            </h1>

            <div className="line-accent mt-10 max-w-[160px]" />

            <p className="mt-10 text-lg leading-[1.85] text-muted sm:text-xl">
              {project.description}
            </p>

            <div className="mt-16 border-t border-border-subtle pt-14">
              <p className="text-label">Stack technique</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="border border-border-subtle px-4 py-2 font-mono text-[0.75rem] tracking-wide text-foreground/80"
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
                  className="btn-ghost"
                >
                  Voir le site
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted/70">
                  Pas de déploiement public
                </span>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                Code
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
