"use client";

import { ReactNode, MouseEvent } from "react";
import { magneticMove, magneticReset } from "@/hooks/useMagneticEffect";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const base =
    "relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer";
  const variants = {
    primary:
      "bg-neon text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(198,255,0,0.4)] hover:scale-105 transition-all duration-300",
    secondary:
      "border border-neon/40 text-neon bg-neon/5 rounded-full hover:bg-neon/10 hover:border-neon/60 hover:shadow-[0_0_20px_rgba(198,255,0,0.2)] transition-all duration-300",
    ghost: "text-silver hover:text-neon border border-transparent hover:border-white/10",
  };

  const props = {
    onMouseMove: (e: MouseEvent<HTMLElement>) => magneticMove(e, 0.15),
    onMouseLeave: magneticReset,
    className: `${base} ${variants[variant]} ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`,
  };

  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
