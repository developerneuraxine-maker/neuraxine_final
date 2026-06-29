"use client";

import Image from "next/image";
import { useState } from "react";

interface ServiceImageProps {
  slug: string;
  emoji: string;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
}

export function ServiceImage({
  slug,
  emoji,
  alt,
  size = 64,
  className = "",
  priority = false,
}: ServiceImageProps) {
  const [source, setSource] = useState<"webp" | "svg" | "emoji">("webp");

  if (source === "emoji") {
    return (
      <span className={`select-none leading-none ${className}`} role="img" aria-label={alt}>
        {emoji}
      </span>
    );
  }

  const src = source === "webp" ? `/services/${slug}.webp` : `/services/${slug}.svg`;

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setSource((current) => (current === "webp" ? "svg" : "emoji"))}
      priority={priority}
      unoptimized={source === "svg"}
    />
  );
}
