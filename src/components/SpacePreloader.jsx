import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpacePreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [telemetry, setTelemetry] = useState('[SYSTEM_INIT] Calibrating thruster vectoring...');
  const [isWarping, setIsWarping] = useState(false);
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  // Astronaut flight coordinates calculated based on progress
  // Starts at bottom-left, ascends gracefully across center towards top-right
  const getAstronautPos = (p) => {
    if (p < 85) {
      const norm = p / 85;
      // Curved trajectory from bottom left (-20vw, 30vh) to center-right (15vw, -10vh)
      const x = -30 + norm * 45; // -30vw to 15vw
      const y = 35 - norm * 45;  // 35vh to -10vh
      const rot = -15 + norm * 25; // -15deg to 10deg
      const scale = 0.8 + norm * 0.25;
      return { x: `${x}vw`, y: `${y}vh`, rot, scale };
    } else {
      // Warp dash out of screen to top-right
      const warpNorm = (p - 85) / 15;
      const x = 15 + warpNorm * 75; // shoots to 90vw+
      const y = -10 - warpNorm * 70; // shoots to -80vh
      const rot = 10 + warpNorm * 35;
      const scale = 1.05 + warpNorm * 0.8;
      return { x: `${x}vw`, y: `${y}vh`, rot, scale };
    }
  };

  const currentPos = getAstronautPos(progress);

  // Loading progress driver
  useEffect(() => {
    let currentP = 0;
    const interval = setInterval(() => {
      // Smooth non-linear progress
      const increment = currentP < 30 ? 1.8 : currentP < 70 ? 1.4 : currentP < 90 ? 1.1 : 2.5;
      currentP += increment;

      if (currentP >= 100) {
        currentP = 100;
        setProgress(100);
        setTelemetry('[WARP_EXPULSION] Entering portfolio space horizon!');
        setIsWarping(true);
        clearInterval(interval);

        // Allow warp finish animation then complete
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 700);
      } else {
        setProgress(Math.floor(currentP));
        if (currentP < 25) {
          setTelemetry('[SYSTEM_INIT] Calibrating thrusters & life support...');
        } else if (currentP < 50) {
          setTelemetry('[WARP_ENGAGE] Calculating orbital trajectory (Ciruas → Orbit)...');
        } else if (currentP < 75) {
          setTelemetry('[AI_CORE_ONLINE] Loading project portfolio & skills graph...');
        } else if (currentP < 92) {
          setTelemetry('[HYPERSPACE_READY] Engaging quantum warp drive...');
        } else {
          setTelemetry('[WARP_EXPULSION] Entering portfolio space horizon!');
          setIsWarping(true);
        }
      }
    }, 40);

    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden';

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  // 3D Canvas Cosmic Warp Starfield & Jetpack Sparks
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

    // Starfield particles
    const numStars = 220;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 1.8 + 0.5,
        color: Math.random() > 0.3 ? '#00f5ff' : Math.random() > 0.5 ? '#a855f7' : '#ffffff',
      });
    }

    // Jetpack sparks
    const sparks = [];

    const render = () => {
      ctx.fillStyle = isWarping ? 'rgba(3, 5, 14, 0.4)' : 'rgba(3, 5, 14, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const speed = isWarping ? 38 : 3.5;

      // Draw & update 3D stars
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 280 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const s = (1 - star.z / width) * star.size * (isWarping ? 2.5 : 1.2);
          ctx.beginPath();

          if (isWarping) {
            // Draw warp speed streak
            const prevK = 280 / (star.z + speed * 2.5);
            const prevPx = star.x * prevK + cx;
            const prevPy = star.y * prevK + cy;
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = s;
            ctx.stroke();
          } else {
            ctx.arc(px, py, Math.max(0.5, s), 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = star.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Add jetpack thruster spark particles around astronaut position
      if (progress < 100) {
        // Calculate astronaut screen position
        const pNorm = Math.min(progress, 85) / 85;
        const astroScreenX = width * (0.2 + pNorm * 0.45);
        const astroScreenY = height * (0.85 - pNorm * 0.55);

        // Emit 3-5 sparks per frame from bottom-left of astronaut
        for (let j = 0; j < 3; j++) {
          sparks.push({
            x: astroScreenX - 45 + (Math.random() - 0.5) * 20,
            y: astroScreenY + 45 + (Math.random() - 0.5) * 20,
            vx: -Math.random() * 4 - 2,
            vy: Math.random() * 4 + 2,
            life: 1,
            decay: Math.random() * 0.04 + 0.02,
            size: Math.random() * 3 + 1.5,
            color: Math.random() > 0.4 ? '#ff9900' : Math.random() > 0.5 ? '#ff4400' : '#00f5ff',
          });
        }
      }

      // Draw & update sparks
      for (let sIdx = sparks.length - 1; sIdx >= 0; sIdx--) {
        const sp = sparks[sIdx];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life -= sp.decay;

        if (sp.life <= 0) {
          sparks.splice(sIdx, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = sp.color;
        ctx.globalAlpha = sp.life;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isWarping, progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.12,
        filter: 'blur(16px)',
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
      {/* 3D Warp Canvas Background */}
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

      {/* Cosmic Nebula Glow Overlays */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(0, 245, 255, 0.12) 0%, rgba(168, 85, 247, 0.06) 50%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(57, 255, 20, 0.08) 0%, rgba(0, 245, 255, 0.05) 50%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Top HUD Mission Telemetry */}
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
            background: '#39ff14',
            boxShadow: '0 0 10px #39ff14',
            animation: 'pulse 1.5s infinite',
          }} />
          <span style={{
            color: '#00f5ff',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            letterSpacing: '2px',
            fontWeight: 700,
          }}>
            MISSION CONTROL // AZIZ_ORBIT_2026
          </span>
        </div>

        {/* Skip button */}
        <button
          onClick={() => {
            if (onComplete) onComplete();
          }}
          style={{
            background: 'rgba(0, 245, 255, 0.08)',
            border: '1px solid rgba(0, 245, 255, 0.3)',
            borderRadius: '100px',
            padding: '4px 14px',
            color: '#94a3b8',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
        >
          SKIP ➔
        </button>
      </div>

      {/* Center 3D Flying Spaceman Entity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      >
        <motion.div
          animate={{
            x: currentPos.x,
            y: currentPos.y,
            rotate: currentPos.rot,
            scale: currentPos.scale,
          }}
          transition={{
            type: 'spring',
            damping: 24,
            stiffness: 90,
            mass: 0.8,
          }}
          style={{
            position: 'relative',
            width: 'clamp(140px, 20vw, 220px)',
            height: 'clamp(140px, 20vw, 220px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: isWarping 
              ? 'drop-shadow(0 0 40px #00f5ff) drop-shadow(0 0 80px #39ff14)' 
              : 'drop-shadow(0 0 25px rgba(0, 245, 255, 0.6))',
          }}
        >
          {/* Jetpack Plasma Thruster Aura */}
          <div style={{
            position: 'absolute',
            bottom: '5%',
            left: '0%',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ff9900 0%, #ff4400 50%, transparent 80%)',
            filter: 'blur(12px)',
            opacity: 0.85,
            animation: 'pulse 0.4s infinite alternate',
          }} />

          {/* Transparent Spaceman Cutout Image */}
          <img
            src="/spaceman.png"
            alt="Flying Astronaut"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </motion.div>
      </div>

      {/* Bottom Mission HUD: Percentage Counter & Progress Line */}
      <div style={{
        width: '100%',
        maxWidth: '560px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.85rem',
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
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.8rem, 6vw, 4rem)',
            fontWeight: 800,
            color: '#e2e8f0',
            lineHeight: 1,
            textShadow: '0 0 30px rgba(0, 245, 255, 0.6)',
          }}>
            {progress < 10 ? `0${progress}` : progress}
          </span>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#00f5ff',
          }}>
            %
          </span>
        </div>

        {/* High-Precision Progress Bar */}
        <div style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(0, 245, 255, 0.2)',
        }}>
          <motion.div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00f5ff, #39ff14, #a855f7)',
              boxShadow: '0 0 15px #00f5ff',
              borderRadius: '4px',
              transition: 'width 0.08s linear',
            }}
          />
        </div>

        {/* Dynamic Space Telemetry Log */}
        <div style={{
          color: '#94a3b8',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.78rem',
          textAlign: 'center',
          minHeight: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ color: '#00f5ff' }}>▸</span>
          <span>{telemetry}</span>
        </div>
      </div>
    </motion.div>
  );
}
