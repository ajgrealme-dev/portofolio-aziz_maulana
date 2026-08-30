import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';

function Card3D({ children, isDark }) {
  const ref = useRef();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}>
      {children}
    </motion.div>
  );
}

export default function About() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '0px' });

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';
  const cardBorder = isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.2)';
  const photoSrc = './foto_website.png';

  return (
    <section id="about" ref={ref} style={{ padding: 'clamp(80px, 10vh, 120px) clamp(1rem, 4vw, 2rem)', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<about>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.about.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
        </motion.div>

        <div className="about-grid">
          
          {/* Text on the Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={inView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            style={{ 
              display: 'flex', flexDirection: 'column', gap: '1.5rem',
              background: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              padding: '2rem', borderRadius: '24px',
              border: `1px solid ${isDark ? 'rgba(0,245,255,0.1)' : 'rgba(99,102,241,0.1)'}`,
              boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(99,102,241,0.05)'
            }}
          >
            {/* Biography paragraphs (flowing, non-slide layout) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[t.about.p1, t.about.p2, t.about.p3].map((p, i) => (
                <motion.p 
                  key={i} 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={inView ? { opacity: 1, y: 0 } : {}} 
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ color: subColor, lineHeight: 1.7, fontSize: '0.975rem', textAlign: 'justify' }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Inline Stats (Sleek and integrated, not box cards) */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '0.5rem', borderTop: `1px solid ${cardBorder}`, borderBottom: `1px solid ${cardBorder}`, padding: '1.25rem 0' }}>
              {t.about.stats.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: accentColor, fontFamily: 'Playfair Display, serif', textShadow: isDark ? `0 0 15px ${accentColor}60` : 'none' }}>{s.value}</span>
                  <span style={{ fontSize: '0.8rem', color: subColor, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Metadata Information (Clean list with subtle icon buttons) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              {[
                ['🎓', isDark ? 'Sedang kuliah S1 Manajemen — Universitas Pamulang' : 'S1 Management — Universitas Pamulang (In Progress)'],
                ['🏫', isDark ? 'Lulus Daar Al-Ilmi Boarding School, 2025' : 'Graduated Daar Al-Ilmi Boarding School, 2025'],
                ['📍', isDark ? 'Ciruas, Serang, Banten' : 'Ciruas, Serang, Banten'],
                ['🚀', isDark ? 'Terbuka untuk peluang kerja baru' : 'Open to new opportunities'],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{ 
                    fontSize: '1.1rem', 
                    background: isDark ? 'rgba(0,245,255,0.06)' : 'rgba(99,102,241,0.06)', 
                    width: '32px', height: '32px', 
                    borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    border: `1px solid ${accentColor}20`,
                    flexShrink: 0
                  }}>{icon}</span>
                  <span style={{ color: textColor, fontSize: '0.92rem', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Circular Photo on the Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={inView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Card3D isDark={isDark}>
              <div style={{ position: 'relative', display: 'inline-block', width: 'min(280px, 75vw)', height: 'min(280px, 75vw)' }}>
                {/* Glow behind circular photo */}
                <div style={{
                  position: 'absolute', inset: '-6px',
                  background: `linear-gradient(135deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'}, ${isDark ? '#ff00ff' : '#06b6d4'})`,
                  borderRadius: '50%', zIndex: -1, opacity: 0.8,
                  filter: 'blur(15px)',
                }} />
                {/* Perfect circle image container */}
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `3px solid ${accentColor}`,
                  boxShadow: isDark ? `0 0 35px ${accentColor}30` : '0 12px 35px rgba(99,102,241,0.15)',
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                }}>
                  <img 
                    src={photoSrc} 
                    alt="Aziz Maulana"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      objectPosition: 'center top', 
                      display: 'block', 
                      filter: isDark ? 'brightness(0.78) contrast(1.1) saturate(0.95)' : 'none',
                      transition: 'filter 0.3s ease',
                    }} 
                  />
                  {isDark && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle, transparent 40%, rgba(5,5,15,0.75) 100%)',
                      mixBlendMode: 'multiply',
                      pointerEvents: 'none',
                    }} />
                  )}
                </div>
              </div>
            </Card3D>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
