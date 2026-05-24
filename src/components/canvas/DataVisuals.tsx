"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DataVisuals() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        // Subtle floating animation for bars
        child.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.005;
      });
    }
  });

  const bars = [
    { height: 2, color: "#10b981", x: -2, z: 0 },
    { height: 3.5, color: "#4f46e5", x: -1, z: -1 },
    { height: 1.5, color: "#10b981", x: 0, z: 1 },
    { height: 4, color: "#4f46e5", x: 1, z: 0 },
    { height: 2.5, color: "#10b981", x: 2, z: -0.5 },
  ];

  return (
    <group ref={groupRef} position={[-3, -15, -2]} rotation={[0, Math.PI / 4, 0]}>
      {bars.map((bar, i) => (
        <mesh key={i} position={[bar.x, bar.height / 2, bar.z]}>
          <boxGeometry args={[0.6, bar.height, 0.6]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
      {/* Base Grid */}
      <gridHelper args={[10, 10, "#4f46e5", "#10b981"]} position={[0, 0, 0]} />
    </group>
  );
}
