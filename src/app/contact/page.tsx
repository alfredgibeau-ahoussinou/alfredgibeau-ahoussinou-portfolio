import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Contact — ${profile.name}`,
  description:
    "Contactez Alfred Gibeau--Ahoussinou pour une collaboration, un projet ou une opportunité.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-section pt-32">
        <div className="page-container max-w-3xl">
          <ContactContent />
        </div>
      </section>
    </main>
  );
}
