# 🚀 PANDUAN DEPLOYMENT AGENTFLOW ENTERPRISE
## Windows Server 2022 Deployment Guide

Dokumen ini berisi panduan langkah-demi-langkah untuk melakukan deployment aplikasi AgentFlow (Next.js, PostgreSQL/PgLite Database, dan Telegram Bot) di Windows Server 2022 / RDP.

---

## 📋 1. Checklist Kebutuhan Software (Prerequisites)
Sebelum menjalankan perintah, pastikan software berikut sudah terinstal di Windows Server:
1. **Node.js (LTS Version 20.x atau terbaru):** [Download Node.js](https://nodejs.org/)
2. **Git untuk Windows:** [Download Git](https://git-scm.com/)

---

## 📂 2. Menarik Source Code (Git Clone)
Buka **Command Prompt (CMD)** di Windows Server, arahkan to folder tempat Anda ingin menaruh proyek (misalnya Desktop), lalu jalankan perintah:

```cmd
cd Desktop
git clone https://github.com/ajgrealme-dev/agentflow.git
cd agentflow
```

---

## 🔑 3. Konfigurasi Environment File (`.env`)
Buat file bernama `.env` di dalam folder `agentflow` di server, lalu isi dengan konfigurasi berikut:

```env
DATABASE_URL="postgres://postgres:postgres@localhost:51214/pgdata"
GEMINI_API_KEY="AIzaSyBxY_zEuuAw-J0c1uGlJzBElZ-BQKoRx_Y"
TELEGRAM_BOT_TOKEN="8852463233:AAGx4_r2e-CDYEtXrCpYx7VRaVQ4q7msjpk"
ADMIN_CHAT_ID="7618497952"
MANAGER_CHAT_ID="7618497952"
```

---

## 🛠️ 4. Instalasi Dependensi & Build Produksi
Di dalam folder proyek `agentflow` di server, jalankan perintah berikut secara berurutan untuk mengunduh library dan mengompilasi kode:

```cmd
# 1. Install dependensi utama
npm install

# 2. Install pglite-server lokal secara ekskplisit
npm install pglite-server --save-dev

# 3. Install dependensi untuk Telegram Bot
cd bot
npm install
cd ..

# 4. Generate database client & build Next.js ke mode produksi
npx prisma generate
npm run build
```

---

## 🤖 5. Konfigurasi Autostart Server & Bot (PM2 Setup)
Agar aplikasi, database, dan bot otomatis menyala dan berjalan 24 jam terus-menerus:

```cmd
# 1. Install Process Manager (PM2) secara global
npm install -g pm2

# 2. Hapus sisa konfigurasi PM2 lama jika ada
pm2 delete all
pm2 cleardump

# 3. Jalankan aplikasi menggunakan file konfigurasi ecosystem
pm2 start ecosystem.config.js

# 4. Simpan konfigurasi PM2 agar otomatis berjalan saat server reboot/restart
pm2 save
```

---

## 🔒 6. Membuka Port 3000 di Windows Firewall
Agar website dapat diakses dari browser luar (misalnya dari HP Anda melalui internet), jalankan perintah ini di **PowerShell** dengan hak akses Administrator di server:

```powershell
New-NetFirewallRule -DisplayName "AgentFlow Web Port 3000" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

Setelah langkah ini selesai, website akan aktif secara online di alamat:
👉 **`http://<IP_ADDRESS_RDP_ANDA>:3000`**
