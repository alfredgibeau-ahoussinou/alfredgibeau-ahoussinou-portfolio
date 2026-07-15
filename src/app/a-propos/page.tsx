import type { Metadata } from "next";
import Image from "next/image";
import { AboutContent } from "@/components/AboutContent";
import { Skills } from "@/components/Skills";
import { profile } from "@/data/profile";
import { getAvatarUrl } from "@/lib/images";

export const metadata: Metadata = {
  title: `À propos — ${profile.name}`,
  description: profile.about.join(" "),
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-section pt-32">
        <div className="page-container">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden bg-surface lg:mx-0 lg:max-w-none">
              <Image
                src={getAvatarUrl(1000)}
                alt={`Portrait de ${profile.name}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 35vw"
              />
            </div>
            <AboutContent />
          </div>
        </div>
      </section>
      <Skills />
    </main>
  );
}
