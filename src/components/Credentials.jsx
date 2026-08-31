import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Credentials() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [selectedCred, setSelectedCred] = useState(null);

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <section
      id="credentials"
      ref={ref}
      style={{
        padding: 'clamp(70px, 9vh, 120px) 0',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            color: accentColor,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.85rem',
            letterSpacing: '3px',
            fontWeight: 600,
          }}>
            {'<credentials & accreditation>'}
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            color: textColor,
            margin: '0.5rem 0',
          }}>
            {t.credentials.title}
          </h2>
          <div style={{
            width: '60px',
            height: '3px',
            background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
            margin: '0 auto 0.75rem',
            borderRadius: '2px',
            boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none',
          }} />
          <p style={{ color: subColor, fontSize: '0.9rem', maxWidth: '650px', margin: '0 auto' }}>
            {t.credentials.subtitle}
          </p>
        </motion.div>

        {/* 4 Credential Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
          gap: '1.5rem',
        }}>
          {t.credentials.items.map((cred, idx) => {
            const cardColor = cred.badgeColor || accentColor;
            return (
              <motion.div
                key={cred.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedCred(cred)}
                style={{
                  background: isDark
                    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.8), rgba(7, 10, 25, 0.9))'
                    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(241, 245, 249, 0.9))',
                  border: `1px solid ${isDark ? `${cardColor}35` : 'rgba(99,102,241,0.25)'}`,
                  borderRadius: '22px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(16px)',
                  boxShadow: isDark
                    ? `0 15px 35px -10px rgba(0,0,0,0.7), 0 0 20px ${cardColor}15`
                    : '0 15px 35px -10px rgba(99,102,241,0.1)',
                }}
              >
                {/* Glowing Top Border Accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: `linear-gradient(90deg, transparent, ${cardColor}, transparent)`,
                  boxShadow: isDark ? `0 0 15px ${cardColor}` : 'none',
                }} />

                {/* Card Top: Icon, Credential ID, Verification Status */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{
                      width: '46px', height: '46px', borderRadius: '14px',
                      background: `linear-gradient(135deg, ${cardColor}25, rgba(0,0,0,0.4))`,
                      border: `1px solid ${cardColor}50`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.4rem',
                      boxShadow: isDark ? `0 0 15px ${cardColor}25` : 'none',
                    }}>
                      {cred.icon}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        background: `${cardColor}15`, border: `1px solid ${cardColor}40`,
                        color: cardColor, fontSize: '0.66rem', fontFamily: 'JetBrains Mono, monospace',
                        padding: '2px 8px', borderRadius: '100px', fontWeight: 600,
                      }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cardColor, boxShadow: `0 0 6px ${cardColor}` }} />
                        VERIFIED
                      </span>
                      <p style={{ margin: '4px 0 0 0', color: subColor, fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace' }}>
                        {cred.id}
                      </p>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <h3 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.2rem',
                    color: textColor,
                    lineHeight: 1.3,
                    margin: '0 0 0.35rem 0',
                  }}>
                    {cred.title}
                  </h3>

                  <p style={{
                    color: cardColor,
                    fontSize: '0.72rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    margin: '0 0 0.85rem 0',
                  }}>
                    {cred.category} · {cred.level}
                  </p>

                  <p style={{
                    color: subColor,
                    fontSize: '0.8rem',
                    lineHeight: 1.45,
                    margin: '0 0 1rem 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {cred.summary}
                  </p>

                  {/* Verified Modules Preview */}
                  <div style={{
                    background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.03)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    marginBottom: '1.2rem',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  }}>
                    <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 700 }}>
                      // VERIFIED MODULES:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {cred.modules.slice(0, 2).map((mod, mIdx) => (
                        <li key={mIdx} style={{ fontSize: '0.73rem', color: isDark ? '#cbd5e1' : '#334155', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <span style={{ color: cardColor }}>▸</span> {mod}
                        </li>
                      ))}
                      {cred.modules.length > 2 && (
                        <li style={{ fontSize: '0.68rem', color: cardColor, fontFamily: 'JetBrains Mono, monospace' }}>
                          + {cred.modules.length - 2} modul arsitektur lainnya...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCred(cred);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    background: isDark ? `linear-gradient(90deg, ${cardColor}20, ${cardColor}10)` : `linear-gradient(90deg, ${cardColor}15, ${cardColor}08)`,
                    border: `1px solid ${cardColor}50`,
                    color: cardColor,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    fontFamily: 'JetBrains Mono, monospace',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                    boxShadow: isDark ? `0 0 12px ${cardColor}20` : 'none',
                  }}
                >
                  📜 {t.credentials.verifyBtn} ➔
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* HD Digital Credential Certificate Modal */}
      <AnimatePresence>
        {selectedCred && (
          <div
            onClick={() => setSelectedCred(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(2, 4, 12, 0.92)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(0.75rem, 3vw, 2rem)',
              overflowY: 'auto',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '780px',
                width: '100%',
                background: isDark
                  ? 'linear-gradient(145deg, #090e1f, #04060e)'
                  : 'linear-gradient(145deg, #ffffff, #f1f5f9)',
                border: `2px solid ${selectedCred.badgeColor || accentColor}`,
                borderRadius: '24px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                boxShadow: `0 0 60px ${selectedCred.badgeColor || accentColor}40`,
                overflow: 'hidden',
              }}
            >
              {/* Certificate Guilloche Watermark */}
              <div style={{
                position: 'absolute',
                inset: '12px',
                border: `1px dashed ${selectedCred.badgeColor || accentColor}40`,
                borderRadius: '16px',
                pointerEvents: 'none',
              }} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCred(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: textColor,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                }}
              >
                ✕
              </button>

              {/* Certificate Header */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '4px 14px', borderRadius: '100px',
                  background: `${selectedCred.badgeColor || accentColor}18`,
                  border: `1px solid ${selectedCred.badgeColor || accentColor}50`,
                  color: selectedCred.badgeColor || accentColor,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 700,
                  marginBottom: '0.6rem',
                }}>
                  🛡️ {t.credentials.modalTitle}
                </div>

                <h2 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                  color: textColor,
                  margin: '0.2rem 0',
                }}>
                  Certificate of Architectural Competency
                </h2>

                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: subColor,
                  margin: 0,
                }}>
                  DOCUMENT ID: <span style={{ color: selectedCred.badgeColor || accentColor, fontWeight: 700 }}>{selectedCred.id}</span> · ISSUED: {selectedCred.issueDate}
                </p>
              </div>

              {/* Recipient & Competency Details */}
              <div style={{
                textAlign: 'center',
                margin: '1.5rem 0',
                padding: '1.2rem',
                background: isDark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.04)',
                borderRadius: '16px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                position: 'relative',
                zIndex: 10,
              }}>
                <p style={{ margin: '0 0 0.3rem 0', fontSize: '0.75rem', color: subColor, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase' }}>
                  {t.credentials.issuedTo}
                </p>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.8rem',
                  color: selectedCred.badgeColor || accentColor,
                  margin: '0 0 0.5rem 0',
                  textShadow: isDark ? `0 0 20px ${selectedCred.badgeColor || accentColor}60` : 'none',
                }}>
                  Aziz Maulana
                </h3>

                <p style={{ fontSize: '0.88rem', color: textColor, margin: '0 0 0.8rem 0', lineHeight: 1.4 }}>
                  Telah merancang, memvalidasi, dan mengimplementasikan arsitektur berstandar produksi pada domain:
                </p>

                <div style={{
                  display: 'inline-block',
                  padding: '6px 18px',
                  borderRadius: '100px',
                  background: `${selectedCred.badgeColor || accentColor}20`,
                  border: `1px solid ${selectedCred.badgeColor || accentColor}60`,
                  color: textColor,
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontFamily: 'Playfair Display, serif',
                }}>
                  {selectedCred.title}
                </div>
              </div>

              {/* Verified Modules List */}
              <div style={{ marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>
                <h4 style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.8rem',
                  color: selectedCred.badgeColor || accentColor,
                  margin: '0 0 0.6rem 0',
                  letterSpacing: '1px',
                }}>
                  // {t.credentials.verifiedModules}:
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: '0.6rem',
                }}>
                  {selectedCred.modules.map((mod, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 12px', borderRadius: '10px',
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
                        fontSize: '0.78rem', color: isDark ? '#cbd5e1' : '#334155',
                      }}
                    >
                      <span style={{ color: selectedCred.badgeColor || accentColor, fontWeight: 700 }}>✓</span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Codebase & Action Links */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '1.2rem',
                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                position: 'relative',
                zIndex: 10,
              }}>
                <div>
                  <p style={{ margin: '0 0 2px 0', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace', color: subColor }}>
                    {t.credentials.linkedCodebase}:
                  </p>
                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: textColor }}>
                    {selectedCred.codebases}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {selectedCred.demoUrl && (
                    <a
                      href={selectedCred.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '8px 16px', borderRadius: '12px',
                        background: isDark ? `linear-gradient(90deg, ${selectedCred.badgeColor || accentColor}30, ${selectedCred.badgeColor || accentColor}15)` : `linear-gradient(90deg, ${selectedCred.badgeColor || accentColor}20, ${selectedCred.badgeColor || accentColor}10)`,
                        border: `1px solid ${selectedCred.badgeColor || accentColor}70`,
                        color: selectedCred.badgeColor || accentColor,
                        fontSize: '0.78rem', fontWeight: 700,
                        fontFamily: 'JetBrains Mono, monospace',
                        textDecoration: 'none',
                        boxShadow: isDark ? `0 0 15px ${selectedCred.badgeColor || accentColor}25` : 'none',
                      }}
                    >
                      🚀 {t.credentials.viewDemo}
                    </a>
                  )}

                  {selectedCred.githubUrl && (
                    <a
                      href={selectedCred.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '8px 16px', borderRadius: '12px',
                        background: 'transparent',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                        color: textColor,
                        fontSize: '0.78rem', fontWeight: 600,
                        fontFamily: 'JetBrains Mono, monospace',
                        textDecoration: 'none',
                      }}
                    >
                      📂 {t.credentials.viewGithub}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
