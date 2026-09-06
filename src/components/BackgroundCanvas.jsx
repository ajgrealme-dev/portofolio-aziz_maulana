import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// 🌟 Shared Scroll Dynamics Store (Tracks scroll velocity for hyperspace surge)
const scrollState = {
  currentY: 0,
  targetVelocity: 0,
  smoothedVelocity: 0,
  speedMultiplier: 1.0,
};

if (typeof window !== 'undefined') {
  let lastY = window.scrollY;
  let velTimeout;

  window.addEventListener('scroll', () => {
    const deltaY = window.scrollY - lastY;
    lastY = window.scrollY;
    scrollState.currentY = window.scrollY;

    const absDelta = Math.abs(deltaY);
    // Surge speed up to 3.5x based on scrolling intensity
    scrollState.targetVelocity = deltaY;
    scrollState.speedMultiplier = Math.min(3.5, 1.0 + absDelta * 0.045);

    clearTimeout(velTimeout);
    velTimeout = setTimeout(() => {
      scrollState.targetVelocity = 0;
      scrollState.speedMultiplier = 1.0;
    }, 120);
  }, { passive: true });
}

// 🌟 Layer 1: Deep Distant Stars (14,000 diamond stars, slow majestic drift)
function DeepStarfield() {
  const ref = useRef();
  const count = 14000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 85;
      p[i * 3 + 1] = (Math.random() - 0.5) * 280;
      p[i * 3 + 2] = -25 - Math.random() * 30; // Deep depth: -25 to -55
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const mult = scrollState.speedMultiplier;
      // Rotate predominantly around Z (screen plane) and subtle Y, zero X-pitch to avoid cone clumping
      ref.current.rotation.z += delta * 0.05 * mult;
      ref.current.rotation.y += delta * 0.04 * mult;
      // Gentle parallax shift (very slow)
      ref.current.position.y = scrollState.currentY * 0.0022;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.055}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

// 🌟 Layer 2: Mid-Range Cosmic Galaxy Dust (14,000 vibrant neon particles, 3x lively spin)
function MidNebulaStarfield({ isDark }) {
  const ref = useRef();
  const count = 14000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 75;
      p[i * 3 + 1] = (Math.random() - 0.5) * 260;
      p[i * 3 + 2] = -10 - Math.random() * 16; // Mid depth: -10 to -26
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const mult = scrollState.speedMultiplier;
      // 3x faster lively orbital rotation
      ref.current.rotation.z -= delta * 0.12 * mult;
      ref.current.rotation.y += delta * 0.14 * mult;
      // Medium parallax shift
      ref.current.position.y = scrollState.currentY * 0.0065;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#00f5ff' : '#6366f1'}
        size={0.068}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// 🌟 Layer 3: Near-Field Hyperspace Warp Stardust (6,000 close diamond particles with Z-warp thrust)
function NearWarpStarfield({ isDark }) {
  const ref = useRef();
  const count = 6000;

  const [positions, initialZ] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const zArray = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 55;
      p[i * 3 + 1] = (Math.random() - 0.5) * 240;
      const z = 2.5 - Math.random() * 12; // Near depth: -9.5 to +2.5
      p[i * 3 + 2] = z;
      zArray[i] = z;
    }
    return [p, zArray];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const mult = scrollState.speedMultiplier;
      // Fast dynamic rotation in the foreground
      ref.current.rotation.z += delta * 0.18 * mult;
      ref.current.rotation.y -= delta * 0.16 * mult;
      // Fast parallax shift
      ref.current.position.y = scrollState.currentY * 0.014;

      // Dynamic Z-Warp thrust: stars shift along Z based on scroll velocity
      const targetZShift = -scrollState.targetVelocity * 0.015;
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZShift, 0.08);
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#39ff14' : '#8b5cf6'}
        size={0.082}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

// 🌟 3D Wireframe Floating Geometries (3x Faster rotation & dynamic float)
function SmallGeo({ position, color, speed = 1.4, size = 0.55 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      const mult = scrollState.speedMultiplier;
      ref.current.rotation.x += delta * 1.5 * speed * mult;
      ref.current.rotation.y += delta * 1.8 * speed * mult;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 1.6) * 0.35;
    }
  });
  return (
    <Float speed={speed * 3.5} rotationIntensity={1.4} floatIntensity={1.1}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.8} emissive={color} emissiveIntensity={0.65} />
      </mesh>
    </Float>
  );
}

function SmallRing({ position, color, speed = 1.4, size = 0.85 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      const mult = scrollState.speedMultiplier;
      ref.current.rotation.x += delta * 1.6 * speed * mult;
      ref.current.rotation.z += delta * 1.4 * speed * mult;
      ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed * 1.5) * 0.35;
    }
  });
  return (
    <Float speed={speed * 3.5} rotationIntensity={1.5} floatIntensity={1.1}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[size, 0.055, 14, 52]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.82} emissive={color} emissiveIntensity={0.7} />
      </mesh>
    </Float>
  );
}

function SmallIcosa({ position, color, speed = 1.4, size = 0.55 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      const mult = scrollState.speedMultiplier;
      ref.current.rotation.y += delta * 1.7 * speed * mult;
      ref.current.rotation.z += delta * 1.4 * speed * mult;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 1.4) * 0.35;
    }
  });
  return (
    <Float speed={speed * 3.5} rotationIntensity={1.4} floatIntensity={1.1}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.8} emissive={color} emissiveIntensity={0.6} />
      </mesh>
    </Float>
  );
}

// 🌟 Interactive Mouse Parallax Rig
function SceneRig({ children }) {
  const groupRef = useRef();
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
      // Gentle tilt on mouse move
      const targetRotX = -mouse.current.y * 0.15;
      const targetRotY = -mouse.current.x * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// 🌟 Geometry Parallax Group (Moves 3D wireframe shapes steadily along page height)
function GeometryGroup({ children }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = scrollState.currentY * 0.0085;
    }
  });
  return <group ref={ref}>{children}</group>;
}

export default function BackgroundCanvas({ isDark }) {
  const cCyan = isDark ? '#00f5ff' : '#6366f1';
  const cGreen = isDark ? '#39ff14' : '#8b5cf6';
  const cPink = isDark ? '#ff00ff' : '#0ea5e9';
  const cBlue = isDark ? '#38bdf8' : '#3b82f6';

  // 36+ Scattered 3D Wireframe Assets strategically positioned across all sections
  const geometries = [
    // 1. Hero Section (y: 4 to -3)
    { type: 'ring', pos: [-5.5, 3.2, -2], c: cCyan, s: 1.4, size: 0.8 },
    { type: 'geo', pos: [6.2, 1.0, -3], c: cGreen, s: 1.5, size: 0.5 },
    { type: 'icosa', pos: [-4.0, -1.5, -2], c: cPink, s: 1.3, size: 0.45 },
    { type: 'ring', pos: [5.0, -2.8, -2], c: cBlue, s: 1.4, size: 0.7 },

    // 2. About Section (y: -4 to -9)
    { type: 'icosa', pos: [-6.5, -5.0, -3], c: cPink, s: 1.2, size: 0.5 },
    { type: 'ring', pos: [5.8, -6.5, -2], c: cCyan, s: 1.5, size: 0.85 },
    { type: 'geo', pos: [-4.8, -8.2, -3], c: cGreen, s: 1.4, size: 0.48 },
    { type: 'icosa', pos: [6.0, -9.5, -2], c: cBlue, s: 1.3, size: 0.42 },

    // 3. Skills & Knowledge Graph Section (y: -10 to -18)
    { type: 'geo', pos: [-6.2, -11.5, -3], c: cGreen, s: 1.3, size: 0.52 },
    { type: 'ring', pos: [6.5, -13.0, -2], c: cPink, s: 1.5, size: 0.8 },
    { type: 'icosa', pos: [-5.0, -15.2, -2], c: cCyan, s: 1.4, size: 0.45 },
    { type: 'geo', pos: [5.5, -17.0, -3], c: cBlue, s: 1.2, size: 0.5 },
    { type: 'ring', pos: [-6.0, -18.5, -2], c: cGreen, s: 1.4, size: 0.75 },

    // 4. Projects Section (y: -19 to -32)
    { type: 'ring', pos: [6.2, -20.5, -2], c: cCyan, s: 1.6, size: 0.9 },
    { type: 'icosa', pos: [-6.5, -22.0, -3], c: cPink, s: 1.3, size: 0.48 },
    { type: 'geo', pos: [5.8, -24.2, -2], c: cGreen, s: 1.5, size: 0.55 },
    { type: 'ring', pos: [-5.2, -26.5, -2], c: cBlue, s: 1.4, size: 0.8 },
    { type: 'icosa', pos: [6.5, -28.5, -3], c: cCyan, s: 1.3, size: 0.45 },
    { type: 'geo', pos: [-6.0, -30.5, -2], c: cPink, s: 1.5, size: 0.5 },
    { type: 'ring', pos: [5.2, -32.5, -2], c: cGreen, s: 1.4, size: 0.75 },

    // 5. Experience & Education Section (y: -33 to -46)
    { type: 'icosa', pos: [-6.2, -34.5, -3], c: cCyan, s: 1.3, size: 0.48 },
    { type: 'ring', pos: [6.0, -36.5, -2], c: cGreen, s: 1.5, size: 0.85 },
    { type: 'geo', pos: [-5.5, -39.0, -3], c: cPink, s: 1.4, size: 0.52 },
    { type: 'icosa', pos: [6.2, -41.5, -2], c: cBlue, s: 1.3, size: 0.45 },
    { type: 'ring', pos: [-6.5, -43.8, -2], c: cCyan, s: 1.5, size: 0.8 },
    { type: 'geo', pos: [5.5, -45.5, -3], c: cGreen, s: 1.4, size: 0.5 },

    // 6. Contact & Footer Section (y: -47 to -62)
    { type: 'geo', pos: [-6.0, -48.0, -3], c: cGreen, s: 1.5, size: 0.55 },
    { type: 'ring', pos: [6.2, -50.5, -2], c: cCyan, s: 1.4, size: 0.85 },
    { type: 'icosa', pos: [-5.2, -53.0, -2], c: cPink, s: 1.3, size: 0.48 },
    { type: 'geo', pos: [6.0, -55.5, -3], c: cBlue, s: 1.4, size: 0.5 },
    { type: 'ring', pos: [-6.2, -58.0, -2], c: cGreen, s: 1.5, size: 0.8 },
    { type: 'icosa', pos: [5.5, -60.5, -2], c: cCyan, s: 1.3, size: 0.45 },
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.0} color={cCyan} />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color={cGreen} />
      <pointLight position={[0, -25, 5]} intensity={0.9} color={cPink} />
      <pointLight position={[0, -50, 5]} intensity={0.9} color={cCyan} />

      <SceneRig>
        {/* 🌟 3-Layer Multi-Depth 3D Parallax Starfields (Uniform, Anti-Clumping) */}
        <DeepStarfield />
        <MidNebulaStarfield isDark={isDark} />
        <NearWarpStarfield isDark={isDark} />

        {/* 🌟 36+ Scattered 3D Wireframe Assets with 3x Faster Speed */}
        <GeometryGroup>
          {geometries.map((g, i) => {
            if (g.type === 'ring') return <SmallRing key={i} position={g.pos} color={g.c} speed={g.s} size={g.size} />;
            if (g.type === 'icosa') return <SmallIcosa key={i} position={g.pos} color={g.c} speed={g.s} size={g.size} />;
            return <SmallGeo key={i} position={g.pos} color={g.c} speed={g.s} size={g.size} />;
          })}
        </GeometryGroup>
      </SceneRig>
    </Canvas>
  );
}
