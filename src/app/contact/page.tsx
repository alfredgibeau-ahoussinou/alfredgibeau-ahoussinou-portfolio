import type { Metadata } from "next";
import { EditorialPortfolio } from "@/components/EditorialPortfolio";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Contact | ${profile.name}`,
  description:
    "Contactez Alfred Ahoussinou, développeur full stack & IA, pour une collaboration, un projet ou une mission.",
};

export default function ContactPage() {
  return <EditorialPortfolio initialMode="overview" initialAbout={true} />;
}
