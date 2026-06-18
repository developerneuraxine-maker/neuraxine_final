"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[5] hidden md:block"
      animate={{ x: pos.x - 200, y: pos.y - 200 }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      style={{ width: 400, height: 400 }}
    >
      <div className="h-full w-full rounded-full bg-neon/[0.04] blur-3xl" />
    </motion.div>
  );
}
