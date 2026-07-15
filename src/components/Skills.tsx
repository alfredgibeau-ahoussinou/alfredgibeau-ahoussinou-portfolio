"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/profile";
import { EASE_LUXURY } from "@/lib/motion";
import { ScrollLine } from "./ScrollLine";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section className="page-section-xl border-t border-border-subtle">
      <div className="page-container">
        <SectionHeading
          number="02"
          label="Compétences"
          title="Technologies & outils"
          subtitle="Stack moderne pour construire des applications performantes, scalables et agréables à utiliser."
        />

        <dl className="mt-24 space-y-0">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: gi * 0.06,
                ease: EASE_LUXURY,
              }}
              className="grid gap-5 border-t border-border-subtle py-12 first:border-t-0 first:pt-0 lg:grid-cols-[220px_1fr] lg:gap-16"
            >
              <dt className="text-label">{group.category}</dt>
              <dd>
                <ScrollLine className="mb-6 max-w-[40px] lg:hidden" />
                <p className="text-[0.9375rem] leading-[1.9] text-muted">
                  {group.skills.join(" · ")}
                </p>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
