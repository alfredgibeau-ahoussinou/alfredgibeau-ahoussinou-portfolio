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
      <div className="page-container py-24 lg:py-32">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_LUXURY }}
          >
            <p className="font-serif text-2xl tracking-[-0.02em] text-foreground">
              {profile.name}
            </p>
            <p className="mt-3 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/60">
              {profile.role} · Holberton School
            </p>
          </motion.div>

          <nav className="flex flex-wrap gap-x-12 gap-y-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border-subtle pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted/45">
            © {year} Alfred Gibeau--Ahoussinou
          </p>
          <p className="font-mono text-[0.5625rem] tracking-wider text-muted/35">
            Next.js · TypeScript · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
