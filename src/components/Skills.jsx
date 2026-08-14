import { useRef, useState, useMemo } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';

const SOFT_SKILLS_LIST = [
  'Disiplin & Integritas',
  'Ketelitian Data',
  'Kemauan Belajar',
  'Kepatuhan Aturan'
];

function Word({ children, isDark, ...props }) {
  const ref = useRef();
  const isSoft = SOFT_SKILLS_LIST.includes(children);
  const color = isSoft 
    ? (isDark ? '#39ff14' : '#16a34a')
    : (isDark ? '#00f5ff' : '#6366f1');
  const borderColor = isSoft
    ? (isDark ? 'rgba(57, 255, 20, 0.45)' : 'rgba(22, 163, 74, 0.45)')
    : (isDark ? 'rgba(0, 245, 255, 0.25)' : 'rgba(99, 102, 241, 0.25)');
  const boxShadow = isSoft
    ? (isDark ? '0 0 12px rgba(57,255,20,0.25)' : '0 4px 10px rgba(22,163,74,0.15)')
    : (isDark ? '0 0 10px rgba(0,245,255,0.1)' : '0 4px 10px rgba(99,102,241,0.05)');

  return (
    <Html ref={ref} {...props} distanceFactor={12} center>
      <span style={{
        color,
        fontSize: '0.8rem',
        fontWeight: 700,
        fontFamily: 'JetBrains Mono, monospace',
        background: isDark ? 'rgba(5, 5, 15, 0.75)' : 'rgba(255, 255, 255, 0.85)',
        padding: '4px 10px',
        borderRadius: '6px',
        border: `1px solid ${borderColor}`,
        whiteSpace: 'nowrap',
        boxShadow,
        cursor: 'default',
        userSelect: 'none',
        display: 'block'
      }} className="tech-sphere-word">{children}</span>
    </Html>
  );
}

function Cloud({ radius = 5.2, isDark }) {
  const words = useMemo(() => {
    const list = [
      'JavaScript', 'Node.js', 'React', 'SQL', 'SQLite', 
      'HTML', 'CSS', 'Gemini API', 'Otomasi', 'Data Entry', 
      'MS Excel', 'MS Word', 'Three.js', 'Python', 'MT5', 
      'OpenCV', 'MediaPipe', 'Git', 'GitHub', 'AI Bot',
      'Disiplin & Integritas', 'Ketelitian Data', 'Kemauan Belajar', 'Kepatuhan Aturan'
    ];
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiInterval = Math.PI / (list.length + 1);
    const thetaInterval = (Math.PI * 2 * (1 + Math.sqrt(5))) / list.length; // Fibonacci spiral
    for (let i = 0; i < list.length; i++) {
      spherical.set(radius, phiInterval * (i + 1), thetaInterval * i);
      const pos = new THREE.Vector3().setFromSpherical(spherical);
      temp.push([pos, list[i]]);
    }
    return temp;
  }, [radius]);

  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map(([pos, word], idx) => (
        <Word key={idx} position={pos} isDark={isDark}>{word}</Word>
      ))}
    </group>
  );
}

function SkillTag({ name, isDark, delay }) {
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.08, y: -4, rotateZ: [-1, 1, 0] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: '8px 16px',
        borderRadius: '10px',
        border: `1px solid ${hovered ? accentColor : accentColor + '40'}`,
        background: hovered ? (isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.15)') : (isDark ? 'rgba(0,245,255,0.05)' : 'rgba(99,102,241,0.05)'),
        color: hovered ? accentColor : isDark ? '#a8c5d9' : '#4b5563',
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'default',
        transition: 'all 0.2s ease',
        boxShadow: hovered ? (isDark ? `0 0 15px ${accentColor}40` : `0 5px 20px rgba(99,102,241,0.25)`) : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {name}
    </motion.div>
  );
}

function SkillCategory({ cat, isDark, inView, catIndex }) {
  const icons = ['📋', '⚡', '🧠'];
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const cardBg = isDark ? 'rgba(0,245,255,0.03)' : 'rgba(99,102,241,0.04)';
  const cardBorder = isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.2)';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';

  const cardRef = useRef();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const yVal = (e.clientY - rect.top - rect.height / 2) / rect.height;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: catIndex * 0.15 }}
      whileHover={{ y: -8, boxShadow: isDark ? `0 20px 60px ${accentColor}20` : '0 20px 60px rgba(99,102,241,0.15)' }}
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: '24px',
        padding: '2rem',
        transformStyle: 'preserve-3d',
        transition: 'box-shadow 0.3s ease',
        backdropFilter: 'blur(10px)',
        rotateX,
        rotateY,
        perspective: '1000px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: `linear-gradient(135deg, ${accentColor}30, ${isDark ? '#39ff14' : '#8b5cf6'}20)`,
          border: `1px solid ${accentColor}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem',
        }}>
          {icons[catIndex]}
        </div>
        <h3 style={{ color: textColor, fontWeight: 700, fontSize: '1.1rem' }}>{cat.name}</h3>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {cat.items.map((item, j) => (
          <SkillTag key={item} name={item} isDark={isDark} delay={catIndex * 0.1 + j * 0.05} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';

  const bars = [
    { label: isDark ? 'Disiplin & Integritas' : 'Discipline & Integrity', pct: 95 },
    { label: isDark ? 'Ketelitian Data' : 'Data Accuracy', pct: 90 },
    { label: isDark ? 'Kemauan Belajar' : 'Eagerness to Learn', pct: 98 },
    { label: isDark ? 'Kepatuhan Aturan' : 'Rule Compliance', pct: 93 },
    { label: isDark ? 'Kerja Tim' : 'Teamwork', pct: 88 },
  ];

  return (
    <section id="skills" ref={ref} style={{ padding: '120px 2rem', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<skills>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.skills.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {t.skills.cats.map((cat, i) => (
            <SkillCategory key={cat.name} cat={cat} isDark={isDark} inView={inView} catIndex={i} />
          ))}
        </div>

        {/* Bottom Section: Integrated Tech & Soft Skills 3D Sphere */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{
            background: isDark ? 'rgba(139, 92, 246, 0.04)' : 'rgba(99, 102, 241, 0.05)',
            border: `1px solid ${isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99, 102, 241, 0.2)'}`,
            borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)',
            marginTop: '3rem',
            position: 'relative',
            overflow: 'hidden',
            height: '380px',
            maxWidth: '750px',
            margin: '3rem auto 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <h3 style={{ 
            position: 'absolute', top: '1.5rem', left: '2rem', 
            color: accentColor, fontWeight: 700, fontSize: '1.1rem', 
            textTransform: 'uppercase', letterSpacing: '2px', 
            fontFamily: 'Playfair Display, serif', zIndex: 10 
          }}>
            {isDark ? 'Interactive Tech & Soft Skills Sphere' : 'Interactive Tech & Soft Skills Sphere'}
          </h3>
          <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, top: '2.5rem' }}>
            <Canvas dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 6.2], fov: 60 }} style={{ pointerEvents: 'none' }}>
              <Cloud isDark={isDark} />
            </Canvas>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
