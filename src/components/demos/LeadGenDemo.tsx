"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";

type Step = "form" | "processing" | "crm" | "done";

export function LeadGenDemo() {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ name: "", email: "", company: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStep("processing");
    setTimeout(() => setStep("crm"), 1500);
    setTimeout(() => setStep("done"), 3000);
  };

  const reset = () => {
    setStep("form");
    setForm({ name: "", email: "", company: "" });
  };

  return (
    <GlassPanel className="h-[420px] p-6 flex flex-col">
      <p className="text-xs tracking-[0.3em] text-silver/40 uppercase mb-4">Lead Generation Flow</p>

      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            className="flex-1 flex flex-col gap-4"
          >
            {(["name", "email", "company"] as const).map((field) => (
              <input
                key={field}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-silver/30 focus:outline-none focus:border-neon/40"
              />
            ))}
            <button
              type="submit"
              className="mt-auto py-3 rounded-xl bg-neon text-black font-medium text-sm hover:shadow-[0_0_20px_rgba(198,255,0,0.3)]"
            >
              Capture Lead
            </button>
          </motion.form>
        )}

        {step === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="h-12 w-12 border-2 border-neon/30 border-t-neon rounded-full mb-4" />
            <p className="text-sm text-silver/60">AI qualifying lead...</p>
          </motion.div>
        )}

        {step === "crm" && (
          <motion.div key="crm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center gap-3">
            {["Lead scored: 92/100", "Added to CRM pipeline", "Assigned to sales rep", "Follow-up scheduled"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className="flex items-center gap-3 text-sm text-silver/80"
              >
                <div className="h-2 w-2 rounded-full bg-neon" />
                {item}
              </motion.div>
            ))}
          </motion.div>
        )}

        {step === "done" && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-neon/20 border border-neon/40 flex items-center justify-center mb-4">
              <span className="text-neon text-2xl">✓</span>
            </div>
            <p className="text-white font-medium">Lead Automated!</p>
            <p className="text-sm text-silver/60 mt-1">{form.name} added to CRM</p>
            <button onClick={reset} className="mt-6 text-xs text-neon hover:underline">Try again</button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassPanel>
  );
}
