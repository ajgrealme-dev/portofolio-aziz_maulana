import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SpacePreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CALIBRATING GRAVITATIONAL LENS...');
  const [isExpanding, setIsExpanding] = useState(false);
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Progress timer: ~2.4s smooth non-linear acceleration
  useEffect(() => {
    let currentP = 0;
    const interval = setInterval(() => {
      const step = currentP < 30 ? 1.6 : currentP < 75 ? 1.3 : currentP < 92 ? 1.1 : 2.8;
      currentP += step;

      if (currentP >= 100) {
        currentP = 100;
        setProgress(100);
        setStatusText('HORIZON BREACH // ENTERING PORTFOLIO');
        setIsExpanding(true);
        clearInterval(interval);

        // Transition seamlessly to Hero
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 650);
      } else {
        const floorP = Math.floor(currentP);
        setProgress(floorP);
        if (floorP < 25) {
          setStatusText('INITIATING SINGULARITY ACCRETION...');
        } else if (floorP < 55) {
          setStatusText('BENDING RELATIVISTIC PHOTON SPHERES...');
        } else if (floorP < 85) {
          setStatusText('CALIBRATING WARP MATRICES & SKILLS GRAPH...');
        } else {
          setStatusText('CONVERGING EVENT HORIZON...');
        }
      }
    }, 32);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  // Mouse & Touch Parallax tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const t = e.touches[0];
        const nx = (t.clientX / window.innerWidth - 0.5) * 2;
        const ny = (t.clientY / window.innerHeight - 0.5) * 2;
        mouseRef.current.targetX = nx;
        mouseRef.current.targetY = ny;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // 60FPS 3D Procedural Black Hole Singularity Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate ~650 relativistic accretion disk particles
    const particleCount = 650;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = 60 + Math.pow(Math.random(), 1.8) * Math.min(width, height) * 0.42;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.012 + (350 / (radius + 80)) * 0.018) * (Math.random() > 0.5 ? 1 : 1);
      const elevation = (Math.random() - 0.5) * 28; // 3D disk thickness
      const size = Math.random() * 2 + 0.6;
      
      // Color palette: Cyan, Electric Violet, Neon Green, Golden Amber
      const colorRand = Math.random();
      const color = colorRand > 0.65 
        ? '#00f5ff' 
        : colorRand > 0.35 
        ? '#a855f7' 
        : colorRand > 0.15 
        ? '#39ff14' 
        : '#f59e0b';

      particles.push({ radius, angle, speed, elevation, size, color, alpha: Math.random() * 0.7 + 0.3 });
    }

    // Distant background starfield
    const starCount = 180;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const tiltX = mouseRef.current.x * 0.25;
      const tiltY = mouseRef.current.y * 0.2;

      // Clear with dark space trail
      ctx.fillStyle = isExpanding ? 'rgba(3, 5, 15, 0.45)' : 'rgba(3, 5, 15, 0.28)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw background twinkling stars
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        star.alpha += Math.sin(frame * star.twinkleSpeed) * 0.015;
        const boundedAlpha = Math.max(0.1, Math.min(0.9, star.alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${boundedAlpha * 0.6})`;
        ctx.fill();
      }

      // 2. Draw 3D Gravitational Accretion Disk Particles
      const diskTiltAngle = Math.PI / 3.4 + tiltY * 0.4;
      const rotationMultiplier = isExpanding ? 4.5 : 1 + (progress / 100) * 1.2;
      const expansionScale = isExpanding ? 1 + (progress - 95) * 0.15 : 1;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.angle += p.speed * rotationMultiplier;

        // Calculate 3D rotated coordinates (inclined accretion disk)
        const currentR = p.radius * expansionScale;
        const x3d = Math.cos(p.angle) * currentR;
        const y3d = Math.sin(p.angle) * currentR;
        const z3d = p.elevation + Math.sin(p.angle * 2) * 8;

        // Apply disk perspective tilt
        const projX = cx + x3d * Math.cos(tiltX) - (y3d * Math.sin(diskTiltAngle) * Math.sin(tiltX));
        const projY = cy + y3d * Math.cos(diskTiltAngle) + z3d * Math.sin(diskTiltAngle);

        // Gravitational lensing depth scale
        const depthFactor = (Math.sin(p.angle) + 1.2) / 2.2;
        const particleSize = p.size * (0.8 + depthFactor * 0.6) * (isExpanding ? 1.8 : 1);
        const particleAlpha = p.alpha * (0.4 + depthFactor * 0.6);

        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(0.4, particleSize), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = isExpanding ? particleAlpha * 1.5 : particleAlpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // 3. Central Event Horizon Glowing Aura & Dark Void
      const coreRadius = (45 + Math.sin(frame * 0.05) * 3) * (isExpanding ? 2.5 : 1);
      
      // Outer neon photon ring
      const photonGradient = ctx.createRadialGradient(cx, cy, coreRadius * 0.8, cx, cy, coreRadius * 2.8);
      photonGradient.addColorStop(0, 'rgba(0, 245, 255, 0.45)');
      photonGradient.addColorStop(0.3, 'rgba(168, 85, 247, 0.25)');
      photonGradient.addColorStop(0.7, 'rgba(57, 255, 20, 0.12)');
      photonGradient.addColorStop(1, 'rgba(3, 5, 15, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = photonGradient;
      ctx.fill();

      // Sharp glowing photon boundary ring
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isExpanding ? '#00f5ff' : 'rgba(0, 245, 255, 0.65)';
      ctx.lineWidth = isExpanding ? 3.5 : 1.8;
      ctx.shadowBlur = isExpanding ? 30 : 16;
      ctx.shadowColor = '#00f5ff';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Pitch black singularity core
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius - 1, 0, Math.PI * 2);
      ctx.fillStyle = '#020308';
      ctx.fill();

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isExpanding, progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.15,
        filter: 'blur(20px)',
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } 
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#03050e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2.5rem 1.5rem',
        overflow: 'hidden',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {/* 3D Black Hole Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Top Header: System Status & Skip */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00f5ff',
            boxShadow: '0 0 10px #00f5ff',
            animation: 'pulse 1.2s infinite',
          }} />
          <span style={{
            color: '#00f5ff',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            letterSpacing: '2.5px',
            fontWeight: 700,
          }}>
            3D QUANTUM GRAVITY // RELATIVISTIC ENGINE
          </span>
        </div>

        {/* Skip button */}
        <button
          onClick={() => {
            if (onComplete) onComplete();
          }}
          style={{
            background: 'rgba(0, 245, 255, 0.08)',
            border: '1px solid rgba(0, 245, 255, 0.35)',
            borderRadius: '100px',
            padding: '5px 16px',
            color: '#cbd5e1',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
            fontWeight: 600,
          }}
        >
          SKIP ➔
        </button>
      </div>

      {/* Center Monogram Typography at the Heart of the Singularity */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        <motion.div
          animate={{
            scale: isExpanding ? 1.4 : [1, 1.03, 1],
            opacity: isExpanding ? 0 : 1,
          }}
          transition={{
            scale: { repeat: isExpanding ? 0 : Infinity, duration: 3, ease: 'easeInOut' },
            opacity: { duration: 0.3 },
          }}
        >
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            letterSpacing: '5px',
            color: '#00f5ff',
            textTransform: 'uppercase',
            fontWeight: 600,
            display: 'block',
            marginBottom: '0.3rem',
          }}>
            PORTFOLIO OF
          </span>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            color: '#f8fafc',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '1px',
            textShadow: '0 0 35px rgba(0, 245, 255, 0.6), 0 0 70px rgba(168, 85, 247, 0.35)',
          }}>
            Aziz Maulana
          </h1>
        </motion.div>
      </div>

      {/* Bottom Minimalist Luxury HUD: Percentage Counter & Progress Line */}
      <div style={{
        width: '100%',
        maxWidth: '520px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Dynamic Percentage Counter */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '6px',
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(2.4rem, 5.5vw, 3.4rem)',
            fontWeight: 800,
            color: '#f8fafc',
            lineHeight: 1,
            textShadow: '0 0 25px rgba(0, 245, 255, 0.7)',
          }}>
            {progress < 10 ? `0${progress}` : progress}
          </span>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#00f5ff',
          }}>
            %
          </span>
        </div>

        {/* Ultra-Thin 1.5px Laser Progress Bar */}
        <div style={{
          width: '100%',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(0, 245, 255, 0.25)',
        }}>
          <motion.div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00f5ff, #39ff14, #a855f7)',
              boxShadow: '0 0 15px #00f5ff',
              borderRadius: '2px',
              transition: 'width 0.06s linear',
            }}
          />
        </div>

        {/* Dynamic Orbital Status */}
        <div style={{
          color: '#94a3b8',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.74rem',
          textAlign: 'center',
          minHeight: '18px',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ color: '#00f5ff' }}>▸</span>
          <span>{statusText}</span>
        </div>
      </div>
    </motion.div>
  );
}
