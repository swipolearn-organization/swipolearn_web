"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

export default function PremiumAsset() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={[0, -25, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[2, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2}
            chromaticAberration={1}
            anisotropy={0.5}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#eab308"
            attenuationColor="#ca8a04"
            attenuationDistance={1}
          />
        </mesh>
      </Float>
      {/* Inner glowing core */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>
    </group>
  );
}
