"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { EASE_LUXURY } from "@/lib/motion";
import { Magnetic } from "./Magnetic";
import { SectionHeading } from "./SectionHeading";

const links = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    label: "GitHub",
    value: `@${profile.username}`,
    href: profile.github,
    external: true,
  },
  {
    label: "Localisation",
    value: profile.location,
    href: undefined,
    external: false,
  },
];

export function ContactContent() {
  return (
    <>
      <SectionHeading
        number="01"
        label="Contact"
        title="Travaillons ensemble"
        subtitle="Un projet ambitieux, une collaboration ou une mission — écrivez-moi. Réponse sous 48 heures."
      />

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="mt-24 sm:mt-32"
      >
        {links.map((link) => (
          <motion.li
            key={link.label}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE_LUXURY },
              },
            }}
            className="border-t border-border-subtle py-12 first:border-t-0 first:pt-0 sm:py-16"
          >
            {link.href ? (
              <Magnetic strength={0.06}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-end justify-between gap-8 transition-opacity duration-500 hover:opacity-90"
                >
                  <div className="min-w-0">
                    <p className="text-label">{link.label}</p>
                    <p className="mt-6 break-all font-serif text-[clamp(1.5rem,4.5vw,3rem)] tracking-[-0.025em] text-foreground sm:mt-8 sm:break-normal">
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="mb-1 shrink-0 text-muted/45 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </Magnetic>
            ) : (
              <div>
                <p className="text-label">{link.label}</p>
                <p className="mt-6 font-serif text-[clamp(1.5rem,4.5vw,3rem)] tracking-[-0.025em] text-foreground sm:mt-8">
                  {link.value}
                </p>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE_LUXURY }}
        className="mt-24 border-t border-border-subtle pt-20 sm:mt-32 sm:pt-24"
      >
        <p className="text-body max-w-md">
          Pour une mission, un produit ou une intégration IA — décrivez votre
          vision, je reviens vers vous avec précision.
        </p>
        <Magnetic strength={0.08} className="mt-10 inline-block sm:mt-12">
          <a
            href={`mailto:${profile.email}?subject=Collaboration%20portfolio`}
            className="btn-minimal"
          >
            Envoyer un message
          </a>
        </Magnetic>
      </motion.div>
    </>
  );
}
