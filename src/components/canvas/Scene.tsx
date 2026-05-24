"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Noise } from "@react-three/postprocessing";
import PortalParticle from "./PortalParticle";
import FloatingPhones from "./FloatingPhones";
import DataVisuals from "./DataVisuals";
import PremiumAsset from "./PremiumAsset";
import { Suspense } from "react";
import { useFrame } from "@react-three/fiber";

function CameraController() {
  useFrame((state) => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / (maxScroll || 1);
    
    // Camera moves down as we scroll. Target Y goes from 0 down to -25.
    const targetY = -(progress * 25);
    state.camera.position.y += (targetY - state.camera.position.y) * 0.1;
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#020617"]} />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#4f46e5" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#10b981" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#eab308" />

      <Suspense fallback={null}>
        <CameraController />
        <Environment preset="city" />
        
        {/* Scroll-driven 3D components */}
        <PortalParticle />
        <FloatingPhones />
        <DataVisuals />
        <PremiumAsset />

        <Preload all />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </Canvas>
  );
}
