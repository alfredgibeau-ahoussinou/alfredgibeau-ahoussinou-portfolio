export type LogoScale = {
  maxWidth?: number;
  maxHeight?: number;
};

export type ProjectTheme = {
  bg: string;
  fg: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  displayRows: string[];
  year: string;
  category: string;
  role: string;
  summary: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  video?: string;
  gallery: string[];
  theme: ProjectTheme;
  logoScale?: LogoScale;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "proday",
    slug: "proday",
    title: "ProDay",
    displayRows: ["PRODAY"],
    year: "MAI 2026",
    category: "SPORTSTECH MOBILE",
    role: "CEO & LEAD DEV",
    summary:
      "INFRASTRUCTURE COMPLÈTE DU FOOTBALL MODERNE : APP MOBILE MULTI-RÔLES (COACH, CLUB, JOUEUR, PARENT, SPONSOR), SITE 3D, BACKEND SERVERLESS, WORKERS FFF & ASSISTANT IA.",
    description:
      "Écosystème complet développé chez SAS PRODAY : application mobile iOS/Android (calendrier séances & matchs, pilotage club, finances, licences, mercato, suivi santé HealthKit/Health Connect, mode hors-ligne SQLite), site vitrine Next.js + Three.js, Cloud Functions Firebase, assistant IA OpenAI, paiements Stripe & IAP et workers temps réel.",
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase Functions",
      "Firestore",
      "Next.js 16",
      "Three.js",
      "OpenAI",
      "Stripe",
      "SQLite",
      "HealthKit",
      "Electron",
    ],
    github: "https://github.com/alfredgibeau-ahoussinou/PRODAY-docs",
    live: "https://proday75.fr",
    image: "/projects/proday-lockup-transparent.png",
    video: "/previews/proday-site-capture.mp4",
    gallery: [
      "/previews/proday-1.jpg",
      "/previews/proday-app-1.jpg",
      "/previews/proday-app-2.jpg",
      "/previews/proday-2.jpg",
    ],
    theme: { bg: "#111317", fg: "#E8E2D5" },
    logoScale: { maxWidth: 84, maxHeight: 50 },
    featured: true,
  },
  {
    id: "gradiie-hair",
    slug: "gradiie-hair",
    title: "Gradiie.Hair",
    displayRows: ["GRADIIE", "HAIR"],
    year: "NOVEMBRE 2026",
    category: "MAISON DE COIFFURE",
    role: "DESIGN & FULL STACK",
    summary:
      "SITE VITRINE ÉDITORIAL ET PLATEFORME DE RÉSERVATION SUR MESURE POUR MAISON DE COIFFURE : GALERIE VIDÉO, STORIES, ESPACE CLIENTE, FIDÉLITÉ ET ADMIN.",
    description:
      "Application web complète conçue pour Gradiie.Hair à Savigny-le-Temple (braids, tissages et locs) : prise de rendez-vous avec gestion d'acompte (PayPal / Wero), galerie de 16 réalisations vidéo, stories interactives, carte de fidélité, espace cliente et interface d'administration.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Réservation",
      "Espace Cliente",
      "Admin",
      "Netlify",
    ],
    github: "",
    live: "https://gradiie-hair.netlify.app",
    image: "/projects/aether-studio.svg",
    gallery: [
      "/previews/gradis-r-1.jpg",
      "/previews/gradis-r-2.jpg",
    ],
    theme: { bg: "#FDF5F8", fg: "#B02863" },
    logoScale: { maxWidth: 84, maxHeight: 50 },
    featured: true,
  },
  {
    id: "alfahou",
    slug: "alfahou",
    title: "AlfAhou",
    displayRows: ["ALFAHOU"],
    year: "JUILLET 2026",
    category: "IA MULTIMÉDIA",
    role: "CRÉATEUR & LEAD DEV",
    summary:
      "IA MULTIMÉDIA FROM SCRATCH POUR GÉNÉRATION TEXTE, IMAGE, VIDÉO ET ANALYSE PDF.",
    description:
      "Plateforme d'intelligence artificielle multimédia conçue from scratch : génération et traitement texte, image, vidéo et PDF.",
    tech: ["Next.js", "TypeScript", "IA Multimédia", "LLM"],
    github: "https://github.com/alfredgibeau-ahoussinou/alfahou",
    live: "https://alfahou.netlify.app",
    image: "/projects/aether-studio.svg",
    gallery: [
      "/previews/alfahou-1.jpg",
      "/previews/alfahou-2.jpg",
    ],
    theme: { bg: "#14161D", fg: "#D9C398" },
    logoScale: { maxWidth: 84, maxHeight: 50 },
    featured: true,
  },
  {
    id: "aether-studio",
    slug: "aether-studio",
    title: "Aether Studio",
    displayRows: ["AETHER", "STUDIO"],
    year: "JUILLET 2026",
    category: "INTELLIGENCE CRÉATIVE",
    role: "FULL STACK & IA",
    summary:
      "PLATEFORME D'AUTOMATISATION IA ET DE PROMPTS VIRAUX CONNECTÉE À NOTION, SLACK, LINKEDIN ET INDEED.",
    description:
      "Plateforme premium d'intelligence créative et d'automatisation IA : comptes IA spécialisés, automatisations quotidiennes prêtes à activer et bibliothèque de prompts viraux pour LinkedIn, Reels, YouTube et CV optimisés ATS. Intégrations Notion, Slack, LinkedIn et Indeed.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Prisma", "Stripe", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/aether-studio",
    live: "https://aether-studio-fawn.vercel.app",
    image: "/projects/aether-studio.svg",
    gallery: [
      "/previews/aether-studio-1.jpg",
      "/previews/aether-studio-2.jpg",
    ],
    theme: { bg: "#D0D7DF", fg: "#824EC2" },
    logoScale: { maxWidth: 84, maxHeight: 50 },
    featured: true,
  },
  {
    id: "code-academy-alfred",
    slug: "code-academy-alfred",
    title: "Code Academy Alfred",
    displayRows: ["CODE", "ACADEMY"],
    year: "JUILLET 2026",
    category: "PLATEFORME ÉDUTECH",
    role: "ARCHITECTURE & UI",
    summary:
      "ACADÉMIE BILINGUE FR/EN DE DÉVELOPPEMENT WEB ET DATA AVEC 18 MODULES INTERACTIFS ET SYNTHÈSE VOCALE.",
    description:
      "Académie bilingue FR/EN pour apprendre le développement web et la data de A à Z, avec 18 modules structurés, progression locale, lecture vocale Web Speech et synthèse TTS intégrée.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "next-intl", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/code-academy-alfred-docs",
    live: "https://code-academy-alfred.netlify.app",
    image: "/projects/code-academy-alfred.svg",
    gallery: [
      "/previews/code-academy-alfred-1.jpg",
      "/previews/code-academy-alfred-2.jpg",
    ],
    theme: { bg: "#101419", fg: "#D5B883" },
    logoScale: { maxWidth: 56, maxHeight: 56 },
    featured: true,
  },
  {
    id: "nailsconnection-z",
    slug: "nailsconnection-z",
    title: "NailsConnection.Z",
    displayRows: ["NAILS", "CONNECTION.Z"],
    year: "JUILLET 2026",
    category: "VITRINE & RÉSERVATION",
    role: "FULL STACK & MOTION",
    summary:
      "EXPÉRIENCE DE RÉSERVATION SUR MESURE POUR NAIL TECH À GRENOBLE AVEC ESPACE CLIENTE ET VALIDATION ADMIN.",
    description:
      "Site vitrine et réservation en ligne pour nail tech à Grenoble : prestations gel, capsules, manucure et nail art. Créneaux natifs, espace cliente, validation admin et confirmations email via Resend.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Netlify Blobs", "Resend"],
    github: "https://github.com/alfredgibeau-ahoussinou/nailsconnection-z-docs",
    live: "https://nailsconnection-z.netlify.app",
    image: "/projects/nailsconnection-z.svg",
    gallery: [
      "/previews/nailsconnection-z-1.jpg",
      "/previews/nailsconnection-z-2.jpg",
    ],
    theme: { bg: "#EFEAE4", fg: "#7A493E" },
    logoScale: { maxWidth: 84, maxHeight: 50 },
    featured: true,
  },
  {
    id: "jw-games",
    slug: "jw-games",
    title: "JW Games",
    displayRows: ["JW GAMES"],
    year: "JUIN 2026",
    category: "GAMING & MÉDIATHÈQUE",
    role: "FULL STACK & PWA",
    summary:
      "APPLICATION PWA DE 15 MODES DE JEU, 18 PARCOURS D'ÉTUDE ET 137 VIDÉOS AVEC PROGRESSION XP.",
    description:
      "Application web de jeux bibliques et médiathèque vidéo : 15 modes de jeu, 18 parcours d'étude, 137 vidéos et PWA installable avec profil local XP/badges.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Zustand", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/jw-games",
    live: "https://jwgames.netlify.app",
    image: "/projects/jw-games-logo.png",
    gallery: [
      "/previews/jw-games-1.jpg",
      "/previews/jw-games-2.jpg",
    ],
    theme: { bg: "#E7E3DA", fg: "#253A30" },
    logoScale: { maxWidth: 68, maxHeight: 68 },
    featured: true,
  },
  {
    id: "xo-hair",
    slug: "xo-hair",
    title: "XOhair",
    displayRows: ["XOHAIR"],
    year: "JUILLET 2026",
    category: "SALON & RÉSERVATION",
    role: "FULL STACK & UI",
    summary:
      "SITE DE RÉSERVATION ÉDITORIAL POUR SALON DE COIFFURE À MELUN AVEC CONFIRMATIONS EMAIL BREVO.",
    description:
      "Site de réservation pour salon de coiffure à Melun : pose de perruques, customisation et mèches Virgin hair. Formulaire de RDV avec confirmations email via Brevo.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Brevo"],
    github: "https://github.com/alfredgibeau-ahoussinou/XO-HAIR",
    live: "https://xo-hair-melun.netlify.app",
    image: "/projects/xo-hair.svg",
    gallery: [
      "/previews/xo-hair-1.jpg",
      "/previews/xo-hair-2.jpg",
    ],
    theme: { bg: "#F3ECE4", fg: "#4A2E25" },
    logoScale: { maxWidth: 70, maxHeight: 45 },
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
