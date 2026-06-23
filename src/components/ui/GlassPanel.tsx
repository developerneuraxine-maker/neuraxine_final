"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassPanel({ children, className = "", glow = false }: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(198,255,0,0.3)] hover:shadow-[0_0_20px_rgba(198,255,0,0.05)] ${
        glow ? "shadow-[0_0_40px_rgba(198,255,0,0.08)]" : ""
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
      {children}
    </motion.div>
  );
}
