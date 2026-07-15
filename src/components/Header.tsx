"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-header" : "bg-transparent"
      }`}
    >
      <nav className="page-container flex items-center justify-between py-6 lg:py-8">
        <Magnetic strength={0.12}>
          <Link
            href="/"
            className="group flex flex-col gap-1 transition-opacity duration-500 hover:opacity-70"
          >
            <span className="font-serif text-[1.125rem] tracking-[-0.02em] text-foreground lg:text-xl">
              {profile.name}
            </span>
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.28em] text-muted/50">
              Full-Stack & IA
            </span>
          </Link>
        </Magnetic>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href} className="relative">
                <Magnetic strength={0.1}>
                  <Link
                    href={link.href}
                    className={`link-center-underline relative block px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-500 ${
                      active
                        ? "text-foreground"
                        : "text-muted/70 hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-accent/70"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
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

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="relative z-[60] flex h-10 w-10 items-center justify-center lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">{open ? "Fermer" : "Menu"}</span>
          <div className="relative h-3 w-5">
            <motion.span
              animate={
                open
                  ? { rotate: 45, y: 5, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              transition={{ duration: 0.45, ease: EASE_LUXURY }}
              className="absolute left-0 top-0 h-px origin-center bg-foreground"
              style={{ width: 20 }}
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3, ease: EASE_LUXURY }}
              className="absolute left-0 top-[5px] h-px w-3 origin-center bg-foreground/60"
            />
            <motion.span
              animate={
                open
                  ? { rotate: -45, y: -5, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              transition={{ duration: 0.45, ease: EASE_LUXURY }}
              className="absolute bottom-0 left-0 h-px origin-center bg-foreground"
              style={{ width: 20 }}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_LUXURY }}
            className="fixed inset-0 z-[55] bg-background/97 backdrop-blur-2xl lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.05, ease: EASE_LUXURY }}
              className="flex h-full flex-col justify-center px-8"
            >
              <ul className="flex flex-col gap-10">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, ease: EASE_LUXURY }}
                  >
                    <Link
                      href={link.href}
                      className={`group flex items-baseline gap-6 transition-colors ${
                        isActive(link.href)
                          ? "text-foreground"
                          : "text-muted/60 hover:text-foreground"
                      }`}
                    >
                      <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-muted/30">
                        0{i + 1}
                      </span>
                      <span className="font-serif text-[clamp(2.25rem,8vw,3.5rem)] tracking-[-0.03em]">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, ease: EASE_LUXURY }}
                className="mt-20 border-t border-border-subtle pt-10"
              >
                <p className="text-label">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-3 block font-serif text-lg tracking-[-0.01em] text-foreground/80 transition-colors hover:text-accent"
                >
                  {profile.email}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
