"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChatbotDemo } from "@/components/demos/ChatbotDemo";
import { VoiceAgentDemo } from "@/components/demos/VoiceAgentDemo";
import { LeadGenDemo } from "@/components/demos/LeadGenDemo";
import { WhatsAppDemo } from "@/components/demos/WhatsAppDemo";
import { MarketingFunnelDemo } from "@/components/demos/MarketingFunnelDemo";

const DEMOS = [
  { id: "chatbot", label: "AI Chatbot", component: ChatbotDemo },
  { id: "voice", label: "Voice Agent", component: VoiceAgentDemo },
  { id: "leads", label: "Lead Generation", component: LeadGenDemo },
  { id: "whatsapp", label: "WhatsApp", component: WhatsAppDemo },
  { id: "funnel", label: "Marketing Funnel", component: MarketingFunnelDemo },
];

export function DemoLabSection() {
  const [active, setActive] = useState("chatbot");
  const ActiveDemo = DEMOS.find((d) => d.id === active)?.component || ChatbotDemo;

  return (
    <section id="demos" className="relative min-h-screen py-32 px-6">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] text-neon/80 uppercase mb-4">Live Demo Lab</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Experience <span className="text-neon">AI In Action</span>
          </h2>
          <p className="mt-4 text-silver/60 max-w-xl mx-auto">
            Interactive demos of our automation systems. Try them yourself.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {DEMOS.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActive(demo.id)}
              className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all ${
                active === demo.id
                  ? "bg-neon text-black font-medium"
                  : "bg-white/5 text-silver/60 border border-white/10 hover:border-neon/30 hover:text-neon"
              }`}
            >
              {demo.label}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto"
        >
          <ActiveDemo />
        </motion.div>
      </div>
    </section>
  );
}
