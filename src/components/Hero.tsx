"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { getAvatarUrl } from "@/lib/images";

export function Hero() {
  const nameParts = profile.name.split(" ");
  const firstName = nameParts.slice(0, 2).join(" ");
  const lastName = nameParts.slice(2).join(" ");

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgb(196_165_116_/_0.04),transparent_60%)]" />

      <div className="page-container relative grid min-h-screen items-end gap-16 pb-24 pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20 lg:pb-32 lg:pt-44">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-center gap-6"
          >
            <span className="section-number">01</span>
            <div className="line-accent flex-1 max-w-[120px]" />
            <span className="text-label-accent">{profile.subtitle}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-display text-[clamp(3rem,8.5vw,6.5rem)] text-foreground"
          >
            {firstName}
            <br />
            <span className="text-muted/90">{lastName}</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px w-full max-w-md origin-left bg-border"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 font-serif text-xl tracking-tight text-foreground/90 sm:text-2xl"
          >
            {profile.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 max-w-lg text-base leading-[1.8] text-muted sm:text-[1.0625rem]"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <Link href="/projets" className="btn-ghost">
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
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <div className="portrait-frame relative mx-auto aspect-[4/5] max-w-md overflow-hidden bg-surface lg:max-w-none">
            <Image
              src={getAvatarUrl(800)}
              alt={`Portrait de ${profile.name}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 38vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-border-subtle pt-6">
            <span className="text-label">{profile.location}</span>
            <span className="font-mono text-[0.625rem] tracking-wider text-muted/60">
              {profile.stats.repos} repos · Holberton
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
