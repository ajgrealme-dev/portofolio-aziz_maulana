import { useState, useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Credentials from './components/Credentials';
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
      textAlign: 'center', 
      padding: '1.2rem clamp(1.5rem, 5vw, 4.5rem)',
      borderTop: `1px solid ${isDark ? 'rgba(0,245,255,0.1)' : 'rgba(99,102,241,0.15)'}`,
      color: isDark ? '#4a6b7a' : '#94a3b8',
      fontSize: '0.82rem', 
      position: 'relative', 
      zIndex: 80,
      width: '100%',
      maxWidth: '100%',
      background: 'transparent',
      flexShrink: 0,
    }}>
      <span>Made with </span>
      <span style={{ color: '#ef4444' }}>❤️</span>
      <span> by </span>
      <span style={{ color: accentColor, fontWeight: 600 }}>Aziz Maulana</span>
      <span> · 2026</span>
    </footer>
  );
}

function ScrollProgress({ progress }) {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${progress * 100}%`,
      height: '3px',
      background: `linear-gradient(90deg, ${isDark ? '#00f5ff' : '#6366f1'}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
      zIndex: 9999,
      transition: 'width 0.05s linear',
      boxShadow: isDark ? '0 0 10px #00f5ff' : 'none',
      pointerEvents: 'none',
    }} />
  );
}

// Stage transition helper: returns opacity, transform, and pointer-events for in-place morphing
function getStageStyle(progress, start, peakStart, peakEnd, end) {
  if (progress < start || progress > end) {
    return {
      opacity: 0,
      transform: progress < start ? 'scale(0.95) translateY(24px)' : 'scale(0.95) translateY(-24px)',
      pointerEvents: 'none',
      visibility: 'hidden',
    };
  }

  // Entering phase
  if (progress < peakStart) {
    const t = (progress - start) / (peakStart - start);
    const smooth = t * t * (3 - 2 * t);
    return {
      opacity: smooth,
      transform: `scale(${0.95 + 0.05 * smooth}) translateY(${24 * (1 - smooth)}px)`,
      pointerEvents: smooth > 0.5 ? 'auto' : 'none',
      visibility: 'visible',
    };
  }

  // Peak phase (100% settled in-place, "diam begitu")
  if (progress <= peakEnd) {
    return {
      opacity: 1,
      transform: 'scale(1) translateY(0px)',
      pointerEvents: 'auto',
      visibility: 'visible',
    };
  }

  // Exiting phase
  const t = (progress - peakEnd) / (end - peakEnd);
  const smooth = t * t * (3 - 2 * t);
  return {
    opacity: 1 - smooth,
    transform: `scale(${1 - 0.05 * smooth}) translateY(${-24 * smooth}px)`,
    pointerEvents: (1 - smooth) > 0.5 ? 'auto' : 'none',
    visibility: 'visible',
  };
}

function AppContent() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [progress, setProgress] = useState(0);
  const runwayRef = useRef(null);

  // Master Scroll Progress Listener (0.0 to 1.0 along the 700vh runway)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const p = Math.max(0, Math.min(1, scrollY / maxScroll));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute active section based on progress
  let activeSection = 'hero';
  if (progress >= 0.87) activeSection = 'contact';
  else if (progress >= 0.76) activeSection = 'experience';
  else if (progress >= 0.64) activeSection = 'credentials';
  else if (progress >= 0.37) activeSection = 'projects';
  else if (progress >= 0.23) activeSection = 'skills';
  else if (progress >= 0.10) activeSection = 'about';
  else activeSection = 'hero';

  const stageBaseStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 'clamp(85px, 11vh, 105px)',
    paddingBottom: '30px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  };

  return (
    <div className={isDark ? 'dark' : 'light'} style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'transparent' }}>
      {/* 🌟 VIRTUAL SCROLL RUNWAY (700vh invisible track that captures wheel/touch to drive timeline) 🌟 */}
      <div
        ref={runwayRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '700vh',
          pointerEvents: 'none',
          background: 'transparent',
        }}
      >
        {/* Invisible anchor checkpoints for browser hash links */}
        <div id="hero" style={{ position: 'absolute', top: '0%' }} />
        <div id="about" style={{ position: 'absolute', top: '18%' }} />
        <div id="skills" style={{ position: 'absolute', top: '31%' }} />
        <div id="projects" style={{ position: 'absolute', top: '43%' }} />
        <div id="credentials" style={{ position: 'absolute', top: '71%' }} />
        <div id="experience" style={{ position: 'absolute', top: '83%' }} />
        <div id="contact" style={{ position: 'absolute', top: '97%' }} />
      </div>

      {/* 🌟 100% FIXED MASTER VIEWPORT STAGE ("Diam Begitu" Ala Animejs.com & Trapicmotion) 🌟 */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: isDark
            ? 'linear-gradient(180deg, #05050f 0%, #080818 30%, #040415 70%, #05050f 100%)'
            : 'linear-gradient(180deg, #f0f4ff 0%, #e8f0ff 30%, #f5f0ff 70%, #f0f4ff 100%)',
          transition: 'background 0.5s ease',
          colorScheme: isDark ? 'dark' : 'light',
          zIndex: 1,
        }}
      >
        {/* Layer 0: Steady 3D Cosmic Space Canvas (Stars & Wireframe Meshes) */}
        <BackgroundCanvas isDark={isDark} />

        {/* Layer 1: Custom Cursor */}
        <CustomCursor />

        {/* Layer 2: Top Glowing Timeline Bar */}
        <ScrollProgress progress={progress} />

        {/* Layer 3: Fixed Navbar Header */}
        <Navbar activeSection={activeSection} />

        {/* Layer 4: The 7 Stages Master Presentation */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Stage 0: Hero (progress 0.00 -> 0.13) */}
          <div style={{ ...stageBaseStyle, justifyContent: 'center', paddingTop: '70px', ...getStageStyle(progress, 0.00, 0.00, 0.08, 0.13) }}>
            <Hero />
          </div>

          {/* Stage 1: About (progress 0.10 -> 0.26) */}
          <div style={{ ...stageBaseStyle, ...getStageStyle(progress, 0.10, 0.14, 0.22, 0.26) }}>
            <About />
          </div>

          {/* Stage 2: Skills (progress 0.23 -> 0.40) */}
          <div style={{ ...stageBaseStyle, ...getStageStyle(progress, 0.23, 0.27, 0.36, 0.40) }}>
            <Skills />
          </div>

          {/* Stage 3: Projects Mandiri Horizontal Scrub (progress 0.37 -> 0.67) */}
          <div style={{ ...stageBaseStyle, justifyContent: 'center', paddingTop: '70px', ...getStageStyle(progress, 0.37, 0.41, 0.63, 0.67) }}>
            <Projects progress={progress} />
          </div>

          {/* Stage 4: Credentials (progress 0.64 -> 0.79) */}
          <div style={{ ...stageBaseStyle, ...getStageStyle(progress, 0.64, 0.68, 0.75, 0.79) }}>
            <Credentials />
          </div>

          {/* Stage 5: Experience (progress 0.76 -> 0.90) */}
          <div style={{ ...stageBaseStyle, ...getStageStyle(progress, 0.76, 0.80, 0.86, 0.90) }}>
            <Experience />
          </div>

          {/* Stage 6: Contact & Footer (progress 0.87 -> 1.00) */}
          <div style={{ ...stageBaseStyle, justifyContent: 'space-between', paddingTop: 'clamp(85px, 11vh, 105px)', ...getStageStyle(progress, 0.87, 0.91, 1.00, 1.00) }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 0 }}>
              <Contact />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
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
