"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/projets", label: "Projets" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-header" : "bg-transparent"
      }`}
    >
      <nav className="page-container flex items-center justify-between py-7">
        <Link
          href="/"
          className="group flex flex-col gap-0.5 transition-opacity duration-300 hover:opacity-70"
        >
          <span className="font-serif text-lg tracking-tight text-foreground">
            Alfred Gibeau
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted/70">
            Dev Full-Stack
          </span>
        </Link>

        <ul className="relative hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative block px-4 py-2 text-[0.8125rem] tracking-wide transition-colors duration-300 ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="link-underline hidden font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:text-foreground md:inline"
        >
          Contact
        </Link>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-b border-border-subtle px-6 pb-10 md:hidden"
        >
          <ul className="flex flex-col gap-6">
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={`font-serif text-2xl transition-colors ${
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="text-label text-accent"
              >
                {profile.email}
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
