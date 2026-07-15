"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="competences" className="border-t border-border px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          label="Compétences"
          title="Technologies & outils"
          subtitle="Stack moderne pour construire des applications performantes, scalables et agréables à utiliser."
        />

        <dl className="mt-16 space-y-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: gi * 0.06 }}
              className="grid gap-4 border-t border-border pt-10 first:border-t-0 first:pt-0"
            >
              <dt className="text-xs uppercase tracking-[0.15em] text-muted">
                {group.category}
              </dt>
              <dd className="text-base leading-relaxed text-muted">
                {group.skills.join(", ")}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
