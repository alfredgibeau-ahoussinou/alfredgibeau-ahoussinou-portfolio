export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  gradient: string;
  accent: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "xo-hair",
    title: "XOhair",
    description:
      "Site de réservation pour salon de coiffure à Melun — pose de perruques, customisation et mèches Virgin hair. Formulaire de RDV avec confirmations email via Brevo.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Brevo"],
    github: "https://github.com/alfredgibeau-ahoussinou/XO-HAIR",
    gradient: "from-rose-500/20 via-fuchsia-500/10 to-violet-600/20",
    accent: "#f472b6",
    featured: true,
  },
  {
    id: "jw-games",
    title: "JW Games",
    description:
      "Application web de jeux bibliques et médiathèque vidéo — 15 modes de jeu, 18 parcours d'étude, 137 vidéos et PWA installable avec profil local XP/badges.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Zustand", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/jw-games",
    live: "https://jwgames.netlify.app",
    gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-600/20",
    accent: "#22d3ee",
    featured: true,
  },
  {
    id: "proday",
    title: "ProDay",
    description:
      "Application mobile sportive — profil athlète, mercato, journal d'activités et saison. Documentation publique du produit avec programme bêta sur proday75.fr.",
    tech: ["React Native", "Mobile", "Product Design"],
    github: "https://github.com/alfredgibeau-ahoussinou/PRODAY-docs",
    live: "https://proday75.fr",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-600/20",
    accent: "#34d399",
    featured: true,
  },
  {
    id: "stonefaste",
    title: "StoneFaste",
    description:
      "Plateforme premium de location de voitures — catalogue, réservation multi-étapes, hero vidéo et animations fluides. Mercedes GLC Coupé AMG en vedette.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/StoneFaste",
    gradient: "from-amber-500/20 via-orange-500/10 to-red-600/20",
    accent: "#fbbf24",
    featured: true,
  },
  {
    id: "blade",
    title: "BLADE Barber Concierge",
    description:
      "API REST + WebSocket temps réel pour app de coiffure à domicile — tracking GPS, réservations, paiements Stripe, push notifications APNs et authentification JWT.",
    tech: ["Node.js", "Express", "PostgreSQL", "Socket.io", "Stripe"],
    github: "https://github.com/alfredgibeau-ahoussinou/LAME-Barber-Concierge",
    gradient: "from-slate-500/20 via-zinc-500/10 to-neutral-600/20",
    accent: "#a1a1aa",
  },
  {
    id: "stonelead",
    title: "StoneLead",
    description:
      "Agence SMA (Social Media Advertising) — monorepo full-stack avec dashboard, prospection digitale, authentification NextAuth et architecture scalable.",
    tech: ["Next.js 14", "Express", "PostgreSQL", "NextAuth", "Docker"],
    github: "https://github.com/alfredgibeau-ahoussinou/smaloc",
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-600/20",
    accent: "#a78bfa",
  },
  {
    id: "synapse-ai",
    title: "Synapse AI",
    description:
      "Générateur de résumés de contenu long — MVP serverless avec upload audio/vidéo vers Supabase, ASR Whisper et synthèse LLM Gemini.",
    tech: ["Next.js", "Supabase", "Python", "Whisper", "Gemini"],
    github: "https://github.com/alfredgibeau-ahoussinou/Synapse-AI---G-n-rateur-de-R-sum-s-de-Contenu-Long",
    gradient: "from-sky-500/20 via-indigo-500/10 to-violet-600/20",
    accent: "#38bdf8",
  },
  {
    id: "runako",
    title: "RUNAKO",
    description:
      "Langage de programmation pédagogique inspiré du français et de Python — syntaxe intuitive pour l'apprentissage et le prototypage rapide.",
    tech: ["Python", "Interpreter", "DSL"],
    github: "https://github.com/alfredgibeau-ahoussinou/Runako",
    live: "https://runako-pi.vercel.app",
    gradient: "from-lime-500/20 via-green-500/10 to-emerald-600/20",
    accent: "#a3e635",
  },
  {
    id: "evasport",
    title: "EvaSport",
    description:
      "Site vitrine sportif responsive — présentation de l'activité, design HTML/CSS moderne déployé sur Vercel.",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    github: "https://github.com/alfredgibeau-ahoussinou/EvaSporthtml",
    live: "https://eva-sporthtml.vercel.app",
    gradient: "from-red-500/20 via-rose-500/10 to-pink-600/20",
    accent: "#fb7185",
  },
  {
    id: "conseil-immo",
    title: "Conseil Immo",
    description:
      "Site web immobilier — vitrine professionnelle pour conseil et présentation de biens, interface soignée et responsive.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/alfredgibeau-ahoussinou/conseil-immo",
    gradient: "from-blue-500/20 via-sky-500/10 to-cyan-600/20",
    accent: "#60a5fa",
  },
];
