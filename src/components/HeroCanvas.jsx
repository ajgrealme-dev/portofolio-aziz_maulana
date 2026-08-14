import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';

function ParticleField({ count = 3000 }) {
  const ref = useRef();
  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00f5ff" size={0.03} sizeAttenuation depthWrite={false} opacity={0.8} />
    </Points>
  );
}

function FloatingGeometry({ position, color, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5 * speed;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref} position={position} castShadow>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.6} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

function FloatingRing({ position, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.5, 0.05, 16, 60]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron({ position, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.5} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas({ isDark }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 0.8} color={isDark ? '#00f5ff' : '#2563eb'} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={isDark ? '#39ff14' : '#7c3aed'} />
      <pointLight position={[0, 0, 5]} intensity={0.8} color={isDark ? '#ff00ff' : '#0ea5e9'} />

      <ParticleField count={isDark ? 3000 : 2000} />

      <FloatingGeometry position={[-4, 2, -2]} color={isDark ? '#00f5ff' : '#2563eb'} speed={0.8} />
      <FloatingGeometry position={[4, -1.5, -1]} color={isDark ? '#39ff14' : '#7c3aed'} speed={1.2} />
      <FloatingGeometry position={[-3, -2, 0]} color={isDark ? '#ff00ff' : '#0ea5e9'} speed={0.6} />

      <FloatingRing position={[3, 2, -3]} color={isDark ? '#00f5ff' : '#6366f1'} />
      <FloatingRing position={[-4.5, 0, -2]} color={isDark ? '#39ff14' : '#06b6d4'} />

      <FloatingIcosahedron position={[2.5, 3, -4]} color={isDark ? '#ff00ff' : '#8b5cf6'} />
      <FloatingIcosahedron position={[-2, 3, -3]} color={isDark ? '#00f5ff' : '#3b82f6'} />
      <FloatingIcosahedron position={[4.5, -3, -2]} color={isDark ? '#39ff14' : '#06b6d4'} />
    </Canvas>
  );
}
