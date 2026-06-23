"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { CASE_STUDIES } from "@/lib/constants";

interface CaseStudyOrbsProps {
  scrollProgress: number;
}

export function CaseStudyOrbs({ scrollProgress }: CaseStudyOrbsProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const visible = scrollProgress > 0.72 && scrollProgress < 0.88;
    groupRef.current.visible = visible;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 1, -16]}>
      {CASE_STUDIES.map((study, i) => {
        const angle = (i / CASE_STUDIES.length) * Math.PI * 2;
        const x = Math.cos(angle) * 5;
        const z = Math.sin(angle) * 5;
        const y = Math.sin(i * 1.7) * 0.8;

        return (
          <Float key={study.label} speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
            <group position={[x, y, z]}>
              <mesh>
                <boxGeometry args={[1.2, 0.8, 0.05]} />
                <meshStandardMaterial
                  color="#111111"
                  emissive="#C6FF00"
                  emissiveIntensity={0.3}
                  metalness={0.9}
                  roughness={0.1}
                  transparent
                  opacity={0.85}
                />
              </mesh>
              <Text
                position={[0, 0.15, 0.04]}
                fontSize={0.18}
                color="#C6FF00"
                anchorX="center"
                anchorY="middle"
                maxWidth={1}
              >
                {study.metric}
              </Text>
              <Text
                position={[0, -0.15, 0.04]}
                fontSize={0.07}
                color="#C0C0C0"
                anchorX="center"
                anchorY="middle"
                maxWidth={1}
              >
                {study.label}
              </Text>
              <pointLight color="#C6FF00" intensity={0.3} distance={3} />
            </group>
          </Float>
        );
      })}
    </group>
  );
}
