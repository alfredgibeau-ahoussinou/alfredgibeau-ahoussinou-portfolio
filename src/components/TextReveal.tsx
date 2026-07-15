"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_LUXURY, STAGGER } from "@/lib/motion";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  mode?: "word" | "line";
  delay?: number;
};

export function TextReveal({
  text,
  className = "",
  as = "span",
  mode = "word",
  delay = 0,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  const parts =
    mode === "line" ? text.split("\n") : text.split(/(\s+)/).filter(Boolean);

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Component className={className} aria-label={text}>
      {parts.map((part, i) => {
        const isSpace = mode === "word" && /^\s+$/.test(part);
        if (isSpace) return part;

        return (
          <motion.span
            key={`${part}-${i}`}
            initial={{ opacity: 0, y: mode === "line" ? "100%" : "0.35em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: delay + i * STAGGER,
              ease: EASE_LUXURY,
            }}
            className={
              mode === "line"
                ? "block overflow-hidden"
                : "inline-block overflow-hidden"
            }
          >
            <span className={mode === "line" ? "block" : "inline-block"}>
              {part}
            </span>
          </motion.span>
        );
      })}
    </Component>
  );
}
