"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Box, MeshDistortMaterial } from "@react-three/drei";

export default function FloatingPhones() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  // Placeholder for phones - using distorted boxes with glass-like material
  return (
    <group ref={groupRef} position={[3, -5, -2]}> {/* Initial position off-screen, moved by GSAP later */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.sin(i * Math.PI * 0.6) * 3, i * 1.5 - 1.5, Math.cos(i * Math.PI * 0.6) * 3]} rotation={[0, -i * Math.PI * 0.2, 0]}>
          <boxGeometry args={[1.5, 3, 0.1]} />
          <MeshDistortMaterial
            color="#0f172a"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.1}
            speed={2}
          />
        </mesh>
      ))}
    </group>
  );
}
