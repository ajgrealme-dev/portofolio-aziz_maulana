import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';

function FlipCard({ project, isDark, scrollVelocity = 0 }) {
  const [flipped, setFlipped] = useState(false);
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';

  const tiltStyle = {
    transform: `rotateY(${scrollVelocity}deg) skewX(${-scrollVelocity * 0.25}deg)`,
    transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{ 
        perspective: '1200px', 
        cursor: 'pointer', 
        height: '490px', 
        width: 'min(360px, 85vw)', 
        flex: '0 0 min(360px, 85vw)', 
        scrollSnapAlign: 'start',
        ...tiltStyle
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: isDark
            ? 'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(57,255,20,0.03))'
            : 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.04))',
          border: `1px solid ${isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)'}`,
          borderRadius: '24px',
          padding: '1.75rem',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
        }}>
          {/* Glow Top Bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: `linear-gradient(90deg, transparent, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'}, transparent)`,
            borderRadius: '24px 24px 0 0',
            boxShadow: isDark ? `0 0 20px ${accentColor}` : 'none',
          }} />

          {/* Top content area */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '14px',
                background: `linear-gradient(135deg, ${accentColor}30, ${isDark ? '#39ff14' : '#8b5cf6'}20)`,
                border: `1px solid ${accentColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem',
              }}>{project.icon || '🤖'}</div>
              <span style={{
                background: `${accentColor}20`, border: `1px solid ${accentColor}40`,
                color: accentColor, fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace',
                padding: '3px 10px', borderRadius: '100px', fontWeight: 600,
              }}>Personal Project</span>
            </div>

            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', lineHeight: 1.3, color: textColor, marginBottom: '0.3rem' }}>{project.title}</h3>
            <p style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', marginBottom: '0.75rem' }}>{project.period}</p>
            <p style={{ color: subColor, lineHeight: 1.5, fontSize: '0.83rem' }}>{project.desc}</p>
          </div>

          {/* Bottom tags & flip prompt */}
          <div style={{ marginTop: 'auto', paddingTop: '0.85rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
              {project.tag.split(' · ').map(tag => (
                <span key={tag} style={{
                  background: isDark ? 'rgba(0,245,255,0.08)' : 'rgba(99,102,241,0.1)',
                  border: `1px solid ${accentColor}30`,
                  color: accentColor, fontSize: '0.68rem', padding: '2px 8px', borderRadius: '6px', fontFamily: 'JetBrains Mono, monospace',
                }}>{tag}</span>
              ))}
            </div>

            <div style={{ color: subColor, fontSize: '0.75rem', textAlign: 'center' }}>
              {isDark ? '↺ Klik untuk lihat detail' : '↺ Click to see details'}
            </div>
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
          background: isDark
            ? 'linear-gradient(135deg, rgba(57,255,20,0.05), rgba(0,245,255,0.03))'
            : 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(99,102,241,0.04))',
          border: `1px solid ${isDark ? 'rgba(57,255,20,0.2)' : 'rgba(139,92,246,0.2)'}`,
          borderRadius: '24px', padding: '1.75rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${isDark ? '#39ff14' : '#8b5cf6'}, ${accentColor}, transparent)`, borderRadius: '24px 24px 0 0', boxShadow: isDark ? '0 0 20px #39ff14' : 'none' }} />

          <div>
            <h4 style={{ color: isDark ? '#39ff14' : '#8b5cf6', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem' }}>
              {isDark ? '// FITUR UTAMA' : '// KEY FEATURES'}
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {project.points.map((pt, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: flipped ? 1 : 0, x: flipped ? 0 : -20 }}
                  transition={{ delay: flipped ? 0.3 + i * 0.08 : 0 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: isDark ? '#a8c5d9' : '#4b5563', fontSize: '0.82rem', lineHeight: 1.45 }}
                >
                  <span style={{ color: isDark ? '#39ff14' : '#8b5cf6', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>▸</span>
                  {pt}
                </motion.li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            {/* Demo & PPTX buttons for AgentFlow */}
            {project.title === 'AgentFlow Bot' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: isDark ? 'linear-gradient(90deg, rgba(20,184,166,0.15), rgba(16,185,129,0.12))' : 'linear-gradient(90deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
                    border: `1px solid ${isDark ? '#14b8a6' : '#8b5cf6'}`,
                    color: isDark ? '#14b8a6' : '#8b5cf6',
                    padding: '7px 16px', borderRadius: '20px',
                    fontSize: '0.8rem', fontWeight: 'bold',
                    fontFamily: 'JetBrains Mono, monospace',
                    textDecoration: 'none',
                    boxShadow: isDark ? '0 0 12px rgba(20,184,166,0.3)' : 'none',
                    width: '100%', justifyContent: 'center',
                  }}
                >
                  ⚡ Lihat Demo AgentFlow
                </a>
                <a
                  href={project.pptxUrl}
                  download="AgentFlow-PitchDeck.pptx"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: 'transparent',
                    border: `1px solid ${isDark ? 'rgba(129,140,248,0.4)' : 'rgba(99,102,241,0.3)'}`,
                    color: isDark ? '#818cf8' : '#6366f1',
                    padding: '6px 16px', borderRadius: '20px',
                    fontSize: '0.75rem', fontWeight: 'bold',
                    fontFamily: 'JetBrains Mono, monospace',
                    textDecoration: 'none',
                    width: '100%', justifyContent: 'center',
                  }}
                >
                  📥 Download Pitch Deck (.pptx)
                </a>
              </div>
            )}

            {/* Demo button for Job Scraper Bot */}
            {project.title === 'Job Scraper Bot' && (
              <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                <a
                  href={`/?demo=jobscraper`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-block',
                    background: isDark ? 'linear-gradient(90deg, rgba(57,255,20,0.1), rgba(0,245,255,0.1))' : 'linear-gradient(90deg, rgba(139,92,246,0.1), rgba(99,102,241,0.1))',
                    border: `1px solid ${isDark ? '#39ff14' : '#8b5cf6'}`,
                    color: isDark ? '#39ff14' : '#8b5cf6',
                    padding: '7px 18px', borderRadius: '20px',
                    fontSize: '0.8rem', fontWeight: 'bold',
                    fontFamily: 'JetBrains Mono, monospace',
                    textDecoration: 'none',
                    boxShadow: isDark ? '0 0 10px rgba(57,255,20,0.3)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  ⚡ Lihat Demo Bot
                </a>
              </div>
            )}

            <div style={{ color: subColor, fontSize: '0.75rem', textAlign: 'center' }}>
              {isDark ? '↺ Klik untuk kembali' : '↺ Click to go back'}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '0px' });
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';

  const containerRef = useRef(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let lastScrollLeft = el.scrollLeft;
    let lastTime = Date.now();
    let timeoutId = null;

    const handleScroll = () => {
      const currentScrollLeft = el.scrollLeft;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      if (deltaTime > 0) {
        const deltaX = currentScrollLeft - lastScrollLeft;
        // Calculate velocity (px/ms) and clamp it between -12 and 12
        const velocity = Math.max(-12, Math.min(12, (deltaX / deltaTime) * 8));
        setScrollVelocity(velocity);
      }
      lastScrollLeft = currentScrollLeft;
      lastTime = currentTime;

      // Reset velocity to 0 when scrolling stops
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollVelocity(0);
      }, 100);
    };

    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="projects" ref={ref} style={{ padding: 'clamp(80px, 10vh, 120px) clamp(1rem, 4vw, 2rem)', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<projects>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.projects.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
          <p style={{ color: isDark ? '#94a3b8' : '#64748b', marginTop: '1rem', fontSize: '0.9rem' }}>
            {isDark ? 'Klik card untuk melihat detail fitur' : 'Click the card to see feature details'}
          </p>
        </motion.div>

        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 60 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ 
            display: 'flex', 
            gap: '2rem', 
            overflowX: 'auto', 
            padding: '1.5rem 0.75rem 2.5rem', 
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'thin',
            width: '100%',
          }}
          className="projects-scroll-container"
        >
          {t.projects.items.map((proj, i) => (
            <FlipCard key={i} project={proj} isDark={isDark} scrollVelocity={scrollVelocity} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
