"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="apropos" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="À propos"
          title="Qui je suis"
          subtitle="Développeur full-stack basé à Paris, je crée des expériences web soignées et des produits qui fonctionnent."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {profile.about.map((paragraph, i) => (
            <motion.div
              key={paragraph.slice(0, 24)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-white/10 hover:bg-white/[0.05]"
            >
              <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                {paragraph}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { label: "Repos publics", value: profile.stats.repos },
            { label: "Followers", value: profile.stats.followers },
            { label: "École", value: "Holberton" },
            { label: "Localisation", value: "France" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/5 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 p-5 text-center"
            >
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
