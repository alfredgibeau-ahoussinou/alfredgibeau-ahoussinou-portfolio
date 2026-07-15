"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="competences" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Compétences"
          title="Technologies & outils"
          subtitle="Stack moderne pour construire des applications performantes, scalables et agréables à utiliser."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-violet-300">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.1 + si * 0.04 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="cursor-default rounded-full border border-white/5 bg-gradient-to-r from-white/5 to-white/[0.02] px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-500/30 hover:text-white"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
