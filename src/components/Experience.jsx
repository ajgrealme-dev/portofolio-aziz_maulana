import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';

function TimelineItem({ item, isDark, index, inView }) {
  const isLeft = index % 2 === 0;
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40, rotateY: isLeft ? -15 : 15 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -6, boxShadow: isDark ? `0 20px 50px ${accentColor}20` : '0 20px 50px rgba(99,102,241,0.15)' }}
      style={{
        background: isDark ? 'rgba(0,245,255,0.04)' : 'rgba(99,102,241,0.05)',
        border: `1px solid ${isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)'}`,
        borderRadius: '20px',
        padding: 'clamp(0.75rem, 1.8vw, 1.5rem)',
        backdropFilter: 'blur(10px)',
        transformStyle: 'preserve-3d',
        transition: 'box-shadow 0.3s ease',
        textAlign: isLeft ? 'right' : 'left',
        width: '100%',
      }}
    >
      <span style={{
        background: `${accentColor}20`,
        border: `1px solid ${accentColor}40`,
        color: accentColor,
        fontSize: 'clamp(0.65rem, 0.9vw, 0.7rem)',
        fontFamily: 'JetBrains Mono, monospace',
        padding: '2px 8px',
        borderRadius: '100px',
        fontWeight: 600,
        display: 'inline-block',
      }}>
        {item.period}
      </span>
      <h3 style={{ color: textColor, fontWeight: 700, fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)', margin: '0.5rem 0 0.2rem' }}>{item.title}</h3>
      <p style={{ color: accentColor, fontSize: 'clamp(0.75rem, 1vw, 0.85rem)', fontWeight: 600, marginBottom: '0.5rem' }}>{item.company}</p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {item.points.map((pt, i) => (
          <li
            key={i}
            style={{
              color: subColor,
              fontSize: 'clamp(0.72rem, 1vw, 0.85rem)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '5px',
              justifyContent: isLeft ? 'flex-end' : 'flex-start',
              lineHeight: 1.4,
            }}
          >
            {isLeft && <span>{pt}</span>}
            <span style={{ color: accentColor, flexShrink: 0 }}>▸</span>
            {!isLeft && <span>{pt}</span>}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="experience-timeline-grid" style={{ marginBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
      {/* Left Column */}
      <div style={{ paddingRight: 'clamp(0.5rem, 2vw, 2rem)', textAlign: 'right' }}>
        {isLeft ? cardContent : null}
      </div>

      {/* Center dot & line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.1, type: 'spring' }}
          style={{
            width: 'clamp(14px, 2vw, 20px)',
            height: 'clamp(14px, 2vw, 20px)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
            border: `2px solid ${isDark ? '#0a0a1a' : '#f8faff'}`,
            boxShadow: isDark ? `0 0 15px ${accentColor}` : `0 0 10px ${accentColor}60`,
            zIndex: 2,
            marginTop: '4px',
          }}
        />
        <div style={{ width: '2px', flex: 1, background: isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)', minHeight: '60px' }} />
      </div>

      {/* Right Column */}
      <div style={{ paddingLeft: 'clamp(0.5rem, 2vw, 2rem)' }}>
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

  return (
    <section id="experience" ref={ref} style={{ padding: 'clamp(70px, 9vh, 120px) clamp(0.75rem, 3vw, 2rem)', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<experience>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.experience.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
        </motion.div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ marginBottom: '3.5rem' }}>
          <h3 style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '1.5rem', textAlign: 'center' }}>
            🎓 {t.education.title}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.75rem, 2vw, 1.5rem)', maxWidth: '800px', margin: '0 auto' }}>
            {t.education.items.map((edu, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -6, boxShadow: isDark ? `0 20px 40px ${accentColor}20` : '0 20px 40px rgba(99,102,241,0.15)' }}
                style={{
                  background: isDark ? 'rgba(0,245,255,0.04)' : 'rgba(99,102,241,0.05)',
                  border: `1px solid ${isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)'}`,
                  borderRadius: '20px', padding: 'clamp(0.85rem, 2vw, 1.5rem)',
                  backdropFilter: 'blur(10px)',
                  transition: 'box-shadow 0.3s', cursor: 'default',
                  textAlign: 'left',
                }}>
                <div style={{ color: textColor, fontWeight: 700, fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)' }}>{edu.school}</div>
                <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', margin: '4px 0' }}>{edu.major}</div>
                <div style={{ color: accentColor, fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{edu.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alternating Zig-zag Timeline */}
        <h3 style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '2.5rem', textAlign: 'center' }}>
          💼 {t.experience.title}
        </h3>
        <div>
          {t.experience.items.map((item, i) => (
            <TimelineItem key={i} item={item} isDark={isDark} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
