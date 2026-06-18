"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const LoaderNeuralScene = dynamic(
  () => import("@/components/3d/LoaderNeuralScene").then((m) => m.LoaderNeuralScene),
  { ssr: false }
);

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState("Initializing Neural Core");

  useEffect(() => {
    const duration = 3200;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setStatus("Systems Online");
        setTimeout(() => setVisible(false), 400);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,255,0,0.08),transparent_60%)]" />

          <div className="relative mb-10">
            <LoaderNeuralScene />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-neon/15"
              style={{ width: 128, height: 128 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold tracking-[0.35em] text-neon">NEURAXINE</h1>
            <p className="mt-1 text-xs tracking-[0.5em] text-silver/60">AI OPERATING SYSTEM</p>
          </motion.div>

          <div className="w-56">
            <div className="mb-2 flex justify-between text-[10px] tracking-wider text-silver/50 uppercase">
              <span>{status}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-px overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-neon shadow-[0_0_12px_#C6FF00]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
