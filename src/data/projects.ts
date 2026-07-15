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
    id: "aether-studio",
    slug: "aether-studio",
    title: "Aether Studio",
    description:
      "Plateforme premium d'intelligence créative et d'automatisation IA — comptes IA spécialisés, automatisations quotidiennes prêtes à activer et bibliothèque de prompts viraux pour LinkedIn, Reels, YouTube et CV optimisés ATS. Intégrations Notion, Slack, LinkedIn et Indeed.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Prisma", "Stripe", "Framer Motion"],
    github: "https://github.com/alfredgibeau-ahoussinou/aether-studio",
    live: "https://aether-studio-fawn.vercel.app",
    image: "/projects/aether-studio.svg",
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
    image: "/projects/jw-games-logo.png",
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
    image: "/projects/proday-logo.png",
    featured: true,
  },
  {
    id: "xo-hair",
    slug: "xo-hair",
    title: "XOhair",
    description:
      "Site de réservation pour salon de coiffure à Melun — pose de perruques, customisation et mèches Virgin hair. Formulaire de RDV avec confirmations email via Brevo.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Brevo"],
    github: "https://github.com/alfredgibeau-ahoussinou/XO-HAIR",
    live: "https://xo-hair-melun.netlify.app",
    image: "/projects/xo-hair.svg",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
