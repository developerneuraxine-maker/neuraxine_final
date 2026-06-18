"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BUDGET_OPTIONS } from "@/lib/constants";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
  sortOrder: number;
}

interface ContactSectionProps {
  services: Service[];
  form: {
    name: string;
    phone: string;
    businessName: string;
    service: string;
    budget: string;
    message: string;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    name: string;
    phone: string;
    businessName: string;
    service: string;
    budget: string;
    message: string;
  }>>;
}

export function ContactSection({ services, form, setForm }: ContactSectionProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Construct WhatsApp message content
    const text = `Hi Neuraxine, I'd like to book a demo. Here are my details:
- Name: ${form.name}
- Phone: ${form.phone}
- Business Name: ${form.businessName}
- Service: ${form.service}
- Budget: ${form.budget}
${form.message.trim() ? `- Message: ${form.message}` : ""}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/918237982569?text=${encodedText}`;

    // Attempt to save to database (non-blocking)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("Lead database submission failed (Supabase might not be configured yet).");
      }
    } catch (err) {
      console.error("Database lead submit error:", err);
    }

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    setStatus("success");
    setForm({ name: "", phone: "", businessName: "", service: "", budget: "", message: "" });
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-silver/30 focus:outline-none focus:border-neon/40 transition-colors";

  return (
    <section id="contact" className="relative min-h-screen flex items-center py-32 px-6">
      <div className="relative z-10 mx-auto max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] text-neon/80 uppercase mb-4">Command Center</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Start Your <span className="text-neon">AI Journey</span>
          </h2>
          <p className="mt-4 text-silver/60">Book a free demo and discover what automation can do for your business.</p>
        </motion.div>

        <GlassPanel glow className="p-8 md:p-12">
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name *"
              className={inputClass}
            />
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone *"
              className={inputClass}
            />
            <input
              required
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              placeholder="Business Name *"
              className={inputClass}
            />
            <select
              required
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className={`${inputClass} appearance-none`}
            >
              <option value="" disabled className="bg-dark-grey">
                Select Service *
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.title} className="bg-dark-grey">
                  {s.title}
                </option>
              ))}
            </select>
            <select
              required
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className={`${inputClass} appearance-none`}
            >
              <option value="" disabled className="bg-dark-grey">
                Budget *
              </option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b} className="bg-dark-grey">
                  {b}
                </option>
              ))}
            </select>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Message (optional)"
              rows={1}
              className={`${inputClass} md:col-span-2 resize-none`}
            />

            <div className="md:col-span-2 flex flex-col items-center gap-4 mt-2">
              <MagneticButton type="submit" variant="primary" disabled={status === "loading"} className="w-full md:w-auto">
                {status === "loading" ? "Transmitting..." : "Book Free Demo"}
              </MagneticButton>
              {status === "success" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-neon text-center">
                  Lead received and redirecting to WhatsApp! We&apos;ll contact you within 24 hours.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400">
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </div>
          </form>
        </GlassPanel>
      </div>
    </section>
  );
}
