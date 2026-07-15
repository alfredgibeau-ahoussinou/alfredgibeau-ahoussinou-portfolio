export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    id: "xo-hair",
    title: "XOhair",
    description:
      "Site de réservation pour salon de coiffure à Melun — pose de perruques, customisation et mèches Virgin hair. Formulaire de RDV avec confirmations email via Brevo.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Brevo"],
    github: "https://github.com/alfredgibeau-ahoussinou/XO-HAIR",
  },
  {
    id: "jw-games",
    title: "JW Games",
    description:
      "Application web de jeux bibliques et médiathèque vidéo — 15 modes de jeu, 18 parcours d'étude, 137 vidéos et PWA installable avec profil local XP/badges.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Zustand", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/jw-games",
    live: "https://jwgames.netlify.app",
  },
  {
    id: "proday",
    title: "ProDay",
    description:
      "Application mobile sportive — profil athlète, mercato, journal d'activités et saison. Documentation publique du produit avec programme bêta sur proday75.fr.",
    tech: ["React Native", "Mobile", "Product Design"],
    github: "https://github.com/alfredgibeau-ahoussinou/PRODAY-docs",
    live: "https://proday75.fr",
  },
  {
    id: "stonefaste",
    title: "StoneFaste",
    description:
      "Plateforme premium de location de voitures — catalogue, réservation multi-étapes, hero vidéo et animations fluides. Mercedes GLC Coupé AMG en vedette.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/StoneFaste",
  },
  {
    id: "blade",
    title: "BLADE Barber Concierge",
    description:
      "API REST + WebSocket temps réel pour app de coiffure à domicile — tracking GPS, réservations, paiements Stripe, push notifications APNs et authentification JWT.",
    tech: ["Node.js", "Express", "PostgreSQL", "Socket.io", "Stripe"],
    github: "https://github.com/alfredgibeau-ahoussinou/LAME-Barber-Concierge",
  },
  {
    id: "stonelead",
    title: "StoneLead",
    description:
      "Agence SMA (Social Media Advertising) — monorepo full-stack avec dashboard, prospection digitale, authentification NextAuth et architecture scalable.",
    tech: ["Next.js 14", "Express", "PostgreSQL", "NextAuth", "Docker"],
    github: "https://github.com/alfredgibeau-ahoussinou/smaloc",
  },
  {
    id: "synapse-ai",
    title: "Synapse AI",
    description:
      "Générateur de résumés de contenu long — MVP serverless avec upload audio/vidéo vers Supabase, ASR Whisper et synthèse LLM Gemini.",
    tech: ["Next.js", "Supabase", "Python", "Whisper", "Gemini"],
    github: "https://github.com/alfredgibeau-ahoussinou/Synapse-AI---G-n-rateur-de-R-sum-s-de-Contenu-Long",
  },
  {
    id: "runako",
    title: "RUNAKO",
    description:
      "Langage de programmation pédagogique inspiré du français et de Python — syntaxe intuitive pour l'apprentissage et le prototypage rapide.",
    tech: ["Python", "Interpreter", "DSL"],
    github: "https://github.com/alfredgibeau-ahoussinou/Runako",
    live: "https://runako-pi.vercel.app",
  },
  {
    id: "evasport",
    title: "EvaSport",
    description:
      "Site vitrine sportif responsive — présentation de l'activité, design HTML/CSS moderne déployé sur Vercel.",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    github: "https://github.com/alfredgibeau-ahoussinou/EvaSporthtml",
    live: "https://eva-sporthtml.vercel.app",
  },
  {
    id: "conseil-immo",
    title: "Conseil Immo",
    description:
      "Site web immobilier — vitrine professionnelle pour conseil et présentation de biens, interface soignée et responsive.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/alfredgibeau-ahoussinou/conseil-immo",
  },
];
