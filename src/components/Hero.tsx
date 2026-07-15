"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { getAvatarUrl } from "@/lib/images";
import { EASE_LUXURY } from "@/lib/motion";
import { LinkPremium } from "./LinkPremium";
import { ScrollIndicator } from "./ScrollIndicator";
import { ScrollLine } from "./ScrollLine";
import { TextReveal } from "./TextReveal";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameParts = profile.name.split(" ");
  const firstName = nameParts.slice(0, 2).join(" ");
  const lastName = nameParts.slice(2).join(" ");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden"
    >
      <motion.div style={{ opacity }} className="page-container relative pb-16 pt-36 lg:pb-24 lg:pt-44">
        <div className="grid min-h-[calc(100dvh-8rem)] items-end gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-24">
          <motion.div style={{ y: contentY }} className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE_LUXURY }}
              className="mb-12 flex items-center gap-6"
            >
              <span className="section-number">01</span>
              <ScrollLine className="max-w-[80px] flex-1" />
              <span className="text-label-accent">{profile.subtitle}</span>
            </motion.div>

            <h1 className="text-display-massive text-foreground">
              <TextReveal text={firstName} as="span" delay={0.15} />
              <br />
              <span className="text-muted/80">
                <TextReveal text={lastName} as="span" delay={0.35} />
              </span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE_LUXURY }}
              className="mt-12 h-px w-full max-w-sm origin-left bg-border"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE_LUXURY }}
              className="mt-10 font-serif text-xl tracking-[-0.02em] text-foreground/90 sm:text-2xl"
            >
              {profile.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE_LUXURY }}
              className="mt-8 max-w-md text-[0.9375rem] leading-[1.85] text-muted"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE_LUXURY }}
              className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-6"
            >
              <LinkPremium href="/projets">Explorer les projets</LinkPremium>
              <LinkPremium href="/a-propos" showArrow={false}>
                Mon parcours
              </LinkPremium>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_LUXURY }}
            style={{ y: portraitY }}
            className="order-1 lg:order-2"
          >
            <div className="portrait-artwork portrait-mask relative mx-auto aspect-[3/4] max-w-sm overflow-hidden bg-surface lg:max-w-none">
              <Image
                src={getAvatarUrl(900)}
                alt={`Portrait de ${profile.name}`}
                fill
                priority
                className="object-cover object-top mix-blend-luminosity"
                sizes="(max-width: 1024px) 75vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(201_173_120_/_0.06),transparent_50%)]" />
            </div>
            <div className="mt-10 flex items-center justify-between border-t border-border-subtle pt-6">
              <span className="text-label">{profile.location}</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-mono text-[0.5625rem] tracking-[0.15em] text-muted/50 uppercase transition-colors hover:text-foreground"
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
