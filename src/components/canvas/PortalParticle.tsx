"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

export default function PortalParticle() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random points in a sphere
  const [positions, mathColors] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      // spherical distribution
      const r = 2 + Math.random() * 0.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos.set([x, y, z], i * 3);
      
      // Mix Emerald Green and Electric Indigo
      Math.random() > 0.5 ? color.set("#10b981") : color.set("#4f46e5");
      col.set([color.r, color.g, color.b], i * 3);
    }
    return [pos, col];
  }, []);

  const lastPointer = useRef(new THREE.Vector2(0, 0));
  const momentum = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Calculate pointer velocity (delta)
      const deltaX = state.pointer.x - lastPointer.current.x;
      const deltaY = state.pointer.y - lastPointer.current.y;
      
      // Update last pointer
      lastPointer.current.copy(state.pointer);

      // Add to momentum (sensitivity multiplier)
      // If delta is huge (e.g. on first frame), ignore it to prevent jump
      if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) {
        momentum.current.x += deltaX * 10.0; 
        momentum.current.y += deltaY * 10.0; 
      }

      // Apply friction (damping momentum back to zero smoothly)
      momentum.current.x = THREE.MathUtils.damp(momentum.current.x, 0, 3, delta);
      momentum.current.y = THREE.MathUtils.damp(momentum.current.y, 0, 3, delta);

      // Apply rotation: Base rotation + Momentum
      pointsRef.current.rotation.y += (0.05 + momentum.current.x) * delta * 5;
      pointsRef.current.rotation.x += (0.02 + -momentum.current.y) * delta * 5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Points ref={pointsRef} positions={positions} colors={mathColors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
