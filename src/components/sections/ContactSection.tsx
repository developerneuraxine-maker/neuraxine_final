"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
    message: string;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    name: string;
    phone: string;
    businessName: string;
    service: string;
    message: string;
  }>>;
}

export function ContactSection({ services, form, setForm }: ContactSectionProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const text = `Hi Neuraxine, I'd like to book a demo. Here are my details:
- Name: ${form.name}
- Phone: ${form.phone}
- Business Name: ${form.businessName}
- Service Interested In: ${form.service}
${form.message.trim() ? `- Message: ${form.message}` : ""}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/918237982569?text=${encodedText}`;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) console.error("Lead database submission failed.");
    } catch (err) {
      console.error("Database lead submit error:", err);
    }

    window.open(whatsappUrl, "_blank");
    setStatus("success");
    setForm({ name: "", phone: "", businessName: "", service: "", message: "" });
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-silver/30 focus:outline-none focus:border-neon/40 transition-colors";

  return (
    <section id="contact" className="relative min-h-screen flex items-center py-32 px-6">
      {/* Gold wave background */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 60% 80% at 20% 50%, rgba(120,180,0,0.15) 0%, transparent 70%),
          radial-gradient(ellipse 60% 80% at 80% 50%, rgba(198,255,0,0.10) 0%, transparent 70%)
        `,
        backgroundSize: "200% 200%",
        animation: "goldWaveShift 8s ease infinite",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div className="relative z-10 mx-auto max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] text-neon/80 uppercase mb-4">Get Started</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Start Your <span className="text-neon">AI Journey</span>
          </h2>
          <p className="mt-4 text-silver/60">
            Book a free consultation and discover what AI automation can do for your business.
          </p>
        </motion.div>

        <GlassPanel glow className="p-8 md:p-12">
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name *"
              className={inputClass}
            />
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone Number *"
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
              <option value="" disabled className="bg-[#111]">
                Which service interests you? *
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.title} className="bg-[#111]">
                  {s.title}
                </option>
              ))}
            </select>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your business (optional)"
              rows={3}
              className={`${inputClass} md:col-span-2 resize-none`}
            />

            <div className="md:col-span-2 flex flex-col items-center gap-4 mt-2">
              <MagneticButton
                type="submit"
                variant="primary"
                disabled={status === "loading"}
                className="w-full md:w-auto"
              >
                {status === "loading" ? "Sending..." : "Book Free Consultation"}
              </MagneticButton>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-neon text-center"
                >
                  Thank you! Redirecting to WhatsApp — we&apos;ll be in touch within 24 hours.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-400"
                >
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
