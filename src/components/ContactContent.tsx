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
        label="Contact"
        title="Travaillons ensemble"
        subtitle="Un projet en tête ? Une collaboration ? N'hésitez pas à me contacter — je réponds généralement sous 48h."
      />

      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-20 divide-y divide-border"
      >
        {links.map((link) => (
          <li key={link.label} className="py-8">
            {link.href ? (
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between transition-opacity hover:opacity-70"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {link.label}
                  </p>
                  <p className="mt-3 font-serif text-2xl text-foreground">
                    {link.value}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {link.label}
                </p>
                <p className="mt-3 font-serif text-2xl text-foreground">
                  {link.value}
                </p>
              </div>
            )}
          </li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-16 border-t border-border pt-16"
      >
        <p className="text-sm leading-relaxed text-muted">
          Vous pouvez aussi m&apos;écrire directement pour discuter d&apos;une
          idée, d&apos;un stage ou d&apos;une mission freelance.
        </p>
        <a
          href={`mailto:${profile.email}?subject=Collaboration%20portfolio`}
          className="link-underline mt-8 inline-block text-sm tracking-wide text-foreground transition-opacity hover:opacity-70"
        >
          Envoyer un message →
        </a>
      </motion.div>
    </>
  );
}
