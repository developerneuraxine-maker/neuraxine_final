"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BRAND } from "@/lib/constants";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#ecosystem" },
    { label: "Demos", href: "#demos" },
    { label: "Process", href: "#process" },
    { label: "Results", href: "#results" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg overflow-hidden border border-white/10 group-hover:border-neon/30 flex items-center justify-center bg-black transition-colors">
            <img src="/logo.jpg" alt="Neuraxine Logo" className="h-full w-full object-cover" />
          </div>
          <span className="text-sm font-semibold tracking-widest text-white group-hover:text-neon transition-colors">
            NEURAXINE
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-wider text-silver/70 hover:text-neon transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <MagneticButton href="#contact" variant="primary" className="!px-5 !py-2 !text-xs">
          Book Demo
        </MagneticButton>
      </div>
    </motion.nav>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 text-xs tracking-[0.4em] text-neon/80 uppercase">
            Next-Generation AI Automation
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
            Automate Your Business with{" "}
            <span className="text-neon">Neuraxine AI</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-silver/70 max-w-2xl mx-auto leading-relaxed">
            {BRAND.tagline}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton href="#contact" variant="primary">
              Book Free Demo
            </MagneticButton>
            <MagneticButton href="#ecosystem" variant="secondary">
              Explore AI Systems
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-silver/40">
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-8 w-px bg-gradient-to-b from-neon/60 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
