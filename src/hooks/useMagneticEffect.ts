"use client";

import { useRef, useEffect, MouseEvent } from "react";

interface MagneticOptions {
  strength?: number;
}

export function useMagneticEffect<T extends HTMLElement>(options: MagneticOptions = {}) {
  const ref = useRef<T>(null);
  const { strength = 0.3 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}

export function magneticMove(e: MouseEvent<HTMLElement>, strength = 0.3) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
}

export function magneticReset(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = "translate(0, 0)";
}
