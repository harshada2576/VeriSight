---

## 🚀 **VeriSight — Agentic AI Fake Video Detection **

A prototype full-stack system for **deepfake detection, evidence packaging, and cryptographic verification**.
This monorepo contains a **FastAPI backend** and a **React + Vite frontend**, integrated as an autonomous analysis and review pipeline.

---

## 📚 **Table of Contents**

* Overview
* Badges
* Logo
* Quick TL;DR
* Key Features
* Demo
* Installation
* Run Locally
* Environment Variables
* Configuration & Proxy
* Architecture & Tech Stack
* Usage / Examples
* API Reference
* How It Works (Pipeline)
* Preprocessing & Detector
* Verification Pack & Cryptography
* Evidence Viewers
* Testing
* Deployment
* Roadmap
* Contributing
* License
* Authors
* Acknowledgements
* FAQ
* Support / Contact
* Related
* Troubleshooting
* Changelog
* Optimizations / Lessons Learned
* Used By / Integrations
* Custom Sections

---

## 🧾 **Overview**

**VeriSight** is an **autonomous AI pipeline** designed to detect manipulated or AI-generated videos and generate **tamper-proof verification packs** signed cryptographically.
Frontend UI reference: `verisight-frontend/src/pages/public/Home.jsx`

---

## 🏷 **Badges**

| Build                  | License     | Release                 |
| ---------------------- | ----------- | ----------------------- |
| (CI Badge placeholder) | Proprietary | PyPI/NPM (if published) |

---

## 🔰 **Logo**

*Replace with project logo*

```
[logo](https://github.com/user-attachments/assets/7fb2a0a7-2eac-460c-8fec-ec23138be1a8)

```

---

## ⚡ **Quick TL;DR**

| Component             | Path                                                    |
| --------------------- | ------------------------------------------------------- |
| FastAPI backend       | `backend/app.py` & `backend/app2.py`                    |
| React + Vite frontend | `/verisight-frontend`                                   |
| Local storage mount   | `/storage` in `backend/app.py`                          |
| Detector core         | `analyze_video()` in `backend/src/ai_video_detector.py` |

---

## ✨ **Key Features**

* Multimodal video analysis (visual, audio, temporal)
* Frame extraction & optical-flow-based analytics
* SSIM/MSE anomaly scoring + robust z-score voting
* Cryptographically signed **verification pack**
* Evidence review UI: frames, heatmaps, spectrograms
* Upload via file or URL with progress tracking

---

## 🎥 **Demo**

📁 Google Drive Demo Video (placeholder)

> **Link:** *INSERT HERE*

---

## 🛠 **Installation**

### Backend

See `backend/README.md`

```bash
sudo apt update && sudo apt install -y python3-pip python3-venv ffmpeg
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app:app --reload --port 8000
```

### Frontend

```bash
npm install
npm run dev
```

---

## ▶ **Run Locally**

### Backend

```bash
uvicorn backend.app:app --reload --port 8000
```

Artifacts available via `/storage`

### Frontend

```bash
npm run dev
```

Requires `VITE_API_BASE_URL` configured in `.env.example`

---

## 🔐 **Environment Variables**

| Key                 | Location                          |
| ------------------- | --------------------------------- |
| `VITE_API_BASE_URL` | `verisight-frontend/.env.example` |
| Backend config      | `backend/config.py`               |

---

## 🏗 **Architecture & Tech Stack**

```
   /-----------------------\
  /  UI (React + Vite)     \
 /-------------------------\
|  API Layer (FastAPI)     |
| Routers: auth, upload,   |
| jobs, analysis           |
 \-------------------------/
  \ Worker / FFmpeg / Proc /
   \-----------------------/
```

### Processing Stack

| System        | Tooling                                        |
| ------------- | ---------------------------------------------- |
| Preprocessing | FFmpeg (`extract_frames`, `make_preview_clip`) |
| Detector      | `analyze_video`, optical flow, SSIM/MSE        |
| Storage       | SQLite + local filesystem                      |

---

## 🧪 **Usage / Examples**

### Upload via CLI

```bash
curl -F "file=@/path/to/video.mp4" http://127.0.0.1:8000/upload
```

---

## 🔑 **API Reference**

| Area     | File                             |
| -------- | -------------------------------- |
| Upload   | `backend/src/routes_upload.py`   |
| Analysis | `backend/src/routes_analysis.py` |
| Jobs     | `backend/src/routes_jobs.py`     |
| Auth     | `backend/src/routes_auth.py`     |

---

## 🧠 **How It Works — Pipeline**

1. Upload video (file/URL)
2. FFmpeg preprocessing (`utils_ffmpeg.py`)
3. Multimetric detector (`ai_video_detector.py`)
4. Evidence generation & previews
5. JSON/PDF cryptographic verification pack
6. Human review UI

---

## 🧾 **Verification Pack & Cryptography**

Frontend UI: `VerificationPack.jsx`
Signature block component: `SignatureBlock.jsx`

---

## 🔎 **Evidence Viewers**

| Viewer       | File                    |
| ------------ | ----------------------- |
| Frames       | `FrameGrid.jsx`         |
| Heatmaps     | `HeatmapViewer.jsx`     |
| Spectrograms | `SpectrogramPlayer.jsx` |

---

## 📦 **Deployment**

* `npm run build` for frontend
* Serve backend with `gunicorn + uvicorn`
* Ensure `ffmpeg` installed on host

---

## 🛣 **Roadmap**

* ML-based detector replacing heuristics
* Celery/RQ workers + S3 storage
* Blockchain anchor for audit logs
* Enterprise SSO & roles

---

## 💼 **Contributing**

* ESLint + Prettier + Black/flake8 recommended
* Add PR templates and CI testing

---

## 📜 **License**

**Proprietary** — modify as required

---

## 👥 **Authors**

*Add contributors list here*

---

## 🙏 **Acknowledgements**

FFmpeg • OpenCV • scikit-image • FastAPI • React • Vite

---

## ❓ **FAQ**

| Question                | Answer                         |
| ----------------------- | ------------------------------ |
| Supported formats?      | MP4, MOV, AVI, WebM            |
| Where are files stored? | Local UPLOAD_DIR (`config.py`) |

---

## 🆘 **Support / Contact**

`privacy@verisight.ai` *(placeholder)*

---

## 🔧 **Troubleshooting**

* FFmpeg errors → ensure installed & in PATH
* Preview fails → review `utils_ffmpeg.py`

---

## 🧠 **Optimizations / Lessons Learned**

* Downscaled grayscale frames improve temporal anomaly precision
* Fusion of MSE/SSIM/flow metrics yields stable detection

---

## 🧩 **Used By / Integrations**

* Coming Soon (Cloudflare / Stripe etc.)

---

## 📌 **Custom Sections**

Add brand-specific or hackathon-specific notes here

---

### 🌟 Done!


