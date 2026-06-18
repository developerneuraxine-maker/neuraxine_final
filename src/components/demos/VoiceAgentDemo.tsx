"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function VoiceAgentDemo() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [waveform, setWaveform] = useState<number[]>(Array(32).fill(0.1));
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      setTranscript(text);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    if (!listening) {
      setWaveform(Array(32).fill(0.1));
      return;
    }
    const interval = setInterval(() => {
      setWaveform(Array.from({ length: 32 }, () => 0.1 + Math.random() * 0.9));
    }, 100);
    return () => clearInterval(interval);
  }, [listening]);

  const toggle = () => {
    if (!recognitionRef.current) {
      setTranscript("Speech recognition not supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <GlassPanel className="flex flex-col items-center justify-center h-[420px] p-8">
      <p className="text-xs tracking-[0.3em] text-silver/40 uppercase mb-6">AI Voice Agent</p>

      <div className="relative mb-8">
        <motion.div
          animate={listening ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 1.5, repeat: listening ? Infinity : 0 }}
          className="h-32 w-32 rounded-full bg-gradient-to-br from-neon/20 to-neon/5 border border-neon/30 flex items-center justify-center"
        >
          <motion.div
            animate={listening ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-20 w-20 rounded-full bg-neon/10 border border-neon/50 flex items-center justify-center"
          >
            <svg className="h-8 w-8 text-neon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </motion.div>
        </motion.div>
        {listening && (
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-neon/40"
          />
        )}
      </div>

      <div className="flex items-end gap-0.5 h-12 mb-6">
        {waveform.map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: `${h * 100}%` }}
            transition={{ duration: 0.1 }}
            className="w-1 rounded-full bg-neon/60"
            style={{ minHeight: 4 }}
          />
        ))}
      </div>

      <button
        onClick={toggle}
        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
          listening
            ? "bg-red-500/20 text-red-400 border border-red-500/30"
            : "bg-neon/10 text-neon border border-neon/30 hover:bg-neon/20"
        }`}
      >
        {listening ? "Stop Listening" : "Start Voice Demo"}
      </button>

      {transcript && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-silver/70 text-center max-w-xs"
        >
          &ldquo;{transcript}&rdquo;
        </motion.p>
      )}
    </GlassPanel>
  );
}
