"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { profile } from "@/data/profile";
import { EASE_LUXURY } from "@/lib/motion";
import { Magnetic } from "./Magnetic";

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

  useLenis((lenis) => {
    setScrolled(lenis.scroll > 32);
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
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
      <nav className="page-container flex items-center justify-between py-6 lg:py-7">
        <Magnetic strength={0.15}>
          <Link
            href="/"
            className="group flex flex-col gap-0.5 transition-opacity duration-500 hover:opacity-60"
          >
            <span className="font-serif text-lg tracking-[-0.02em] text-foreground">
              Alfred Gibeau
            </span>
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-muted/60">
              Dev Full-Stack
            </span>
          </Link>
        </Magnetic>

        <ul className="relative hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href} className="relative">
                <Magnetic strength={0.12}>
                  <Link
                    href={link.href}
                    className={`link-center-underline relative block px-4 py-2 text-[0.8125rem] tracking-[0.02em] transition-colors duration-400 ${
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-accent/80"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    {link.label}
                  </Link>
                </Magnetic>
              </li>
            );
          })}
        </ul>

        <Magnetic strength={0.15} className="hidden md:block">
          <Link
            href="/contact"
            className="link-center-underline font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted transition-colors duration-400 hover:text-foreground"
          >
            Contact
          </Link>
        </Magnetic>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_LUXURY }}
          className="border-b border-border-subtle bg-background/95 px-6 pb-12 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-8">
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, ease: EASE_LUXURY }}
              >
                <Link
                  href={link.href}
                  className={`font-serif text-3xl tracking-[-0.02em] transition-colors ${
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
                className="text-label-accent"
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
