import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Contact — ${profile.name}`,
  description:
    "Contactez Alfred Ahoussinou — développeur full-stack & IA — pour une collaboration, un projet ou une mission.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-section-xl pt-36">
        <div className="page-container-narrow">
          <ContactContent />
        </div>
      </section>
    </main>
  );
}
