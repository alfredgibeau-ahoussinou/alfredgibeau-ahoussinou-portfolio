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
      <section className="page-section-xl pt-36">
        <div className="page-container max-w-4xl">
          <ContactContent />
        </div>
      </section>
    </main>
  );
}
