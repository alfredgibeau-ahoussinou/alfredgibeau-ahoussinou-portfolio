"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section className="page-section border-t border-border-subtle">
      <div className="page-container">
        <SectionHeading
          number="02"
          label="Compétences"
          title="Technologies & outils"
          subtitle="Stack moderne pour construire des applications performantes, scalables et agréables à utiliser."
        />

        <dl className="mt-20 space-y-0">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: gi * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-4 border-t border-border-subtle py-10 first:border-t-0 first:pt-0 lg:grid-cols-[200px_1fr] lg:gap-12"
            >
              <dt className="text-label">{group.category}</dt>
              <dd className="text-base leading-[1.8] text-muted">
                {group.skills.join(" · ")}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
