import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";
import { AboutPortrait } from "@/components/AboutPortrait";
import { Skills } from "@/components/Skills";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `À propos — ${profile.name}`,
  description: profile.about.join(" "),
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-section-xl pt-36">
        <div className="page-container">
          <div className="grid gap-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-40">
            <AboutPortrait />
            <AboutContent />
          </div>
        </div>
      </section>
      <Skills />
    </main>
  );
}
