"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { EASE_LUXURY } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

function ProjectLiveLink({ slug, children }: { slug: string; children: string }) {
  const project = projects.find((item) => item.slug === slug);

  if (!project?.live) {
    return <>{children}</>;
  }

  return (
    <a
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline text-foreground/90 transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}

function AboutParagraph({ paragraph, index }: { paragraph: string; index: number }) {
  if (index !== 1) {
    return <>{paragraph}</>;
  }

  return (
    <>
      Mes réalisations couvrent le gaming éducatif (
      <ProjectLiveLink slug="jw-games">JW Games</ProjectLiveLink>
      ), le sport mobile (
      <ProjectLiveLink slug="proday">ProDay</ProjectLiveLink>
      ) et la réservation en ligne (
      <ProjectLiveLink slug="xo-hair">XOhair</ProjectLiveLink>
      ).
    </>
  );
}

const stats = [
  { label: "Repos publics", value: profile.stats.repos },
  { label: "Followers", value: profile.stats.followers },
  { label: "Expertise", value: profile.expertise },
  { label: "Depuis", value: profile.stats.since },
];

export function AboutContent() {
  return (
    <div className="flex flex-col justify-center">
      <SectionHeading
        number="01"
        label="À propos"
        title="Qui je suis"
        subtitle="Développeur full-stack spécialisé IA, basé à Paris — je conçois des produits web d'exception."
      />

      <div className="mt-20 space-y-10 sm:mt-24 sm:space-y-12">
        {profile.about.map((paragraph, i) => (
          <motion.p
            key={paragraph.slice(0, 24)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.07,
              ease: EASE_LUXURY,
            }}
            className="text-body"
          >
            <AboutParagraph paragraph={paragraph} index={i} />
          </motion.p>
        ))}
      </div>

      <motion.dl
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.08, ease: EASE_LUXURY }}
        className="mt-24 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-border-subtle pt-20 sm:grid-cols-4 sm:gap-x-12 sm:gap-y-16 sm:pt-24"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-label">{stat.label}</dt>
            <dd className="mt-4 font-serif text-2xl tracking-[-0.02em] text-foreground sm:mt-6 sm:text-3xl lg:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}
