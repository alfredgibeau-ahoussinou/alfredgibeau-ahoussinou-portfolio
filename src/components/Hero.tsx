"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { EASE_LUXURY } from "@/lib/motion";
import { LinkPremium } from "./LinkPremium";
import { PortraitFrame } from "./PortraitFrame";
import { ScrollIndicator } from "./ScrollIndicator";
import { ScrollLine } from "./ScrollLine";
import { TextReveal } from "./TextReveal";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameParts = profile.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ["0%", "0%"] : ["0%", "18%"],
  );
  const portraitScale = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [1, 1.03],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ["0%", "0%"] : ["0%", "8%"],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-[radial-gradient(ellipse_80%_70%_at_70%_40%,rgb(201_173_120_/_0.04),transparent_65%)] lg:block"
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity }}
        className="page-container relative pb-20 pt-36 sm:pb-24 sm:pt-40 lg:pb-32 lg:pt-48"
      >
        <div className="grid min-h-[calc(100dvh-8rem)] items-end gap-16 sm:gap-20 lg:min-h-[calc(100dvh-9rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 xl:grid-cols-[1.1fr_0.9fr] xl:gap-28">
          <motion.div style={{ y: contentY }} className="order-2 lg:order-1 lg:pr-8 xl:pr-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE_LUXURY }}
              className="mb-12 flex items-center gap-5 sm:mb-14"
            >
              <span className="section-number">01</span>
              <ScrollLine className="max-w-[72px] flex-1" />
              <span className="text-label-accent">{profile.subtitle}</span>
            </motion.div>

            <h1 className="text-display-massive text-foreground">
              <TextReveal text={firstName} as="span" delay={0.15} />
              <br />
              <span className="text-muted/75">
                <TextReveal text={lastName} as="span" delay={0.35} />
              </span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE_LUXURY }}
              className="mt-12 h-px w-full max-w-xs origin-left bg-gradient-to-r from-accent/50 via-accent/20 to-transparent sm:mt-14"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE_LUXURY }}
              className="mt-10 font-serif text-xl tracking-[-0.025em] text-foreground/95 sm:mt-12 sm:text-[1.625rem]"
            >
              {profile.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: EASE_LUXURY }}
              className="mt-4 max-w-lg font-serif text-lg tracking-[-0.015em] text-muted/90 sm:text-xl"
            >
              {profile.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE_LUXURY }}
              className="text-body mt-8 max-w-md sm:mt-10"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: EASE_LUXURY }}
              className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-6 sm:mt-20"
            >
              <LinkPremium href="/projets">Explorer les projets</LinkPremium>
              <LinkPremium href="/a-propos" showArrow={false}>
                Mon expertise
              </LinkPremium>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE_LUXURY }}
            style={{ y: portraitY, scale: portraitScale }}
            className="order-1 lg:order-2 lg:-mr-2 xl:-mr-6"
          >
            <PortraitFrame
              priority
              variant="hero"
              sizes="(max-width: 1024px) 80vw, 42vw"
              className="mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:mx-0 lg:ml-auto lg:max-w-none"
            />
            <div className="mt-10 flex items-center justify-between gap-6 border-t border-border-subtle pt-6 sm:mt-12 sm:pt-8">
              <span className="text-label">{profile.location}</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline shrink-0 font-mono text-[0.5625rem] tracking-[0.18em] text-muted/55 uppercase transition-colors hover:text-foreground"
              >
                GitHub · {profile.stats.repos} repos
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
