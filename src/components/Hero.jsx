import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import HeroCanvas from './HeroCanvas';

const TypewriterText = ({ texts, isDark }) => {
  const ref = useRef();
  useEffect(() => {
    let ti = 0, ci = 0, del = false, timer;
    const tick = () => {
      const cur = texts[ti];
      if (del) {
        ref.current.textContent = cur.substring(0, ci - 1);
        ci--;
        if (ci === 0) { del = false; ti = (ti + 1) % texts.length; }
        timer = setTimeout(tick, 80);
      } else {
        ref.current.textContent = cur.substring(0, ci + 1);
        ci++;
        if (ci === cur.length) { del = true; timer = setTimeout(tick, 2000); return; }
        timer = setTimeout(tick, 120);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [texts]);

  return (
    <span ref={ref} style={{
      color: isDark ? '#39ff14' : '#6366f1',
      textShadow: isDark ? '0 0 20px #39ff14' : 'none',
      borderRight: `2px solid ${isDark ? '#39ff14' : '#6366f1'}`,
      paddingRight: '4px',
      animation: 'blink 1s step-end infinite',
    }} />
  );
};

export default function Hero() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';

  const roles = isDark
    ? ['IT Operations & Automation Specialist', 'Junior Specialist', 'Operations Admin', 'Bot Developer']
    : ['IT Operations & Automation Specialist', 'Junior Specialist', 'Operations Admin', 'Bot Developer'];

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '0 2rem' }}>
      <HeroCanvas isDark={isDark} />


      {/* Gradient fade bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
        background: isDark
          ? 'linear-gradient(transparent, #05050f)'
          : 'linear-gradient(transparent, #f8faff)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: isDark ? 'rgba(0,245,255,0.1)' : 'rgba(99,102,241,0.1)',
            border: `1px solid ${accentColor}40`,
            borderRadius: '100px', padding: '6px 18px',
            marginBottom: '1.5rem',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isDark ? '#39ff14' : '#22c55e', boxShadow: isDark ? '0 0 8px #39ff14' : 'none', display: 'inline-block' }} />
            <span style={{ color: accentColor, fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, letterSpacing: '1px' }}>
              {t.hero.greeting}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800,
            color: textColor,
            lineHeight: 1.1,
            marginBottom: '1rem',
            textShadow: isDark ? '0 0 40px rgba(0,245,255,0.2)' : 'none',
          }}
        >
          {t.hero.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 600, marginBottom: '0.75rem', minHeight: '2.5rem', color: textColor }}
        >
          <TypewriterText texts={roles} isDark={isDark} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ color: subColor, fontSize: '1rem', marginBottom: '2.5rem', letterSpacing: '1px' }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${accentColor}60` }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-block', textDecoration: 'none',
              background: `linear-gradient(135deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
              color: isDark ? '#000' : '#fff',
              padding: '14px 36px', borderRadius: '50px',
              fontWeight: 700, fontSize: '1rem',
              boxShadow: `0 0 20px ${accentColor}40`,
            }}
          >
            {t.hero.cta}
          </motion.a>
          <motion.a
            href="/CV_Aziz_Maulana_IT_Operations.pdf" download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-block', textDecoration: 'none',
              background: 'transparent',
              color: accentColor,
              padding: '14px 36px', borderRadius: '50px',
              fontWeight: 700, fontSize: '1rem',
              border: `2px solid ${accentColor}`,
            }}
          >
            ⬇ {t.hero.cv}
          </motion.a>
        </motion.div>

        {/* AgentFlow Live Demo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          style={{
            marginTop: '1.5rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
          }}
        >
          <span style={{ color: isDark ? '#6b7280' : '#9ca3af', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
            ⚡ Flagship AI Project
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(20, 184, 166, 0.5)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
                color: '#fff',
                padding: '12px 28px', borderRadius: '50px',
                fontWeight: 700, fontSize: '0.9rem',
                boxShadow: '0 0 24px rgba(20, 184, 166, 0.35)',
              }}
            >
              <span>🤖</span> Lihat Demo AgentFlow ERP
            </motion.a>
            <motion.a
              href="http://localhost:3000/api/pitch/generate-pptx"
              download="AgentFlow-PitchDeck.pptx"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                textDecoration: 'none',
                background: 'transparent',
                color: '#818cf8',
                padding: '12px 28px', borderRadius: '50px',
                fontWeight: 700, fontSize: '0.9rem',
                border: '2px solid #4f46e540',
              }}
            >
              <span>📥</span> Download Pitch Deck
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: subColor, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '0.75rem', letterSpacing: '2px' }}
          >
            <span>SCROLL</span>
            <span style={{ fontSize: '1.2rem' }}>↓</span>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { border-color: transparent; } 50% { border-color: currentColor; } }
        .desktop-nav { display: flex !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </section>
  );
}
