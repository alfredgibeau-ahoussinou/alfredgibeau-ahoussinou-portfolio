import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.bio,
  openGraph: {
    title: `${profile.name} — Portfolio`,
    description: profile.bio,
    type: "website",
    images: [{ url: profile.avatar }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#07070f] font-sans text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
