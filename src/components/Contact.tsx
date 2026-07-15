"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Contact"
          title="Travaillons ensemble"
          subtitle="Un projet en tête ? Une collaboration ? N'hésitez pas à me contacter."
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-14 max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-[#0c0c16] to-cyan-500/10 p-8 sm:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative space-y-6">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-white/10 hover:bg-white/[0.06]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500/20">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Email</p>
                <p className="font-medium text-white">{profile.email}</p>
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-white/10 hover:bg-white/[0.06]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition group-hover:bg-cyan-500/20">
                <GithubIcon size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500">GitHub</p>
                <p className="font-medium text-white">@{profile.username}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Localisation</p>
                <p className="font-medium text-white">{profile.location}</p>
              </div>
            </div>

            <a
              href={`mailto:${profile.email}?subject=Collaboration%20portfolio`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:shadow-violet-500/40"
            >
              <Send size={16} />
              Envoyer un message
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
