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
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="mt-32"
      >
        {links.map((link) => (
          <motion.li
            key={link.label}
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: EASE_LUXURY },
              },
            }}
            className="border-t border-border-subtle py-14 first:border-t-0 first:pt-0"
          >
            {link.href ? (
              <Magnetic strength={0.08}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-end justify-between gap-8 transition-opacity hover:opacity-80"
                >
                  <div>
                    <p className="text-label">{link.label}</p>
                    <p className="mt-6 font-serif text-[clamp(1.5rem,4.5vw,2.75rem)] tracking-[-0.02em] text-foreground">
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="mb-2 shrink-0 text-muted/40 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </Magnetic>
            ) : (
              <div>
                <p className="text-label">{link.label}</p>
                <p className="mt-6 font-serif text-[clamp(1.5rem,4.5vw,2.75rem)] tracking-[-0.02em] text-foreground">
                  {link.value}
                </p>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE_LUXURY }}
        className="mt-28 border-t border-border-subtle pt-24"
      >
        <p className="max-w-md text-[0.9375rem] leading-[1.9] text-muted/85">
          Pour une mission, un produit ou une intégration IA — décrivez votre
          vision, je reviens vers vous avec précision.
        </p>
        <Magnetic strength={0.15} className="mt-14 inline-block">
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
