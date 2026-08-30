const puppeteer = require('C:/Users/L15 RYZEN/Desktop/PROJECT/agentflow/node_modules/puppeteer');
const path = require('path');

const publicDir = 'C:\\Users\\L15 RYZEN\\Desktop\\PROJECT\\portfolio-aziz\\public';

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });

  // 1. AgentFlow B2B Makelar Dashboard
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
        body { background: #070913; color: #e2e8f0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; }
        header { background: #0c1022; border-bottom: 1px solid #1e293b; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 18px; font-weight: 700; color: #00f5ff; display: flex; align-items: center; gap: 8px; }
        .badge { background: rgba(0, 245, 255, 0.15); color: #00f5ff; border: 1px solid #00f5ff; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .container { display: grid; grid-template-columns: 280px 1fr 340px; gap: 16px; padding: 16px; flex: 1; min-height: 0; }
        .card { background: #0c1022; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .card-title { font-size: 13px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between; }
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .stat-box { background: #131830; padding: 12px; border-radius: 8px; border: 1px solid #242c4c; }
        .stat-val { font-size: 20px; font-weight: 700; color: #39ff14; }
        .stat-lbl { font-size: 11px; color: #94a3b8; margin-top: 4px; }
        .deal-item { background: #131830; border: 1px solid #242c4c; padding: 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
        .deal-buyer { font-weight: 600; font-size: 13px; color: #fff; }
        .deal-tag { font-size: 11px; color: #38bdf8; }
        .deal-margin { color: #39ff14; font-weight: 700; font-size: 13px; }
        .terminal { background: #05060b; border: 1px solid #1a2238; border-radius: 8px; padding: 12px; font-family: 'Consolas', monospace; font-size: 11px; color: #a5f3fc; line-height: 1.6; flex: 1; overflow: hidden; }
        .terminal-line { margin-bottom: 4px; }
        .radar-canvas { background: radial-gradient(circle, #0e1730 0%, #070913 70%); border-radius: 10px; flex: 1; border: 1px solid #1e293b; position: relative; overflow: hidden; }
        .node { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #00f5ff; box-shadow: 0 0 10px #00f5ff; }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">🤝 AgentFlow B2B Makelar AI <span class="badge">v2.4 Autonomous</span></div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="font-size: 12px; color: #39ff14;">● Engine Active (9 Scrapers)</span>
          <span style="font-size: 12px; color: #94a3b8;">Tender RFQ Sync: 100%</span>
        </div>
      </header>
      <div class="container">
        <div class="card">
          <div class="card-title">Live Makelar Pipeline <span>Real-Time</span></div>
          <div class="stat-grid">
            <div class="stat-box"><div class="stat-val">Rp 4.2M</div><div class="stat-lbl">Volume Tender</div></div>
            <div class="stat-box"><div class="stat-val">8.4%</div><div class="stat-lbl">Avg Komisi</div></div>
          </div>
          <div class="card-title" style="margin-top: 8px;">Active RFQ Matches</div>
          <div class="deal-item">
            <div><div class="deal-buyer">PT Sinar Baja Mandiri</div><div class="deal-tag">Baja Coil 50 Ton → CV Mega Logam</div></div>
            <div class="deal-margin">+Rp 14.5jt</div>
          </div>
          <div class="deal-item">
            <div><div class="deal-buyer">PT Cikarang Foodpack</div><div class="deal-tag">Karton Box 10.000pcs → Pabrik Alfa</div></div>
            <div class="deal-margin">+Rp 6.2jt</div>
          </div>
          <div class="deal-item">
            <div><div class="deal-buyer">PT Textileindo Sentosa</div><div class="deal-tag">Kain Katun Rayon → Supplier Solo</div></div>
            <div class="deal-margin">+Rp 9.8jt</div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Autonomous Matchmaking Radar & Network Graph</div>
          <div class="radar-canvas">
            <svg width="100%" height="100%" style="position: absolute;">
              <line x1="30%" y1="35%" x2="50%" y2="50%" stroke="#00f5ff30" stroke-width="2" stroke-dasharray="4"/>
              <line x1="70%" y1="30%" x2="50%" y2="50%" stroke="#39ff1440" stroke-width="2"/>
              <line x1="40%" y1="75%" x2="50%" y2="50%" stroke="#00f5ff30" stroke-width="2"/>
              <line x1="65%" y1="70%" x2="50%" y2="50%" stroke="#39ff1440" stroke-width="2" stroke-dasharray="4"/>
            </svg>
            <div class="node" style="left: 49%; top: 48%; background: #39ff14; box-shadow: 0 0 15px #39ff14;"></div>
            <div class="node" style="left: 29%; top: 34%;"></div>
            <div class="node" style="left: 69%; top: 29%; background: #38bdf8;"></div>
            <div class="node" style="left: 39%; top: 74%;"></div>
            <div class="node" style="left: 64%; top: 69%; background: #38bdf8;"></div>
            <div style="position: absolute; left: 50%; top: 54%; transform: translateX(-50%); font-size: 11px; color: #39ff14; font-weight: 700;">AgentFlow AI Hub</div>
            <div style="position: absolute; left: 22%; top: 37%; font-size: 10px; color: #94a3b8;">Buyer: PT Sinar Baja</div>
            <div style="position: absolute; left: 63%; top: 22%; font-size: 10px; color: #94a3b8;">Supplier: CV Mega Logam</div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Autonomous Agent Logs</div>
          <div class="terminal">
            <div class="terminal-line" style="color: #39ff14;">[11:42:01] ⚡ Playwright Scraper: 14 new RFQs discovered on e-procurement</div>
            <div class="terminal-line">[11:42:05] 🔍 OSINT Engine: Verified NPWP & SIUP of 3 supplier candidates</div>
            <div class="terminal-line" style="color: #38bdf8;">[11:42:12] 🤖 Gemini AI: Drafted negotiation letter with 6.5% discount target</div>
            <div class="terminal-line">[11:42:19] 📤 WhatsApp API: Sent tender quote to Purchasing Director</div>
            <div class="terminal-line" style="color: #facc15;">[11:42:25] 🤝 Deal Locked: Margin agreement signed via PDF contract</div>
            <div class="terminal-line" style="color: #39ff14;">[11:42:30] ✔ Bank Escrow: Payment split verified (Rp 14.500.000 komisi masuk)</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(publicDir, 'project_agentflow_makelar.png') });
  console.log('project_agentflow_makelar.png created');

  // 2. AgentFlow Agency ERP Multi-Agent
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
        body { background: #060919; color: #f1f5f9; height: 100vh; display: flex; flex-direction: column; }
        header { background: #0d132b; border-bottom: 1px solid #1e294b; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 18px; font-weight: 800; color: #6366f1; display: flex; align-items: center; gap: 8px; }
        .badge { background: #4f46e5; color: #fff; padding: 2px 8px; border-radius: 12px; font-size: 11px; }
        .layout { display: grid; grid-template-columns: 240px 1fr 320px; flex: 1; min-height: 0; gap: 16px; padding: 16px; }
        .nav-item { padding: 10px 14px; border-radius: 8px; color: #94a3b8; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
        .nav-item.active { background: #4f46e5; color: #fff; }
        .card { background: #0d132b; border: 1px solid #1e294b; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 14px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .kpi { background: #141b3d; padding: 12px; border-radius: 8px; border: 1px solid #232e60; }
        .kpi-num { font-size: 22px; font-weight: 800; color: #00f5ff; }
        .kpi-label { font-size: 11px; color: #94a3b8; margin-top: 2px; }
        .table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .table th { text-align: left; padding: 8px 10px; color: #94a3b8; border-bottom: 1px solid #1e294b; }
        .table td { padding: 10px; border-bottom: 1px solid #141b3d; }
        .status-pill { background: rgba(57, 255, 20, 0.15); color: #39ff14; border: 1px solid #39ff14; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 700; }
        .terminal-box { background: #04060f; border: 1px solid #141b3d; border-radius: 8px; padding: 12px; font-family: 'Consolas', monospace; font-size: 11px; color: #c7d2fe; flex: 1; overflow: hidden; line-height: 1.5; }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">🏢 AgentFlow Agency ERP <span class="badge">8 Divisions</span></div>
        <div style="font-size: 12px; color: #38bdf8;">Multi-Agent System Cluster: Healthy (16 Workers Online)</div>
      </header>
      <div class="layout">
        <div class="card">
          <div style="font-size: 11px; font-weight: 700; color: #6366f1; text-transform: uppercase; margin-bottom: 6px;">Corporate Divisions</div>
          <div class="nav-item active">📊 Executive Command</div>
          <div class="nav-item">👥 Human Resources & BPJS</div>
          <div class="nav-item">💰 Finance & Accounting</div>
          <div class="nav-item">📦 Inventory & Purchasing</div>
          <div class="nav-item">📣 Marketing & Ad Campaigns</div>
          <div class="nav-item">💻 IT & SRE Infrastructure</div>
          <div class="nav-item">🛠️ Customer Operations</div>
        </div>

        <div class="card">
          <div class="grid-4">
            <div class="kpi"><div class="kpi-num">99.8%</div><div class="kpi-label">SLA Auto-Execution</div></div>
            <div class="kpi"><div class="kpi-num">1,420</div><div class="kpi-label">Tasks Processed</div></div>
            <div class="kpi"><div class="kpi-num">Rp 840M</div><div class="kpi-label">Managed Budget</div></div>
            <div class="kpi"><div class="kpi-num">0.02s</div><div class="kpi-label">Agent Latency</div></div>
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #f1f5f9;">Autonomous Division Activities</div>
          <table class="table">
            <thead>
              <tr><th>Division</th><th>Autonomous Agent Task</th><th>Target Artifact</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>HR & Payroll</td><td>Auto-generate BPJS Ketenagakerjaan Slip</td><td>payroll_mar2026.pdf</td><td><span class="status-pill">COMPLETED</span></td></tr>
              <tr><td>Purchasing</td><td>Audit RFQ Vendor Pricing & Stock Level</td><td>vendor_matrix.xlsx</td><td><span class="status-pill">COMPLETED</span></td></tr>
              <tr><td>Finance</td><td>Reconcile Bank Statement vs Ledger</td><td>reconciliation.db</td><td><span class="status-pill">RUNNING</span></td></tr>
              <tr><td>Marketing</td><td>Auto-post Meta & LinkedIn Ads Report</td><td>ads_weekly.json</td><td><span class="status-pill">COMPLETED</span></td></tr>
            </tbody>
          </table>
        </div>

        <div class="card">
          <div style="font-size: 13px; font-weight: 700; color: #f1f5f9;">Division Terminal Simulator</div>
          <div class="terminal-box">
            <div style="color: #818cf8;">[Agent: HR-Payroll] Cron trigger fired at 08:00 WIB</div>
            <div>→ Reading Prisma DB employee attendance records (48 staff)</div>
            <div style="color: #34d399;">✔ Overtime & BPJS calculation formula verified</div>
            <div>→ Generating encrypted payslip PDF with HMAC sha256</div>
            <div style="color: #38bdf8;">→ Dispatching Telegram bot notification to employees</div>
            <div style="color: #34d399;">[OK] 48/48 payslips sent successfully without human intervention.</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(publicDir, 'project_agentflow_erp.png') });
  console.log('project_agentflow_erp.png created');

  // 3. Robot Sakti AI Trading
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
        body { background: #050711; color: #f1f5f9; height: 100vh; display: flex; flex-direction: column; }
        header { background: #0b0f24; border-bottom: 1px solid #1a224a; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 18px; font-weight: 800; color: #f59e0b; display: flex; align-items: center; gap: 8px; }
        .badge { background: #b45309; color: #fff; padding: 2px 8px; border-radius: 12px; font-size: 11px; }
        .layout { display: grid; grid-template-columns: 300px 1fr 300px; flex: 1; min-height: 0; gap: 16px; padding: 16px; }
        .card { background: #0b0f24; border: 1px solid #1a224a; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .kpi-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .kpi { background: #121838; padding: 12px; border-radius: 8px; border: 1px solid #202b5c; }
        .kpi-val { font-size: 20px; font-weight: 800; color: #10b981; }
        .kpi-lbl { font-size: 11px; color: #94a3b8; }
        .chart-mock { background: #080b1a; border: 1px solid #1a224a; border-radius: 10px; flex: 1; position: relative; overflow: hidden; display: flex; flex-direction: column; }
        .chart-header { padding: 10px 14px; border-bottom: 1px solid #1a224a; display: flex; justify-content: space-between; font-size: 12px; color: #cbd5e1; }
        .chart-area { flex: 1; position: relative; }
        .terminal { background: #04060f; border: 1px solid #1a224a; border-radius: 8px; padding: 10px; font-family: 'Consolas', monospace; font-size: 11px; color: #a7f3d0; line-height: 1.5; flex: 1; }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">📈 Robot Sakti AI (MT5 Quant Engine) <span class="badge">XAUUSD / BTCUSD</span></div>
        <div style="font-size: 12px; color: #10b981;">MetaTrader 5 Connected: Latency 14ms (SMC / RL Optimizer)</div>
      </header>
      <div class="layout">
        <div class="card">
          <div style="font-size: 12px; font-weight: 700; color: #f59e0b; text-transform: uppercase;">Performance & Risk Management</div>
          <div class="kpi-row">
            <div class="kpi"><div class="kpi-val">+34.2%</div><div class="kpi-lbl">Monthly Return</div></div>
            <div class="kpi"><div class="kpi-val">1 : 3.8</div><div class="kpi-lbl">Profit Factor</div></div>
          </div>
          <div class="kpi-row">
            <div class="kpi"><div class="kpi-val" style="color: #00f5ff;">78.4%</div><div class="kpi-lbl">Win Rate (SMC)</div></div>
            <div class="kpi"><div class="kpi-val" style="color: #38bdf8;">2.1%</div><div class="kpi-lbl">Max Drawdown</div></div>
          </div>
          <div style="font-size: 12px; font-weight: 700; color: #cbd5e1; margin-top: 6px;">Active Signal State</div>
          <div style="background: #121838; padding: 10px; border-radius: 8px; border: 1px solid #202b5c; font-size: 12px;">
            <div>Asset: <b style="color: #f59e0b;">XAUUSD (Gold)</b></div>
            <div>Strategy: <b style="color: #10b981;">Order Block + FVG Rejection</b></div>
            <div>Action: <b style="color: #10b981;">BUY LIMIT @ 2642.50</b></div>
            <div>SL: 2638.00 | TP: 2658.00</div>
          </div>
        </div>

        <div class="card">
          <div class="chart-mock">
            <div class="chart-header">
              <span>XAUUSD, M15 · O:2642.5 H:2648.2 L:2641.8 C:2647.9</span>
              <span style="color: #10b981;">▲ +$18.40 (+0.72%)</span>
            </div>
            <div class="chart-area">
              <svg width="100%" height="100%" style="position: absolute;">
                <path d="M 40 280 L 120 250 L 200 290 L 280 210 L 360 230 L 440 160 L 520 180 L 600 110 L 680 90" fill="none" stroke="#10b981" stroke-width="2.5"/>
                <rect x="270" y="180" width="100" height="40" fill="rgba(0, 245, 255, 0.15)" stroke="#00f5ff" stroke-width="1" stroke-dasharray="4"/>
                <text x="280" y="205" fill="#00f5ff" font-size="11" font-family="sans-serif">Fair Value Gap (FVG)</text>
              </svg>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="font-size: 12px; font-weight: 700; color: #f59e0b;">AI Veto & NLP Intelligence</div>
          <div class="terminal">
            <div style="color: #f59e0b;">[Oracle] Fed Interest Rate Decision analyzed</div>
            <div>→ Gemini NLP Sentiment Score: Bullish (0.84)</div>
            <div style="color: #10b981;">→ LightGBM Feature Importance: 94.2% Confluence</div>
            <div>→ RL Dynamic Lot Sizing: 0.15 Lots (Risk 1.0%)</div>
            <div style="color: #38bdf8;">→ MetaTrader 5 API: Order #892182 executed instantly</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(publicDir, 'project_robotsakti.png') });
  console.log('project_robotsakti.png created');

  // 4. Job Scraper Bot
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
        body { background: #080d1a; color: #f8fafc; height: 100vh; display: flex; flex-direction: column; }
        header { background: #0f172a; border-bottom: 1px solid #1e293b; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 18px; font-weight: 800; color: #38bdf8; display: flex; align-items: center; gap: 8px; }
        .layout { display: grid; grid-template-columns: 320px 1fr; gap: 16px; padding: 16px; flex: 1; min-height: 0; }
        .card { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .kpi-box { background: #1e293b; padding: 12px; border-radius: 8px; }
        .table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .table th { text-align: left; padding: 10px; color: #94a3b8; border-bottom: 1px solid #334155; }
        .table td { padding: 10px; border-bottom: 1px solid #1e293b; }
        .pill { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid #38bdf8; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 700; }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">🕷️ Job Scraper & Auto-Applier Bot <span style="font-size: 11px; background: #0284c7; color: #fff; padding: 2px 8px; border-radius: 10px;">Python Engine</span></div>
        <div style="font-size: 12px; color: #4ade80;">Active Crawlers: LinkedIn, JobStreet, Indeed, Karir.com</div>
      </header>
      <div class="layout">
        <div class="card">
          <div style="font-size: 13px; font-weight: 700; color: #38bdf8;">Scraping & Dispatch Telemetry</div>
          <div class="kpi-box"><div style="font-size: 22px; font-weight: 800; color: #38bdf8;">1,840</div><div style="font-size: 11px; color: #94a3b8;">Jobs Extracted This Week</div></div>
          <div class="kpi-box"><div style="font-size: 22px; font-weight: 800; color: #4ade80;">98.4%</div><div style="font-size: 11px; color: #94a3b8;">SMTP Email Deliverability</div></div>
          <div class="kpi-box"><div style="font-size: 22px; font-weight: 800; color: #f59e0b;">240</div><div style="font-size: 11px; color: #94a3b8;">Automated Applications Sent</div></div>
        </div>
        <div class="card">
          <div style="font-size: 13px; font-weight: 700;">Live Candidate Lead Database (Export to Excel)</div>
          <table class="table">
            <thead><tr><th>Company</th><th>Job Title</th><th>HR Email</th><th>Salary Range</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>PT Bank Central Asia</td><td>Data Entry & Admin Specialist</td><td>hrd@bca.co.id</td><td>Rp 6.5M - 8.5M</td><td><span class="pill">APPLIED</span></td></tr>
              <tr><td>PT Astra International</td><td>IT Support & Automation Staff</td><td>recruitment@astra.co.id</td><td>Rp 7.0M - 9.0M</td><td><span class="pill">APPLIED</span></td></tr>
              <tr><td>PT Shopee International</td><td>Warehouse Data Analyst</td><td>jobs@shopee.co.id</td><td>Rp 6.0M - 8.0M</td><td><span class="pill">APPLIED</span></td></tr>
              <tr><td>PT Telkom Indonesia</td><td>Junior Python Developer</td><td>career@telkom.co.id</td><td>Rp 8.0M - 11.0M</td><td><span class="pill">APPLIED</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(publicDir, 'project_jobscraper.png') });
  console.log('project_jobscraper.png created');

  // 5. Kicaw Mania (Game Vision & OpenCV)
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
        body { background: #020617; color: #f8fafc; height: 100vh; display: flex; flex-direction: column; }
        header { background: #0f172a; border-bottom: 1px solid #1e293b; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 18px; font-weight: 800; color: #ec4899; display: flex; align-items: center; gap: 8px; }
        .layout { display: grid; grid-template-columns: 1fr 340px; gap: 16px; padding: 16px; flex: 1; min-height: 0; }
        .cam-feed { background: #000; border: 2px solid #ec4899; border-radius: 12px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .hud-stat { position: absolute; top: 16px; left: 16px; background: rgba(0,0,0,0.7); padding: 8px 14px; border-radius: 8px; border: 1px solid #ec4899; font-size: 13px; color: #ec4899; font-weight: 700; }
        .hud-fps { position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.7); padding: 8px 14px; border-radius: 8px; border: 1px solid #39ff14; font-size: 13px; color: #39ff14; font-weight: 700; }
        .card { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">🐦 Kicaw Mania (OpenCV & MediaPipe Game Vision)</div>
        <div style="font-size: 12px; color: #ec4899;">Real-Time Hand & Face Mesh Tracking (30 FPS)</div>
      </header>
      <div class="layout">
        <div class="cam-feed">
          <div class="hud-stat">SCORE: 1,450 🎯</div>
          <div class="hud-fps">60.0 FPS · Latency: 8ms</div>
          <svg width="100%" height="100%" style="position: absolute;">
            <ellipse cx="50%" cy="45%" rx="100" ry="130" fill="none" stroke="#00f5ff" stroke-width="1.5" stroke-dasharray="3"/>
            <circle cx="50%" cy="48%" r="18" fill="rgba(236, 72, 153, 0.4)" stroke="#ec4899" stroke-width="2"/>
            <circle cx="51%" cy="47%" r="12" fill="#39ff14" stroke="#fff" stroke-width="2"/>
            <circle cx="46%" cy="42%" r="4" fill="#f59e0b"/>
            <circle cx="55%" cy="40%" r="5" fill="#00f5ff"/>
            <circle cx="53%" cy="53%" r="4" fill="#ec4899"/>
            <circle cx="45%" cy="52%" r="6" fill="#39ff14"/>
          </svg>
          <div style="position: absolute; bottom: 20px; font-size: 14px; font-weight: 700; color: #39ff14; background: rgba(0,0,0,0.8); padding: 6px 16px; border-radius: 20px; border: 1px solid #39ff14;">
            ⚡ NOSE TOUCH DETECTED (+100 PTS)
          </div>
        </div>
        <div class="card">
          <div style="font-size: 13px; font-weight: 700; color: #ec4899;">Computer Vision Telemetry</div>
          <div style="background: #1e293b; padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: #94a3b8;">MediaPipe Landmarks</div>
            <div style="font-size: 18px; font-weight: 700; color: #00f5ff;">468 Face + 21 Hand</div>
          </div>
          <div style="background: #1e293b; padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: #94a3b8;">Collision Engine</div>
            <div style="font-size: 18px; font-weight: 700; color: #39ff14;">Euclidean Distance &lt; 25px</div>
          </div>
          <div style="background: #1e293b; padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: #94a3b8;">Physical Particle System</div>
            <div style="font-size: 18px; font-weight: 700; color: #f59e0b;">Gravity + Alpha Fade</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(publicDir, 'project_kicawmania.png') });
  console.log('project_kicawmania.png created');

  await browser.close();
  console.log('ALL PREVIEWS GENERATED SUCCESSFULLY');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
