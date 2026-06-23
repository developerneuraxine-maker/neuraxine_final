"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";

const FLOWS = [
  {
    title: "Lead Qualification",
    messages: [
      { from: "bot", text: "Hi! 👋 Thanks for reaching out. What service are you interested in?" },
      { from: "user", text: "I need AI automation for my business" },
      { from: "bot", text: "Great! What's your monthly lead volume?" },
      { from: "user", text: "About 200 leads per month" },
      { from: "bot", text: "Perfect! You're a qualified lead. Scheduling a demo now... ✅" },
    ],
  },
  {
    title: "Appointment Booking",
    messages: [
      { from: "bot", text: "Would you like to book a free consultation?" },
      { from: "user", text: "Yes, tomorrow works" },
      { from: "bot", text: "I have 2:00 PM and 4:00 PM available tomorrow." },
      { from: "user", text: "2 PM please" },
      { from: "bot", text: "Booked! 📅 Calendar invite sent. See you tomorrow at 2 PM." },
    ],
  },
  {
    title: "Follow-up Automation",
    messages: [
      { from: "bot", text: "Hi Sarah! Following up on our demo yesterday." },
      { from: "user", text: "Yes, I'm interested in the Growth plan" },
      { from: "bot", text: "Excellent! Sending proposal and contract now..." },
      { from: "bot", text: "Proposal sent! 📄 I'll check in tomorrow if I don't hear back." },
    ],
  },
];

export function WhatsAppDemo() {
  const [flowIndex, setFlowIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    // Avoid synchronous setState inside effect to prevent cascading renders.
    const resetTimer = setTimeout(() => setVisibleMessages(0), 0);
    const flow = FLOWS[flowIndex];
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleMessages(count);
      if (count >= flow.messages.length) clearInterval(interval);
    }, 1200);
    return () => {
      clearTimeout(resetTimer);
      clearInterval(interval);
    };
  }, [flowIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlowIndex((i) => (i + 1) % FLOWS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const flow = FLOWS[flowIndex];

  return (
    <GlassPanel className="h-[420px] flex flex-col overflow-hidden">
      <div className="flex items-center gap-3 bg-[#075E54] px-5 py-3">
        <div className="h-8 w-8 rounded-full bg-neon/20 flex items-center justify-center text-neon text-xs font-bold">N</div>
        <div>
          <p className="text-sm font-medium text-white">Neuraxine AI</p>
          <p className="text-[10px] text-white/60">WhatsApp Business</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={flow.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-auto text-[10px] text-neon/80 bg-neon/10 px-2 py-1 rounded-full"
          >
            {flow.title}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a1628]/50">
        {flow.messages.slice(0, visibleMessages).map((msg, i) => (
          <motion.div
            key={`${flowIndex}-${i}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                msg.from === "user"
                  ? "bg-[#005C4B] text-white"
                  : "bg-[#1F2C34] text-white/90"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
