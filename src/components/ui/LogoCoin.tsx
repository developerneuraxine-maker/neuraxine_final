"use client";

import Image from "next/image";

/**
 * Self-contained 3D spinning coin badge.
 * Pure CSS — perspective wrapper + preserve-3d + backface-visibility.
 * Size is clamped; never stretches to fill a parent.
 */
export function LogoCoin() {
  const SIZE = "clamp(130px, 14vw, 180px)";

  return (
    <>
      <style>{`
        @keyframes nx-coin-spin {
          from { transform: rotateX(6deg) rotateY(0deg);   }
          to   { transform: rotateX(6deg) rotateY(360deg); }
        }
        .nx-coin-body {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: nx-coin-spin 5s linear infinite;
        }
        .nx-coin-face {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 3px solid #c8a843;
        }
      `}</style>

      {/* Perspective wrapper — exactly the coin size, never full-width */}
      <div
        style={{
          width: SIZE,
          height: SIZE,
          perspective: "700px",
          flexShrink: 0,
          display: "block",
        }}
      >
        <div className="nx-coin-body">

          {/* Front face — Neuraxine logo */}
          <div className="nx-coin-face">
            <Image
              src="/logo.jpg"
              alt="Neuraxine"
              fill
              sizes="180px"
              style={{ objectFit: "cover", display: "block" }}
              priority
            />
          </div>

          {/* Back face — dark disc, plain */}
          <div
            className="nx-coin-face"
            style={{
              transform: "rotateY(180deg)",
              background:
                "radial-gradient(circle at 40% 35%, #1e1e1e 0%, #090909 100%)",
            }}
          />
        </div>
      </div>
    </>
  );
}
