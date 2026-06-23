"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PROCESS_STEPS } from "@/lib/constants";

interface ProcessPathwayProps {
  scrollProgress: number;
  activeStep: number;
}

export function ProcessPathway({ scrollProgress, activeStep }: ProcessPathwayProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const visible = scrollProgress > 0.55 && scrollProgress < 0.75;
    groupRef.current.visible = visible;
  });

  return (
    <group ref={groupRef} position={[0, -2, -12]}>
      {PROCESS_STEPS.map((step, i) => {
        const x = (i - 1.5) * 3;
        const isActive = activeStep === i;
        return (
          <group key={step.step} position={[x, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.5, 0.5, 0.15, 32]} />
              <meshStandardMaterial
                color="#111111"
                emissive="#C6FF00"
                emissiveIntensity={isActive ? 1.5 : 0.3}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color="#C6FF00"
                emissive="#C6FF00"
                emissiveIntensity={isActive ? 2 : 0.5}
              />
            </mesh>
            {i < PROCESS_STEPS.length - 1 && (
              <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
                <meshStandardMaterial
                  color="#C6FF00"
                  emissive="#C6FF00"
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
