"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="accueil"
      className="flex min-h-screen items-end px-6 pb-24 pt-32"
    >
      <div className="mx-auto w-full max-w-3xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-xs uppercase tracking-[0.2em] text-muted"
        >
          Disponible pour de nouveaux projets
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-serif text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] tracking-tight text-foreground"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-lg text-muted sm:text-xl"
        >
          {profile.role}
          <span className="mx-2 text-border">—</span>
          {profile.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 max-w-xl text-base leading-relaxed text-muted"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm"
        >
          <a
            href="#projets"
            className="link-underline text-foreground transition-opacity hover:opacity-70"
          >
            Voir les projets
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-muted transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <span className="text-muted">{profile.location}</span>
          <span className="text-muted">{profile.stats.repos} repos</span>
        </motion.div>
      </div>
    </section>
  );
}
