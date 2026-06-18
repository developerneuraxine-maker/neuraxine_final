"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PROCESS_STEPS } from "@/lib/constants";

interface ProcessSectionProps {
  activeStep: number;
}

export function ProcessSection({ activeStep }: ProcessSectionProps) {
  return (
    <section id="process" className="relative min-h-screen flex items-center py-32 px-6">
      <div className="relative z-10 mx-auto max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] text-neon/80 uppercase mb-4">Our Process</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            From Audit to <span className="text-neon">Automation</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassPanel
                glow={activeStep === i}
                className={`p-6 text-center transition-all duration-500 ${
                  activeStep === i ? "border-neon/50 scale-105" : ""
                }`}
              >
                <div
                  className={`mx-auto mb-4 h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                    activeStep === i
                      ? "bg-neon text-black shadow-[0_0_20px_rgba(198,255,0,0.4)]"
                      : "bg-white/5 text-neon border border-neon/20"
                  }`}
                >
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-silver/60 leading-relaxed">{step.description}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
