import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { profile } from "@/data/profile";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alfredgibeau-ahoussinou.vercel.app"),
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.bio} ${profile.tagline}`,
  openGraph: {
    title: `${profile.name} — Portfolio`,
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
    <html
      lang="fr"
      className={`${inter.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body className="relative min-h-screen bg-background font-sans text-foreground antialiased">
        <div className="mesh-bg" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <Providers>
          <CustomCursor />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
