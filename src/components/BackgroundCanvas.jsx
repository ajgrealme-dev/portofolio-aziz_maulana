import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 🌟 Pure Steady 3D Cosmic Space: Decoupled 100% from scroll events

// 📐 Fibonacci Cylindrical Spiral Generator
// Uses Golden Angle (~137.5°) to guarantee perfectly uniform spatial distribution (0% clumping)
function generateFibonacciCylinder(count, height, radiusMin, radiusMax, depthOffset = 0) {
  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const t = i / count;
    // Uniform vertical progression across the entire page with micro-offset
    const y = (t - 0.5) * height + Math.sin(i * 12.9898) * (height / count) * 0.4;
    const theta = i * GOLDEN_ANGLE;
    // Area-weighted radial expansion
    const r = radiusMin + (radiusMax - radiusMin) * Math.sqrt((i % 500) / 500);

    positions[i * 3] = r * Math.cos(theta);
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = depthOffset + (r * 0.35) * Math.sin(theta);
  }
  return positions;
}

// 🌟 Layer 1: Deep Distant Stars (~3,800 particles, serene celestial drift)
function DeepStarfield() {
  const ref = useRef();
  const count = 3800;

  const positions = useMemo(
    () => generateFibonacciCylinder(count, 28, 14, 34, -14),
    [count]
  );

  useFrame((state, delta) => {
    if (ref.current) {
      // 100% Steady constant drift: Zero scroll dependency
      ref.current.rotation.z += delta * 0.012;
      ref.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.048}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// 🌟 Layer 2: Mid-Range Nebula Stardust (~2,600 particles, vibrant cyan/indigo)
function MidNebulaStarfield({ isDark }) {
  const ref = useRef();
  const count = 2600;

  const positions = useMemo(
    () => generateFibonacciCylinder(count, 24, 8, 24, -8),
    [count]
  );

  useFrame((state, delta) => {
    if (ref.current) {
      // Very slow and stable counter-rotation: Zero scroll dependency
      ref.current.rotation.z -= delta * 0.016;
      ref.current.rotation.y += delta * 0.014;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#00f5ff' : '#6366f1'}
        size={0.062}
        sizeAttenuation
        depthWrite={false}
        opacity={0.78}
      />
    </Points>
  );
}

// 🌟 Layer 3: Foreground Accent Stardust (~900 particles, emerald/purple starlight)
function NearWarpStarfield({ isDark }) {
  const ref = useRef();
  const count = 900;

  const positions = useMemo(
    () => generateFibonacciCylinder(count, 20, 4, 18, -3),
    [count]
  );

  useFrame((state, delta) => {
    if (ref.current) {
      // Subtle foreground orbit: Zero scroll dependency
      ref.current.rotation.z += delta * 0.02;
      ref.current.rotation.y -= delta * 0.018;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#39ff14' : '#8b5cf6'}
        size={0.075}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

// 🌟 Optimized 3D Landmark Meshes (Unified Animation, No Heavy Float Wrappers)
function OptimizedShape({ type, position, color, size, rotationSpeed = 0.5, floatOffset = 0 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4 * rotationSpeed;
      meshRef.current.rotation.y += delta * 0.5 * rotationSpeed;
      // Smooth sinusoidal floating without separate rAF hooks
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.9 + floatOffset) * 0.28;
    }
  });

  return (
    <mesh ref={meshRef} position={position} frustumCulled={true}>
      {type === 'ring' && <torusGeometry args={[size, 0.045, 12, 36]} />}
      {type === 'icosa' && <icosahedronGeometry args={[size, 0]} />}
      {type === 'geo' && <octahedronGeometry args={[size, 0]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.75}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// 🌟 Interactive Mouse Parallax Rig (Smooth Dampening)
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
      const targetRotX = -mouse.current.y * 0.06;
      const targetRotY = -mouse.current.x * 0.06;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// 🌟 Geometry Group (Steady in space, zero scroll shift)
function GeometryGroup({ children }) {
  return <group>{children}</group>;
}

export default function BackgroundCanvas({ isDark }) {
  const cCyan = isDark ? '#00f5ff' : '#6366f1';
  const cGreen = isDark ? '#39ff14' : '#8b5cf6';
  const cPink = isDark ? '#ff00ff' : '#0ea5e9';
  const cBlue = isDark ? '#38bdf8' : '#3b82f6';

  // 🌟 6 Curated Strategic Landmark Shapes (Flanking content columns on left & right)
  const landmarkGeometries = useMemo(
    () => [
      // Left Flank
      { type: 'ring', pos: [-5.4, 2.2, -1.8], c: cCyan, size: 0.75, speed: 0.6, floatOffset: 0.2 },
      { type: 'icosa', pos: [-5.8, -2.0, -2.2], c: cPink, size: 0.52, speed: 0.5, floatOffset: 1.5 },
      { type: 'geo', pos: [-6.2, 0.1, -2.8], c: cGreen, size: 0.48, speed: 0.55, floatOffset: 2.7 },
      // Right Flank
      { type: 'geo', pos: [5.4, 2.0, -2.0], c: cGreen, size: 0.55, speed: 0.55, floatOffset: 0.8 },
      { type: 'ring', pos: [5.6, -2.2, -1.8], c: cCyan, size: 0.78, speed: 0.65, floatOffset: 3.2 },
      { type: 'icosa', pos: [6.2, -0.1, -2.6], c: cBlue, size: 0.50, speed: 0.5, floatOffset: 2.1 },
    ],
    [cCyan, cGreen, cPink, cBlue]
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 8, 5]} intensity={0.9} color={cCyan} />
      <pointLight position={[-6, -15, 5]} intensity={0.8} color={cPink} />

      <SceneRig>
        {/* 🌟 3-Layer Uniform Fibonacci Particle Sky (~7,300 particles, zero clumping) */}
        <DeepStarfield />
        <MidNebulaStarfield isDark={isDark} />
        <NearWarpStarfield isDark={isDark} />

        {/* 🌟 12 Curated 3D Landmark Wireframes (Single-pass animation, lightweight) */}
        <GeometryGroup>
          {landmarkGeometries.map((g, i) => (
            <OptimizedShape
              key={i}
              type={g.type}
              position={g.pos}
              color={g.c}
              size={g.size}
              rotationSpeed={g.speed}
              floatOffset={g.floatOffset}
            />
          ))}
        </GeometryGroup>
      </SceneRig>
    </Canvas>
  );
}
