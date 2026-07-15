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
          subtitle="Une stack moderne au service de produits performants, scalables et élégants."
        />

        <dl className="mt-20 sm:mt-24">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: gi * 0.05,
                ease: EASE_LUXURY,
              }}
              className="grid gap-4 border-t border-border-subtle py-10 first:border-t-0 first:pt-0 sm:py-12 lg:grid-cols-[200px_1fr] lg:gap-12 lg:py-14"
            >
              <dt className="text-label">{group.category}</dt>
              <dd>
                <ScrollLine className="mb-5 max-w-[40px] lg:hidden" />
                <p className="text-body">{group.skills.join(" · ")}</p>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
