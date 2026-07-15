export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "xo-hair",
    slug: "xo-hair",
    title: "XOhair",
    description:
      "Site de réservation pour salon de coiffure à Melun — pose de perruques, customisation et mèches Virgin hair. Formulaire de RDV avec confirmations email via Brevo.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Brevo"],
    github: "https://github.com/alfredgibeau-ahoussinou/XO-HAIR",
    image: "/projects/xo-hair.png",
    featured: true,
  },
  {
    id: "jw-games",
    slug: "jw-games",
    title: "JW Games",
    description:
      "Application web de jeux bibliques et médiathèque vidéo — 15 modes de jeu, 18 parcours d'étude, 137 vidéos et PWA installable avec profil local XP/badges.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Zustand", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/jw-games",
    live: "https://jwgames.netlify.app",
    image: "/projects/jw-games.png",
    featured: true,
  },
  {
    id: "proday",
    slug: "proday",
    title: "ProDay",
    description:
      "Application mobile sportive — profil athlète, mercato, journal d'activités et saison. Documentation publique du produit avec programme bêta sur proday75.fr.",
    tech: ["React Native", "Mobile", "Product Design"],
    github: "https://github.com/alfredgibeau-ahoussinou/PRODAY-docs",
    live: "https://proday75.fr",
    image: "/projects/proday.png",
    featured: true,
  },
  {
    id: "stonefaste",
    slug: "stonefaste",
    title: "StoneFaste",
    description:
      "Plateforme premium de location de voitures — catalogue, réservation multi-étapes, hero vidéo et animations fluides. Mercedes GLC Coupé AMG en vedette.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/StoneFaste",
    image: "/projects/stonefaste.png",
    featured: true,
  },
  {
    id: "blade",
    slug: "blade",
    title: "BLADE Barber Concierge",
    description:
      "API REST + WebSocket temps réel pour app de coiffure à domicile — tracking GPS, réservations, paiements Stripe, push notifications APNs et authentification JWT.",
    tech: ["Node.js", "Express", "PostgreSQL", "Socket.io", "Stripe"],
    github: "https://github.com/alfredgibeau-ahoussinou/LAME-Barber-Concierge",
    image: "/projects/blade.png",
  },
  {
    id: "stonelead",
    slug: "stonelead",
    title: "StoneLead",
    description:
      "Agence SMA (Social Media Advertising) — monorepo full-stack avec dashboard, prospection digitale, authentification NextAuth et architecture scalable.",
    tech: ["Next.js 14", "Express", "PostgreSQL", "NextAuth", "Docker"],
    github: "https://github.com/alfredgibeau-ahoussinou/smaloc",
    image: "/projects/stonelead.png",
  },
  {
    id: "synapse-ai",
    slug: "synapse-ai",
    title: "Synapse AI",
    description:
      "Générateur de résumés de contenu long — MVP serverless avec upload audio/vidéo vers Supabase, ASR Whisper et synthèse LLM Gemini.",
    tech: ["Next.js", "Supabase", "Python", "Whisper", "Gemini"],
    github: "https://github.com/alfredgibeau-ahoussinou/Synapse-AI---G-n-rateur-de-R-sum-s-de-Contenu-Long",
    image: "/projects/synapse-ai.png",
  },
  {
    id: "runako",
    slug: "runako",
    title: "RUNAKO",
    description:
      "Langage de programmation pédagogique inspiré du français et de Python — syntaxe intuitive pour l'apprentissage et le prototypage rapide.",
    tech: ["Python", "Interpreter", "DSL"],
    github: "https://github.com/alfredgibeau-ahoussinou/Runako",
    live: "https://runako-pi.vercel.app",
    image: "/projects/runako.png",
  },
  {
    id: "evasport",
    slug: "evasport",
    title: "EvaSport",
    description:
      "Site vitrine sportif responsive — présentation de l'activité, design HTML/CSS moderne déployé sur Vercel.",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    github: "https://github.com/alfredgibeau-ahoussinou/EvaSporthtml",
    live: "https://eva-sporthtml.vercel.app",
    image: "/projects/evasport.png",
  },
  {
    id: "conseil-immo",
    slug: "conseil-immo",
    title: "Conseil Immo",
    description:
      "Site web immobilier — vitrine professionnelle pour conseil et présentation de biens, interface soignée et responsive.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/alfredgibeau-ahoussinou/conseil-immo",
    image: "/projects/conseil-immo.png",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
