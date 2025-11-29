# VeriSight — Agentic AI Fake Video Detection (Monorepo)

A prototype full-stack system for automated deepfake detection, evidence packaging and cryptographic verification. This repository contains a FastAPI backend and a React + Vite frontend. The README below is intentionally comprehensive and includes placeholders for screenshots and a Google Drive demo video.

---

Table of contents
- Title and Description
- Badges
- Logo
- Quick TL;DR
- Features
- Demo (GDrive video placeholder)
- Screenshots (placeholders)
- Installation
- Run Locally (Backend & Frontend)
- Environment Variables
- Configuration & Proxy
- Architecture & Tech Stack (diagram + pyramid)
- Usage / Examples
- API Reference (links to key endpoints & modules)
- How It Works (high-level pipeline)
- Preprocessing & Detector (code links)
- Verification pack & cryptography
- Evidence viewers (frontend)
- Running Tests
- Deployment
- Roadmap
- Contributing
- License
- Authors
- Acknowledgements
- FAQ
- Support / Contact
- Related
- Appendix / Troubleshooting
- Changelog
- Optimizations / Lessons Learned
- Used By / Integrations
- Custom Sections / Notes

---

Title and Description
VeriSight — Autonomous AI pipeline to detect manipulated videos and generate tamper‑proof verification packs (cryptographically signed evidence). See the frontend UI at [verisight-frontend/src/pages/public/Home.jsx](verisight-frontend/src/pages/public/Home.jsx).

Badges
- Build / CI: (add your CI badge here)
- PyPI / NPM (if published)
- License: Proprietary (update as needed)

Logo
(Place your SVG/PNG logo here)

Quick TL;DR
- Backend: FastAPI prototype — [backend/app.py](backend/app.py) and [backend/app2.py](backend/app2.py)
- Frontend: React + Vite — [verisight-frontend](verisight-frontend/README.md)
- Local storage for artifacts served at /storage (see [backend/app.py](backend/app.py))
- Detector core: [`analyze_video`](backend/src/ai_video_detector.py)

Features
- Multimodal detection (visual, audio, temporal)
- Frame extraction, preview generation, optical flow and SSIM/MSE analytics
- Cryptographic verification pack generation and PDF/JSON export
- Human review panel + evidence viewers (frames, heatmaps, audio spectrograms)
- Upload by file or URL with progress

Demo (Google Drive Video)
- Demo video (placeholder): [INSERT GOOGLE DRIVE VIDEO LINK HERE]
- Leave this link blank until you have the exported demo clip uploaded to GDrive.

Screenshots
- Screenshot 1: (placeholder) ![Screenshot 1](docs/screenshots/screen1.png)
- Screenshot 2: (placeholder) ![Screenshot 2](docs/screenshots/screen2.png)
- (Add more screenshots under docs/screenshots/)

Installation (Frontend & Backend)
- Backend quick-start: See [backend/README.md](backend/README.md)
  - Example (Debian):
    1. sudo apt update && sudo apt install -y python3-pip python3-venv ffmpeg
    2. python3 -m venv .venv
    3. source .venv/bin/activate
    4. pip install -r backend/requirements.txt
    5. uvicorn backend.app:app --reload --port 8000
- Frontend quick-start: See [verisight-frontend/README.md](verisight-frontend/README.md)
  - Example:
    npm install
    npm run dev

Run Locally
- Backend:
  - Start database and migrations (see [backend/src/db.py](backend/src/db.py))
  - Launch server: `uvicorn backend.app:app --reload --port 8000`
  - Static artifacts are served at /storage (see [backend/app.py](backend/app.py))
- Frontend:
  - Set VITE_API_BASE_URL in [verisight-frontend/.env.example](verisight-frontend/.env.example)
  - Run: `npm run dev` (Vite dev server proxies /api to backend per [verisight-frontend/vite.config.js](verisight-frontend/vite.config.js))

Environment Variables
- Frontend: VITE_API_BASE_URL — defined in [verisight-frontend/.env.example](verisight-frontend/.env.example)
- Backend: See [backend/config.py](backend/config.py) (UPLOAD_DIR and other runtime config)

Configuration & Proxy
- Vite dev proxy to backend: [verisight-frontend/vite.config.js](verisight-frontend/vite.config.js)

Architecture & Tech Stack

High-level stack (pyramid / layered):
- Top (Applications & UI)
  - React + Vite (UI), role: evidence viewers, upload, review (see [verisight-frontend/src/pages/](verisight-frontend/src/pages/))
- Middle (API & Business Logic)
  - FastAPI routers: [backend/src/routes_upload.py](backend/src/routes_upload.py), [backend/src/routes_jobs.py](backend/src/routes_jobs.py), [backend/src/routes_analysis.py](backend/src/routes_analysis.py)
- Base (Processing & Storage)
  - FFmpeg for preprocessing: [`ffprobe_metadata`, `extract_frames`, `make_preview_clip`](backend/src/utils_ffmpeg.py)
  - Detector: [`analyze_video`](backend/src/ai_video_detector.py)
  - SQLite / local file storage: [backend/src/db.py](backend/src/db.py)

Pyramid diagram (ASCII)
   /-----------------------\
  /  UI (React + Vite)     \
 /-------------------------\
|  API Layer (FastAPI)     |
|  Routers: auth, upload,  |
|  jobs, analysis          |
 \-------------------------/
  \  Worker / Proc / FFmpeg /
   \-----------------------/

Component links and key symbols
- Detector: [`analyze_video`](backend/src/ai_video_detector.py)
- Background job: [`process_job_background`](backend/src/services_preprocess.py)
- FFmpeg helpers: [`ffprobe_metadata`](backend/src/utils_ffmpeg.py), [`extract_frames`](backend/src/utils_ffmpeg.py), [`make_preview_clip`](backend/src/utils_ffmpeg.py)
- Frontend ingest: [verisight-frontend/src/api/ingest.js](verisight-frontend/src/api/ingest.js) — `ingestAPI.uploadVideo` and `ingestAPI.submitVideoURL`
- Verification API: [verisight-frontend/src/api/verification.js](verisight-frontend/src/api/verification.js) — [`verificationAPI`](verisight-frontend/src/api/verification.js)
- Verification UI: [verisight-frontend/src/pages/app/VerificationPack.jsx](verisight-frontend/src/pages/app/VerificationPack.jsx)
- Evidence pages: [verisight-frontend/src/pages/app/Evidence.jsx](verisight-frontend/src/pages/app/Evidence.jsx)
- Frame grid: [verisight-frontend/src/components/evidence/FrameGrid.jsx](verisight-frontend/src/components/evidence/FrameGrid.jsx)
- Heatmap viewer: [verisight-frontend/src/components/evidence/HeatmapViewer.jsx](verisight-frontend/src/components/evidence/HeatmapViewer.jsx)

Usage / Examples
- Upload a file via frontend Upload page: [verisight-frontend/src/pages/app/Upload.jsx](verisight-frontend/src/pages/app/Upload.jsx)
- CLI upload (backend endpoint) — use curl per [backend/README.md](backend/README.md):
  curl -F "file=@/path/to/video.mp4" http://127.0.0.1:8000/upload

API Reference (select)
- Auth routes: [backend/src/routes_auth.py](backend/src/routes_auth.py)
- Upload route(s): [backend/src/routes_upload.py](backend/src/routes_upload.py)
- Jobs/CRUD: [backend/src/routes_jobs.py](backend/src/routes_jobs.py)
- Analysis runner: [backend/src/routes_analysis.py](backend/src/routes_analysis.py) — uses [`analyze_video`](backend/src/ai_video_detector.py)

How It Works (high-level pipeline)
1. Upload (file or URL): frontend sends file to backend ingest endpoints (see [verisight-frontend/src/api/ingest.js](verisight-frontend/src/api/ingest.js))
2. Preprocess: FFmpeg metadata + frame extraction + preview creation (see [backend/src/utils_ffmpeg.py](backend/src/utils_ffmpeg.py))
3. Detector: compute MSE, SSIM, optical flow, robust z-scores and voting to identify suspicious frames (`analyze_video` in [backend/src/ai_video_detector.py](backend/src/ai_video_detector.py))
4. Evidence: frames, heatmaps, spectrograms saved under job storage and served at /storage
5. Verification package: Generate JSON+signature and optional PDF export via verification API/front-end (see [verisight-frontend/src/api/verification.js](verisight-frontend/src/api/verification.js) and [verisight-frontend/src/pages/app/VerificationPack.jsx](verisight-frontend/src/pages/app/VerificationPack.jsx))
6. Human review: review queue and reviewer UI (see [verisight-frontend/src/pages/app/ReviewJob.jsx](verisight-frontend/src/pages/app/ReviewJob.jsx) and [verisight-frontend/src/components/review/ReviewerActions.jsx](verisight-frontend/src/components/review/ReviewerActions.jsx))

Preprocessing & Detector (implementation pointers)
- Core analyze logic: [`analyze_video`](backend/src/ai_video_detector.py)
- Optical flow mean: [`compute_optical_flow_mean`](backend/src/ai_video_detector.py)
- Robust outlier detection: [`robust_zscores`](backend/src/ai_video_detector.py)
- Background processing entry: [`process_job_background`](backend/src/services_preprocess.py)

Verification pack & cryptography
- Frontend interacts with the verification endpoints via [`verificationAPI`](verisight-frontend/src/api/verification.js)
- UI for pack: [verisight-frontend/src/pages/app/VerificationPack.jsx](verisight-frontend/src/pages/app/VerificationPack.jsx)
- Signature display: [verisight-frontend/src/components/verification/SignatureBlock.jsx](verisight-frontend/src/components/verification/SignatureBlock.jsx)

Evidence viewers (frontend)
- Frame thumbnails: [verisight-frontend/src/components/evidence/FrameGrid.jsx](verisight-frontend/src/components/evidence/FrameGrid.jsx)
- Heatmaps: [verisight-frontend/src/components/evidence/HeatmapPreview.jsx](verisight-frontend/src/components/evidence/HeatmapPreview.jsx), [verisight-frontend/src/components/evidence/HeatmapViewer.jsx](verisight-frontend/src/components/evidence/HeatmapViewer.jsx)
- Spectrogram/player: [verisight-frontend/src/components/evidence/SpectrogramPlayer.jsx] (search in src/components/evidence)

Running Tests
- Frontend: `npm run lint` per [verisight-frontend/README.md](verisight-frontend/README.md)
- Backend: add pytest/coverage as needed (not scaffolded in prototype; add CI to run unit tests)

Deployment
- Production backend: run with uvicorn/gunicorn behind a reverse proxy; ensure FFmpeg and required system libs installed.
- Static artifacts: use the /storage mount (see [backend/app.py](backend/app.py))
- Frontend: build with `npm run build` and serve via static host or integrated with backend.

Roadmap
- Improve detector models (replace heuristics with trainable models)
- Add scalable worker (Celery / RQ) and S3/Blob storage support
- Harden cryptographic audit trail (time-stamping, blockchain anchor)
- Add enterprise features: multi-tenant, SSO, role-based access

Contributing
- See CONTRIBUTING.md (add as needed)
- Ensure code style and linting for frontend (ESLint) and backend (black / flake8)

License
- Current repo marked Proprietary in frontend README. Update license file if changing. See [verisight-frontend/README.md](verisight-frontend/README.md).

Authors
- Project lead / team (fill in names and contacts)

Acknowledgements
- FFmpeg, OpenCV, scikit-image, FastAPI, Vite, React

FAQ
Q: What formats are supported?
A: See upload UI and [verisight-frontend/src/components/upload/UploadWidget.jsx](verisight-frontend/src/components/upload/UploadWidget.jsx) — common video formats (MP4, MOV, AVI, WebM)

Q: Where are uploaded files stored?
A: Local UPLOAD_DIR configured in [backend/config.py](backend/config.py); served at /storage from [backend/app.py](backend/app.py)

Support / Contact
- privacy@verisight.ai (placeholder in frontend cookie page: [verisight-frontend/src/pages/public/Cookie.jsx](verisight-frontend/src/pages/public/Cookie.jsx))

Related
- Add external research links, baseline papers and libs

Appendix / Troubleshooting
- FFmpeg errors: ensure ffmpeg installed and available in PATH
- If preview generation fails: check [backend/src/utils_ffmpeg.py](backend/src/utils_ffmpeg.py)

Changelog
- Maintain HISTORY.md or CHANGELOG.md

Optimizations / Lessons Learned
- Use downscaled grayscale frames for fast temporal analysis (see [`resize_gray`](backend/src/ai_video_detector.py))
- Combine multiple metrics (MSE, SSIM, optical flow) and robust z-scoring for anomaly voting

Used By / Integrations
- Placeholder: list customers or integrations (Stripe, Cloudflare) mentioned in cookie/privacy pages

Custom Sections
- Add any project-specific sections from the visual editor (Contributing, Deployment, Run Locally, Screenshots, Tech, Running Tests, Usage/Examples, Used By, etc.)

Files & Entry Points (links)
- Frontend README: [verisight-frontend/README.md](verisight-frontend/README.md)
- Frontend vite config: [verisight-frontend/vite.config.js](verisight-frontend/vite.config.js)
- Frontend ingest API: [verisight-frontend/src/api/ingest.js](verisight-frontend/src/api/ingest.js)
- Frontend verification API: [verisight-frontend/src/api/verification.js](verisight-frontend/src/api/verification.js)
- Verification UI: [verisight-frontend/src/pages/app/VerificationPack.jsx](verisight-frontend/src/pages/app/VerificationPack.jsx)
- Evidence page: [verisight-frontend/src/pages/app/Evidence.jsx](verisight-frontend/src/pages/app/Evidence.jsx)
- Upload UI: [verisight-frontend/src/pages/app/Upload.jsx](verisight-frontend/src/pages/app/Upload.jsx)
- Backend app(s): [backend/app.py](backend/app.py), [backend/app2.py](backend/app2.py)
- Detector: [backend/src/ai_video_detector.py](backend/src/ai_video_detector.py) — see [`analyze_video`](backend/src/ai_video_detector.py)
- Preprocess service: [backend/src/services_preprocess.py](backend/src/services_preprocess.py)
- FFmpeg helpers: [backend/src/utils_ffmpeg.py](backend/src/utils_ffmpeg.py)
- Backend README: [backend/README.md](backend/README.md)
- Frontend .gitignore (active file): [verisight-frontend/.gitignore](verisight-frontend/.gitignore)

Screenshots & Media (placeholders)
- Add images to docs/screenshots/
- Demo video placeholder:
  - Title: VeriSight Demo
  - GDrive link: [INSERT GDRIVE LINK HERE]

Contact & Support
- For issues, open GitHub issues or contact the maintainers listed in AUTHORS or project settings.

---

If you'd like, I can:
- Generate a ready-to-commit README.md file with the sections filled and placeholders replaced by your inputs (screenshots, logo, demo link).
- Create a lightweight CONTRIBUTING.md and ISSUE_TEMPLATE.
- Add a docs/ directory scaffold with screenshot placeholders.
