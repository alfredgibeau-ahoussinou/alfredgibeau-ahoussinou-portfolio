import type { Metadata } from "next";
import { Antonio, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const antonio = Antonio({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alfredgibeau-ahoussinou-portfolio.vercel.app"),
  title: `${profile.name} | ${profile.role}`,
  description: `${profile.bio} ${profile.tagline}`,
  openGraph: {
    title: `${profile.name} | Portfolio`,
    description: `${profile.bio} ${profile.tagline}`,
    type: "website",
    images: [{ url: profile.avatar, alt: profile.name }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${antonio.variable} ${jakarta.variable}`}>
      <body className="bg-[#141312] font-sans text-[#E8E2D5] antialiased selection:bg-[#D5B883]/30">
        {children}
      </body>
    </html>
  );
}
