import React, { useRef, useEffect, useState, useCallback } from 'react';

// Constellation Knowledge Graph Data
const GRAPH_DATA = {
  nodes: [
    // Center Hub
    { id: 'root', label: 'Aziz Maulana', category: 'root', color: '#00f5ff', radius: 26, x: 0, y: 0, mass: 3.0 },

    // Category Hubs
    { id: 'hub-admin', label: 'Administrasi & Data', category: 'admin', color: '#38bdf8', radius: 19, x: -170, y: -90, mass: 1.8 },
    { id: 'hub-ai', label: 'AI & Otomasi', category: 'ai', color: '#a855f7', radius: 19, x: 180, y: -90, mass: 1.8 },
    { id: 'hub-tech', label: 'Advanced Tech', category: 'tech', color: '#ec4899', radius: 19, x: 160, y: 110, mass: 1.8 },
    { id: 'hub-soft', label: 'Karakter & Disiplin', category: 'soft', color: '#22c55e', radius: 19, x: -160, y: 110, mass: 1.8 },

    // Admin Leaf Nodes
    { id: 'skill-dataentry', label: 'Data Entry', category: 'admin', color: '#38bdf8', radius: 13, x: -270, y: -150, mass: 1.0 },
    { id: 'skill-excel', label: 'MS Excel (VLOOKUP/Pivot)', category: 'admin', color: '#38bdf8', radius: 14, x: -280, y: -60, mass: 1.0 },
    { id: 'skill-word', label: 'MS Word & SOP', category: 'admin', color: '#38bdf8', radius: 12, x: -210, y: -180, mass: 1.0 },
    { id: 'skill-laporan', label: 'Laporan Harian', category: 'admin', color: '#38bdf8', radius: 13, x: -110, y: -190, mass: 1.0 },

    // AI & Otomasi Leaf Nodes
    { id: 'skill-nodejs', label: 'Node.js', category: 'ai', color: '#a855f7', radius: 14, x: 270, y: -160, mass: 1.0 },
    { id: 'skill-python', label: 'Python (Pandas)', category: 'ai', color: '#a855f7', radius: 14, x: 280, y: -60, mass: 1.0 },
    { id: 'skill-sqlite', label: 'SQLite / Prisma', category: 'ai', color: '#a855f7', radius: 12, x: 210, y: -180, mass: 1.0 },
    { id: 'skill-gemini', label: 'Gemini AI API', category: 'ai', color: '#a855f7', radius: 13, x: 130, y: -180, mass: 1.0 },
    { id: 'skill-playwright', label: 'Playwright', category: 'ai', color: '#a855f7', radius: 13, x: 290, y: 20, mass: 1.0 },
    { id: 'skill-telegram', label: 'Telegram Bot API', category: 'ai', color: '#a855f7', radius: 12, x: 80, y: -180, mass: 1.0 },

    // Tech Leaf Nodes
    { id: 'skill-threejs', label: 'Three.js / WebGL', category: 'tech', color: '#ec4899', radius: 13, x: 250, y: 170, mass: 1.0 },
    { id: 'skill-opencv', label: 'OpenCV', category: 'tech', color: '#ec4899', radius: 13, x: 240, y: 70, mass: 1.0 },
    { id: 'skill-mediapipe', label: 'MediaPipe 3D', category: 'tech', color: '#ec4899', radius: 12, x: 100, y: 200, mass: 1.0 },
    { id: 'skill-mt5', label: 'MetaTrader 5 API', category: 'tech', color: '#ec4899', radius: 13, x: 190, y: 200, mass: 1.0 },

    // Soft Skills Leaf Nodes
    { id: 'skill-disiplin', label: 'Disiplin Tinggi', category: 'soft', color: '#22c55e', radius: 13, x: -260, y: 160, mass: 1.0 },
    { id: 'skill-teliti', label: 'Ketelitian Data', category: 'soft', color: '#22c55e', radius: 14, x: -260, y: 60, mass: 1.0 },
    { id: 'skill-belajar', label: 'Kemauan Belajar', category: 'soft', color: '#22c55e', radius: 13, x: -100, y: 190, mass: 1.0 },
    { id: 'skill-patuh', label: 'Kepatuhan Aturan', category: 'soft', color: '#22c55e', radius: 13, x: -190, y: 190, mass: 1.0 },
  ],
  links: [
    // Root to Hubs
    { source: 'root', target: 'hub-admin', length: 140 },
    { source: 'root', target: 'hub-ai', length: 140 },
    { source: 'root', target: 'hub-tech', length: 140 },
    { source: 'root', target: 'hub-soft', length: 140 },

    // Admin Hub
    { source: 'hub-admin', target: 'skill-dataentry', length: 90 },
    { source: 'hub-admin', target: 'skill-excel', length: 90 },
    { source: 'hub-admin', target: 'skill-word', length: 90 },
    { source: 'hub-admin', target: 'skill-laporan', length: 90 },
    { source: 'skill-dataentry', target: 'skill-excel', length: 70 },

    // AI Hub
    { source: 'hub-ai', target: 'skill-nodejs', length: 90 },
    { source: 'hub-ai', target: 'skill-python', length: 90 },
    { source: 'hub-ai', target: 'skill-sqlite', length: 90 },
    { source: 'hub-ai', target: 'skill-gemini', length: 90 },
    { source: 'hub-ai', target: 'skill-playwright', length: 90 },
    { source: 'hub-ai', target: 'skill-telegram', length: 90 },
    { source: 'skill-nodejs', target: 'skill-gemini', length: 70 },
    { source: 'skill-python', target: 'skill-playwright', length: 70 },

    // Tech Hub
    { source: 'hub-tech', target: 'skill-threejs', length: 90 },
    { source: 'hub-tech', target: 'skill-opencv', length: 90 },
    { source: 'hub-tech', target: 'skill-mediapipe', length: 90 },
    { source: 'hub-tech', target: 'skill-mt5', length: 90 },
    { source: 'skill-opencv', target: 'skill-mediapipe', length: 70 },

    // Soft Skills Hub
    { source: 'hub-soft', target: 'skill-disiplin', length: 90 },
    { source: 'hub-soft', target: 'skill-teliti', length: 90 },
    { source: 'hub-soft', target: 'skill-belajar', length: 90 },
    { source: 'hub-soft', target: 'skill-patuh', length: 90 },
    { source: 'skill-disiplin', target: 'skill-patuh', length: 70 },

    // Cross-Category Links
    { source: 'skill-excel', target: 'skill-python', length: 120 },
    { source: 'skill-dataentry', target: 'skill-nodejs', length: 120 },
    { source: 'skill-teliti', target: 'skill-dataentry', length: 90 },
  ]
};

export default function ObsidianSkillGraph({ isDark }) {
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Physics simulation state (Nodes with velocities and home anchors)
  const nodesRef = useRef(
    GRAPH_DATA.nodes.map(n => ({
      ...n,
      currentX: n.x,
      currentY: n.y,
      vx: 0,
      vy: 0,
      anchorX: n.x,
      anchorY: n.y,
    }))
  );

  const draggedNodeRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const render = () => {
      time += 0.02;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      // ==========================================
      // 🌐 TRUE ELASTIC WEB PHYSICS ENGINE
      // ==========================================

      // 1. Link Spring Forces (Tension pulling connected nodes)
      const SPRING_K = 0.045; // Spring tension
      GRAPH_DATA.links.forEach(link => {
        const a = nodeMap.get(link.source);
        const b = nodeMap.get(link.target);
        if (!a || !b) return;

        const dx = b.currentX - a.currentX;
        const dy = b.currentY - a.currentY;
        const dist = Math.hypot(dx, dy) || 1;
        const restLen = link.length || 100;
        const force = (dist - restLen) * SPRING_K;

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (draggedNodeRef.current !== a) {
          a.vx += (fx / a.mass);
          a.vy += (fy / a.mass);
        }
        if (draggedNodeRef.current !== b) {
          b.vx -= (fx / b.mass);
          b.vy -= (fy / b.mass);
        }
      });

      // 2. Coulomb Repulsion between all nodes (prevents overlap)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.currentX - a.currentX;
          const dy = b.currentY - a.currentY;
          const dist = Math.hypot(dx, dy) || 1;
          const minDist = (a.radius + b.radius) + 30;

          if (dist < minDist) {
            const repelForce = ((minDist - dist) / dist) * 0.4;
            const rfx = dx * repelForce;
            const rfy = dy * repelForce;

            if (draggedNodeRef.current !== a) {
              a.vx -= rfx;
              a.vy -= rfy;
            }
            if (draggedNodeRef.current !== b) {
              b.vx += rfx;
              b.vy += rfy;
            }
          }
        }
      }

      // 3. Anchor Gravity + Ambient Float + Position Integration
      const HOME_GRAVITY_K = 0.025; // Gentle return home gravity
      const DAMPING = 0.85; // Air friction

      nodes.forEach((n, idx) => {
        if (draggedNodeRef.current === n) {
          // Dragged node follows mouse directly
          n.currentX = mousePosRef.current.x;
          n.currentY = mousePosRef.current.y;
          n.vx = 0;
          n.vy = 0;
        } else {
          // Ambient breathing motion
          const floatX = Math.sin(time + idx * 0.7) * 0.15;
          const floatY = Math.cos(time + idx * 0.5) * 0.15;

          // Pull back towards home anchor
          const anchorDx = n.anchorX - n.currentX;
          const anchorDy = n.anchorY - n.currentY;

          n.vx += anchorDx * HOME_GRAVITY_K + floatX;
          n.vy += anchorDy * HOME_GRAVITY_K + floatY;

          // Apply velocity and damping
          n.vx *= DAMPING;
          n.vy *= DAMPING;
          n.currentX += n.vx;
          n.currentY += n.vy;
        }
      });

      const activeNode = hoveredNode;
      const activeId = activeNode?.id;

      // ==========================================
      // 🎨 DRAW CONNECTING LINES (LINKS)
      // ==========================================
      GRAPH_DATA.links.forEach(link => {
        const source = nodeMap.get(link.source);
        const target = nodeMap.get(link.target);
        if (!source || !target) return;

        const isRelated = activeId && (link.source === activeId || link.target === activeId);
        const isDimmed = activeId && !isRelated;

        const sx = centerX + source.currentX;
        const sy = centerY + source.currentY;
        const tx = centerX + target.currentX;
        const ty = centerY + target.currentY;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.lineWidth = isRelated ? 2.4 : 1.2;
        ctx.strokeStyle = isRelated
          ? (isDark ? '#00f5ff' : '#6366f1')
          : isDimmed
          ? (isDark ? 'rgba(0, 245, 255, 0.08)' : 'rgba(99, 102, 241, 0.08)')
          : (isDark ? 'rgba(0, 245, 255, 0.32)' : 'rgba(99, 102, 241, 0.32)');
        ctx.stroke();

        // Pulsing energy particle along active link
        if (isRelated) {
          const pulseT = (time * 1.6) % 1;
          const px = sx + (tx - sx) * pulseT;
          const py = sy + (ty - sy) * pulseT;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#39ff14' : '#8b5cf6';
          ctx.shadowBlur = 10;
          ctx.shadowColor = isDark ? '#39ff14' : '#8b5cf6';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // ==========================================
      // 🌟 DRAW NODES
      // ==========================================
      nodes.forEach(node => {
        const isHovered = hoveredNode?.id === node.id;
        const isDragged = draggedNodeRef.current?.id === node.id;
        const isRelated = activeId && (
          node.id === activeId ||
          GRAPH_DATA.links.some(l => 
            (l.source === activeId && l.target === node.id) ||
            (l.target === activeId && l.source === node.id)
          )
        );
        const isDimmed = activeId && !isRelated;
        const isHighlighted = isHovered || isDragged;

        const nx = centerX + node.currentX;
        const ny = centerY + node.currentY;
        const nr = node.radius * (isHighlighted ? 1.25 : 1.0);

        // Halo Glow
        if (isHighlighted || (!isDimmed && node.category === 'root')) {
          ctx.beginPath();
          ctx.arc(nx, ny, nr * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `${node.color}35`;
          ctx.fill();
        }

        // Node Circle Body
        ctx.beginPath();
        ctx.arc(nx, ny, Math.max(3, nr), 0, Math.PI * 2);
        ctx.fillStyle = isDimmed ? `${node.color}40` : node.color;
        if (isHighlighted) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = node.color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Border Ring
        ctx.beginPath();
        ctx.arc(nx, ny, Math.max(3, nr), 0, Math.PI * 2);
        ctx.lineWidth = isHighlighted ? 2.5 : 1.4;
        ctx.strokeStyle = isHighlighted ? '#ffffff' : `${node.color}99`;
        ctx.stroke();

        // Text Label
        const fontSize = node.category === 'root' ? 13.5 : node.category.startsWith('hub') ? 11.5 : 9.5;
        ctx.font = `${node.category === 'root' ? 'bold' : '600'} ${fontSize}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const textY = ny + nr + 5;
        ctx.fillStyle = isDimmed
          ? (isDark ? 'rgba(226, 232, 240, 0.25)' : 'rgba(30, 41, 59, 0.25)')
          : isHighlighted
          ? '#ffffff'
          : (isDark ? '#e2e8f0' : '#1e293b');

        ctx.shadowColor = isDark ? '#020617' : '#ffffff';
        ctx.shadowBlur = 4;
        ctx.fillText(node.label, nx, textY);
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark, hoveredNode]);

  // Pointer Handling for Dragging and Spring Cascade
  const getNodeAtPos = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;

    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const node = nodesRef.current[i];
      const dist = Math.hypot(x - node.currentX, y - node.currentY);
      if (dist <= node.radius + 12) {
        return node;
      }
    }
    return null;
  }, []);

  const handlePointerDown = (e) => {
    const node = getNodeAtPos(e.clientX, e.clientY);
    if (node) {
      draggedNodeRef.current = node;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      };
      if (canvas) canvas.style.cursor = 'grabbing';
    }
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

    if (draggedNodeRef.current) {
      mousePosRef.current = { x: relX, y: relY };
    } else {
      const hovered = getNodeAtPos(e.clientX, e.clientY);
      setHoveredNode(hovered);
      canvas.style.cursor = hovered ? 'grab' : 'default';
    }
  };

  const handlePointerUp = () => {
    if (draggedNodeRef.current) {
      draggedNodeRef.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'default';
      }
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '520px',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        border: `1px solid ${isDark ? 'rgba(0, 245, 255, 0.2)' : 'rgba(99, 102, 241, 0.25)'}`,
        background: isDark ? 'rgba(10, 15, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        boxShadow: isDark ? '0 20px 60px rgba(0, 0, 0, 0.6)' : '0 20px 60px rgba(99, 102, 241, 0.15)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
      />
    </div>
  );
}
