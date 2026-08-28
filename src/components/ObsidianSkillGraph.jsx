import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Billboard, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Constellation Data
const GRAPH_DATA = {
  nodes: [
    // Root Center Hub
    { id: 'root', label: 'Aziz Maulana', category: 'root', color: '#00f5ff', radius: 0.6, pos: [0, 0, 0], level: 'Core', desc: 'Warehouse & Operations Administrator (Automation-Enabled)' },

    // Category Hubs
    { id: 'hub-admin', label: 'Administrasi & Data', category: 'admin', color: '#38bdf8', radius: 0.45, pos: [-2.8, 1.6, 0.8], level: 'Category', desc: 'Pusat ketelitian pencatatan, verifikasi dokumen & spreadsheet' },
    { id: 'hub-ai', label: 'AI & Otomasi', category: 'ai', color: '#a855f7', radius: 0.45, pos: [2.9, 1.5, -0.6], level: 'Category', desc: 'Arsitektur bot otonom, LLM API, & web automation' },
    { id: 'hub-tech', label: 'Advanced Tech', category: 'tech', color: '#ec4899', radius: 0.45, pos: [2.2, -2.0, 1.0], level: 'Category', desc: 'Computer vision, 3D WebGL scenes, & quantitative trading' },
    { id: 'hub-soft', label: 'Karakter & Disiplin', category: 'soft', color: '#22c55e', radius: 0.45, pos: [-2.6, -1.8, -0.8], level: 'Category', desc: 'Integritas tinggi, kepatuhan SOP & kedisiplinan kerja' },

    // Admin Leaf Nodes
    { id: 'skill-dataentry', label: 'Data Entry', category: 'admin', color: '#38bdf8', radius: 0.28, pos: [-4.2, 2.6, 1.2], level: 'Skill', desc: 'Input data cepat dan akurat dengan verifikasi zero-error' },
    { id: 'skill-excel', label: 'MS Excel (VLOOKUP/Pivot)', category: 'admin', color: '#38bdf8', radius: 0.32, pos: [-4.6, 1.2, 0.4], level: 'Skill', desc: 'Pengolahan tabel, formula logika, rekonsiliasi & reporting' },
    { id: 'skill-word', label: 'MS Word & SOP', category: 'admin', color: '#38bdf8', radius: 0.26, pos: [-3.4, 3.1, -0.2], level: 'Skill', desc: 'Penyusunan berkas resmi, surat jalan, dan dokumentasi kerja' },
    { id: 'skill-laporan', label: 'Laporan Harian', category: 'admin', color: '#38bdf8', radius: 0.28, pos: [-2.2, 3.2, 1.6], level: 'Skill', desc: 'Rekapitulasi berkala arus barang masuk/keluar & kas operasional' },

    // AI & Otomasi Leaf Nodes
    { id: 'skill-nodejs', label: 'Node.js', category: 'ai', color: '#a855f7', radius: 0.3, pos: [4.4, 2.4, -0.4], level: 'Skill', desc: 'Runtime backend untuk bot multi-agent & automasi data' },
    { id: 'skill-python', label: 'Python (Pandas)', category: 'ai', color: '#a855f7', radius: 0.32, pos: [4.2, 1.0, -1.8], level: 'Skill', desc: 'Manipulasi dataset CSV, web scraping, & machine learning' },
    { id: 'skill-sqlite', label: 'SQLite / Prisma', category: 'ai', color: '#a855f7', radius: 0.28, pos: [3.2, 3.1, 0.8], level: 'Skill', desc: 'Penyimpanan database relasional cepat & terstruktur' },
    { id: 'skill-gemini', label: 'Gemini AI API', category: 'ai', color: '#a855f7', radius: 0.3, pos: [2.4, 2.8, -2.0], level: 'Skill', desc: 'Ekstraksi dokumen OCR, vision parsing, & natural language' },
    { id: 'skill-playwright', label: 'Playwright', category: 'ai', color: '#a855f7', radius: 0.28, pos: [4.8, 0.2, 0.6], level: 'Skill', desc: 'Automasi browser tanpa kepala untuk web scraping & data mining' },
    { id: 'skill-telegram', label: 'Telegram Bot API', category: 'ai', color: '#a855f7', radius: 0.28, pos: [1.8, 3.2, 0.2], level: 'Skill', desc: 'Notifikasi real-time & command center interaktif di smartphone' },

    // Tech Leaf Nodes
    { id: 'skill-threejs', label: 'Three.js / WebGL', category: 'tech', color: '#ec4899', radius: 0.3, pos: [3.8, -2.8, 1.4], level: 'Skill', desc: 'Grafik interaktif 3D & visualisasi spasial berbasis web' },
    { id: 'skill-opencv', label: 'OpenCV', category: 'tech', color: '#ec4899', radius: 0.28, pos: [3.4, -1.2, 2.4], level: 'Skill', desc: 'Pengolahan citra komputer & deteksi visual real-time' },
    { id: 'skill-mediapipe', label: 'MediaPipe 3D', category: 'tech', color: '#ec4899', radius: 0.26, pos: [1.6, -3.2, 1.8], level: 'Skill', desc: 'Pelacakan landmark wajah dan tangan secara 3 dimensi' },
    { id: 'skill-mt5', label: 'MetaTrader 5 API', category: 'tech', color: '#ec4899', radius: 0.28, pos: [2.8, -3.4, -0.4], level: 'Skill', desc: 'Eksekusi transaksi finansial kuantitatif algoritmik' },

    // Soft Skills Leaf Nodes
    { id: 'skill-disiplin', label: 'Disiplin Tinggi', category: 'soft', color: '#22c55e', radius: 0.3, pos: [-4.2, -2.4, -1.2], level: 'Soft Skill', desc: 'Kepatuhan waktu & komitmen tinggi terhadap target pekerjaan' },
    { id: 'skill-teliti', label: 'Ketelitian Data', category: 'soft', color: '#22c55e', radius: 0.3, pos: [-3.8, -0.8, -2.2], level: 'Soft Skill', desc: 'Fokus presisi terhadap angka & minim kesalahan rekonsiliasi' },
    { id: 'skill-belajar', label: 'Kemauan Belajar', category: 'soft', color: '#22c55e', radius: 0.28, pos: [-1.8, -3.1, -1.8], level: 'Soft Skill', desc: 'Cepat beradaptasi dengan software & teknologi baru di kantor' },
    { id: 'skill-patuh', label: 'Kepatuhan Aturan', category: 'soft', color: '#22c55e', radius: 0.28, pos: [-3.4, -3.2, 0.4], level: 'Soft Skill', desc: 'Menjalankan instruksi atasan & SOP perusahaan secara disiplin' },
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

    // Cross-category connections
    { source: 'skill-excel', target: 'skill-python' },
    { source: 'skill-dataentry', target: 'skill-nodejs' },
    { source: 'skill-teliti', target: 'skill-dataentry' },
  ]
};

function GraphNode({ node, isDark, isSelected, isHovered, isDimmed, onSelect, onHover }) {
  const meshRef = useRef();
  const [localHover, setLocalHover] = useState(false);

  const baseColor = node.color;
  const isHighlighted = isSelected || isHovered || localHover;

  // Gentle breathing float animation
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const hash = node.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    meshRef.current.position.y = node.pos[1] + Math.sin(t * 1.5 + hash) * 0.08;
    meshRef.current.position.x = node.pos[0] + Math.cos(t * 1.2 + hash) * 0.05;
  });

  return (
    <group ref={meshRef} position={node.pos}>
      {/* Outer Halo Glow */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setLocalHover(true);
          onHover(node);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setLocalHover(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[node.radius * (isHighlighted ? 1.3 : 1.0), 24, 24]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={isHighlighted ? 1.8 : isDimmed ? 0.2 : 0.8}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={isDimmed ? 0.25 : 0.95}
        />
      </mesh>

      {/* Pulsing ring when active */}
      {isHighlighted && (
        <mesh>
          <ringGeometry args={[node.radius * 1.4, node.radius * 1.6, 32]} />
          <meshBasicMaterial color={baseColor} side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Floating 3D Text Label */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, node.radius + (node.category === 'root' ? 0.35 : 0.25), 0]}
          fontSize={node.category === 'root' ? 0.32 : node.category.startsWith('hub') ? 0.24 : 0.18}
          color={isHighlighted ? '#ffffff' : isDark ? '#e2e8f0' : '#1e293b'}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUwwwdKJVMr2.woff2"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor={isDark ? '#020617' : '#ffffff'}
          fillOpacity={isDimmed ? 0.2 : 1.0}
        >
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
}

function GraphLines({ nodes, links, isDark, activeNodeId }) {
  const nodeMap = useMemo(() => {
    const map = new Map();
    nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [nodes]);

  return (
    <group>
      {links.map((link, idx) => {
        const source = nodeMap.get(link.source);
        const target = nodeMap.get(link.target);
        if (!source || !target) return null;

        const isRelated = activeNodeId && (link.source === activeNodeId || link.target === activeNodeId);
        const isDimmed = activeNodeId && !isRelated;

        const lineColor = isRelated
          ? (isDark ? '#00f5ff' : '#6366f1')
          : (isDark ? 'rgba(0, 245, 255, 0.25)' : 'rgba(99, 102, 241, 0.25)');

        const points = [
          new THREE.Vector3(...source.pos),
          new THREE.Vector3(...target.pos)
        ];

        return (
          <Line
            key={idx}
            points={points}
            color={lineColor}
            lineWidth={isRelated ? 2.5 : 1}
            transparent
            opacity={isDimmed ? 0.08 : isRelated ? 0.9 : 0.35}
          />
        );
      })}
    </group>
  );
}

export default function ObsidianSkillGraph({ isDark }) {
  const [selectedNode, setSelectedNode] = useState(GRAPH_DATA.nodes[0]); // default to Aziz Maulana
  const [hoveredNode, setHoveredNode] = useState(null);
  const controlsRef = useRef();

  const activeNode = hoveredNode || selectedNode;
  const activeId = activeNode?.id;

  const accentColor = isDark ? '#00f5ff' : '#6366f1';

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="w-full relative rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950/80 shadow-2xl backdrop-blur-xl">
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-5 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-b from-slate-950/90 to-transparent pointer-events-none">
        <div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase">
              OBSIDIAN 3D KNOWLEDGE GRAPH
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-serif mt-0.5 pointer-events-auto">
            Peta Konstelasi Keahlian & Otomasi
          </h3>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleResetCamera}
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors shadow-sm"
          >
            ↺ Reset View
          </button>
          <span className="text-[11px] font-mono text-slate-500 hidden md:inline-block">
            🖱️ Klik & Drag 360° • Scroll Zoom
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div style={{ height: '480px', width: '100%', cursor: 'grab' }}>
        <Canvas
          camera={{ position: [0, 0, 8.2], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          onPointerMissed={() => setHoveredNode(null)}
        >
          <ambientLight intensity={isDark ? 0.7 : 1.0} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={1.0} color="#a855f7" />

          {/* Connective Glowing Lines */}
          <GraphLines
            nodes={GRAPH_DATA.nodes}
            links={GRAPH_DATA.links}
            isDark={isDark}
            activeNodeId={activeId}
          />

          {/* 3D Nodes */}
          {GRAPH_DATA.nodes.map((node) => {
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

            return (
              <GraphNode
                key={node.id}
                node={node}
                isDark={isDark}
                isSelected={isSelected}
                isHovered={isHovered}
                isDimmed={isDimmed}
                onSelect={(n) => setSelectedNode(n)}
                onHover={(n) => setHoveredNode(n)}
              />
            );
          })}

          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            rotateSpeed={0.8}
            zoomSpeed={0.7}
            minDistance={4.5}
            maxDistance={14}
            autoRotate={!hoveredNode}
            autoRotateSpeed={0.4}
          />
        </Canvas>
      </div>

      {/* Bottom Spotlight Card */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
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
