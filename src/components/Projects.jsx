import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useApp } from '../context/AppContext';

function FlipCard({ project, isDark, onOpenLightbox }) {
  const [flipped, setFlipped] = useState(false);
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';

  // Derive a nice mockup url domain
  const getDomain = (title) => {
    if (title.includes('HOMIE') || title.includes('Homie')) return 'homietour.travel';
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
    <motion.div
      onClick={() => setFlipped(!flipped)}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{ 
        perspective: '1200px', 
        cursor: 'pointer', 
        height: 'clamp(460px, 58vh, 520px)', 
        width: 'min(360px, 86vw)', 
        flex: '0 0 min(360px, 86vw)', 
        scrollSnapAlign: 'center',
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
                {project.title.includes('HOMIE') || project.title.includes('Homie')
                  ? '✨ Featured Travel'
                  : project.title.includes('ShopAtChey') 
                  ? '✨ Featured Store' 
                  : 'Personal Project'}
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
    </motion.div>
  );
}

export default function Projects() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';

  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 900 : true);

  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const maxScrollRef = useRef(0);

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';

  // Responsive breakpoint detection
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 900);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Calculate track travel distance on Desktop
  useEffect(() => {
    if (!isDesktop) return;

    const updateMaxScroll = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // 80px buffer ensures the last card has spacious right padding and is 100% visible
        const dist = Math.max(0, trackWidth - viewportWidth + 80);
        maxScrollRef.current = dist;
        setMaxScroll(dist);
      }
    };

    updateMaxScroll();
    const t1 = setTimeout(updateMaxScroll, 200);
    const t2 = setTimeout(updateMaxScroll, 600);
    const t3 = setTimeout(updateMaxScroll, 1200);
    window.addEventListener('resize', updateMaxScroll);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updateMaxScroll);
    };
  }, [t.projects.items, isDesktop]);

  // Framer Motion Sticky-Pinned Scroll Progress (0 to 1 during the 380vh scroll)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const rawX = useTransform(scrollYProgress, (progress) => {
    const dist = maxScrollRef.current || maxScroll;
    const clamped = Math.max(0, Math.min(1, progress));
    return -clamped * dist;
  });

  const smoothX = useSpring(rawX, {
    stiffness: 120,
    damping: 26,
    mass: 0.2,
    restDelta: 0.001,
  });

  return (
    <>
      {isDesktop ? (
        /* DESKTOP: True Sticky-Pinned Horizontal Scroll */
        <section
          id="projects"
          ref={targetRef}
          style={{
            position: 'relative',
            height: '380vh',
            background: 'transparent',
            width: '100%',
          }}
        >
          {/* Sticky Viewport Container pinned at top: 0 below Navbar */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              paddingTop: '70px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxSizing: 'border-box',
              width: '100%',
              zIndex: 10,
            }}
          >
            {/* Header: Centered & Perfectly Framed */}
            <div
              style={{
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                padding: '0 clamp(1.5rem, 5vw, 4.5rem)',
                textAlign: 'center',
                marginBottom: 'clamp(0.8rem, 2vh, 1.6rem)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: accentColor,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.85rem',
                  letterSpacing: '3px',
                  fontWeight: 600,
                }}
              >
                {'<projects>'}
              </span>
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                  color: textColor,
                  margin: '0.25rem 0',
                }}
              >
                {t.projects.title}
              </h2>
              <div
                style={{
                  width: '60px',
                  height: '3px',
                  background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
                  margin: '0 auto 0.5rem',
                  borderRadius: '2px',
                  boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none',
                }}
              />
              <p
                style={{
                  color: isDark ? '#94a3b8' : '#64748b',
                  fontSize: '0.82rem',
                  margin: 0,
                }}
              >
                {isDark
                  ? '← Gulir mouse / touchpad untuk menjelajahi proyek · Klik kartu untuk fitur lengkap →'
                  : '← Scroll mouse / touchpad to explore projects · Click card for details →'}
              </p>
            </div>

            {/* Horizontal Track Container */}
            <div
              style={{
                width: '100%',
                overflow: 'hidden',
                padding: '0.5rem 0 1.2rem',
                flexShrink: 0,
              }}
            >
              <motion.div
                ref={trackRef}
                style={{
                  x: smoothX,
                  display: 'flex',
                  gap: '1.4rem',
                  padding: '0 clamp(2rem, 5vw, 5rem)',
                  width: 'max-content',
                  willChange: 'transform',
                }}
              >
                {t.projects.items.map((proj) => (
                  <FlipCard
                    key={proj.title}
                    project={proj}
                    isDark={isDark}
                    onOpenLightbox={(img, title) => {
                      setLightboxImg(img);
                      setLightboxTitle(title);
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      ) : (
        /* MOBILE: Natural Touch Swipe Horizontal Scroll */
        <section
          id="projects"
          style={{
            position: 'relative',
            padding: 'clamp(70px, 9vh, 100px) 0 60px',
            zIndex: 10,
            background: 'transparent',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              width: '100%',
              margin: '0 auto',
              padding: '0 clamp(1.5rem, 5vw, 4.5rem)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            <span
              style={{
                color: accentColor,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.85rem',
                letterSpacing: '3px',
                fontWeight: 600,
              }}
            >
              {'<projects>'}
            </span>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
                color: textColor,
                margin: '0.5rem 0',
              }}
            >
              {t.projects.title}
            </h2>
            <div
              style={{
                width: '60px',
                height: '3px',
                background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
                margin: '0 auto 0.75rem',
                borderRadius: '2px',
                boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none',
              }}
            />
            <p
              style={{
                color: isDark ? '#94a3b8' : '#64748b',
                fontSize: '0.85rem',
              }}
            >
              {isDark
                ? '← Geser kartu ke samping untuk menjelajahi proyek · Klik kartu untuk balik →'
                : '← Swipe cards to explore projects · Click card to flip →'}
            </p>
          </div>

          <div
            className="projects-scroll-container"
            style={{
              display: 'flex',
              gap: '1.2rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              padding: '0.5rem clamp(1.5rem, 5vw, 3rem) 2rem',
              width: '100%',
              boxSizing: 'border-box',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {t.projects.items.map((proj) => (
              <FlipCard
                key={proj.title}
                project={proj}
                isDark={isDark}
                onOpenLightbox={(img, title) => {
                  setLightboxImg(img);
                  setLightboxTitle(title);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal for Full HD GUI Preview */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(14px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '1050px',
              width: '100%',
              background: '#070913',
              border: `1px solid ${accentColor}60`,
              borderRadius: '22px',
              overflow: 'hidden',
              boxShadow: `0 0 60px ${accentColor}35`,
            }}
          >
            <div
              style={{
                padding: '14px 22px',
                background: '#0c1022',
                borderBottom: `1px solid ${accentColor}30`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  color: textColor,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                📸 <span>{lightboxTitle}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: accentColor,
                    border: `1px solid ${accentColor}50`,
                    padding: '2px 10px',
                    borderRadius: '12px',
                    background: `${accentColor}10`,
                  }}
                >
                  Tampilan Antarmuka Asli (HD)
                </span>
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>
            <div
              style={{
                padding: '10px',
                background: '#03050c',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={lightboxImg}
                alt={lightboxTitle}
                style={{
                  width: '100%',
                  maxHeight: '72vh',
                  objectFit: 'contain',
                  borderRadius: '14px',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
