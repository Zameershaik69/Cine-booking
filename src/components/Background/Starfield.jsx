import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, PerspectiveCamera, Float } from "@react-three/drei";
import { useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

const ParticleField = ({ count = 4000, color = "#00f3ff", size = 0.015, scrollVelocity }) => {
  const points = useRef();
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        temp[i * 3] = (Math.random() - 0.5) * 30;
        temp[i * 3 + 1] = (Math.random() - 0.5) * 30;
        temp[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Subtle base rotation
    points.current.rotation.y = time * 0.005;
    
    // Hyper-jump effect: Tuning threshold for less constant impact
    const rawVelocity = Math.abs(scrollVelocity.get());
    const velocityThreshold = 2.0; 
    const effectiveVelocity = rawVelocity > velocityThreshold ? (rawVelocity - velocityThreshold) * 0.002 : 0;
    
    points.current.rotation.x += effectiveVelocity * 0.05;
    points.current.position.z = Math.min(effectiveVelocity * 4, 10);
    
    // Smooth Parallax
    const targetX = state.mouse.x * 0.3;
    const targetY = state.mouse.y * 0.3;
    points.current.position.x += (targetX - points.current.position.x) * 0.02;
    points.current.position.y += (targetY - points.current.position.y) * 0.02;
  });

  return (
    <Points ref={points} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const GrittyNebula = ({ scrollVelocity }) => {
    return (
        <group>
            {/* Optimized Particle Counts for Performance */}
            <ParticleField count={2000} color="#00f3ff" size={0.02} scrollVelocity={scrollVelocity} />
            <ParticleField count={1000} color="#ff007a" size={0.03} scrollVelocity={scrollVelocity} />
            <ParticleField count={3000} color="#ffffff" size={0.006} scrollVelocity={scrollVelocity} />
        </group>
    );
};

const Starfield = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 100, // Increased damping for smoother response
    stiffness: 200
  });

  return (
    <div id="canvas-container" className="fixed inset-0 z-0 bg-[#02040a]">
      <Canvas dpr={[1, 1.5]} powerPreference="high-performance">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff007a" />

        <GrittyNebula scrollVelocity={smoothVelocity} />

        {/* Polished Orbs */}
        <Float speed={1.2} rotationIntensity={1.5} floatIntensity={1.5}>
            <mesh position={[-8, 4, -6]}>
                <octahedronGeometry args={[0.5]} />
                <meshStandardMaterial color="#00f3ff" wireframe emissive="#00f3ff" emissiveIntensity={3} transparent opacity={0.6} />
            </mesh>
        </Float>

        <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
            <mesh position={[8, -5, -10]}>
                <octahedronGeometry args={[0.4]} />
                <meshStandardMaterial color="#ff007a" wireframe emissive="#ff007a" emissiveIntensity={3} transparent opacity={0.6} />
            </mesh>
        </Float>

        <fog attach="fog" args={["#02040a", 8, 25]} />
      </Canvas>
      
      {/* Noise layer opacity fine-tuned in index.css */}
      <div className="signal-noise"></div>
    </div>
  );
};

export default Starfield;
