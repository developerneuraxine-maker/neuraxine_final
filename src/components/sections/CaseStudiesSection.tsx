"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { CASE_STUDIES } from "@/lib/constants";

export function CaseStudiesSection() {
  return (
    <section id="results" className="relative min-h-screen flex items-center py-32 px-6">
      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] text-neon/80 uppercase mb-4">Proven Results</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Real Impact, <span className="text-neon">Real Numbers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.label}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{ perspective: 1000 }}
            >
              <GlassPanel glow className="p-8 text-center h-full">
                <motion.div
                  animate={{ textShadow: ["0 0 20px rgba(198,255,0,0.3)", "0 0 40px rgba(198,255,0,0.6)", "0 0 20px rgba(198,255,0,0.3)"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-5xl md:text-6xl font-bold text-neon mb-3"
                >
                  {study.metric}
                </motion.div>
                <h3 className="text-lg font-semibold text-white">{study.label}</h3>
                <p className="mt-2 text-sm text-silver/50">{study.description}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
