import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-zinc-500">
          © {year} {profile.name}. Tous droits réservés.
        </p>
        <p className="text-sm text-zinc-600">
          Construit avec Next.js, Tailwind CSS & Framer Motion
        </p>
      </div>
    </footer>
  );
}
