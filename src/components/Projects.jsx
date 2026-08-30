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

  // Derive a nice mockup url domain
  const getDomain = (title) => {
    if (title.includes('ShopAtChey')) return 'shopatchey.store';
    if (title.includes('Makelar')) return 'agentflow.ai/makelar';
    if (title.includes('ERP')) return 'agentflow.ai/erp';
    if (title.includes('NexaBooks')) return 'nexabooks.app';
    if (title.includes('SakuTracker')) return 'sakutracker.pwa';
    if (title.includes('Job Scraper')) return 'jobscraper.engine';
    if (title.includes('Robot Sakti')) return 'robotsakti.trade';
    if (title.includes('Kicaw')) return 'kicawmania.vision';
    return 'project.app';
  };

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{ 
        perspective: '1200px', 
        cursor: 'pointer', 
        height: '530px', 
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
        {/* Front Face */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: isDark
            ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.75), rgba(7, 10, 25, 0.85))'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(241, 245, 249, 0.85))',
          border: `1px solid ${isDark ? 'rgba(0,245,255,0.22)' : 'rgba(99,102,241,0.2)'}`,
          borderRadius: '24px',
          padding: '1.15rem',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          backdropFilter: 'blur(16px)',
          boxShadow: isDark 
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 245, 255, 0.06)' 
            : '0 20px 40px -15px rgba(99, 102, 241, 0.1)',
          overflow: 'hidden',
        }}>
          {/* Glow Top Bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: `linear-gradient(90deg, transparent, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'}, transparent)`,
            borderRadius: '26px 26px 0 0',
            boxShadow: isDark ? `0 0 20px ${accentColor}` : 'none',
          }} />

          {/* 1. Header: Icon, Badge, Title, Period & Full Description */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: `linear-gradient(135deg, ${accentColor}30, ${isDark ? '#39ff14' : '#8b5cf6'}20)`,
                border: `1px solid ${accentColor}45`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
                boxShadow: isDark ? `0 0 15px ${accentColor}25` : 'none',
              }}>{project.icon || '🤖'}</div>
              
              <span style={{
                background: `${accentColor}15`, border: `1px solid ${accentColor}40`,
                color: accentColor, fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
                padding: '3px 10px', borderRadius: '100px', fontWeight: 600,
                letterSpacing: '0.5px',
              }}>
                {project.title.includes('ShopAtChey') ? '✨ Featured Store' : 'Personal Project'}
              </span>
            </div>

            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.22rem', lineHeight: 1.25, color: textColor, margin: '0 0 0.2rem 0' }}>
              {project.title}
            </h3>
            
            <p style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', margin: '0 0 0.45rem 0', fontWeight: 500 }}>
              {project.period}
            </p>
            
            {/* Full Unclipped Description */}
            <p style={{ 
              color: subColor, 
              lineHeight: 1.45, 
              fontSize: '0.8rem', 
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {project.desc}
            </p>
          </div>

          {/* 2. Middle: Premium Mac Browser Frame with 100% Full Un-cropped GUI Screenshot */}
          <div style={{
            position: 'relative',
            width: '100%',
            borderRadius: '14px',
            overflow: 'hidden',
            margin: '0.35rem 0',
            border: `1px solid ${isDark ? 'rgba(0, 245, 255, 0.35)' : 'rgba(99, 102, 241, 0.3)'}`,
            background: '#04060e',
            boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.7), inset 0 0 15px rgba(0, 245, 255, 0.05)' : '0 8px 20px rgba(0,0,0,0.1)',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Browser Top Navigation Bar */}
            <div style={{
              height: '26px',
              background: isDark ? '#090d1a' : '#e2e8f0',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 10px',
              flexShrink: 0,
            }}>
              {/* 3 Mac Dots */}
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
              </div>

              {/* URL Address Bar */}
              <div style={{
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                borderRadius: '6px',
                padding: '1px 12px',
                fontSize: '0.62rem',
                fontFamily: 'JetBrains Mono, monospace',
                color: isDark ? '#94a3b8' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span style={{ color: '#39ff14', fontSize: '0.55rem' }}>🔒</span> {getDomain(project.title)}
              </div>

              {/* GUI Badge */}
              <div style={{
                fontSize: '0.6rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                color: accentColor,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#39ff14', boxShadow: '0 0 5px #39ff14' }}></span>
                LIVE
              </div>
            </div>

            {/* Browser Body: 16:9 Un-cropped Preview Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#04060e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                }}
              />

              {/* Lightbox Zoom Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenLightbox) onOpenLightbox(project.image, project.title);
                }}
                title="Perbesar Tampilan GUI Utuh (HD)"
                style={{
                  position: 'absolute', bottom: '8px', right: '8px',
                  background: 'rgba(5, 7, 17, 0.85)',
                  border: `1px solid ${accentColor}70`,
                  borderRadius: '8px', padding: '4px 10px',
                  color: '#fff', fontSize: '0.7rem',
                  fontWeight: 600,
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                  backdropFilter: 'blur(6px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }}
              >
                🔍 Full Preview
              </button>
            </div>
          </div>

          {/* 3. Bottom: Tech Stack Tags & Flip Prompt */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.5rem', maxHeight: '55px', overflow: 'hidden' }}>
              {project.tag.split(' · ').map(tag => (
                <span key={tag} style={{
                  background: isDark ? 'rgba(0,245,255,0.08)' : 'rgba(99,102,241,0.09)',
                  border: `1px solid ${accentColor}35`,
                  color: accentColor, fontSize: '0.66rem', padding: '2px 8px', borderRadius: '6px', fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 500,
                }}>{tag}</span>
              ))}
            </div>

            <div style={{ color: subColor, fontSize: '0.72rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span>↺</span> {isDark ? 'Klik kartu untuk melihat fitur lengkap' : 'Click card to see full key features'}
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
          background: isDark
            ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.85), rgba(7, 10, 25, 0.95))'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(241, 245, 249, 0.9))',
          border: `1px solid ${isDark ? 'rgba(57,255,20,0.25)' : 'rgba(139,92,246,0.25)'}`,
          borderRadius: '26px', padding: '1.4rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
          boxShadow: isDark ? '0 20px 40px -15px rgba(0, 0, 0, 0.8)' : '0 20px 40px -15px rgba(139,92,246,0.1)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${isDark ? '#39ff14' : '#8b5cf6'}, ${accentColor}, transparent)`, borderRadius: '26px 26px 0 0', boxShadow: isDark ? '0 0 20px #39ff14' : 'none' }} />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <h4 style={{ color: isDark ? '#39ff14' : '#8b5cf6', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', letterSpacing: '1.5px', margin: 0, fontWeight: 700 }}>
                {isDark ? '// FITUR & KAPABILITAS UTAMA' : '// KEY FEATURES & CAPABILITIES'}
              </h4>
              <span style={{ fontSize: '1rem' }}>{project.icon}</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
              {project.points.map((pt, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: flipped ? 1 : 0, x: flipped ? 0 : -20 }}
                  transition={{ delay: flipped ? 0.3 + i * 0.08 : 0 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: isDark ? '#cbd5e1' : '#334155', fontSize: '0.82rem', lineHeight: 1.45 }}
                >
                  <span style={{ color: isDark ? '#39ff14' : '#8b5cf6', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>▸</span>
                  {pt}
                </motion.li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '0.85rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenLightbox) onOpenLightbox(project.image, project.title);
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: isDark ? 'linear-gradient(90deg, rgba(0,245,255,0.15), rgba(57,255,20,0.1))' : 'linear-gradient(90deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
                  border: `1px solid ${accentColor}60`,
                  color: accentColor,
                  padding: '8px 16px', borderRadius: '14px',
                  fontSize: '0.8rem', fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer', width: '100%', justifyContent: 'center',
                  boxShadow: isDark ? `0 0 15px ${accentColor}20` : 'none',
                }}
              >
                📸 Buka Tampilan GUI Penuh (HD)
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
              {isDark ? '↺ Klik kartu untuk kembali ke depan' : '↺ Click to flip back'}
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
          gap: '1.4rem',
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
          onClick={() => scrollByAmount(-400)}
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
          onClick={() => scrollByAmount(400)}
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
            background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative', maxWidth: '1050px', width: '100%',
              background: '#070913', border: `1px solid ${accentColor}60`,
              borderRadius: '22px', overflow: 'hidden',
              boxShadow: `0 0 60px ${accentColor}35`,
            }}
          >
            <div style={{
              padding: '14px 22px', background: '#0c1022', borderBottom: `1px solid ${accentColor}30`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ color: textColor, fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📸 <span>{lightboxTitle}</span> 
                <span style={{ fontSize: '0.72rem', color: accentColor, border: `1px solid ${accentColor}50`, padding: '2px 10px', borderRadius: '12px', background: `${accentColor}10` }}>
                  Tampilan Antarmuka Asli (HD)
                </span>
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)', border: 'none',
                  color: '#fff', width: '34px', height: '34px', borderRadius: '50%',
                  cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '10px', background: '#03050c', display: 'flex', justifyContent: 'center' }}>
              <img
                src={lightboxImg}
                alt={lightboxTitle}
                style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: '14px', display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
