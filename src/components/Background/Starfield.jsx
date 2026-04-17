import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";

const ParticleField = ({ count = 5000, color = "#00f3ff", size = 0.015 }) => {
  const points = useRef();
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        temp[i * 3] = (Math.random() - 0.5) * 20;
        temp[i * 3 + 1] = (Math.random() - 0.5) * 20;
        temp[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.02;
    points.current.rotation.x = time * 0.01;
    
    // Interactive mouse parallax logic
    const targetX = state.mouse.x * 0.5;
    const targetY = state.mouse.y * 0.5;
    points.current.position.x += (targetX - points.current.position.x) * 0.05;
    points.current.position.y += (targetY - points.current.position.y) * 0.05;
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

const GrittyNebula = () => {
    return (
        <group>
            {/* Cyan Primary Field */}
            <ParticleField count={3000} color="#00f3ff" size={0.02} />
            {/* Pink Secondary Field */}
            <ParticleField count={1500} color="#ff007a" size={0.03} />
            {/* White Distant Background */}
            <ParticleField count={4000} color="#ffffff" size={0.008} />
        </group>
    );
};

const Starfield = () => {
  return (
    <div id="canvas-container">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <color attach="background" args={["#02040a"]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff007a" />

        <GrittyNebula />

        {/* Floating High-Tech Orbs */}
        <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
            <mesh position={[-6, 3, -5]}>
                <octahedronGeometry args={[0.4]} />
                <meshStandardMaterial color="#00f3ff" wireframe emissive="#00f3ff" emissiveIntensity={5} />
            </mesh>
        </Float>

        <Float speed={2} rotationIntensity={3} floatIntensity={1}>
            <mesh position={[6, -4, -8]}>
                <octahedronGeometry args={[0.3]} />
                <meshStandardMaterial color="#ff007a" wireframe emissive="#ff007a" emissiveIntensity={5} />
            </mesh>
        </Float>

        {/* Atmospheric Fog */}
        <fog attach="fog" args={["#02040a", 5, 20]} />
      </Canvas>
    </div>
  );
};

export default Starfield;
