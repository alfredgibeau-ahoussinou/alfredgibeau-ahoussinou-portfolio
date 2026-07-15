"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
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
        subtitle="Un projet en tête ? Une collaboration ? N'hésitez pas à me contacter — je réponds généralement sous 48h."
      />

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="mt-24"
      >
        {links.map((link) => (
          <motion.li
            key={link.label}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="border-t border-border-subtle py-10 first:border-t-0 first:pt-0"
          >
            {link.href ? (
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-end justify-between gap-6 transition-opacity hover:opacity-80"
              >
                <div>
                  <p className="text-label">{link.label}</p>
                  <p className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.5rem)] tracking-tight text-foreground">
                    {link.value}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="mb-2 shrink-0 text-muted/50 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            ) : (
              <div>
                <p className="text-label">{link.label}</p>
                <p className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.5rem)] tracking-tight text-foreground">
                  {link.value}
                </p>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-20 border-t border-border-subtle pt-16"
      >
        <p className="max-w-md text-base leading-[1.75] text-muted">
          Vous pouvez aussi m&apos;écrire directement pour discuter d&apos;une
          idée, d&apos;un stage ou d&apos;une mission freelance.
        </p>
        <a
          href={`mailto:${profile.email}?subject=Collaboration%20portfolio`}
          className="btn-ghost mt-10"
        >
          Envoyer un message
        </a>
      </motion.div>
    </>
  );
}
