"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChatbotDemo } from "@/components/demos/ChatbotDemo";
import { VoiceAgentDemo } from "@/components/demos/VoiceAgentDemo";
import { LeadGenDemo } from "@/components/demos/LeadGenDemo";
import { WhatsAppDemo } from "@/components/demos/WhatsAppDemo";
import { MarketingFunnelDemo } from "@/components/demos/MarketingFunnelDemo";

const NXMetalCoin = dynamic(
  () => import("@/components/3d/NXMetalCoin").then((m) => m.NXMetalCoin),
  { ssr: false, loading: () => <div style={{ height: 280 }} /> }
);

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
    <section id="demos" className="relative min-h-screen pt-8 pb-32 px-6">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* 3-D metallic NX coin — atmospheric gradient backdrop matching andreigorskikh.digital */}
          <div className="flex justify-center mb-10" style={{ position: "relative" }}>
            {/* Wide atmospheric scene gradient: blue-gray sky at top, dark brownish-red at edges/bottom */}
            <div
              style={{
                position: "absolute",
                inset: "-60px -140px -20px -140px",
                background: `
                  radial-gradient(ellipse 70% 85% at 50% 12%, rgba(198,255,0,0.30) 0%, rgba(120,180,0,0.15) 30%, rgba(5,5,5,0.80) 58%, transparent 82%),
                  radial-gradient(ellipse 85% 55% at 50% 108%, rgba(30,60,0,0.70) 0%, rgba(5,10,0,0.40) 48%, transparent 70%)
                `,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Suspense fallback={<div style={{ height: 280 }} />}>
                <NXMetalCoin size={280} />
              </Suspense>
            </div>
          </div>

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
