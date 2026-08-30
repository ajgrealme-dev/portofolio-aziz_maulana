import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import SpacePreloader from './components/SpacePreloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import TerminalDemo from './components/TerminalDemo';
import './index.css';

function Footer() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  return (
    <footer style={{
      textAlign: 'center', padding: '2rem',
      borderTop: `1px solid ${isDark ? 'rgba(0,245,255,0.1)' : 'rgba(99,102,241,0.15)'}`,
      color: isDark ? '#4a6b7a' : '#94a3b8',
      fontSize: '0.85rem', position: 'relative', zIndex: 10,
    }}>
      <span>Made with </span>
      <span style={{ color: '#ef4444' }}>❤️</span>
      <span> by </span>
      <span style={{ color: accentColor, fontWeight: 600 }}>Aziz Maulana</span>
      <span> · 2026</span>
    </footer>
  );
}

function ScrollProgress() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: `${progress}%`, height: '3px', background: `linear-gradient(90deg, ${isDark ? '#00f5ff' : '#6366f1'}, ${isDark ? '#39ff14' : '#8b5cf6'})`, zIndex: 9999, transition: 'width 0.1s', boxShadow: isDark ? '0 0 10px #00f5ff' : 'none' }} />
  );
}

function AppContent() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <SpacePreloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div 
        className={isDark ? 'dark' : 'light'}
        style={{
          minHeight: '100vh',
          background: isDark
            ? 'linear-gradient(180deg, #05050f 0%, #080818 30%, #040415 70%, #05050f 100%)'
            : 'linear-gradient(180deg, #f0f4ff 0%, #e8f0ff 30%, #f5f0ff 70%, #f0f4ff 100%)',
          transition: 'background 0.5s ease',
          colorScheme: isDark ? 'dark' : 'light',
        }}
      >
        <CustomCursor />
        <ScrollProgress />
        <BackgroundCanvas isDark={isDark} />
        <Navbar activeSection={activeSection} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const demoParam = urlParams.get('demo');

  if (demoParam) {
    return (
      <>
        <CustomCursor />
        <TerminalDemo botType={demoParam} />
      </>
    );
  }

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
