import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';

function TimelineItem({ item, isDark, index, inView, isMobile }) {
  const isLeft = index % 2 === 0;
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 30 : isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -6, boxShadow: isDark ? `0 20px 50px ${accentColor}20` : '0 20px 50px rgba(99,102,241,0.15)' }}
      style={{
        background: isDark ? 'rgba(0,245,255,0.04)' : 'rgba(99,102,241,0.05)',
        border: `1px solid ${isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)'}`,
        borderRadius: '20px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        transformStyle: 'preserve-3d',
        transition: 'box-shadow 0.3s ease',
        textAlign: isMobile ? 'left' : isLeft ? 'right' : 'left',
        width: '100%',
      }}
    >
      <span style={{
        background: `${accentColor}20`,
        border: `1px solid ${accentColor}40`,
        color: accentColor,
        fontSize: '0.7rem',
        fontFamily: 'JetBrains Mono, monospace',
        padding: '3px 10px',
        borderRadius: '100px',
        fontWeight: 600,
        display: 'inline-block',
      }}>
        {item.period}
      </span>
      <h3 style={{ color: textColor, fontWeight: 700, fontSize: '1.05rem', margin: '0.75rem 0 0.25rem' }}>{item.title}</h3>
      <p style={{ color: accentColor, fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>{item.company}</p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {item.points.map((pt, i) => (
          <li
            key={i}
            style={{
              color: subColor,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '6px',
              justifyContent: isMobile ? 'flex-start' : isLeft ? 'flex-end' : 'flex-start',
            }}
          >
            {(!isMobile && isLeft) && <span>{pt}</span>}
            <span style={{ color: accentColor, flexShrink: 0 }}>▸</span>
            {(isMobile || !isLeft) && <span>{pt}</span>}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr', alignItems: 'start', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {/* Left dot and line */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.1, type: 'spring' }}
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
              border: `3px solid ${isDark ? '#0a0a1a' : '#f8faff'}`,
              boxShadow: isDark ? `0 0 15px ${accentColor}` : `0 0 10px ${accentColor}60`,
              zIndex: 2,
              marginTop: '6px',
            }}
          />
          <div style={{ width: '2px', flex: 1, background: isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)', minHeight: '60px' }} />
        </div>

        {/* Right card */}
        <div>
          {cardContent}
        </div>
      </div>
    );
  }

  // Desktop alternating layout
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'start', gap: '0', marginBottom: '3rem' }}>
      {/* Left Column */}
      <div style={{ paddingRight: '2rem', textAlign: 'right' }}>
        {isLeft ? cardContent : null}
      </div>

      {/* Center dot & line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.1, type: 'spring' }}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
            border: `3px solid ${isDark ? '#0a0a1a' : '#f8faff'}`,
            boxShadow: isDark ? `0 0 20px ${accentColor}, 0 0 40px ${accentColor}40` : `0 0 15px ${accentColor}60`,
            zIndex: 2,
          }}
        />
        <div style={{ width: '2px', flex: 1, background: isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)', minHeight: '80px' }} />
      </div>

      {/* Right Column */}
      <div style={{ paddingLeft: '2rem' }}>
        {!isLeft ? cardContent : null}
      </div>
    </div>
  );
}

export default function Experience() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '0px' });
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="experience" ref={ref} style={{ padding: 'clamp(80px, 12vh, 120px) clamp(1rem, 4vw, 2rem)', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<experience>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.experience.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
        </motion.div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ marginBottom: '3.5rem' }}>
          <h3 style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '1.5rem', textAlign: 'center' }}>
            🎓 {t.education.title}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
            {t.education.items.map((edu, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -6, boxShadow: isDark ? `0 20px 40px ${accentColor}20` : '0 20px 40px rgba(99,102,241,0.15)' }}
                style={{
                  background: isDark ? 'rgba(0,245,255,0.04)' : 'rgba(99,102,241,0.05)',
                  border: `1px solid ${isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)'}`,
                  borderRadius: '20px', padding: '1.5rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'box-shadow 0.3s', cursor: 'default',
                  textAlign: 'left',
                }}>
                <div style={{ color: textColor, fontWeight: 700, fontSize: '0.95rem' }}>{edu.school}</div>
                <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.85rem', margin: '4px 0' }}>{edu.major}</div>
                <div style={{ color: accentColor, fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{edu.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <h3 style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '2.5rem', textAlign: 'center' }}>
          💼 {t.experience.title}
        </h3>
        <div>
          {t.experience.items.map((item, i) => (
            <TimelineItem key={i} item={item} isDark={isDark} index={i} inView={inView} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
