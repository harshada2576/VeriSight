VeriSight Prototype
===================

Quick prototype for a hackathon: FastAPI + SQLite + local filesystem for uploads and evidence.

How to run (Debian):
1. sudo apt update && sudo apt install -y python3-pip python3-venv ffmpeg
2. python3 -m venv .venv
3. source .venv/bin/activate
4. pip install -r requirements.txt
5. uvicorn app:app --reload --port 8000

Upload a video:
curl -F "file=@/path/to/video.mp4" http://127.0.0.1:8000/upload

Preview/Artifacts:
Open http://127.0.0.1:8000/storage/jobs/{job_id}/preview.mp4 or frames directory.
