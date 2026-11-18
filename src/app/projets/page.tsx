import type { Metadata } from "next";
import { EditorialPortfolio } from "@/components/EditorialPortfolio";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Projets | ${profile.name}`,
  description:
    "Sélection de réalisations full stack & IA : applications web, mobile et plateformes interactives.",
};

export default function ProjectsPage() {
  return <EditorialPortfolio initialMode="carousel" />;
}
