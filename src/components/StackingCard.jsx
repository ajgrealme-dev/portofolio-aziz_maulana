import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function StackingCard({ id, zIndex, isLast = false, children }) {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const containerRef = useRef(null);

  // Synchronously initialize isDesktop so desktop runway is active on first render
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024 && window.innerHeight >= 600;
  });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && window.innerHeight >= 600);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 🎬 In-Place Morph / Exit Dissolve (Anime.js style):
  // As the next card glides up, this card gently fades and scales down, preventing text overlap
  // while keeping the background 100% transparent so stars/3D meshes are never obscured.
  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.80], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.80], [1, 1, 0.94]);
  const yOffset = useTransform(scrollYProgress, [0, 0.45, 0.80], [0, 0, -25]);
  const visibility = useTransform(scrollYProgress, (v) => (v >= 0.80 ? 'hidden' : 'visible'));

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        position: 'relative',
        minHeight: isDesktop ? (isLast ? '115vh' : '135vh') : 'auto',
        width: '100%',
        background: 'transparent',
        scrollMarginTop: '70px',
        zIndex,
      }}
    >
      <motion.div
        style={
          isDesktop
            ? {
                position: 'sticky',
                top: 0,
                height: '100vh',
                maxHeight: '100vh',
                overflow: 'hidden',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box',
                paddingTop: id === 'hero' ? '0' : '70px',
                zIndex,
                opacity: isLast ? 1 : opacity,
                scale: isLast ? 1 : scale,
                y: isLast ? 0 : yOffset,
                visibility: isLast ? 'visible' : visibility,
                background: 'transparent',
                pointerEvents: 'auto',
                boxShadow: isDark
                  ? '0 -25px 50px rgba(0, 0, 0, 0.5)'
                  : '0 -15px 35px rgba(99, 102, 241, 0.08)',
                borderTop: isDark
                  ? '1px solid rgba(0, 245, 255, 0.12)'
                  : '1px solid rgba(99, 102, 241, 0.15)',
              }
            : {
                position: 'relative',
                width: '100%',
                background: 'transparent',
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
