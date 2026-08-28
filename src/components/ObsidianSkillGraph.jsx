import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Constellation Knowledge Graph Data
const GRAPH_DATA = {
  nodes: [
    // Center Hub
    { id: 'root', label: 'Aziz Maulana', category: 'root', color: '#00f5ff', radius: 24, x: 0, y: 0, level: 'Core Hub', desc: 'Warehouse & Operations Administrator (Automation-Enabled)' },

    // Category Hubs
    { id: 'hub-admin', label: 'Administrasi & Data', category: 'admin', color: '#38bdf8', radius: 18, x: -160, y: -100, level: 'Kategori', desc: 'Pusat ketelitian pencatatan, verifikasi dokumen & spreadsheet' },
    { id: 'hub-ai', label: 'AI & Otomasi', category: 'ai', color: '#a855f7', radius: 18, x: 170, y: -90, level: 'Kategori', desc: 'Arsitektur bot otonom, LLM API, & web automation' },
    { id: 'hub-tech', label: 'Advanced Tech', category: 'tech', color: '#ec4899', radius: 18, x: 150, y: 120, level: 'Kategori', desc: 'Computer vision, 3D WebGL scenes, & quantitative trading' },
    { id: 'hub-soft', label: 'Karakter & Disiplin', category: 'soft', color: '#22c55e', radius: 18, x: -150, y: 110, level: 'Kategori', desc: 'Integritas tinggi, kepatuhan SOP & kedisiplinan kerja' },

    // Admin Leaf Nodes
    { id: 'skill-dataentry', label: 'Data Entry', category: 'admin', color: '#38bdf8', radius: 13, x: -260, y: -160, level: 'Skill', desc: 'Input data cepat dan akurat dengan verifikasi zero-error' },
    { id: 'skill-excel', label: 'MS Excel (VLOOKUP/Pivot)', category: 'admin', color: '#38bdf8', radius: 14, x: -280, y: -70, level: 'Skill', desc: 'Pengolahan tabel, formula logika, rekonsiliasi & reporting' },
    { id: 'skill-word', label: 'MS Word & SOP', category: 'admin', color: '#38bdf8', radius: 12, x: -210, y: -190, level: 'Skill', desc: 'Penyusunan berkas resmi, surat jalan, dan dokumentasi kerja' },
    { id: 'skill-laporan', label: 'Laporan Harian', category: 'admin', color: '#38bdf8', radius: 13, x: -110, y: -200, level: 'Skill', desc: 'Rekapitulasi berkala arus barang masuk/keluar & kas operasional' },

    // AI & Otomasi Leaf Nodes
    { id: 'skill-nodejs', label: 'Node.js', category: 'ai', color: '#a855f7', radius: 14, x: 260, y: -170, level: 'Skill', desc: 'Runtime backend untuk bot multi-agent & automasi data' },
    { id: 'skill-python', label: 'Python (Pandas)', category: 'ai', color: '#a855f7', radius: 14, x: 280, y: -70, level: 'Skill', desc: 'Manipulasi dataset CSV, web scraping, & machine learning' },
    { id: 'skill-sqlite', label: 'SQLite / Prisma', category: 'ai', color: '#a855f7', radius: 12, x: 210, y: -190, level: 'Skill', desc: 'Penyimpanan database relasional cepat & terstruktur' },
    { id: 'skill-gemini', label: 'Gemini AI API', category: 'ai', color: '#a855f7', radius: 13, x: 130, y: -190, level: 'Skill', desc: 'Ekstraksi dokumen OCR, vision parsing, & natural language' },
    { id: 'skill-playwright', label: 'Playwright', category: 'ai', color: '#a855f7', radius: 13, x: 290, y: 10, level: 'Skill', desc: 'Automasi browser tanpa kepala untuk web scraping & data mining' },
    { id: 'skill-telegram', label: 'Telegram Bot API', category: 'ai', color: '#a855f7', radius: 12, x: 80, y: -190, level: 'Skill', desc: 'Notifikasi real-time & command center interaktif di smartphone' },

    // Tech Leaf Nodes
    { id: 'skill-threejs', label: 'Three.js / WebGL', category: 'tech', color: '#ec4899', radius: 13, x: 250, y: 180, level: 'Skill', desc: 'Grafik interaktif 3D & visualisasi spasial berbasis web' },
    { id: 'skill-opencv', label: 'OpenCV', category: 'tech', color: '#ec4899', radius: 13, x: 240, y: 80, level: 'Skill', desc: 'Pengolahan citra komputer & deteksi visual real-time' },
    { id: 'skill-mediapipe', label: 'MediaPipe 3D', category: 'tech', color: '#ec4899', radius: 12, x: 100, y: 220, level: 'Skill', desc: 'Pelacakan landmark wajah dan tangan secara 3 dimensi' },
    { id: 'skill-mt5', label: 'MetaTrader 5 API', category: 'tech', color: '#ec4899', radius: 13, x: 190, y: 220, level: 'Skill', desc: 'Eksekusi transaksi finansial kuantitatif algoritmik' },

    // Soft Skills Leaf Nodes
    { id: 'skill-disiplin', label: 'Disiplin Tinggi', category: 'soft', color: '#22c55e', radius: 13, x: -260, y: 170, level: 'Soft Skill', desc: 'Kepatuhan waktu & komitmen tinggi terhadap target pekerjaan' },
    { id: 'skill-teliti', label: 'Ketelitian Data', category: 'soft', color: '#22c55e', radius: 14, x: -260, y: 70, level: 'Soft Skill', desc: 'Fokus presisi terhadap angka & minim kesalahan rekonsiliasi' },
    { id: 'skill-belajar', label: 'Kemauan Belajar', category: 'soft', color: '#22c55e', radius: 13, x: -100, y: 210, level: 'Soft Skill', desc: 'Cepat beradaptasi dengan software & teknologi baru di kantor' },
    { id: 'skill-patuh', label: 'Kepatuhan Aturan', category: 'soft', color: '#22c55e', radius: 13, x: -200, y: 210, level: 'Soft Skill', desc: 'Menjalankan instruksi atasan & SOP perusahaan secara disiplin' },
  ],
  links: [
    // Root to Hubs
    { source: 'root', target: 'hub-admin' },
    { source: 'root', target: 'hub-ai' },
    { source: 'root', target: 'hub-tech' },
    { source: 'root', target: 'hub-soft' },

    // Admin Hub
    { source: 'hub-admin', target: 'skill-dataentry' },
    { source: 'hub-admin', target: 'skill-excel' },
    { source: 'hub-admin', target: 'skill-word' },
    { source: 'hub-admin', target: 'skill-laporan' },
    { source: 'skill-dataentry', target: 'skill-excel' },

    // AI Hub
    { source: 'hub-ai', target: 'skill-nodejs' },
    { source: 'hub-ai', target: 'skill-python' },
    { source: 'hub-ai', target: 'skill-sqlite' },
    { source: 'hub-ai', target: 'skill-gemini' },
    { source: 'hub-ai', target: 'skill-playwright' },
    { source: 'hub-ai', target: 'skill-telegram' },
    { source: 'skill-nodejs', target: 'skill-gemini' },
    { source: 'skill-python', target: 'skill-playwright' },

    // Tech Hub
    { source: 'hub-tech', target: 'skill-threejs' },
    { source: 'hub-tech', target: 'skill-opencv' },
    { source: 'hub-tech', target: 'skill-mediapipe' },
    { source: 'hub-tech', target: 'skill-mt5' },
    { source: 'skill-opencv', target: 'skill-mediapipe' },

    // Soft Skills Hub
    { source: 'hub-soft', target: 'skill-disiplin' },
    { source: 'hub-soft', target: 'skill-teliti' },
    { source: 'hub-soft', target: 'skill-belajar' },
    { source: 'hub-soft', target: 'skill-patuh' },
    { source: 'skill-disiplin', target: 'skill-patuh' },

    // Cross-Category Links
    { source: 'skill-excel', target: 'skill-python' },
    { source: 'skill-dataentry', target: 'skill-nodejs' },
    { source: 'skill-teliti', target: 'skill-dataentry' },
  ]
};

export default function ObsidianSkillGraph({ isDark }) {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(GRAPH_DATA.nodes[0]);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Physics simulation state
  const nodesRef = useRef(
    GRAPH_DATA.nodes.map(n => ({
      ...n,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      currentX: n.x,
      currentY: n.y,
    }))
  );

  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const isDraggingNodeRef = useRef(null);
  const isPanningRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const activeNode = hoveredNode || selectedNode;
  const activeId = activeNode?.id;

  // Reset View
  const handleReset = () => {
    panRef.current = { x: 0, y: 0 };
    zoomRef.current = 1;
    nodesRef.current.forEach(n => {
      n.currentX = n.x;
      n.currentY = n.y;
      n.vx = 0;
      n.vy = 0;
    });
  };

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

    // Main animation loop
    let time = 0;
    const render = () => {
      time += 0.02;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2 + panRef.current.x;
      const centerY = height / 2 + panRef.current.y;
      const zoom = zoomRef.current;

      ctx.clearRect(0, 0, width, height);

      // Force-directed physics update
      const nodes = nodesRef.current;
      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      // Organic gentle floating motion
      nodes.forEach((n, idx) => {
        if (isDraggingNodeRef.current !== n) {
          const floatX = Math.sin(time + idx * 0.7) * 0.25;
          const floatY = Math.cos(time + idx * 0.5) * 0.25;
          n.currentX += floatX;
          n.currentY += floatY;

          // Spring pull towards target base position
          const dx = n.x - n.currentX;
          const dy = n.y - n.currentY;
          n.currentX += dx * 0.03;
          n.currentY += dy * 0.03;
        }
      });

      // 1. Draw Links (Lines)
      GRAPH_DATA.links.forEach(link => {
        const source = nodeMap.get(link.source);
        const target = nodeMap.get(link.target);
        if (!source || !target) return;

        const isRelated = activeId && (link.source === activeId || link.target === activeId);
        const isDimmed = activeId && !isRelated;

        const sx = centerX + source.currentX * zoom;
        const sy = centerY + source.currentY * zoom;
        const tx = centerX + target.currentX * zoom;
        const ty = centerY + target.currentY * zoom;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.lineWidth = isRelated ? 2.2 * zoom : 1 * zoom;
        ctx.strokeStyle = isRelated
          ? (isDark ? '#00f5ff' : '#6366f1')
          : isDimmed
          ? (isDark ? 'rgba(0, 245, 255, 0.06)' : 'rgba(99, 102, 241, 0.06)')
          : (isDark ? 'rgba(0, 245, 255, 0.22)' : 'rgba(99, 102, 241, 0.22)');
        ctx.stroke();

        // Pulsing pulse wave on active connection
        if (isRelated) {
          const pulseT = (time * 1.5) % 1;
          const px = sx + (tx - sx) * pulseT;
          const py = sy + (ty - sy) * pulseT;
          ctx.beginPath();
          ctx.arc(px, py, 3 * zoom, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#39ff14' : '#8b5cf6';
          ctx.shadowBlur = 8;
          ctx.shadowColor = isDark ? '#39ff14' : '#8b5cf6';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 2. Draw Nodes
      nodes.forEach(node => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;
        const isRelated = activeId && (
          node.id === activeId ||
          GRAPH_DATA.links.some(l => 
            (l.source === activeId && l.target === node.id) ||
            (l.target === activeId && l.source === node.id)
          )
        );
        const isDimmed = activeId && !isRelated;
        const isHighlighted = isSelected || isHovered;

        const nx = centerX + node.currentX * zoom;
        const ny = centerY + node.currentY * zoom;
        const nr = node.radius * zoom * (isHighlighted ? 1.25 : 1.0);

        // Node Glow Halo
        if (isHighlighted || (!isDimmed && node.category === 'root')) {
          ctx.beginPath();
          ctx.arc(nx, ny, nr * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `${node.color}25`;
          ctx.fill();
        }

        // Node Body
        ctx.beginPath();
        ctx.arc(nx, ny, Math.max(3, nr), 0, Math.PI * 2);
        ctx.fillStyle = isDimmed ? `${node.color}35` : node.color;
        if (isHighlighted) {
          ctx.shadowBlur = 16;
          ctx.shadowColor = node.color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Border Ring
        ctx.beginPath();
        ctx.arc(nx, ny, Math.max(3, nr), 0, Math.PI * 2);
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        ctx.strokeStyle = isHighlighted ? '#ffffff' : `${node.color}90`;
        ctx.stroke();

        // Node Label
        const fontSize = Math.max(10, (node.category === 'root' ? 13 : node.category.startsWith('hub') ? 11 : 9.5) * zoom);
        ctx.font = `${node.category === 'root' ? 'bold' : '600'} ${fontSize}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const textY = ny + nr + 4 * zoom;
        ctx.fillStyle = isDimmed
          ? (isDark ? 'rgba(226, 232, 240, 0.2)' : 'rgba(30, 41, 59, 0.2)')
          : isHighlighted
          ? '#ffffff'
          : (isDark ? '#e2e8f0' : '#1e293b');

        // Text background shadow for crisp contrast
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
  }, [isDark, activeId, selectedNode, hoveredNode]);

  // Pointer Interactions (Drag Node, Pan, Zoom, Hover, Click)
  const getNodeAtPos = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2 + panRef.current.x;
    const centerY = rect.height / 2 + panRef.current.y;
    const zoom = zoomRef.current;

    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const node = nodesRef.current[i];
      const nx = centerX + node.currentX * zoom;
      const ny = centerY + node.currentY * zoom;
      const dist = Math.hypot(x - nx, y - ny);
      if (dist <= (node.radius + 8) * zoom) {
        return node;
      }
    }
    return null;
  }, []);

  const handlePointerDown = (e) => {
    const node = getNodeAtPos(e.clientX, e.clientY);
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    if (node) {
      isDraggingNodeRef.current = node;
      setSelectedNode(node);
    } else {
      isPanningRef.current = true;
    }
  };

  const handlePointerMove = (e) => {
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    if (isDraggingNodeRef.current) {
      const zoom = zoomRef.current;
      isDraggingNodeRef.current.currentX += dx / zoom;
      isDraggingNodeRef.current.currentY += dy / zoom;
      isDraggingNodeRef.current.x = isDraggingNodeRef.current.currentX;
      isDraggingNodeRef.current.y = isDraggingNodeRef.current.currentY;
    } else if (isPanningRef.current) {
      panRef.current.x += dx;
      panRef.current.y += dy;
    } else {
      const hovered = getNodeAtPos(e.clientX, e.clientY);
      setHoveredNode(hovered);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = hovered ? 'pointer' : 'grab';
      }
    }
  };

  const handlePointerUp = () => {
    isDraggingNodeRef.current = null;
    isPanningRef.current = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    zoomRef.current = Math.max(0.6, Math.min(2.0, zoomRef.current * zoomFactor));
  };

  return (
    <div className="w-full relative rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950/80 shadow-2xl backdrop-blur-xl">
      {/* Top Header Controls */}
      <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/60 bg-slate-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase">
              OBSIDIAN KNOWLEDGE GRAPH
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-serif mt-0.5">
            Peta Konstelasi Keahlian & Otomasi
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors shadow-sm cursor-pointer"
          >
            ↺ Reset Posisi
          </button>
          <span className="text-[11px] font-mono text-slate-500 hidden md:inline-block">
            🖱️ Seret Node • Geser Canvas • Scroll Zoom
          </span>
        </div>
      </div>

      {/* Interactive Physics Canvas */}
      <div style={{ height: '460px', width: '100%', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
        />
      </div>

      {/* Bottom Spotlight Card */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/80 backdrop-blur-md">
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg border"
                  style={{
                    backgroundColor: `${activeNode.color}20`,
                    borderColor: `${activeNode.color}50`,
                    color: activeNode.color,
                  }}
                >
                  {activeNode.category === 'root' ? '🌟' : activeNode.category === 'admin' ? '📋' : activeNode.category === 'ai' ? '⚡' : activeNode.category === 'tech' ? '🚀' : '💎'}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{activeNode.label}</span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase"
                      style={{
                        backgroundColor: `${activeNode.color}15`,
                        borderColor: `${activeNode.color}40`,
                        color: activeNode.color,
                      }}
                    >
                      {activeNode.level}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{activeNode.desc}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300/80 bg-cyan-950/30 px-3 py-1.5 rounded-lg border border-cyan-800/30">
                <span>Relasi Aktif:</span>
                <span className="font-bold text-white">
                  {GRAPH_DATA.links.filter(l => l.source === activeNode.id || l.target === activeNode.id).length} Koneksi
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
