import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';

function FlipCard({ project, isDark, scrollVelocity = 0, onOpenLightbox }) {
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
        height: '560px', 
        width: 'min(360px, 86vw)', 
        flex: '0 0 min(360px, 86vw)', 
        scrollSnapAlign: 'center',
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
          padding: '1.4rem',
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

          {/* Top: GUI Screenshot Image Banner */}
          <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '16px', overflow: 'hidden', marginBottom: '0.85rem', border: `1px solid ${accentColor}35`, background: '#070913' }}>
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
            />
            {/* Live GUI badge */}
            <div style={{
              position: 'absolute', top: '8px', right: '8px',
              background: 'rgba(5, 7, 17, 0.85)',
              border: `1px solid ${accentColor}60`,
              backdropFilter: 'blur(6px)',
              padding: '3px 8px', borderRadius: '12px',
              color: accentColor, fontSize: '0.65rem',
              fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#39ff14', boxShadow: '0 0 6px #39ff14' }}></span>
              GUI PREVIEW
            </div>

            {/* Lightbox zoom trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenLightbox) onOpenLightbox(project.image, project.title);
              }}
              title="Perbesar Screenshot GUI"
              style={{
                position: 'absolute', bottom: '8px', right: '8px',
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px', padding: '4px 8px',
                color: '#fff', fontSize: '0.7rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                backdropFilter: 'blur(4px)',
              }}
            >
              🔍 Zoom
            </button>
          </div>

          {/* Middle content area */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', lineHeight: 1.25, color: textColor, margin: 0 }}>{project.title}</h3>
              <span style={{
                background: `${accentColor}15`, border: `1px solid ${accentColor}35`,
                color: accentColor, fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace',
                padding: '2px 8px', borderRadius: '100px', fontWeight: 600, flexShrink: 0,
              }}>Personal</span>
            </div>

            <p style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', marginBottom: '0.5rem' }}>{project.period}</p>
            <p style={{ color: subColor, lineHeight: 1.45, fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.desc}</p>
          </div>

          {/* Bottom tags & flip prompt */}
          <div style={{ marginTop: 'auto', paddingTop: '0.65rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.65rem', maxHeight: '55px', overflow: 'hidden' }}>
              {project.tag.split(' · ').map(tag => (
                <span key={tag} style={{
                  background: isDark ? 'rgba(0,245,255,0.08)' : 'rgba(99,102,241,0.1)',
                  border: `1px solid ${accentColor}30`,
                  color: accentColor, fontSize: '0.65rem', padding: '2px 7px', borderRadius: '6px', fontFamily: 'JetBrains Mono, monospace',
                }}>{tag}</span>
              ))}
            </div>

            <div style={{ color: subColor, fontSize: '0.72rem', textAlign: 'center' }}>
              {isDark ? '↺ Klik kartu untuk lihat fitur' : '↺ Click card for key features'}
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
          borderRadius: '24px', padding: '1.4rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${isDark ? '#39ff14' : '#8b5cf6'}, ${accentColor}, transparent)`, borderRadius: '24px 24px 0 0', boxShadow: isDark ? '0 0 20px #39ff14' : 'none' }} />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ color: isDark ? '#39ff14' : '#8b5cf6', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', letterSpacing: '1.5px', margin: 0 }}>
                {isDark ? '// FITUR & CAPABILITAS' : '// KEY FEATURES'}
              </h4>
              <span style={{ fontSize: '0.75rem', color: subColor }}>{project.icon}</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {project.points.map((pt, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: flipped ? 1 : 0, x: flipped ? 0 : -20 }}
                  transition={{ delay: flipped ? 0.3 + i * 0.08 : 0 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', color: isDark ? '#a8c5d9' : '#4b5563', fontSize: '0.8rem', lineHeight: 1.4 }}
                >
                  <span style={{ color: isDark ? '#39ff14' : '#8b5cf6', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>▸</span>
                  {pt}
                </motion.li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenLightbox) onOpenLightbox(project.image, project.title);
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: isDark ? 'rgba(0,245,255,0.1)' : 'rgba(99,102,241,0.1)',
                  border: `1px solid ${accentColor}50`,
                  color: accentColor,
                  padding: '7px 14px', borderRadius: '14px',
                  fontSize: '0.78rem', fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer', width: '100%', justifyContent: 'center',
                }}
              >
                📸 Buka Tampilan GUI Penuh
              </button>

              {project.pptxUrl && (
                <a
                  href={project.pptxUrl}
                  download="AgentFlow-PitchDeck.pptx"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: 'transparent',
                    border: `1px solid ${isDark ? 'rgba(129,140,248,0.4)' : 'rgba(99,102,241,0.3)'}`,
                    color: isDark ? '#818cf8' : '#6366f1',
                    padding: '6px 14px', borderRadius: '14px',
                    fontSize: '0.75rem', fontWeight: 'bold',
                    fontFamily: 'JetBrains Mono, monospace',
                    textDecoration: 'none',
                    width: '100%', justifyContent: 'center',
                  }}
                >
                  📥 Download Pitch Deck (.pptx)
                </a>
              )}
            </div>

            <div style={{ color: subColor, fontSize: '0.72rem', textAlign: 'center' }}>
              {isDark ? '↺ Klik untuk kembali ke depan' : '↺ Click to flip back'}
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
  const scrollRef = useRef();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollLeft = useRef(0);
  const velocityTimer = useRef();

  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState('');

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);

    const delta = scrollLeft - lastScrollLeft.current;
    lastScrollLeft.current = scrollLeft;
    const clampedVelocity = Math.max(-12, Math.min(12, delta * 0.4));
    setScrollVelocity(clampedVelocity);

    clearTimeout(velocityTimer.current);
    velocityTimer.current = setTimeout(() => setScrollVelocity(0), 100);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scrollByAmount = (amount) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id="projects" ref={ref} style={{ padding: 'clamp(70px, 9vh, 120px) 0', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(0.75rem, 3vw, 2rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<projects>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.projects.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto 0.75rem', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
          <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.85rem' }}>
            {isDark ? '← Geser kartu untuk melihat GUI nyata tiap proyek · Klik untuk balik kartu →' : '← Swipe cards to explore real project GUIs · Click to flip card →'}
          </p>
        </motion.div>
      </div>

      {/* Progress Line */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 1.5rem', padding: '0 clamp(0.75rem, 3vw, 2rem)' }}>
        <div style={{ width: '100%', height: '3px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: `${scrollProgress}%`,
              background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
              boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none',
              borderRadius: '3px',
              transition: 'width 0.1s ease',
            }}
          />
        </div>
      </div>

      {/* Horizontal Snap Scroll Container */}
      <div
        ref={scrollRef}
        className="projects-scroll-container"
        style={{
          display: 'flex',
          gap: '1.25rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '1rem clamp(0.75rem, 4vw, 3rem) 2rem',
          width: '100%',
          boxSizing: 'border-box',
          scrollbarWidth: 'thin',
        }}
      >
        {t.projects.items.map((proj, i) => (
          <FlipCard
            key={proj.title}
            project={proj}
            isDark={isDark}
            scrollVelocity={scrollVelocity}
            onOpenLightbox={(img, title) => {
              setLightboxImg(img);
              setLightboxTitle(title);
            }}
          />
        ))}
      </div>

      {/* Desktop Navigation Arrows */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
        <button
          onClick={() => scrollByAmount(-380)}
          disabled={!canScrollLeft}
          aria-label="Previous Projects"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: isDark ? 'rgba(0,245,255,0.08)' : 'rgba(99,102,241,0.08)',
            border: `1px solid ${accentColor}40`,
            color: accentColor, fontSize: '1.1rem',
            cursor: canScrollLeft ? 'pointer' : 'default',
            opacity: canScrollLeft ? 1 : 0.3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          ←
        </button>
        <button
          onClick={() => scrollByAmount(380)}
          disabled={!canScrollRight}
          aria-label="Next Projects"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: isDark ? 'rgba(0,245,255,0.08)' : 'rgba(99,102,241,0.08)',
            border: `1px solid ${accentColor}40`,
            color: accentColor, fontSize: '1.1rem',
            cursor: canScrollRight ? 'pointer' : 'default',
            opacity: canScrollRight ? 1 : 0.3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          →
        </button>
      </div>

      {/* Lightbox Modal for Full GUI Preview */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative', maxWidth: '1000px', width: '100%',
              background: '#070913', border: `1px solid ${accentColor}50`,
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: `0 0 50px ${accentColor}30`,
            }}
          >
            <div style={{
              padding: '12px 20px', background: '#0c1022', borderBottom: `1px solid ${accentColor}30`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ color: textColor, fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📸 <span>{lightboxTitle}</span> <span style={{ fontSize: '0.75rem', color: accentColor, border: `1px solid ${accentColor}50`, padding: '2px 8px', borderRadius: '10px' }}>Tampilan GUI Nyata</span>
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)', border: 'none',
                  color: '#fff', width: '32px', height: '32px', borderRadius: '50%',
                  cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '8px', background: '#050711' }}>
              <img
                src={lightboxImg}
                alt={lightboxTitle}
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '12px', display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
