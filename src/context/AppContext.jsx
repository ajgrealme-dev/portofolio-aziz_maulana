import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const translations = {
  id: {
    nav: { home: 'Beranda', about: 'Tentang', skills: 'Keahlian', projects: 'Proyek', experience: 'Pengalaman', contact: 'Kontak' },
    hero: {
      greeting: 'Halo, saya',
      name: 'Aziz Maulana',
      role: 'Warehouse & Operations Administrator',
      sub: 'Automation-Enabled · Ciruas, Serang',
      cta: 'Lihat Portfolio',
      cv: 'Unduh CV',
    },
    about: {
      title: 'Tentang Saya',
      p1: 'Lulusan Pondok Pesantren dengan disiplin dan integritas tinggi, yang saat ini menempuh pendidikan S1 Manajemen di Universitas Pamulang.',
      p2: 'Memiliki minat besar dalam efisiensi operasional dan administrasi. Mampu mengombinasikan ketelitian administratif dengan solusi otomasi digital (Node.js & AI) untuk mempercepat proses input data.',
      p3: 'Pribadi yang patuh pada aturan, jujur, dan siap berkontribusi menjaga akurasi catatan data di lingkungan industri.',
      stats: [
        { label: 'Proyek Selesai', value: '7+' },
        { label: 'Tahun Belajar', value: '2+' },
        { label: 'Keahlian', value: '12+' },
      ],
    },
    skills: {
      title: 'Keahlian',
      cats: [
        { name: 'Administratif', items: ['Data Entry', 'Microsoft Excel', 'Microsoft Word', 'Laporan Harian', 'Pencatatan Dokumen'] },
        { name: 'IT & Otomasi', items: ['Node.js', 'JavaScript', 'Python', 'SQL / SQLite', 'Gemini AI API', 'Telegram Bot'] },
        { name: 'Karakter', items: ['Disiplin Tinggi', 'Ketelitian Data', 'Kemauan Belajar', 'Patuh Aturan', 'Integritas'] },
      ],
    },
    projects: {
      title: 'Proyek Mandiri',
      items: [
        {
          title: 'AgentFlow B2B Makelar',
          icon: '🤝',
          period: 'Agustus 2026 – Sekarang',
          tag: 'Node.js · Playwright · Gemini AI · OSINT',
          desc: 'Mesin AI Makelar B2B end-to-end yang mengotomatisasi pencarian pabrik (buyer & supplier), negosiasi, dan tender harga (RFQ) secara mandiri menggunakan teknologi web scraping dan OSINT.',
          points: [
            'Scraping direktori bisnis (Google Maps) untuk memetakan pabrik target berdasarkan wilayah',
            'Pencarian dan ekstraksi alamat email B2B asli menggunakan teknik OSINT (Open Source Intelligence)',
            'Validasi DNS MX Record ketat untuk memastikan zero-bounce pada email campaign',
            'Sistem Tender Terbuka (RFQ) otomatis ke berbagai supplier untuk mengunci harga grosir termurah'
          ]
        },
        {
          title: 'AgentFlow Agency ERP',
          icon: '⚡',
          period: 'Maret 2026 – Sekarang',
          tag: 'Next.js · Gemini Spark · SQLite · Prisma · Puppeteer',
          desc: 'Platform ERP berbasis AI Agent otonom 24/7 yang mengotomasi operasional kantor lintas 8 divisi — Finance, Gudang, Logistik, HR, Pengadaan, IT, hingga Dashboard Eksekutif.',
          demoUrl: 'http://localhost:3000',
          pptxUrl: '/AgentFlow-PitchDeck.pptx',
          points: [
            'Dashboard eksekutif real-time: monitor jam kerja dihemat & biaya API token',
            'SOP Kontrak Data Baku (OrderDraft ➔ StockReserved ➔ Invoice PPN ➔ Surat Jalan)',
            'Simulator Hub Interaktif: uji 8 divisi AI merespons pesanan dan memproses dokumen',
            'Integrasi OCR Bon/Struk dan ekspor otomatis PDF Faktur Resmi & Surat Jalan'
          ],
        },
        {
          title: 'NexaBooks (Accounting AI)',
          icon: '📊',
          period: 'Mei 2026 – Sekarang',
          tag: 'Python · FastAPI · SQLite · Chart.js · Accounting',
          desc: 'Sistem akuntansi & pembukuan modern berbasis AI yang mengotomasi pencatatan jurnal umum, buku besar, neraca saldo, dan laporan arus kas harian.',
          points: [
            'Pencatatan otomatis jurnal debet/kredit terintegrasi dengan database SQLite',
            'Laporan neraca keuangan, laba rugi, dan arus kas yang dihasilkan secara otomatis',
            'Visualisasi tren pendapatan dan beban operasional bulanan berbasis Chart.js',
            'AI Engine analitik untuk deteksi anomali pengeluaran dan rekonsiliasi kas'
          ]
        },
        {
          title: 'SakuTracker (PWA Finance)',
          icon: '📱',
          period: 'Juni 2026 – Sekarang',
          tag: 'React · TypeScript · Tailwind CSS · Dexie.js · PWA',
          desc: 'Aplikasi pelacak keuangan pribadi & operasional berbasis Progressive Web App (PWA) dan Android APK yang berjalan 100% offline dengan IndexedDB.',
          points: [
            'Pencatatan pemasukan & pengeluaran cepat dengan penyimpanan lokal Dexie.js (IndexedDB)',
            'Dukungan instalasi PWA dan paket rilis Android APK (SakuTracker-v1.0.apk)',
            'Kalkulasi sisa anggaran harian dan visualisasi kategori pengeluaran',
            'Fitur backup dan ekspor riwayat transaksi ke format CSV / JSON'
          ]
        },
        {
          title: 'Job Scraper Bot',
          icon: '🕷️',
          period: 'Juli 2026 – Sekarang',
          tag: 'Python · BeautifulSoup · Pandas · SMTP',
          desc: 'Bot pencari kerja dan pengirim lamaran otomatis yang mengekstrak data dari berbagai portal lowongan kerja dan memverifikasi validitas email via SMTP.',
          points: [
            'Scraping data dari website perusahaan dan portal lowongan kerja',
            'Sistem deteksi formulir cerdas dan verifikasi validitas email via SMTP untuk mencegah bounce',
            'Personalisasi draf email dinamis sesuai dengan nama perusahaan dan posisi',
            'Manajemen database prospek ke format Excel (Pandas) untuk pelaporan terstruktur'
          ]
        },
        {
          title: 'Robot Sakti (AI Trading)',
          icon: '📈',
          period: 'Desember 2025 – Sekarang',
          tag: 'Python · MetaTrader 5 · TensorFlow · Stable-Baselines3 · LightGBM',
          desc: 'Sistem trading multi-asset otomatis (Gold, Bitcoin, Forex) yang mengintegrasikan kecerdasan buatan (Machine Learning & Reinforcement Learning) dengan execution engine MetaTrader 5.',
          points: [
            'Mengintegrasikan MetaTrader 5 API untuk eksekusi order otomatis secara real-time',
            'Model prediksi arah tren menggunakan LightGBM & ekstraksi fitur dengan Autoencoder',
            'Portofolio manajemen & optimasi order menggunakan Deep Reinforcement Learning',
            'Veto sinyal teknikal secara cerdas menggunakan Gemini AI NLP untuk analisis berita & makro'
          ]
        },
        {
          title: 'Kicaw Mania (Game Vision)',
          icon: '🐦',
          period: 'Februari 2026 – Maret 2026',
          tag: 'Python · OpenCV · MediaPipe · NumPy',
          desc: 'Game kamera interaktif berbasis Computer Vision untuk tren viral TikTok (Touch Your Nose Detection) yang mendeteksi sentuhan jari pada hidung secara real-time dengan efek partikel fisik.',
          points: [
            'Menggunakan MediaPipe Hands & Face Mesh untuk mendeteksi koordinat spasial 3D secara presisi',
            'Pengolahan video feed webcam real-time berlatensi rendah dengan library OpenCV',
            'Simulasi Sistem Partikel Fisika kustom (gravitasi, pudar, warna acak) sebagai visual feedback',
            'Dilengkapi fitur gameplay interaktif: penghitung skor (score tracker), reset skor, dan FPS visualizer'
          ]
        }
      ],
    },
    experience: {
      title: 'Pengalaman',
      items: [
        { title: 'Asisten Chief Dapur', company: 'SPPG', period: 'Jan 2026 – Sekarang', points: ['Menyusun menu harian bersama Chief', 'Memastikan persiapan bahan sesuai SOP'] },
        { title: 'Guru Matematika', company: 'MTSs As-Salam', period: 'Nov 2025 – Jan 2026', points: ['Mengajar matematika dasar', 'Input & pengelolaan nilai siswa', 'Menyusun laporan raport'] },
        { title: 'Guru Diniyah', company: 'TPQ Al-Islah', period: 'Sep 2025 – Nov 2025', points: ['Mengajar materi keagamaan dasar', 'Mencatat nilai perkembangan mengaji', 'Menyusun laporan raport santri'] },
      ],
    },
    contact: {
      title: 'Hubungi Saya',
      sub: 'Tertarik bekerja sama? Kirimkan pesan!',
      name: 'Nama Anda',
      email: 'Email Anda',
      message: 'Pesan Anda',
      send: 'Kirim Pesan',
      sending: 'Mengirim...',
      success: 'Pesan terkirim! Terima kasih.',
      error: 'Gagal mengirim. Coba lagi.',
    },
    education: {
      title: 'Pendidikan',
      items: [
        { school: 'Universitas Pamulang', major: 'S1 Manajemen', year: 'Sedang Berjalan' },
        { school: 'Daar Al-Ilmi Boarding School', major: 'Jurusan IPS', year: 'Lulus 2025' },
      ],
    },
  },
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Experience', contact: 'Contact' },
    hero: {
      greeting: "Hi, I'm",
      name: 'Aziz Maulana',
      role: 'Warehouse & Operations Administrator',
      sub: 'Automation-Enabled · Ciruas, Serang',
      cta: 'View Portfolio',
      cv: 'Download CV',
    },
    about: {
      title: 'About Me',
      p1: 'A boarding school graduate with high discipline and integrity, currently pursuing a Bachelor of Management at Universitas Pamulang.',
      p2: 'Passionate about operational efficiency and administration. Able to combine administrative precision with digital automation solutions (Node.js & AI) to accelerate data entry processes.',
      p3: 'A rule-abiding, honest individual ready to contribute to maintaining data record accuracy in an industrial environment.',
      stats: [
        { label: 'Projects Done', value: '7+' },
        { label: 'Years Learning', value: '2+' },
        { label: 'Skills', value: '12+' },
      ],
    },
    skills: {
      title: 'Skills',
      cats: [
        { name: 'Administrative', items: ['Data Entry', 'Microsoft Excel', 'Microsoft Word', 'Daily Reports', 'Document Recording'] },
        { name: 'IT & Automation', items: ['Node.js', 'JavaScript', 'Python', 'SQL / SQLite', 'Gemini AI API', 'Telegram Bot'] },
        { name: 'Character', items: ['High Discipline', 'Data Accuracy', 'Eagerness to Learn', 'Rule Compliance', 'Integrity'] },
      ],
    },
    projects: {
      title: 'Personal Projects',
      items: [
        {
          title: 'AgentFlow B2B Broker',
          icon: '🤝',
          period: 'August 2026 – Present',
          tag: 'Node.js · Playwright · Gemini AI · OSINT',
          desc: 'An end-to-end B2B Broker AI engine that automates factory discovery (buyers & suppliers), negotiation, and open tender (RFQ) pricing using web scraping and OSINT technologies.',
          points: [
            'Scraping business directories (Google Maps) to map target factories by region',
            'Discovery and extraction of authentic B2B email addresses using OSINT techniques',
            'Strict DNS MX Record validation to ensure zero-bounce rate on email campaigns',
            'Automated Open Tender (RFQ) system across multiple suppliers to lock in the lowest wholesale prices'
          ]
        },
        {
          title: 'AgentFlow Agency ERP',
          icon: '⚡',
          period: 'March 2026 – Present',
          tag: 'Next.js · Gemini Spark · SQLite · Prisma · Puppeteer',
          desc: 'Autonomous 24/7 AI Agent ERP platform that automates office operations across 8 divisions — Finance, Warehouse, Logistics, HR, Procurement, IT, and Executive Dashboard.',
          demoUrl: 'http://localhost:3000',
          pptxUrl: '/AgentFlow-PitchDeck.pptx',
          points: [
            'Real-time executive dashboard: tracks hours saved & API token costs',
            'SOP-Driven Data Contracts (OrderDraft ➔ StockReserved ➔ Official Invoice ➔ Delivery Order)',
            'Interactive Simulator Hub: live test 8 AI divisions processing orders and generating documents',
            'Integrated receipt OCR and automated PDF generation for Invoices & Delivery Orders'
          ],
        },
        {
          title: 'NexaBooks (Accounting AI)',
          icon: '📊',
          period: 'May 2026 – Present',
          tag: 'Python · FastAPI · SQLite · Chart.js · Accounting',
          desc: 'A modern AI-powered bookkeeping and accounting system that automates general ledger entries, trial balances, and daily cashflow reports.',
          points: [
            'Automated debit/credit journal entries integrated with SQLite database',
            'Auto-generated balance sheets, profit & loss, and cash flow reports',
            'Monthly revenue and operational expense trend visualization via Chart.js',
            'AI analytics engine for expense anomaly detection and bank reconciliation'
          ]
        },
        {
          title: 'SakuTracker (PWA Finance)',
          icon: '📱',
          period: 'June 2026 – Present',
          tag: 'React · TypeScript · Tailwind CSS · Dexie.js · PWA',
          desc: 'A personal & operational finance tracker built as a Progressive Web App (PWA) and Android APK running 100% offline with local IndexedDB storage.',
          points: [
            'Fast income and expense logging with local Dexie.js (IndexedDB) storage',
            'Installable PWA support and Android APK release package (SakuTracker-v1.0.apk)',
            'Daily budget remaining calculation and expense category breakdown',
            'Transaction history backup and export to CSV / JSON format'
          ]
        },
        {
          title: 'Job Scraper Bot',
          icon: '🕷️',
          period: 'July 2026 – Present',
          tag: 'Python · BeautifulSoup · Pandas · SMTP',
          desc: 'An automated job search and application bot that extracts data from various job portals and verifies email validity via SMTP.',
          points: [
            'Scrapes company websites and local job boards for potential leads',
            'Intelligent contact form detection and email validity verification via SMTP to prevent bounces',
            'Dynamic email draft personalization matching company names and job titles',
            'Lead database management exported to Excel (Pandas) for structured reporting'
          ]
        },
        {
          title: 'Robot Sakti (AI Trading)',
          icon: '📈',
          period: 'December 2025 – Present',
          tag: 'Python · MetaTrader 5 · TensorFlow · Stable-Baselines3 · LightGBM',
          desc: 'Automated multi-asset trading system (Gold, Bitcoin, Forex) integrating machine learning, reinforcement learning, and LLM NLP with MetaTrader 5 execution engine.',
          points: [
            'Integrated MetaTrader 5 API for real-time automated order execution',
            'Trend direction prediction model using LightGBM and feature extraction via Autoencoder',
            'Portfolio management and order optimization using Deep Reinforcement Learning',
            'Intelligent trade signal verification using Gemini AI NLP for macro and news sentiment analysis'
          ]
        },
        {
          title: 'Kicaw Mania (Game Vision)',
          icon: '🐦',
          period: 'February 2026 – March 2026',
          tag: 'Python · OpenCV · MediaPipe · NumPy',
          desc: 'An interactive Computer Vision game built for a viral TikTok trend (Touch Your Nose Detection), detecting finger-to-nose touches in real-time with physical particle effects.',
          points: [
            'Utilized MediaPipe Hands and Face Mesh to track 3D spatial hand and face landmarks precisely',
            'Processed real-time webcam video feeds with low latency using the OpenCV library',
            'Simulated custom Physics Particle Systems (gravity, alpha-decay, random colors) for visual touch feedback',
            'Features interactive gameplay: touch score tracking, score reset hotkey, and FPS visualizer'
          ]
        }
      ],
    },
    experience: {
      title: 'Experience',
      items: [
        { title: 'Kitchen Chief Assistant', company: 'SPPG', period: 'Jan 2026 – Present', points: ['Composed daily menus with the Chief', 'Ensured ingredient preparation per SOP'] },
        { title: 'Math Teacher', company: 'MTSs As-Salam', period: 'Nov 2025 – Jan 2026', points: ['Taught basic mathematics', 'Managed student grade records', 'Compiled report cards'] },
        { title: 'Religious Teacher', company: 'TPQ Al-Islah', period: 'Sep 2025 – Nov 2025', points: ['Taught basic religious subjects', 'Recorded student Quran progress', 'Compiled student report cards'] },
      ],
    },
    contact: {
      title: 'Get In Touch',
      sub: 'Interested in working together? Send a message!',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent! Thank you.',
      error: 'Failed to send. Try again.',
    },
    education: {
      title: 'Education',
      items: [
        { school: 'Universitas Pamulang', major: 'Bachelor of Management', year: 'In Progress' },
        { school: 'Daar Al-Ilmi Boarding School', major: 'Social Sciences', year: 'Graduated 2025' },
      ],
    },
  },
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('id');

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang(l => (l === 'id' ? 'en' : 'id'));
  const t = translations[lang];

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
