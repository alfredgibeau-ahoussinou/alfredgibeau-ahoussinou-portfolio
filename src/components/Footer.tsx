"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { EASE_LUXURY } from "@/lib/motion";

const footerLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/projets", label: "Projets" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border-subtle">
      <div className="page-container py-28 lg:py-36">
        <div className="flex flex-col gap-20 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_LUXURY }}
          >
            <p className="font-serif text-[clamp(1.75rem,4vw,2.25rem)] tracking-[-0.02em] text-foreground">
              {profile.name}
            </p>
            <p className="mt-4 font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-muted/50">
              {profile.role}
            </p>
          </motion.div>

          <nav className="flex flex-wrap gap-x-14 gap-y-5">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted/70 transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-border-subtle pt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted/40">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-[0.5625rem] tracking-[0.12em] text-muted/30">
            Next.js · TypeScript · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
