"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, skillGroups } from "@/data/profile";
import { projects, type Project } from "@/data/projects";

export type ViewMode = "intro" | "overview" | "carousel" | "case-study";

type EditorialPortfolioProps = {
  initialMode?: ViewMode;
  initialSlug?: string;
  initialAbout?: boolean;
};

const EASE_ARISTIDE = [0.16, 1, 0.3, 1] as const;
const EASE_IMAGE = [0.39, 0.575, 0.565, 1] as const;
const OVERVIEW_THEME = { bg: "#141312", fg: "#D8D1C5" };

function MaskedLine({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left";
  className?: string;
}) {
  const initial =
    direction === "left"
      ? { x: "-110%", y: "0%" }
      : direction === "down"
        ? { x: "0%", y: "-105%" }
        : { x: "0%", y: "105%" };

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        initial={initial}
        animate={{ x: "0%", y: "0%" }}
        exit={initial}
        transition={{ duration: 0.65, delay, ease: EASE_ARISTIDE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function MorphIcon({
  variant,
  hovered,
}: {
  variant: "explore" | "close";
  hovered: boolean;
}) {
  // Morph between "+" and "↓" (explore) or "×" and "↑" (close/projects)
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-300 ease-out"
      aria-hidden="true"
    >
      {variant === "explore" ? (
        hovered ? (
          <path
            d="M7 2V12M7 12L3 8M7 12L11 8"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
          />
        ) : (
          <path
            d="M7 2V12M2 7H12"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
          />
        )
      ) : hovered ? (
        <path
          d="M7 12V2M7 2L3 6M7 2L11 6"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      ) : (
        <path
          d="M3 3L11 11M11 3L3 11"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      )}
    </svg>
  );
}

function SpreadTitle({
  projectId,
  rows,
  mode,
  color,
}: {
  projectId: string;
  rows: string[];
  mode: "carousel" | "case-study";
  color: string;
}) {
  const isCarousel = mode === "carousel";
  const maxLen = Math.max(...rows.map((r) => r.length));
  const isLong = maxLen >= 10;

  return (
    <div
      className={`pointer-events-none fixed inset-x-5 top-1/2 -translate-y-1/2 select-none sm:inset-x-[38px] ${
        isCarousel ? "z-20" : "z-[5]"
      }`}
      style={{ color }}
      aria-hidden="true"
    >
      <div className="flex flex-col gap-1">
        {rows.map((row, rowIdx) => {
          const chars = row.split("");
          const sizeClass = isLong
            ? "text-[clamp(2.25rem,9.5vw,21vh)]"
            : "text-[clamp(3.25rem,14vw,27vh)]";

          return (
            <div
              key={`${projectId}-${rowIdx}`}
              className={`font-display uppercase leading-[0.84] ${sizeClass} ${
                isCarousel
                  ? "flex w-full justify-between"
                  : "flex w-fit justify-start tracking-[-0.025em]"
              } ${rowIdx === 1 && isCarousel && !isLong ? "pl-[4vw] sm:pl-[8vw]" : rowIdx === 1 && isCarousel ? "sm:pl-[6vw]" : ""}`}
            >
              {chars.map((char, i) => (
                <motion.span
                  key={`${projectId}-${rowIdx}-${i}`}
                  layout="position"
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    layout: { duration: 0.85, ease: EASE_ARISTIDE },
                    y: { duration: 0.65, delay: i * 0.02 + rowIdx * 0.05, ease: EASE_ARISTIDE },
                    opacity: { duration: 0.5, delay: i * 0.02 + rowIdx * 0.05 },
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function EditorialPortfolio({
  initialMode = "overview",
  initialSlug,
  initialAbout = false,
}: EditorialPortfolioProps) {
  const initialIdx = initialSlug
    ? Math.max(
        0,
        projects.findIndex((p) => p.slug === initialSlug),
      )
    : 0;

  const [mode, setMode] = useState<ViewMode>(initialMode);
  const [activeIndex, setActiveIndex] = useState<number>(initialIdx);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [aboutOpen, setAboutOpen] = useState<boolean>(initialAbout);
  const [exploreHover, setExploreHover] = useState(false);
  const [introHover, setIntroHover] = useState(false);
  const [projectsHover, setProjectsHover] = useState(false);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const wheelLockRef = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const activeProject: Project = projects[activeIndex] ?? projects[0];
  const theme =
    mode === "intro" || mode === "overview"
      ? OVERVIEW_THEME
      : activeProject.theme;

  const syncUrl = useCallback(
    (nextMode: ViewMode, nextIndex: number, isAbout: boolean) => {
      if (typeof window === "undefined") return;
      if (isAbout) {
        window.history.replaceState(null, "", "/a-propos");
        return;
      }
      if (nextMode === "intro") {
        window.history.replaceState(null, "", "/");
      } else if (nextMode === "overview") {
        window.history.replaceState(null, "", "/projets");
      } else if (nextMode === "carousel") {
        window.history.replaceState(null, "", "/projets");
      } else {
        window.history.replaceState(
          null,
          "",
          `/projets/${projects[nextIndex].slug}`,
        );
      }
    },
    [],
  );

  const openCarousel = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setSlideIndex(0);
      setMode("carousel");
      setAboutOpen(false);
      syncUrl("carousel", index, false);
    },
    [syncUrl],
  );

  const openCaseStudy = useCallback(
    (index?: number) => {
      const target = index ?? activeIndex;
      setActiveIndex(target);
      setSlideIndex(0);
      setMode("case-study");
      setAboutOpen(false);
      syncUrl("case-study", target, false);
    },
    [activeIndex, syncUrl],
  );

  const backToOverview = useCallback(() => {
    setMode("overview");
    setAboutOpen(false);
    syncUrl("overview", activeIndex, false);
  }, [activeIndex, syncUrl]);

  const backToIntro = useCallback(() => {
    setMode("intro");
    setAboutOpen(false);
    syncUrl("intro", activeIndex, false);
  }, [activeIndex, syncUrl]);

  const toggleAbout = useCallback(() => {
    const next = !aboutOpen;
    setAboutOpen(next);
    syncUrl(mode, activeIndex, next);
  }, [aboutOpen, activeIndex, mode, syncUrl]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (aboutOpen) {
        if (e.key === "Escape") toggleAbout();
        return;
      }
      if (e.key === "ArrowRight") {
        if (mode === "overview") {
          openCarousel(0);
        } else if (mode === "carousel") {
          setActiveIndex((prev) => (prev + 1) % projects.length);
          setSlideIndex(0);
        }
      } else if (e.key === "ArrowLeft") {
        if (mode === "carousel") {
          setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
          setSlideIndex(0);
        }
      } else if (e.key === "ArrowDown" && mode === "case-study") {
        setSlideIndex((prev) =>
          Math.min(prev + 1, activeProject.gallery.length - 1),
        );
      } else if (e.key === "ArrowUp" && mode === "case-study") {
        setSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && mode === "carousel") {
        openCaseStudy();
      } else if (e.key === "Escape") {
        if (mode === "case-study") openCarousel(activeIndex);
        else if (mode === "carousel") backToOverview();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    aboutOpen,
    activeIndex,
    activeProject.gallery.length,
    backToOverview,
    mode,
    openCarousel,
    openCaseStudy,
    toggleAbout,
  ]);

  // Wheel interaction: in carousel mode, scrolling zooms back out to overview
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (aboutOpen) return;
      const now = Date.now();
      if (now - wheelLockRef.current < 450) return;

      if (mode === "intro" && e.deltaY > 28) {
        wheelLockRef.current = now;
        openCarousel(0);
      } else if (mode === "carousel" && (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20)) {
        wheelLockRef.current = now;
        const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (delta > 0) {
          setActiveIndex((prev) => (prev + 1) % projects.length);
          setSlideIndex(0);
        } else {
          setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
          setSlideIndex(0);
        }
      } else if (mode === "case-study" && Math.abs(e.deltaY) > 28) {
        wheelLockRef.current = now;
        if (e.deltaY > 0) {
          setSlideIndex((prev) =>
            Math.min(prev + 1, activeProject.gallery.length - 1),
          );
        } else {
          setSlideIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [aboutOpen, activeProject.gallery.length, backToOverview, mode]);

  const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
  const nextIdx = (activeIndex + 1) % projects.length;
  const prevProject = projects[prevIdx];
  const nextProject = projects[nextIdx];

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current || aboutOpen) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - touchStartRef.current.x;
      const dy = t.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      if (mode === "intro" && dy < -40) {
        openCarousel(0);
      } else if (mode === "carousel" && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          setActiveIndex((prev) => (prev + 1) % projects.length);
        } else {
          setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
        }
        setSlideIndex(0);
      } else if (mode === "case-study" && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          setSlideIndex((prev) => Math.min(prev + 1, activeProject.gallery.length - 1));
        } else {
          setSlideIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    },
    [aboutOpen, activeProject.gallery.length, mode, openCarousel],
  );

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[100dvh] w-full overflow-hidden select-none transition-colors duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] [--card-gap:5vw] [--card-w:84vw] sm:[--card-gap:6vw] sm:[--card-w:min(56vw,860px)]"
      style={{
        backgroundColor: aboutOpen ? "#111110" : theme.bg,
        color: aboutOpen ? "#E8E2D5" : theme.fg,
      }}
    >
      {/* ==================== PERSISTENT 4-CORNER NAV ==================== */}
      <header className="pointer-events-none fixed inset-0 z-40">
        {/* Top-Left: Wordmark (letter-by-letter horizontal masked reveal) */}
        <button
          type="button"
          onClick={backToIntro}
          className="pointer-events-auto fixed left-[24px] top-[24px] flex overflow-hidden text-left font-display text-[38px] leading-[0.88] tracking-[-0.02em] uppercase transition-opacity duration-300 hover:opacity-70 sm:left-[38px] sm:top-[35px] sm:text-[50px]"
        >
          {"ALFRED".split("").map((ch, idx) => (
            <span key={idx} className="inline-block overflow-hidden">
              <motion.span
                initial={{ x: "-110%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 0.6,
                  delay: 0.04 * idx,
                  ease: EASE_ARISTIDE,
                }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </button>

        {/* Top-Right: À PROPOS / FERMER */}
        <button
          type="button"
          onClick={toggleAbout}
          className="group pointer-events-auto fixed right-[24px] top-[28px] overflow-hidden font-sans text-[11px] font-bold tracking-[0.04em] uppercase sm:right-[50px] sm:top-[40px] sm:text-[12px]"
        >
          <MaskedLine delay={0.12}>
            <span className="relative inline-block pb-1">
              {aboutOpen ? "FERMER" : "À PROPOS"}
              <span
                className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 transition-transform duration-300 group-hover:scale-x-0"
                style={{ backgroundColor: "currentColor" }}
              />
            </span>
          </MaskedLine>
        </button>

        {/* Bottom-Left: Availability */}
        <div className="pointer-events-auto fixed bottom-[28px] left-[24px] hidden text-[10px] font-bold leading-[13px] tracking-[0.03em] uppercase sm:bottom-[48px] sm:left-[50px] sm:block">
          <MaskedLine delay={0.18}>
            <p className="opacity-75">DÉVELOPPEUR FULL STACK & IA</p>
          </MaskedLine>
          <MaskedLine delay={0.24}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-1 transition-opacity duration-300 hover:opacity-75"
            >
              <span>DISPONIBLE · PARIS</span>
              <span className="inline-block -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                ↗
              </span>
            </a>
          </MaskedLine>
        </div>

        {/* Bottom-Right: Social Stack */}
        <div className="pointer-events-auto fixed bottom-[28px] right-[24px] flex flex-col items-end gap-0.5 text-[11px] font-bold leading-[15px] tracking-[0.03em] uppercase sm:bottom-[47px] sm:right-[50px] sm:text-[12px]">
          <MaskedLine delay={0.18}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-1 transition-opacity duration-300 hover:opacity-75"
            >
              <span className="-translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                ↗
              </span>
              <span>EMAIL</span>
            </a>
          </MaskedLine>
          <MaskedLine delay={0.23}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-opacity duration-300 hover:opacity-75"
            >
              <span className="-translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                ↗
              </span>
              <span>GITHUB</span>
            </a>
          </MaskedLine>
          <MaskedLine delay={0.28}>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-opacity duration-300 hover:opacity-75"
            >
              <span className="-translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                ↗
              </span>
              <span>LINKEDIN</span>
            </a>
          </MaskedLine>
        </div>
      </header>

      {/* ==================== MODE 0: INTRODUCTION ==================== */}
      <AnimatePresence>
        {mode === "intro" && !aboutOpen && (
          <motion.main
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_ARISTIDE }}
            className="relative flex h-full w-full items-center justify-center px-[24px] sm:px-[50px]"
          >
            <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1.25fr_0.75fr] md:gap-16">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE_ARISTIDE }}
                  className="text-[10px] font-bold tracking-[0.22em] text-[#D5B883] uppercase"
                >
                  PARIS · FULL STACK &amp; INTELLIGENCE ARTIFICIELLE
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.06,
                    ease: EASE_ARISTIDE,
                  }}
                  className="mt-4 font-display text-[clamp(3.75rem,11vw,9.5rem)] leading-[0.84] tracking-[-0.025em] uppercase"
                >
                  ALFRED
                  <br />
                  <span className="opacity-70">AHOUSSINOU</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.14,
                    ease: EASE_ARISTIDE,
                  }}
                  className="mt-7 max-w-md text-[11px] font-bold leading-[17px] tracking-[0.04em] uppercase opacity-75"
                >
                  {profile.bio}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_ARISTIDE }}
                className="hidden justify-end md:flex"
              >
                <div className="relative aspect-[3/4] w-[260px] overflow-hidden border border-white/10 lg:w-[300px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-full w-full object-cover object-top grayscale-[25%] contrast-[1.05]"
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom-center EXPLORER LES ARCHITECTURES CTA */}
            <button
              type="button"
              onClick={() => openCarousel(0)}
              onMouseEnter={() => setIntroHover(true)}
              onMouseLeave={() => setIntroHover(false)}
              className="fixed bottom-[32px] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-bold tracking-[0.06em] uppercase sm:bottom-[44px]"
            >
              <span className="relative pb-1">
                ARCHITECTURES
                <span
                  className={`absolute bottom-0 left-0 h-px w-full transition-transform duration-300 ${
                    introHover ? "scale-x-0" : "scale-x-100"
                  }`}
                  style={{ backgroundColor: theme.fg }}
                />
              </span>
              <span
                className="block h-[22px] w-px opacity-70 sm:h-[30px]"
                style={{ backgroundColor: theme.fg }}
              />
              <MorphIcon variant="explore" hovered={introHover} />
            </button>
          </motion.main>
        )}

        {/* ==================== MODE 1: EDITORIAL GALLERY OVERVIEW ==================== */}
        {mode === "overview" && !aboutOpen && (
          <motion.main
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_ARISTIDE }}
            className="relative flex h-full w-full items-start justify-center overflow-y-auto px-[24px] pb-32 pt-28 sm:px-[50px] lg:items-center lg:py-24"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">
                    SÉLECTION · {String(projects.length).padStart(2, "0")} PROJETS
                  </p>
                  <p className="mt-1 font-display text-[34px] leading-[0.9] uppercase tracking-[-0.02em] sm:text-[42px]">
                    ARCHITECTURES WEB &amp; IA
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => {
                  const isHovered = hoveredSlice === idx;
                  return (
                    <motion.button
                      key={project.id}
                      type="button"
                      onClick={() => openCarousel(idx)}
                      onMouseEnter={() => setHoveredSlice(idx)}
                      onMouseLeave={() => setHoveredSlice(null)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.04,
                        ease: EASE_ARISTIDE,
                      }}
                      className="group relative flex flex-col items-start text-left focus:outline-none"
                    >
                      <div
                        className={`relative aspect-[16/9] w-full overflow-hidden border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isHovered
                            ? "scale-[1.02] grayscale-0 opacity-100"
                            : "grayscale-[45%] opacity-85 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: project.theme.bg }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.gallery[0]}
                          alt={project.title}
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-2.5 flex w-full items-center justify-between text-[10px] font-bold tracking-[0.1em] uppercase">
                        <span className="opacity-90">
                          {String(idx + 1).padStart(2, "0")} · {project.title}
                        </span>
                        <span className="text-[9px] opacity-45">
                          {project.category}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.main>
        )}

        {/* ==================== MODES 2 & 3: UNIFIED PERSISTENT CAROUSEL & CASE STUDY STAGE ==================== */}
        {(mode === "carousel" || mode === "case-study") && !aboutOpen && (
          <motion.main
            key="project-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.4, ease: EASE_ARISTIDE }}
            className="relative flex h-full w-full items-center justify-center"
          >
            {/* Top-center Bar: Pagination Scrubber (Carousel) OR × PROJETS (Case Study) */}
            <AnimatePresence mode="wait">
              {mode === "carousel" ? (
                <motion.div
                  key="top-scrubber"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE_ARISTIDE }}
                  className="fixed left-1/2 top-[84px] z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:top-[49px] sm:gap-2"
                >
                  <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.06em] sm:gap-4 sm:text-[12px]">
                    <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                    <div className="relative flex items-center gap-1.5 sm:gap-2">
                      {projects.map((p, idx) => {
                        const active = idx === activeIndex;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setActiveIndex(idx);
                              setSlideIndex(0);
                            }}
                            aria-label={`Voir ${p.title}`}
                            className="relative flex h-5 w-3.5 items-center justify-center transition-opacity duration-300"
                          >
                            <span
                              className={`block h-2.5 w-px transition-opacity duration-300 ${
                                active ? "opacity-0" : "opacity-45 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: theme.fg }}
                            />
                            {active && (
                              <motion.span
                                layoutId="pagination-active-box"
                                className="absolute inset-0 border-[1.3px]"
                                style={{ borderColor: theme.fg }}
                                transition={{
                                  duration: 0.45,
                                  ease: EASE_ARISTIDE,
                                }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <span className="opacity-65">
                      {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="whitespace-nowrap text-[9px] font-bold tracking-[0.16em] uppercase opacity-60">
                    {activeProject.year} · {activeProject.category}
                  </p>
                </motion.div>
              ) : (
                <motion.button
                  key="top-projects-back"
                  type="button"
                  onClick={() => openCarousel(activeIndex)}
                  onMouseEnter={() => setProjectsHover(true)}
                  onMouseLeave={() => setProjectsHover(false)}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE_ARISTIDE }}
                  className="fixed left-1/2 top-[84px] z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[11px] font-bold tracking-[0.04em] uppercase sm:top-[49px] sm:text-[12px]"
                >
                  <MorphIcon variant="close" hovered={projectsHover} />
                  <span
                    className="block h-[14px] w-px opacity-70"
                    style={{ backgroundColor: theme.fg }}
                  />
                  <span className="relative pb-1">
                    PROJETS
                    <span
                      className={`absolute bottom-0 left-0 h-px w-full transition-transform duration-300 ${
                        projectsHover ? "scale-x-0" : "scale-x-100"
                      }`}
                      style={{ backgroundColor: theme.fg }}
                    />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Persistent Horizontal Sliding Track (never unmounts between Carousel & Case Study) */}
            <div className="relative z-10 flex h-full w-full items-center overflow-hidden">
              <motion.div
                className="flex items-center will-change-transform"
                animate={{
                  x: `calc(50vw - ${activeIndex} * (var(--card-w) + var(--card-gap)) - var(--card-w) / 2)`,
                }}
                transition={{ duration: 0.72, ease: EASE_ARISTIDE }}
                style={{ gap: "var(--card-gap)" }}
              >
                {projects.map((project, idx) => {
                  const isActive = idx === activeIndex;
                  const isCaseStudy = mode === "case-study";
                  return (
                    <div
                      key={project.id}
                      onClick={() => {
                        if (isCaseStudy) return;
                        if (isActive) openCaseStudy(idx);
                        else {
                          setActiveIndex(idx);
                          setSlideIndex(0);
                        }
                      }}
                      className={`group relative aspect-[16/9] w-[var(--card-w)] shrink-0 overflow-hidden shadow-2xl transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                        isActive
                          ? isCaseStudy
                            ? "scale-100 opacity-100 grayscale-0"
                            : "scale-100 opacity-100 grayscale-0 cursor-pointer"
                          : isCaseStudy
                            ? "pointer-events-none scale-[0.82] opacity-0 grayscale"
                            : "scale-[0.88] opacity-40 grayscale cursor-pointer hover:opacity-75"
                      }`}
                      style={{ backgroundColor: project.theme.bg }}
                      role={isCaseStudy ? undefined : "button"}
                      tabIndex={isCaseStudy ? -1 : 0}
                      onKeyDown={(e) => {
                        if (!isCaseStudy && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          if (isActive) openCaseStudy(idx);
                          else {
                            setActiveIndex(idx);
                            setSlideIndex(0);
                          }
                        }
                      }}
                      aria-label={
                        isActive
                          ? `Explorer ${project.title}`
                          : `Afficher ${project.title}`
                      }
                    >
                      <div
                        className="flex h-full w-full flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                        style={{
                          transform:
                            isActive && isCaseStudy
                              ? `translate3d(0, -${slideIndex * 100}%, 0)`
                              : "translate3d(0, 0, 0)",
                        }}
                      >
                        {project.gallery.map((src, sIdx) => (
                          <div
                            key={src}
                            className="relative h-full w-full shrink-0 overflow-hidden"
                          >
                            {sIdx === 0 && isActive && isCaseStudy && project.video ? (
                              <video
                                src={project.video}
                                poster={src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={src}
                                alt={`${project.title} aperçu ${sIdx + 1}`}
                                className={`h-full w-full object-cover object-top transition-transform duration-700 ease-out ${
                                  !isCaseStudy && isActive ? "group-hover:scale-[1.02]" : ""
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Bottom-center EXPLORE CTA (Carousel) */}
            <AnimatePresence>
              {mode === "carousel" && (
                <motion.button
                  key="bottom-explore"
                  type="button"
                  onClick={() => openCaseStudy(activeIndex)}
                  onMouseEnter={() => setExploreHover(true)}
                  onMouseLeave={() => setExploreHover(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.35, ease: EASE_ARISTIDE }}
                  className="fixed bottom-[32px] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] font-bold tracking-[0.04em] uppercase sm:bottom-[44px]"
                >
                  <span className="relative pb-1">
                    EXPLORE
                    <span
                      className={`absolute bottom-0 left-0 h-px w-full transition-transform duration-300 ${
                        exploreHover ? "scale-x-0" : "scale-x-100"
                      }`}
                      style={{ backgroundColor: theme.fg }}
                    />
                  </span>
                  <span
                    className="block h-[22px] w-px opacity-70 sm:h-[34px]"
                    style={{ backgroundColor: theme.fg }}
                  />
                  <MorphIcon variant="explore" hovered={exploreHover} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Case Study Overlays: Right Thumbnail Rail + Bottom Metadata */}
            <AnimatePresence>
              {mode === "case-study" && (
                <>
                  {/* Right-Edge Thumbnail Rail */}
                  <motion.div
                    key="right-rail"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.4, ease: EASE_ARISTIDE }}
                    className="fixed right-[24px] top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 sm:right-[50px] md:flex"
                  >
                    {activeProject.gallery.map((src, idx) => {
                      const isActive = idx === slideIndex;
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setSlideIndex(idx)}
                          aria-label={`Aperçu ${idx + 1}`}
                          className="relative h-[42px] w-[74px] transition-opacity duration-300 hover:opacity-100"
                          style={{
                            opacity: isActive ? 1 : 0.55,
                          }}
                        >
                          <span className="block h-full w-full overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </span>
                          {isActive && (
                            <motion.span
                              layoutId="thumb-active-frame"
                              className="pointer-events-none absolute -inset-[5px] border-[1.5px]"
                              style={{ borderColor: theme.fg, opacity: 0.75 }}
                              transition={{ duration: 0.35, ease: EASE_ARISTIDE }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>

                  {/* Bottom Metadata Grid (A-D) & Summary (Desktop) */}
                  <motion.div
                    key="desktop-meta"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, ease: EASE_ARISTIDE }}
                    className="pointer-events-auto fixed bottom-[47px] left-1/2 z-30 hidden w-[760px] -translate-x-1/2 items-end justify-between gap-12 xl:flex"
                  >
                    <div className="grid gap-y-1 text-[10px] font-bold leading-[12px] tracking-[0.03em] uppercase">
                      <MaskedLine direction="down" delay={0.05}>
                        <div className="grid grid-cols-[26px_110px_220px] items-center">
                          <span className="text-[7px] opacity-60">A</span>
                          <span className="opacity-65">CRÉATION</span>
                          <span>{activeProject.year}</span>
                        </div>
                      </MaskedLine>
                      <MaskedLine direction="down" delay={0.09}>
                        <div className="grid grid-cols-[26px_110px_220px] items-center">
                          <span className="text-[7px] opacity-60">B</span>
                          <span className="opacity-65">TYPE</span>
                          <span>{activeProject.category}</span>
                        </div>
                      </MaskedLine>
                      <MaskedLine direction="down" delay={0.13}>
                        <div className="grid grid-cols-[26px_110px_220px] items-center">
                          <span className="text-[7px] opacity-60">C</span>
                          <span className="opacity-65">RÔLE</span>
                          <span>{activeProject.role}</span>
                        </div>
                      </MaskedLine>
                      <MaskedLine direction="down" delay={0.17}>
                        <div className="grid grid-cols-[26px_110px_220px] items-center">
                          <span className="text-[7px] opacity-60">D</span>
                          <span className="opacity-65">SITE</span>
                          <a
                            href={activeProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-fit items-center gap-1 underline underline-offset-4 transition-opacity hover:opacity-70"
                          >
                            <span>↗ VOIR LE SITE</span>
                          </a>
                        </div>
                      </MaskedLine>
                    </div>

                    <div className="max-w-[380px] text-[10px] font-bold leading-[14px] tracking-[0.03em] uppercase">
                      <MaskedLine direction="down" delay={0.1}>
                        <p>{activeProject.description}</p>
                      </MaskedLine>
                      <MaskedLine direction="down" delay={0.15}>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {activeProject.tech.map((t) => (
                            <span
                              key={t}
                              className="border px-1.5 py-0.5 text-[8.5px] tracking-[0.06em] opacity-75"
                              style={{ borderColor: theme.fg }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </MaskedLine>
                    </div>
                  </motion.div>

                  {/* Mobile & Tablet Horizontal Thumbnail Strip + Metadata (< xl) */}
                  <motion.div
                    key="mobile-meta"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.35, ease: EASE_ARISTIDE }}
                    className="fixed bottom-[86px] left-1/2 z-30 flex w-[88vw] max-w-[540px] -translate-x-1/2 flex-col items-center gap-3 sm:bottom-[92px] xl:hidden"
                  >
                    <div className="flex items-center justify-center gap-2.5 md:hidden">
                      {activeProject.gallery.map((src, idx) => {
                        const isActive = idx === slideIndex;
                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setSlideIndex(idx)}
                            aria-label={`Aperçu ${idx + 1}`}
                            className="relative h-[30px] w-[52px] transition-opacity duration-300"
                            style={{ opacity: isActive ? 1 : 0.5 }}
                          >
                            <span className="block h-full w-full overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={src}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </span>
                            {isActive && (
                              <span
                                className="pointer-events-none absolute -inset-[3px] border"
                                style={{ borderColor: theme.fg }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-center text-[9px] font-bold tracking-[0.12em] uppercase opacity-75">
                      {activeProject.year} · {activeProject.category} · {activeProject.role}
                    </p>
                    <p className="line-clamp-3 text-center text-[9.5px] font-bold leading-[13px] tracking-[0.03em] uppercase opacity-85">
                      {activeProject.description}
                    </p>
                    <p className="text-center text-[8.5px] font-bold tracking-[0.08em] uppercase opacity-60">
                      {activeProject.tech.slice(0, 6).join(" · ")}
                    </p>
                  </motion.div>

                  {/* Compact Live Site CTA for < XL viewports */}
                  <motion.a
                    key="mobile-live-cta"
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-[32px] left-[24px] z-30 border-b pb-1 text-[11px] font-bold tracking-[0.08em] uppercase transition-opacity hover:opacity-70 sm:left-1/2 sm:-translate-x-1/2 xl:hidden"
                    style={{ borderColor: theme.fg }}
                  >
                    ↗ VOIR LE SITE
                  </motion.a>
                </>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Persistent Giant Display Title (glides smoothly from front spread to condensed behind stage) */}
      {(mode === "carousel" || mode === "case-study") && !aboutOpen && (
        <SpreadTitle
          key={`title-${activeProject.id}`}
          projectId={activeProject.id}
          rows={activeProject.displayRows}
          mode={mode}
          color={theme.fg}
        />
      )}

      {/* ==================== ABOUT OVERLAY ==================== */}
      <AnimatePresence>
        {aboutOpen && (
          <motion.section
            key="about-overlay"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.55, ease: EASE_ARISTIDE }}
            className="fixed inset-0 z-30 overflow-y-auto bg-[#111110] px-[24px] pb-36 pt-24 text-[#E8E2D5] sm:px-[50px] sm:pb-44 sm:pt-28"
          >
            <div className="mx-auto max-w-5xl">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#D5B883] uppercase">
                À PROPOS · PARIS, FRANCE
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.88] tracking-[-0.02em] uppercase">
                ARCHITECTE WEB, MOBILE &amp; PRODUITS IA
              </h1>

              <div className="mt-10 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-2">
                <div className="space-y-4 text-[10.5px] font-bold leading-[16px] tracking-[0.04em] uppercase text-[#E8E2D5]/80">
                  {profile.about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="space-y-10">
                  <div className="grid grid-cols-3 gap-6 border-b border-white/10 pb-8">
                    <div>
                      <p className="text-[9px] font-bold tracking-[0.16em] text-[#D5B883] uppercase">
                        DÉPÔTS
                      </p>
                      <p className="mt-2 font-display text-4xl">
                        {profile.stats.repos}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-[0.16em] text-[#D5B883] uppercase">
                        COMMUNAUTÉ
                      </p>
                      <p className="mt-2 font-display text-4xl">
                        {profile.stats.followers}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-[0.16em] text-[#D5B883] uppercase">
                        DEPUIS
                      </p>
                      <p className="mt-2 font-display text-4xl">
                        {profile.stats.since}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {skillGroups.map((group) => (
                      <div key={group.category}>
                        <p className="text-[9px] font-bold tracking-[0.16em] text-[#D5B883] uppercase">
                          {group.category}
                        </p>
                        <ul className="mt-2 space-y-1 text-[10px] font-bold tracking-[0.04em] uppercase text-[#E8E2D5]/75">
                          {group.skills.map((skill) => (
                            <li key={skill}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
