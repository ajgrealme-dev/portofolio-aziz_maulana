import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// 🌟 Layer 1: Infinite Sparkling White Stars (Always present everywhere)
function WhiteStarfield() {
  const ref = useRef();
  const count = 12000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 80;
      p[i * 3 + 1] = (Math.random() - 0.5) * 260; // Extra broad vertical span (never runs out)
      p[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.004) * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.042}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

// 🌟 Layer 2: Neon Cyan / Accent Stardust (Parallax Floating)
function NeonParticles({ isDark }) {
  const ref = useRef();
  const count = 6000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 70;
      p[i * 3 + 1] = (Math.random() - 0.5) * 240;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -state.clock.elapsedTime * 0.012;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#00f5ff' : '#6366f1'}
        size={0.052}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// 🌟 3D Wireframe Floating Geometries
function SmallGeo({ position, color, speed }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
    }
  });
  return (
    <Float speed={speed * 2} rotationIntensity={0.6} floatIntensity={0.4}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.65} emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </Float>
  );
}

function SmallRing({ position, color, speed }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.8;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });
  return (
    <Float speed={speed * 2} rotationIntensity={0.7} floatIntensity={0.45}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.7, 0.05, 12, 48]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.65} emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </Float>
  );
}

function SmallIcosa({ position, color, speed }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.6;
    }
  });
  return (
    <Float speed={speed * 2} rotationIntensity={0.6} floatIntensity={0.4}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.65} emissive={color} emissiveIntensity={0.35} />
      </mesh>
    </Float>
  );
}

function ParallaxGroup({ children }) {
  const groupRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (groupRef.current) {
        // Balanced smooth parallax shift across entire page height
        groupRef.current.position.y = window.scrollY * 0.0075;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const targetRotX = -mouse.current.y * 0.12;
      const targetRotY = -mouse.current.x * 0.12;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function BackgroundCanvas({ isDark }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={isDark ? '#00f5ff' : '#6366f1'} />
      <pointLight position={[-5, -5, 5]} intensity={0.6} color={isDark ? '#39ff14' : '#8b5cf6'} />

      <ParallaxGroup>
        {/* Infinite Cosmic Depth Starfields (White Stars + Neon Cyan Stardust) */}
        <WhiteStarfield />
        <NeonParticles isDark={isDark} />

        {/* Scattered 3D geometries that continuously scroll through all sections from Hero to Contact */}
        {[
          // 1. Hero section (y: 4 to -3)
          { type: 'ring', pos: [-5, 3, -2], c: isDark ? '#00f5ff' : '#6366f1', s: 0.3 },
          { type: 'geo', pos: [6, -1, -3], c: isDark ? '#39ff14' : '#8b5cf6', s: 0.4 },

          // 2. About section (y: -4 to -9)
          { type: 'icosa', pos: [-6, -5, -3], c: isDark ? '#ff00ff' : '#0ea5e9', s: 0.25 },
          { type: 'ring', pos: [5, -8, -2], c: isDark ? '#00f5ff' : '#3b82f6', s: 0.35 },

          // 3. Skills & Knowledge Graph section (y: -10 to -17)
          { type: 'geo', pos: [-5, -12, -3], c: isDark ? '#39ff14' : '#7c3aed', s: 0.2 },
          { type: 'icosa', pos: [6, -15, -2], c: isDark ? '#ff00ff' : '#06b6d4', s: 0.3 },

          // 4. Projects section (y: -18 to -30)
          { type: 'ring', pos: [-6, -19, -2], c: isDark ? '#00f5ff' : '#6366f1', s: 0.4 },
          { type: 'geo', pos: [5, -23, -3], c: isDark ? '#39ff14' : '#8b5cf6', s: 0.35 },
          { type: 'icosa', pos: [-5.5, -27, -2], c: isDark ? '#ff00ff' : '#0ea5e9', s: 0.3 },

          // 5. Experience & Education section (y: -31 to -44)
          { type: 'icosa', pos: [-5, -33, -3], c: isDark ? '#00f5ff' : '#0ea5e9', s: 0.25 },
          { type: 'ring', pos: [6, -37, -2], c: isDark ? '#39ff14' : '#3b82f6', s: 0.3 },
          { type: 'geo', pos: [-5.5, -41, -3], c: isDark ? '#ff00ff' : '#7c3aed', s: 0.35 },

          // 6. Contact & Footer section (y: -45 to -60)
          { type: 'geo', pos: [-6, -46, -3], c: isDark ? '#39ff14' : '#7c3aed', s: 0.4 },
          { type: 'icosa', pos: [5, -50, -2], c: isDark ? '#00f5ff' : '#06b6d4', s: 0.35 },
          { type: 'ring', pos: [-5, -55, -2], c: isDark ? '#ff00ff' : '#6366f1', s: 0.3 },
        ].map((g, i) => {
          if (g.type === 'ring') return <SmallRing key={i} position={g.pos} color={g.c} speed={g.s} />;
          if (g.type === 'icosa') return <SmallIcosa key={i} position={g.pos} color={g.c} speed={g.s} />;
          return <SmallGeo key={i} position={g.pos} color={g.c} speed={g.s} />;
        })}
      </ParallaxGroup>
    </Canvas>
  );
}
