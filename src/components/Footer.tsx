import Link from "next/link";
import { profile } from "@/data/profile";

const footerLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/projets", label: "Projets" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle">
      <div className="page-container py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-serif text-xl tracking-tight text-foreground">
              {profile.name}
            </p>
            <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted/70">
              {profile.role} · Holberton School
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border-subtle pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted/50">
            © {year} Alfred Gibeau--Ahoussinou
          </p>
          <p className="font-mono text-[0.625rem] tracking-wider text-muted/40">
            Next.js · TypeScript · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
