"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";

const stats = [
  { label: "Repos publics", value: profile.stats.repos },
  { label: "Followers", value: profile.stats.followers },
  { label: "École", value: profile.company },
  { label: "Depuis", value: profile.stats.since },
];

export function AboutContent() {
  return (
    <div className="flex flex-col justify-center">
      <SectionHeading
        label="À propos"
        title="Qui je suis"
        subtitle="Développeur full-stack basé à Paris, je crée des expériences web soignées et des produits qui fonctionnent."
      />

      <div className="mt-14 space-y-8">
        {profile.about.map((paragraph, i) => (
          <motion.p
            key={paragraph.slice(0, 24)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-base leading-[1.85] text-muted"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.dl
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-16 grid grid-cols-2 gap-10 border-t border-border pt-14 sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs uppercase tracking-[0.2em] text-muted">
              {stat.label}
            </dt>
            <dd className="mt-3 font-serif text-3xl text-foreground">
              {stat.value}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}
