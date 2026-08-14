import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function BgParticles({ isDark }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(12000 * 3);
    for (let i = 0; i < 12000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 45;
      p[i * 3 + 1] = (Math.random() - 0.5) * 45;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15 - 7.5;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#00f5ff' : '#6366f1'}
        size={0.038}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

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
        <octahedronGeometry args={[0.42, 0]} />
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
        <torusGeometry args={[0.65, 0.05, 12, 48]} />
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
        <icosahedronGeometry args={[0.4, 1]} />
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
        // Translate background group Y axis based on scroll position (smooth parallax)
        groupRef.current.position.y = window.scrollY * 0.0075;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth interpolation for mouse movements
      const targetRotX = -mouse.current.y * 0.15;
      const targetRotY = -mouse.current.x * 0.15;
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
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.7} color={isDark ? '#00f5ff' : '#6366f1'} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color={isDark ? '#39ff14' : '#8b5cf6'} />

      <ParallaxGroup>
        <BgParticles isDark={isDark} />

        {/* Scattered 3D geometries that scroll into view at different heights */}
        {[
          // Hero & Top section (y: 3 to -3)
          { type: 'ring', pos: [-5, 3, -2], c: isDark ? '#00f5ff' : '#6366f1', s: 0.3 },
          { type: 'geo', pos: [6, -1, -3], c: isDark ? '#39ff14' : '#8b5cf6', s: 0.4 },

          // About section (y: -4 to -8)
          { type: 'icosa', pos: [-6, -5, -3], c: isDark ? '#ff00ff' : '#0ea5e9', s: 0.25 },
          { type: 'ring', pos: [5, -7, -2], c: isDark ? '#00f5ff' : '#3b82f6', s: 0.35 },

          // Skills section (y: -9 to -14)
          { type: 'geo', pos: [-5, -11, -3], c: isDark ? '#39ff14' : '#7c3aed', s: 0.2 },
          { type: 'icosa', pos: [6, -13, -2], c: isDark ? '#ff00ff' : '#06b6d4', s: 0.3 },

          // Projects section (y: -15 to -20)
          { type: 'ring', pos: [-6, -16, -2], c: isDark ? '#00f5ff' : '#6366f1', s: 0.4 },
          { type: 'geo', pos: [5, -18, -3], c: isDark ? '#39ff14' : '#8b5cf6', s: 0.35 },

          // Experience section (y: -21 to -26)
          { type: 'icosa', pos: [-5, -22, -3], c: isDark ? '#ff00ff' : '#0ea5e9', s: 0.25 },
          { type: 'ring', pos: [6, -25, -2], c: isDark ? '#00f5ff' : '#3b82f6', s: 0.3 },

          // Contact section (y: -27 to -32)
          { type: 'geo', pos: [-6, -28, -3], c: isDark ? '#39ff14' : '#7c3aed', s: 0.4 },
          { type: 'icosa', pos: [5, -31, -2], c: isDark ? '#ff00ff' : '#06b6d4', s: 0.35 }
        ].map((g, i) => {
          if (g.type === 'ring') return <SmallRing key={i} position={g.pos} color={g.c} speed={g.s} />;
          if (g.type === 'icosa') return <SmallIcosa key={i} position={g.pos} color={g.c} speed={g.s} />;
          return <SmallGeo key={i} position={g.pos} color={g.c} speed={g.s} />;
        })}
      </ParallaxGroup>
    </Canvas>
  );
}
