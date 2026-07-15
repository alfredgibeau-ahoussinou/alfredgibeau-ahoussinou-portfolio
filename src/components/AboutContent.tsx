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
        number="01"
        label="À propos"
        title="Qui je suis"
        subtitle="Développeur full-stack basé à Paris, je crée des expériences web soignées et des produits qui fonctionnent."
      />

      <div className="mt-16 space-y-8">
        {profile.about.map((paragraph, i) => (
          <motion.p
            key={paragraph.slice(0, 24)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-base leading-[1.8] text-muted sm:text-[1.0625rem]"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.dl
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-border-subtle pt-16 sm:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <div key={stat.label}>
            <dt className="text-label">{stat.label}</dt>
            <dd className="mt-4 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}
