"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { getAvatarUrl } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative min-h-screen">
      <div className="page-container grid min-h-screen items-end gap-12 pb-20 pt-32 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-28 lg:pt-40">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xs uppercase tracking-[0.25em] text-accent"
          >
            Portfolio — {profile.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] tracking-tight text-foreground"
          >
            {profile.name.split(" ").slice(0, 2).join(" ")}
            <br />
            <span className="text-muted">
              {profile.name.split(" ").slice(2).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 text-lg text-muted sm:text-xl"
          >
            {profile.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 max-w-lg text-base leading-[1.8] text-muted"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <Link
              href="/projets"
              className="link-underline text-sm tracking-wide text-foreground transition-opacity hover:opacity-70"
            >
              Explorer les projets
            </Link>
            <Link
              href="/a-propos"
              className="link-underline text-sm tracking-wide text-muted transition-colors hover:text-foreground"
            >
              Mon parcours
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm tracking-wide text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden bg-surface lg:max-w-none">
            <Image
              src={getAvatarUrl(800)}
              alt={`Portrait de ${profile.name}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
          <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
            <span>{profile.location}</span>
            <span>{profile.stats.repos} projets open source</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
