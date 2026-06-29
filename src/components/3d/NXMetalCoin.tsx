"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const N_PAT = [
  [1,0,0,0,1],
  [1,1,0,0,1],
  [1,0,1,0,1],
  [1,0,1,0,1],
  [1,0,0,1,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
];
const X_PAT = [
  [1,0,0,0,1],
  [1,0,0,0,1],
  [0,1,0,1,0],
  [0,0,1,0,0],
  [0,1,0,1,0],
  [1,0,0,0,1],
  [1,0,0,0,1],
];

function buildNXTexture(): THREE.CanvasTexture {
  const SZ = 512;
  const cv = document.createElement("canvas");
  cv.width = SZ; cv.height = SZ;
  const ctx = cv.getContext("2d")!;

  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, SZ, SZ);

  const g = ctx.createRadialGradient(256, 210, 0, 256, 210, 270);
  g.addColorStop(0, "rgba(90,90,90,0.45)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, SZ, SZ);

  const px = 28;
  const gap = 5;
  const step = px + gap;

  const drawLetter = (pat: number[][], ox: number, oy: number) => {
    for (let r = 0; r < pat.length; r++) {
      for (let c = 0; c < pat[r].length; c++) {
        if (!pat[r][c]) continue;
        const x = ox + c * step;
        const y = oy + r * step;
        ctx.fillStyle = "#c8c8c8";
        ctx.fillRect(x, y, px, px);
        ctx.fillStyle = "#eeeeee";
        ctx.fillRect(x, y, px, 3);
        ctx.fillRect(x, y, 3, px);
        ctx.fillStyle = "#707070";
        ctx.fillRect(x, y + px - 3, px, 3);
        ctx.fillRect(x + px - 3, y, 3, px);
      }
    }
  };

  const lw = 5 * step - gap;
  const totalW = lw + 30 + lw;
  const totalH = 7 * step - gap;
  const ox = (SZ - totalW) / 2;
  const oy = (SZ - totalH) / 2;

  drawLetter(N_PAT, ox, oy);
  drawLetter(X_PAT, ox + lw + 30, oy);

  return new THREE.CanvasTexture(cv);
}

function CoinMesh() {
  const groupRef = useRef<THREE.Group>(null);

  const { frontMat, backMat, edgeMat } = useMemo(() => ({
    frontMat: new THREE.MeshStandardMaterial({
      map: buildNXTexture(),
      metalness: 0.4,
      roughness: 0.5,
      side: THREE.FrontSide,
    }),
    backMat: new THREE.MeshStandardMaterial({
      color: "#0d0d0d",
      metalness: 0.92,
      roughness: 0.28,
      side: THREE.FrontSide,
    }),
    edgeMat: new THREE.MeshStandardMaterial({
      color: "#1c1c1c",
      metalness: 0.92,
      roughness: 0.28,
    }),
  }), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * ((Math.PI * 2) / 10);
    }
  });

  const R = 1.45;
  const H = 0.22;

  return (
    <group ref={groupRef} rotation={[0.35, 0, 0]}>
      {/*
        CircleGeometry UV: (vertex.x/R+1)/2, (vertex.y/R+1)/2
        After Three.js canvas Y-flip: canvas left→screen left, canvas top→screen top.
        No 90° rotation. NX drawn horizontal in canvas → appears horizontal on coin. ✓
      */}

      {/* Front face — NX texture, faces +Z (camera at +Z sees this at Y-rotation=0) */}
      <mesh position={[0, 0, H / 2 + 0.002]} material={frontMat}>
        <circleGeometry args={[R, 72]} />
      </mesh>

      {/* Back face — plain dark, pre-rotated 180° so it faces -Z initially */}
      <mesh position={[0, 0, -(H / 2 + 0.002)]} rotation={[0, Math.PI, 0]} material={backMat}>
        <circleGeometry args={[R, 72]} />
      </mesh>

      {/* Edge / rim — open cylinder rotated so its band wraps around Z-axis */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={edgeMat}>
        <cylinderGeometry args={[R, R, H, 72, 1, true]} />
      </mesh>
    </group>
  );
}

export function NXMetalCoin({ size = 240 }: { size?: number | string }) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      <Canvas
        camera={{ position: [0, 0.4, 4.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={2.4} />
        <directionalLight position={[-4, -2, -4]} intensity={0.5} color="#3355bb" />
        <pointLight position={[0, 4, 2]} intensity={1.1} color="#ffffff" />
        <pointLight position={[-3, 1, 3]} intensity={0.1} color="#C6FF00" />
        <CoinMesh />
      </Canvas>
    </div>
  );
}
