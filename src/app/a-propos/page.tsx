import type { Metadata } from "next";
import { EditorialPortfolio } from "@/components/EditorialPortfolio";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `À propos | ${profile.name}`,
  description: profile.bio,
};

export default function AboutPage() {
  return <EditorialPortfolio initialMode="overview" initialAbout={true} />;
}
