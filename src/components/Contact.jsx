import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';
  const cardBg = isDark ? 'rgba(0,245,255,0.03)' : 'rgba(99,102,241,0.04)';
  const cardBorder = isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.2)';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)';
  const inputBorder = isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/mykqbawa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };
  const inputStyle = (focused) => ({
    width: '100%', padding: '14px 16px',
    background: inputBg,
    border: `1px solid ${focused ? accentColor : inputBorder}`,
    borderRadius: '12px', color: textColor, fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused ? (isDark ? `0 0 15px ${accentColor}30` : `0 0 15px rgba(99,102,241,0.2)`) : 'none',
    fontFamily: 'Inter, sans-serif',
    resize: 'vertical',
  });

  const [focused, setFocused] = useState({});
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  const contacts = [
    {
      id: 'email',
      type: 'link',
      label: 'Email',
      value: 'ajgrealme@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ajgrealme@gmail.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#EA4335">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
        </svg>
      )
    },
    {
      id: 'phone',
      type: 'action',
      label: 'Telepon / Kontak',
      value: '+62 822-5805-0509',
      onClick: () => setPhoneModalOpen(true),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    },
    {
      id: 'instagram',
      type: 'link',
      label: 'Instagram',
      value: '@_aziizz_',
      href: 'https://instagram.com/_aziizz_',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" fill="url(#ig-grad)"/>
          <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="url(#ig-grad)"/>
          <circle cx="18.406" cy="5.595" r="1.44" fill="url(#ig-grad)"/>
          <defs>
            <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433"/>
              <stop offset="25%" stopColor="#e6683c"/>
              <stop offset="50%" stopColor="#dc2743"/>
              <stop offset="75%" stopColor="#cc2366"/>
              <stop offset="100%" stopColor="#bc1888"/>
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 'linkedin',
      type: 'link',
      label: 'LinkedIn',
      value: 'Aziz Maulana',
      href: 'https://www.linkedin.com/in/aziz-maulana-75908b260/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.06 20.45H3.56V9h3.5v11.45zM5.31 7.55c-1.12 0-2.03-.91-2.03-2.03s.91-2.03 2.03-2.03 2.03.91 2.03 2.03-.91 2.03-2.03 2.03zM20.45 20.45h-3.5v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7H9.44V9h3.36v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.56 0 4.22 2.34 4.22 5.39v6.33z" fill="#0A66C2"/>
        </svg>
      )
    },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: '120px 2rem 80px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<contact>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.contact.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto 1rem', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
          <p style={{ color: subColor }}>{t.contact.sub}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contacts.map((c, i) => {
              const content = (
                <>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: `${accentColor}20`, border: `1px solid ${accentColor}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: isDark ? `0 0 15px ${accentColor}30` : 'none',
                  }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ color: accentColor, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>{c.label}</div>
                    <div style={{ color: textColor, fontWeight: 600, fontSize: '0.95rem' }}>{c.value}</div>
                  </div>
                </>
              );

              const itemStyle = {
                display: 'flex', alignItems: 'center', gap: '1rem',
                background: cardBg, border: `1px solid ${cardBorder}`,
                borderRadius: '16px', padding: '1.25rem 1.5rem',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'box-shadow 0.3s',
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
                width: '100%',
                boxSizing: 'border-box',
              };

              if (c.type === 'link') {
                return (
                  <motion.a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -6, x: 4, boxShadow: isDark ? `0 20px 40px ${accentColor}20` : '0 20px 40px rgba(99,102,241,0.15)' }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                    style={itemStyle}>
                    {content}
                  </motion.a>
                );
              }

              return (
                <motion.div key={i} onClick={c.onClick}
                  whileHover={{ y: -6, x: 4, boxShadow: isDark ? `0 20px 40px ${accentColor}20` : '0 20px 40px rgba(99,102,241,0.15)' }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                  style={itemStyle}>
                  {content}
                </motion.div>
              );
            })}

            {/* Download CV button */}
            <motion.a href="./CV_Aziz_Maulana_IT_Operations.pdf" download
              whileHover={{ scale: 1.03, boxShadow: isDark ? `0 0 30px ${accentColor}40` : '0 10px 30px rgba(99,102,241,0.3)' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: `linear-gradient(135deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
                color: isDark ? '#000' : '#fff', fontWeight: 700, fontSize: '1rem',
                padding: '16px', borderRadius: '16px', textDecoration: 'none',
                boxShadow: `0 0 20px ${accentColor}30`,
                marginTop: '0.5rem',
              }}>
              ⬇ {isDark ? 'Unduh CV PDF' : 'Download CV PDF'}
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }}>
            <form onSubmit={handleSubmit}
              style={{
                background: cardBg, border: `1px solid ${cardBorder}`,
                borderRadius: '24px', padding: '2rem',
                backdropFilter: 'blur(10px)',
                display: 'flex', flexDirection: 'column', gap: '1rem',
                position: 'relative',
              }}>
              <div style={{ position: 'relative', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'}, transparent)`, borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none', marginBottom: '0.5rem' }} />

              <div>
                <label style={{ color: subColor, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{t.contact.name}</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  onFocus={() => setFocused(p => ({ ...p, name: true }))}
                  onBlur={() => setFocused(p => ({ ...p, name: false }))}
                  placeholder={isDark ? 'Nama lengkap Anda' : 'Your full name'}
                  style={inputStyle(focused.name)} />
              </div>

              <div>
                <label style={{ color: subColor, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{t.contact.email}</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onFocus={() => setFocused(p => ({ ...p, email: true }))}
                  onBlur={() => setFocused(p => ({ ...p, email: false }))}
                  placeholder="email@contoh.com"
                  style={inputStyle(focused.email)} />
              </div>

              <div>
                <label style={{ color: subColor, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{t.contact.message}</label>
                <textarea required rows={5} value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  onFocus={() => setFocused(p => ({ ...p, message: true }))}
                  onBlur={() => setFocused(p => ({ ...p, message: false }))}
                  placeholder={isDark ? 'Tulis pesan Anda di sini...' : 'Write your message here...'}
                  style={inputStyle(focused.message)} />
              </div>

              <motion.button type="submit" disabled={status === 'sending'}
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '14px', borderRadius: '12px', border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                  background: status === 'success' ? '#22c55e' : status === 'error' ? '#ef4444' : `linear-gradient(135deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
                  color: isDark ? '#000' : '#fff', fontWeight: 700, fontSize: '1rem',
                  boxShadow: `0 0 20px ${accentColor}30`,
                  transition: 'background 0.3s',
                }}>
                {status === 'sending' ? '⏳ ' + t.contact.sending
                  : status === 'success' ? '✅ ' + t.contact.success
                  : status === 'error' ? '❌ ' + t.contact.error
                  : '🚀 ' + t.contact.send}
              </motion.button>
              
              {/* Flying paper plane 3D animation */}
              <AnimatePresence>
                {(status === 'sending' || status === 'success') && (
                  <motion.div
                    initial={{ x: '-50%', y: 0, scale: 0.2, rotate: -45, opacity: 0 }}
                    animate={{ 
                      x: ['-50%', '50%', '150%', '250%'], 
                      y: [0, -150, -250, -320], 
                      scale: [0.5, 1.4, 1.2, 0.4], 
                      rotate: [-45, -15, 20, 60], 
                      opacity: [0, 1, 1, 0] 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      pointerEvents: 'none',
                      fontSize: '3rem',
                      color: accentColor,
                      textShadow: isDark ? `0 0 20px ${accentColor}` : 'none',
                      zIndex: 100,
                      left: '50%',
                      bottom: '2rem',
                    }}
                  >
                    ✈️
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Phone Choice Modal */}
      <AnimatePresence>
        {phoneModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
            }}
            onClick={() => setPhoneModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{
                background: isDark ? '#111827' : '#ffffff',
                border: `1px solid ${cardBorder}`,
                borderRadius: '24px', padding: '2rem',
                width: '100%', maxWidth: '380px',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setPhoneModalOpen(false)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'none', border: 'none', color: subColor,
                  cursor: 'pointer', fontSize: '1.25rem', padding: '4px'
                }}
              >✕</button>
              
              <h3 style={{ color: textColor, fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '0.5rem', marginTop: 0 }}>Hubungi Saya</h3>
              <p style={{ color: subColor, fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Pilih aplikasi pesan yang ingin Anda gunakan untuk menghubungi saya via <br/> <strong>+62 822-5805-0509</strong>.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a 
                  href="https://wa.me/6282258050509" 
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '16px', borderRadius: '16px', textDecoration: 'none',
                    background: isDark ? 'rgba(37, 211, 102, 0.1)' : '#f0fdf4',
                    border: `1px solid ${isDark ? 'rgba(37, 211, 102, 0.3)' : '#bbf7d0'}`,
                    color: textColor, fontWeight: 600, fontSize: '1rem',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(37, 211, 102, 0.15)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#25D366">
                    <path d="M12.01 2.01c-5.51 0-9.99 4.48-9.99 9.99 0 1.96.55 3.84 1.58 5.46L2 22l4.67-1.55c1.58 1.01 3.44 1.55 5.34 1.55 5.51 0 9.99-4.48 9.99-9.99S17.52 2.01 12.01 2.01zm5.54 14.3c-.23.65-1.34 1.25-1.88 1.35-.5.09-1.16.14-3.32-.75-2.61-1.07-4.29-3.76-4.42-3.93-.13-.17-1.06-1.41-1.06-2.69 0-1.28.67-1.92.9-2.17.23-.25.51-.31.68-.31.17 0 .34 0 .49.01.16.01.37-.06.58.45.22.52.74 1.8.8 1.93.07.13.11.28.02.46-.09.18-.13.3-.26.46-.12.16-.26.34-.37.47-.13.14-.26.29-.11.55.15.26.66 1.1 1.42 1.78.98.88 1.8 1.15 2.06 1.28.26.13.41.11.56-.06.15-.17.65-.75.82-1.01.17-.26.34-.22.58-.13.24.09 1.51.71 1.77.84.26.13.43.2.49.31.06.11.06.65-.17 1.3z"/>
                  </svg>
                  WhatsApp
                </a>
                
                <a 
                  href="https://t.me/Ajiizz" 
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '16px', borderRadius: '16px', textDecoration: 'none',
                    background: isDark ? 'rgba(34, 158, 217, 0.1)' : '#f0f9ff',
                    border: `1px solid ${isDark ? 'rgba(34, 158, 217, 0.3)' : '#bae6fd'}`,
                    color: textColor, fontWeight: 600, fontSize: '1rem',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(34, 158, 217, 0.15)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#229ED9">
                    <path d="M11.96 2C6.46 2 2 6.46 2 11.96s4.46 9.96 9.96 9.96 9.96-4.46 9.96-9.96S17.46 2 11.96 2zm4.7 7.74l-1.57 7.39c-.12.53-.43.66-.88.4L11.78 15.7l-1.17 1.13c-.13.13-.24.24-.49.24l.17-2.49 4.54-4.1c.2-.18-.04-.28-.31-.1l-5.61 3.53-2.42-.76c-.52-.16-.54-.53.11-.78l9.46-3.65c.44-.16.82.1.68.72z"/>
                  </svg>
                  Telegram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
