# @nalardigital — Autonomous AI Agent Harness & 3D Cartoon Engine

> **Engineering AI Mindset:** Upgrade Cara Berpikir Sebelum Diganti Mesin.  
> Membangun sistem AI autonomous yang menguji dan memverifikasi kodenya sendiri, bukan sekadar chatbot pasif yang copy-paste kode.

---

## 🎬 Tentang Proyek Ini

Proyek ini adalah source code resmi dari serial video edukasi teknis **@nalardigital** (Episode 01: *Autonomous AI Agent Harness: Stop Jadi Kurir Copy-Paste AI*).

Dibuat menggunakan arsitektur **100% Code & AI Generated**:
- **3D Cartoon World Engine**: Three.js + WebGL shader (Ink outline passes, procedural two-tone shading, thin-lens depth of field blur, and canvas-rendered billboard bean-head characters).
- **Video Orchestration**: Remotion (React-based programmatic video rendering at 1080x1920 @ 30fps).
- **Autonomous Harness**: Protokol pengujian otomatis berbasis `node --test` dan pedoman instruksi ketat (`AGENTS.md` - Karpathy 3-Rule Protocol).

---

## 📐 Arsitektur: Chatbot Pasif vs Autonomous Harness

```
[ Pendekatan Pemula (Chatbot Pasif) ]
User Prompt ──> Chatbot LLM ──> Generate Code ──> User Copy-Paste ──> Error di Production

[ Pendekatan Engineer Pro (Autonomous Harness) ]
User Goal ──> AI Agent ──> Write Code ──> Run Local Test (node --test)
                              ▲                   │
                              └── FAIL: Auto Fix ─┘
                                  │
                                  └── PASS ──> Git Commit & Push
```

---

## 📜 Karpathy 3-Rule Protocol (`AGENTS.md`)

Setiap AI agent yang bekerja di codebase wajib mematuhi 3 aturan mutlak:
1. **Think First**: Selidiki file pengujian (`test/`) dan akar masalah sebelum menyentuh file implementasi (`src/`).
2. **Minimal Surgical Edit**: Hanya edit baris kode yang menyebabkan bug. Dilarang refactor tak beralasan.
3. **Verify Before Finish**: Wajib jalankan verifikasi lokal (`npm test`). Tugas HANYA berstatus selesai jika seluruh test sudah `PASS`.

---

## 🛠️ Quick Start & Menjalankan Proyek

### 1. Prasyarat
- Node.js v20+ atau v24+
- GPU dengan akselerasi WebGL / DirectX (Windows: `--gl=angle`)

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Preview Remotion Studio (Interaktif)
```bash
npm start
```
Buka `http://localhost:3000` di browser untuk mempratinjau animasi frame-by-frame.

### 4. Render Video Final (MP4 1080x1920)
```bash
npx remotion render src/index.ts NalarDigital01 out/nalardigital_video_01.mp4 --codec h264 --crf 16
```

---

## 📦 Struktur Direktori

```
Animation/
├── demo_kit/                  # Mini demo kit live test & bugfix
│   ├── src/checkout.js        # Logic e-commerce dengan intentional bug
│   ├── test/checkout.test.js  # Node native test runner (fails on uncapped discount)
│   ├── AGENTS.md              # 3 aturan wajib AI Agent (Karpathy Protocol)
│   └── package.json           # npm test script
├── src/
│   ├── 3d/                    # Procedural Three.js 3D toon world & character generator
│   │   ├── Bridge.tsx         # Remotion ThreeCanvas composition with Ink & DOF passes
│   │   ├── toon.ts            # Canvas2D Pen drawing engine (bean-heads, limbs, outfits)
│   │   ├── world.ts           # Sky, fog, lighting, and procedural terrain
│   │   ├── ink.ts             # Post-processing edge-detection ink outline shader
│   │   └── lensblur.ts        # Physically-based bokeh & depth of field
│   ├── scenes/
│   │   ├── SceneConcept.tsx   # Act 1: Hook, typography & comparison cards
│   │   ├── SyntheticTerminalIDE.tsx # Act 2: Terminal simulation & auto-fixing loop
│   │   └── SceneOutro.tsx     # Act 3: Golden outro, branding & CTA
│   ├── Root.tsx               # Remotion root configuration
│   └── index.ts               # Video entrypoint
├── public/
│   └── voice_over_90s.mp3     # Neural TTS audio narration (90s)
└── remotion.config.ts         # Chromium WebGL engine settings
```

---

## 👤 Author
- Brand: **@nalardigital**
- Engineer: **Axlytic (Ehan)**
- Lisensi: MIT
