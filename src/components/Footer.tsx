import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          © {year} {profile.name}
        </p>
        <p className="text-xs text-muted/60">
          Next.js · TypeScript · Tailwind
        </p>
      </div>
    </footer>
  );
}
