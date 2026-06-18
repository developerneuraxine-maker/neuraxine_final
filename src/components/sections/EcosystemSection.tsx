"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
  sortOrder: number;
}

interface EcosystemSectionProps {
  services: Service[];
  hoveredModule: string | null;
  onHoverModule: (id: string | null) => void;
}

export function EcosystemSection({ services, hoveredModule, onHoverModule }: EcosystemSectionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const active = selected || hoveredModule;
  const activeService = services.find((s) => s.id === active);

  return (
    <section id="ecosystem" className="relative min-h-screen flex items-center py-32 px-6">
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] text-neon/80 uppercase mb-4">AI Ecosystem</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Your Complete <span className="text-neon">Automation Universe</span>
          </h2>
          <p className="mt-4 text-silver/60 max-w-xl mx-auto">
            Hover the orbiting modules in 3D space or explore our service grid below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              onMouseEnter={() => {
                setSelected(service.id);
                onHoverModule(service.id);
              }}
              onMouseLeave={() => {
                setSelected(null);
                onHoverModule(null);
              }}
            >
              <GlassPanel
                glow={active === service.id}
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  active === service.id ? "border-neon/40 scale-[1.02]" : "hover:border-white/20"
                }`}
              >
                <span className="text-2xl">{service.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-silver/60 leading-relaxed">{service.description}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 text-center"
            >
              <GlassPanel glow className="inline-block px-8 py-4">
                <p className="text-neon text-sm">
                  <span className="font-semibold">{activeService.title}</span>
                  {" — "}
                  {activeService.description}
                </p>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
