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

export function Contact() {
  return (
    <section id="contact" className="border-t border-border px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          label="Contact"
          title="Travaillons ensemble"
          subtitle="Un projet en tête ? Une collaboration ? N'hésitez pas à me contacter."
        />

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 divide-y divide-border"
        >
          {links.map((link) => (
            <li key={link.label} className="py-6">
              {link.href ? (
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between transition-opacity hover:opacity-70"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted">
                      {link.label}
                    </p>
                    <p className="mt-2 text-lg text-foreground">{link.value}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ) : (
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">
                    {link.label}
                  </p>
                  <p className="mt-2 text-lg text-foreground">{link.value}</p>
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
          className="mt-12"
        >
          <a
            href={`mailto:${profile.email}?subject=Collaboration%20portfolio`}
            className="link-underline text-sm text-muted transition-colors hover:text-foreground"
          >
            Envoyer un message →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
