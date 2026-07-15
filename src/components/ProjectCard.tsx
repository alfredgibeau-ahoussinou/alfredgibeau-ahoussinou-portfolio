"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative rounded-2xl border border-white/5 bg-[#0c0c16]/80 backdrop-blur-sm transition-colors hover:border-white/10 ${
        project.featured ? "lg:col-span-2" : ""
      }`}
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative flex h-full flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                  <Star size={10} fill="currentColor" />
                  Featured
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <div
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: project.accent, boxShadow: `0 0 12px ${project.accent}80` }}
          />
        </div>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400 sm:text-base">
          {project.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <GithubIcon size={14} />
            Code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${project.accent}cc, ${project.accent}66)`,
              }}
            >
              <ExternalLink size={14} />
              Voir le site
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
