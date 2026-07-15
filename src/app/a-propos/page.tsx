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
      <section className="page-section pt-36">
        <div className="page-container">
          <div className="grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
            <div className="portrait-frame relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden bg-surface lg:mx-0 lg:max-w-none lg:sticky lg:top-32 lg:self-start">
              <Image
                src={getAvatarUrl(1000)}
                alt={`Portrait de ${profile.name}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>
            <AboutContent />
          </div>
        </div>
      </section>
      <Skills />
    </main>
  );
}
