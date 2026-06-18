"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";

const STAGES = [
  { id: "ad", label: "Ad", color: "#C6FF00" },
  { id: "whatsapp", label: "WhatsApp", color: "#25D366" },
  { id: "crm", label: "CRM", color: "#C0C0C0" },
  { id: "followup", label: "Follow Up", color: "#C6FF00" },
  { id: "conversion", label: "Conversion", color: "#FFD700" },
];

export function MarketingFunnelDemo() {
  const [activeStage, setActiveStage] = useState(0);
  const [leadPosition, setLeadPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((s) => {
        const next = (s + 1) % STAGES.length;
        setLeadPosition(next);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassPanel className="h-[420px] p-6 flex flex-col">
      <p className="text-xs tracking-[0.3em] text-silver/40 uppercase mb-6">Marketing Funnel</p>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="relative w-full max-w-md">
          {/* Funnel shape */}
          <svg viewBox="0 0 400 300" className="w-full h-auto">
            <defs>
              <linearGradient id="funnelGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#C6FF00" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path
              d="M 50 30 L 350 30 L 280 270 L 120 270 Z"
              fill="url(#funnelGrad)"
              stroke="#C6FF00"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            {STAGES.map((stage, i) => {
              const y = 50 + i * 50;
              const width = 300 - i * 40;
              const x = 200 - width / 2;
              const isActive = i === activeStage;
              return (
                <g key={stage.id}>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={35}
                    rx={4}
                    fill={isActive ? stage.color : "#111111"}
                    fillOpacity={isActive ? 0.3 : 0.5}
                    stroke={isActive ? stage.color : "#333"}
                    strokeOpacity={isActive ? 0.8 : 0.3}
                  />
                  <text
                    x={200}
                    y={y + 22}
                    textAnchor="middle"
                    fill={isActive ? stage.color : "#C0C0C0"}
                    fontSize="12"
                    fontWeight={isActive ? "bold" : "normal"}
                  >
                    {stage.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Animated lead dot */}
          <motion.div
            animate={{
              top: `${15 + leadPosition * 18}%`,
              left: `${50 - leadPosition * 3}%`,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-4 w-4 rounded-full bg-neon shadow-[0_0_15px_#C6FF00]"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        {STAGES.map((stage, i) => (
          <div
            key={stage.id}
            className={`text-[10px] tracking-wider uppercase transition-colors ${
              i <= activeStage ? "text-neon" : "text-silver/30"
            }`}
          >
            {i < activeStage ? "✓" : i === activeStage ? "→" : "○"} {stage.label}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
