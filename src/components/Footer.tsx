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
    <footer className="border-t border-border">
      <div className="page-container flex flex-col gap-8 py-16 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-lg text-foreground">{profile.name}</p>
          <p className="mt-2 text-sm text-muted">{profile.role}</p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2">
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

        <p className="text-xs text-muted/60">
          © {year} — Next.js · TypeScript
        </p>
      </div>
    </footer>
  );
}
