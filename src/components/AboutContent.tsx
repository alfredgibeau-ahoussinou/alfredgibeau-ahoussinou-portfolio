"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { EASE_LUXURY } from "@/lib/motion";
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

      <div className="mt-20 space-y-10">
        {profile.about.map((paragraph, i) => (
          <motion.p
            key={paragraph.slice(0, 24)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.75,
              delay: i * 0.08,
              ease: EASE_LUXURY,
            }}
            className="text-[0.9375rem] leading-[1.9] text-muted"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.dl
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.1, ease: EASE_LUXURY }}
        className="mt-24 grid grid-cols-2 gap-x-10 gap-y-14 border-t border-border-subtle pt-20 sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-label">{stat.label}</dt>
            <dd className="mt-5 font-serif text-3xl tracking-[-0.02em] text-foreground sm:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}
