import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '0px' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';
  const cardBg = isDark ? 'rgba(0,245,255,0.03)' : 'rgba(99,102,241,0.04)';
  const cardBorder = isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.2)';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const inputBorder = isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.25)';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    const subject = encodeURIComponent(`Pesan Portfolio dari ${form.name}`);
    const body = encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}`);
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ajgrealme@gmail.com&su=${subject}&body=${body}`;

    window.open(mailtoUrl, '_blank');
    setStatus('success');
    setLoading(false);
    setForm({ name: '', email: '', message: '' });
  };

  const inputStyle = (focused) => ({
    width: '100%',
    padding: 'clamp(0.6rem, 1.2vw, 1rem) clamp(0.75rem, 1.5vw, 1.25rem)',
    background: inputBg,
    border: `1px solid ${focused ? accentColor : inputBorder}`,
    borderRadius: '12px',
    color: textColor,
    fontSize: 'clamp(0.78rem, 1vw, 0.9rem)',
    outline: 'none',
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#EA4335">
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
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
      href: 'https://www.linkedin.com/in/aziz-maulana-',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
          <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.06 20.45H3.56V9h3.5v11.45zM5.31 7.55c-1.12 0-2.03-.91-2.03-2.03s.91-2.03 2.03-2.03 2.03.91 2.03 2.03-.91 2.03-2.03 2.03zM20.45 20.45h-3.5v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7H9.44V9h3.36v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.56 0 4.22 2.34 4.22 5.39v6.33z" fill="#0A66C2"/>
        </svg>
      )
    },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(70px, 9vh, 120px) clamp(0.75rem, 3vw, 2rem) 80px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<contact>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.contact.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto 1rem', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
          <p style={{ color: subColor, fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)' }}>{t.contact.sub}</p>
        </motion.div>

        {/* 🌟 2-Column Side-by-Side Grid 🌟 */}
        <div className="contact-main-grid">
          {/* Contact info on the Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 1.2vw, 1rem)' }}>
            {contacts.map((c, i) => {
              const content = (
                <>
                  <div style={{
                    width: 'clamp(36px, 4vw, 48px)', height: 'clamp(36px, 4vw, 48px)', borderRadius: '12px',
                    background: `${accentColor}20`, border: `1px solid ${accentColor}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: isDark ? `0 0 15px ${accentColor}30` : 'none',
                  }}>
                    {c.icon}
                  </div>
                  <div style={{ overflow: 'hidden', minWidth: 0 }}>
                    <div style={{ color: accentColor, fontSize: 'clamp(0.65rem, 0.85vw, 0.75rem)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>{c.label}</div>
                    <div style={{ color: textColor, fontWeight: 600, fontSize: 'clamp(0.78rem, 1.1vw, 0.95rem)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{c.value}</div>
                  </div>
                </>
              );

              const itemStyle = {
                display: 'flex', alignItems: 'center', gap: 'clamp(0.6rem, 1.2vw, 1rem)',
                background: cardBg, border: `1px solid ${cardBorder}`,
                borderRadius: '16px', padding: 'clamp(0.75rem, 1.5vw, 1.25rem)',
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

            {/* Quick Resume Download Button */}
            <motion.a
              href="/CV_Aziz_Maulana.pdf"
              download="CV_Aziz_Maulana.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: `linear-gradient(135deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
                color: '#05050f', fontWeight: 700, padding: 'clamp(0.75rem, 1.2vw, 1rem)',
                borderRadius: '14px', textDecoration: 'none', fontSize: 'clamp(0.78rem, 1vw, 0.9rem)',
                boxShadow: isDark ? `0 0 25px ${accentColor}40` : '0 10px 25px rgba(99,102,241,0.3)',
                marginTop: '0.25rem',
              }}
            >
              📥 Unduh CV PDF
            </motion.a>
          </motion.div>

          {/* Contact form on the Right */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              background: cardBg, border: `1px solid ${cardBorder}`,
              borderRadius: '24px', padding: 'clamp(1rem, 2vw, 2rem)',
              backdropFilter: 'blur(10px)',
              display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
              position: 'relative', overflow: 'hidden',
            }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

            <div>
              <label style={{ display: 'block', color: accentColor, fontSize: 'clamp(0.68rem, 0.9vw, 0.75rem)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {t.contact.name}
              </label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder={isDark ? 'Nama lengkap Anda' : 'Your full name'} required
                onFocus={() => setFocused({ ...focused, name: true })} onBlur={() => setFocused({ ...focused, name: false })}
                style={inputStyle(focused.name)} />
            </div>

            <div>
              <label style={{ display: 'block', color: accentColor, fontSize: 'clamp(0.68rem, 0.9vw, 0.75rem)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {t.contact.email}
              </label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="email@contoh.com" required
                onFocus={() => setFocused({ ...focused, email: true })} onBlur={() => setFocused({ ...focused, email: false })}
                style={inputStyle(focused.email)} />
            </div>

            <div>
              <label style={{ display: 'block', color: accentColor, fontSize: 'clamp(0.68rem, 0.9vw, 0.75rem)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {t.contact.message}
              </label>
              <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder={isDark ? 'Tulis pesan Anda di sini...' : 'Type your message here...'} required
                onFocus={() => setFocused({ ...focused, msg: true })} onBlur={() => setFocused({ ...focused, msg: false })}
                style={inputStyle(focused.msg)} />
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
                color: '#05050f', border: 'none', borderRadius: '12px',
                padding: 'clamp(0.75rem, 1.2vw, 1rem)', fontWeight: 700, fontSize: 'clamp(0.78rem, 1vw, 0.95rem)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: isDark ? `0 0 25px ${accentColor}50` : '0 10px 25px rgba(99,102,241,0.3)',
                transition: 'opacity 0.2s', opacity: loading ? 0.7 : 1,
              }}>
              {loading ? (isDark ? 'Membuka Email...' : 'Opening Email...') : `🚀 ${t.contact.send}`}
            </motion.button>

            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid #39ff14', color: isDark ? '#39ff14' : '#16a34a', padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
                ✓ {isDark ? 'Pesan berhasil disiapkan di Gmail!' : 'Message drafted in Gmail!'}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>

      {/* Phone modal */}
      {phoneModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }} onClick={() => setPhoneModalOpen(false)}>
          <div style={{
            background: isDark ? '#0a0a1a' : '#ffffff',
            border: `1px solid ${accentColor}40`,
            borderRadius: '20px', padding: '2rem', maxWidth: '380px', width: '100%',
            boxShadow: isDark ? `0 0 40px ${accentColor}30` : '0 20px 40px rgba(0,0,0,0.15)',
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: textColor, marginBottom: '0.5rem', fontWeight: 700 }}>Hubungi via WhatsApp</h3>
            <p style={{ color: subColor, fontSize: '0.85rem', marginBottom: '1.5rem' }}>+62 822-5805-0509</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://wa.me/6282258050509" target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px',
                  background: '#25D366', color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
                }}>
                Buka WA
              </a>
              <button onClick={() => setPhoneModalOpen(false)}
                style={{
                  padding: '10px 16px', borderRadius: '10px',
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  border: 'none', color: textColor, cursor: 'pointer',
                }}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
