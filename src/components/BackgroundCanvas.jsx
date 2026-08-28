import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// 🌟 Layer 1: Super Dense White & Diamond Stardust (25,000 stars)
function SuperWhiteStarfield() {
  const ref = useRef();
  const count = 25000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 90;
      p[i * 3 + 1] = (Math.random() - 0.5) * 320; // Massive continuous vertical span
      p[i * 3 + 2] = (Math.random() - 0.5) * 35 - 8;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.006;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.003) * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

// 🌟 Layer 2: Vibrant Neon Cyan / Accent Galaxy Dust (12,000 particles)
function SuperNeonParticles({ isDark }) {
  const ref = useRef();
  const count = 12000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 85;
      p[i * 3 + 1] = (Math.random() - 0.5) * 300;
      p[i * 3 + 2] = (Math.random() - 0.5) * 25 - 4;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#00f5ff' : '#6366f1'}
        size={0.055}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

// 🌟 Layer 3: Emerald & Magenta Deep Nebula Dust (5,000 particles)
function NebulaGlowDust({ isDark }) {
  const ref = useRef();
  const count = 5000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 75;
      p[i * 3 + 1] = (Math.random() - 0.5) * 280;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.008;
      ref.current.rotation.z = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#39ff14' : '#8b5cf6'}
        size={0.065}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// 🌟 3D Wireframe Floating Geometries
function SmallGeo({ position, color, speed = 0.5, size = 0.45 }) {
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
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.7} emissive={color} emissiveIntensity={0.45} />
      </mesh>
    </Float>
  );
}

function SmallRing({ position, color, speed = 0.5, size = 0.75 }) {
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
        <torusGeometry args={[size, 0.055, 14, 52]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.75} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
}

function SmallIcosa({ position, color, speed = 0.5, size = 0.45 }) {
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
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.7} emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </Float>
  );
}

function ParallaxGroup({ children }) {
  const groupRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (groupRef.current) {
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
  const cCyan = isDark ? '#00f5ff' : '#6366f1';
  const cGreen = isDark ? '#39ff14' : '#8b5cf6';
  const cPink = isDark ? '#ff00ff' : '#0ea5e9';
  const cBlue = isDark ? '#38bdf8' : '#3b82f6';

  // 36+ Scattered 3D Wireframe Assets across all sections
  const geometries = [
    // 1. Hero Section (y: 4 to -3)
    { type: 'ring', pos: [-5.5, 3.2, -2], c: cCyan, s: 0.35, size: 0.8 },
    { type: 'geo', pos: [6.2, 1.0, -3], c: cGreen, s: 0.4, size: 0.5 },
    { type: 'icosa', pos: [-4.0, -1.5, -2], c: cPink, s: 0.3, size: 0.45 },
    { type: 'ring', pos: [5.0, -2.8, -2], c: cBlue, s: 0.35, size: 0.7 },

    // 2. About Section (y: -4 to -9)
    { type: 'icosa', pos: [-6.5, -5.0, -3], c: cPink, s: 0.25, size: 0.5 },
    { type: 'ring', pos: [5.8, -6.5, -2], c: cCyan, s: 0.4, size: 0.85 },
    { type: 'geo', pos: [-4.8, -8.2, -3], c: cGreen, s: 0.35, size: 0.48 },
    { type: 'icosa', pos: [6.0, -9.5, -2], c: cBlue, s: 0.3, size: 0.42 },

    // 3. Skills & Knowledge Graph Section (y: -10 to -18)
    { type: 'geo', pos: [-6.2, -11.5, -3], c: cGreen, s: 0.3, size: 0.52 },
    { type: 'ring', pos: [6.5, -13.0, -2], c: cPink, s: 0.4, size: 0.8 },
    { type: 'icosa', pos: [-5.0, -15.2, -2], c: cCyan, s: 0.35, size: 0.45 },
    { type: 'geo', pos: [5.5, -17.0, -3], c: cBlue, s: 0.25, size: 0.5 },
    { type: 'ring', pos: [-6.0, -18.5, -2], c: cGreen, s: 0.35, size: 0.75 },

    // 4. Projects Section (y: -19 to -32)
    { type: 'ring', pos: [6.2, -20.5, -2], c: cCyan, s: 0.45, size: 0.9 },
    { type: 'icosa', pos: [-6.5, -22.0, -3], c: cPink, s: 0.3, size: 0.48 },
    { type: 'geo', pos: [5.8, -24.2, -2], c: cGreen, s: 0.4, size: 0.55 },
    { type: 'ring', pos: [-5.2, -26.5, -2], c: cBlue, s: 0.35, size: 0.8 },
    { type: 'icosa', pos: [6.5, -28.5, -3], c: cCyan, s: 0.3, size: 0.45 },
    { type: 'geo', pos: [-6.0, -30.5, -2], c: cPink, s: 0.4, size: 0.5 },
    { type: 'ring', pos: [5.2, -32.5, -2], c: cGreen, s: 0.35, size: 0.75 },

    // 5. Experience & Education Section (y: -33 to -46)
    { type: 'icosa', pos: [-6.2, -34.5, -3], c: cCyan, s: 0.3, size: 0.48 },
    { type: 'ring', pos: [6.0, -36.5, -2], c: cGreen, s: 0.4, size: 0.85 },
    { type: 'geo', pos: [-5.5, -39.0, -3], c: cPink, s: 0.35, size: 0.52 },
    { type: 'icosa', pos: [6.2, -41.5, -2], c: cBlue, s: 0.3, size: 0.45 },
    { type: 'ring', pos: [-6.5, -43.8, -2], c: cCyan, s: 0.4, size: 0.8 },
    { type: 'geo', pos: [5.5, -45.5, -3], c: cGreen, s: 0.35, size: 0.5 },

    // 6. Contact & Footer Section (y: -47 to -62)
    { type: 'geo', pos: [-6.0, -48.0, -3], c: cGreen, s: 0.4, size: 0.55 },
    { type: 'ring', pos: [6.2, -50.5, -2], c: cCyan, s: 0.35, size: 0.85 },
    { type: 'icosa', pos: [-5.2, -53.0, -2], c: cPink, s: 0.3, size: 0.48 },
    { type: 'geo', pos: [6.0, -55.5, -3], c: cBlue, s: 0.35, size: 0.5 },
    { type: 'ring', pos: [-6.2, -58.0, -2], c: cGreen, s: 0.4, size: 0.8 },
    { type: 'icosa', pos: [5.5, -60.5, -2], c: cCyan, s: 0.3, size: 0.45 },
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.9} color={cCyan} />
      <pointLight position={[-5, -5, 5]} intensity={0.7} color={cGreen} />
      <pointLight position={[0, -25, 5]} intensity={0.8} color={cPink} />
      <pointLight position={[0, -50, 5]} intensity={0.8} color={cCyan} />

      <ParallaxGroup>
        {/* 🌟 42,000+ Ultra-Dense Galaxy Starfield across full height */}
        <SuperWhiteStarfield />
        <SuperNeonParticles isDark={isDark} />
        <NebulaGlowDust isDark={isDark} />

        {/* 🌟 36+ Scattered 3D Wireframe Assets */}
        {geometries.map((g, i) => {
          if (g.type === 'ring') return <SmallRing key={i} position={g.pos} color={g.c} speed={g.s} size={g.size} />;
          if (g.type === 'icosa') return <SmallIcosa key={i} position={g.pos} color={g.c} speed={g.s} size={g.size} />;
          return <SmallGeo key={i} position={g.pos} color={g.c} speed={g.s} size={g.size} />;
        })}
      </ParallaxGroup>
    </Canvas>
  );
}
