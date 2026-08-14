import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Navbar({ activeSection }) {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const isDark = theme === 'dark';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'experience', href: '#experience' },
    { key: 'contact', href: '#contact' },
  ];

  const navBg = isDark
    ? scrolled ? 'rgba(5,5,15,0.92)' : 'transparent'
    : scrolled ? 'rgba(255,255,255,0.92)' : 'transparent';

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.15)'}` : 'none',
        transition: 'all 0.3s ease',
        padding: '0 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.05 }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: textColor }}>
            Aziz Maulana
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navItems.map((item) => (
            <motion.a
              key={item.key}
              href={item.href}
              whileHover={{ y: -2 }}
              style={{
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: activeSection === item.href.slice(1) ? 600 : 400,
                color: activeSection === item.href.slice(1) ? accentColor : textColor,
                transition: 'color 0.2s',
                letterSpacing: '0.5px',
              }}
            >
              {t.nav[item.key]}
              {activeSection === item.href.slice(1) && (
                <motion.div layoutId="navUnderline" style={{ height: '2px', background: accentColor, borderRadius: '1px', marginTop: '2px', boxShadow: `0 0 8px ${accentColor}` }} />
              )}
            </motion.a>
          ))}

          {/* Controls */}
          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={toggleLang}
              style={{ background: isDark ? 'rgba(0,245,255,0.1)' : 'rgba(99,102,241,0.1)', border: `1px solid ${accentColor}40`, color: accentColor, borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
              {lang.toUpperCase()}
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              style={{ background: isDark ? 'rgba(0,245,255,0.1)' : 'rgba(99,102,241,0.1)', border: `1px solid ${accentColor}40`, color: accentColor, borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '1rem' }}>
              {isDark ? '☀️' : '🌙'}
            </motion.button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: textColor, fontSize: '1.5rem' }}
          className="mobile-menu-btn">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ 
              position: 'absolute', top: '70px', left: 0, right: 0,
              background: isDark ? 'rgba(5,5,15,0.98)' : 'rgba(255,255,255,0.98)', 
              backdropFilter: 'blur(20px)', padding: '1rem 2rem 1.5rem',
              borderBottom: `1px solid ${isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.15)'}`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              zIndex: 999
            }}>
            {navItems.map((item) => (
              <a key={item.key} href={item.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '0.75rem 0', color: textColor, textDecoration: 'none', fontSize: '1rem', fontWeight: 500, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                {t.nav[item.key]}
              </a>
            ))}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button onClick={toggleLang} style={{ flex: 1, background: `${accentColor}20`, border: `1px solid ${accentColor}40`, color: accentColor, borderRadius: '8px', padding: '8px', cursor: 'pointer', fontWeight: 700 }}>{lang === 'id' ? 'EN' : 'ID'}</button>
              <button onClick={toggleTheme} style={{ flex: 1, background: `${accentColor}20`, border: `1px solid ${accentColor}40`, color: accentColor, borderRadius: '8px', padding: '8px', cursor: 'pointer' }}>{isDark ? '☀️ Light' : '🌙 Dark'}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
