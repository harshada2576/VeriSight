# main.py
import os
import shutil
import uuid
import subprocess
import json
import time
from datetime import datetime, timedelta
from typing import Optional, List

from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException, Depends
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import jwt
import sqlite3
import aiofiles

# ---------- CONFIG ----------
SECRET_KEY = "dev-secret-change-me"
JWT_ALG = "HS256"
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
VIDEOS_DIR = os.path.join(DATA_DIR, "videos")
ARTIFACTS_DIR = os.path.join(DATA_DIR, "artifacts")
DB_PATH = os.path.join(DATA_DIR, "verisight.db")

os.makedirs(VIDEOS_DIR, exist_ok=True)
os.makedirs(ARTIFACTS_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

# ---------- DB (tiny sqlite helper) ----------
def init_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    );
    """)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        filename TEXT,
        status TEXT,
        created_at TEXT,
        updated_at TEXT,
        metadata TEXT,
        result TEXT
    );
    """)
    conn.commit()
    return conn

DB = init_db()

# ---------- Pydantic models ----------
class RegisterReq(BaseModel):
    username: str
    password: str

class LoginReq(BaseModel):
    username: str
    password: str

class JobCreateResp(BaseModel):
    id: str
    status: str

class JobSummary(BaseModel):
    id: str
    filename: str
    status: str
    created_at: str
    updated_at: str
    metadata: Optional[dict]
    result: Optional[dict]

# ---------- Auth helpers ----------
def create_token(username: str):
    payload = {
        "sub": username,
        "exp": datetime.utcnow() + timedelta(hours=8)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=JWT_ALG)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALG])
        return payload.get("sub")
    except jwt.PyJWTError:
        return None

def get_current_user(token: Optional[str] = None):
    if not token:
        raise HTTPException(status_code=401, detail="Missing token (use ?token=...)")
    user = verify_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

# ---------- App ----------
app = FastAPI(title="VeriSight - Minimal Backend (Hackathon)")

# serve artifacts statically for frontend convenience
app.mount("/artifacts", StaticFiles(directory=ARTIFACTS_DIR), name="artifacts")

# ---------- Auth routes ----------
@app.post("/auth/register")
def register(req: RegisterReq):
    cur = DB.cursor()
    try:
        cur.execute("INSERT INTO users (username, password) VALUES (?, ?)", (req.username, req.password))
        DB.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username exists")
    token = create_token(req.username)
    return {"token": token}

@app.post("/auth/login")
def login(req: LoginReq):
    cur = DB.cursor()
    cur.execute("SELECT password FROM users WHERE username = ?", (req.username,))
    row = cur.fetchone()
    if not row or row[0] != req.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": create_token(req.username)}

# ---------- Presign stub (returns a simple upload id) ----------
@app.post("/jobs/presign")
def presign(filename: str, token: Optional[str] = None):
    # In real system return S3 presigned URL. Here return an upload id + recommended path.
    uid = str(uuid.uuid4())
    upload_path = f"/upload/{uid}/{filename}"
    return {"upload_id": uid, "upload_path": upload_path, "note": "This is a stub presign; use /ingest to upload file."}

# ---------- Ingest (upload) ----------
@app.post("/ingest", response_model=JobCreateResp)
async def ingest(file: UploadFile = File(...), bg: BackgroundTasks = None, token: Optional[str] = None):
    # token optional for hackathon; you can require get_current_user(token) to enforce auth
    # Save file
    job_id = str(uuid.uuid4())
    filename = f"{job_id}.mp4"
    video_path = os.path.join(VIDEOS_DIR, filename)
    async with aiofiles.open(video_path, 'wb') as out:
        content = await file.read()
        await out.write(content)

    now = datetime.utcnow().isoformat()
    cur = DB.cursor()
    cur.execute("INSERT INTO jobs (id, filename, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
                (job_id, filename, "created", now, now))
    DB.commit()

    # enqueue background processing
    if bg:
        bg.add_task(worker_process_job, job_id, filename)
    else:
        # synchronous fallback (not recommended)
        worker_process_job(job_id, filename)

    return {"id": job_id, "status": "created"}

# ---------- Job processing worker (simple, does preprocessing + fake inference) ----------
def write_job_metadata(job_id: str, metadata: dict):
    cur = DB.cursor()
    cur.execute("UPDATE jobs SET metadata = ?, updated_at = ? WHERE id = ?", (json.dumps(metadata), datetime.utcnow().isoformat(), job_id))
    DB.commit()

def write_job_result(job_id: str, result: dict, status: str = "completed"):
    cur = DB.cursor()
    cur.execute("UPDATE jobs SET result = ?, status = ?, updated_at = ? WHERE id = ?",
                (json.dumps(result), status, datetime.utcnow().isoformat(), job_id))
    DB.commit()

def set_job_status(job_id: str, status: str):
    cur = DB.cursor()
    cur.execute("UPDATE jobs SET status = ?, updated_at = ? WHERE id = ?", (status, datetime.utcnow().isoformat(), job_id))
    DB.commit()

def worker_process_job(job_id: str, filename: str):
    """
    Steps:
      - set job queued -> preprocessing
      - run ffmpeg extracts: 1fps frames, audio wav (16k mono), thumbnail preview
      - collect basic metadata: duration, fps via ffprobe
      - run a tiny "fake" inference (we'll compute simple heuristics)
      - write result JSON
    """
    set_job_status(job_id, "queued")
    time.sleep(0.2)
    set_job_status(job_id, "preprocessing")

    vid_path = os.path.join(VIDEOS_DIR, filename)
    job_art_dir = os.path.join(ARTIFACTS_DIR, job_id)
    frames_dir = os.path.join(job_art_dir, "frames")
    os.makedirs(frames_dir, exist_ok=True)

    # extract 1fps frames
    frame_pattern = os.path.join(frames_dir, "frame_%04d.jpg")
    try:
        subprocess.run(["ffmpeg", "-y", "-i", vid_path, "-vf", "fps=1", frame_pattern], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        set_job_status(job_id, "error")
        write_job_result(job_id, {"error": "ffmpeg frames failed", "detail": str(e)})
        return

    # extract audio
    audio_path = os.path.join(job_art_dir, "audio.wav")
    try:
        subprocess.run(["ffmpeg", "-y", "-i", vid_path, "-vn", "-ar", "16000", "-ac", "1", audio_path], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        set_job_status(job_id, "error")
        write_job_result(job_id, {"error": "ffmpeg audio failed", "detail": str(e)})
        return

    # quick metadata with ffprobe
    metadata = {"frames_extracted": len(os.listdir(frames_dir))}
    # optional: use ffprobe for more fields
    write_job_metadata(job_id, metadata)

    set_job_status(job_id, "inference")
    # --- Fake inference: file heuristics for demo ---
    #  - visual_score: variance in file sizes of frames (very naive)
    #  - audio_score: size of audio wav
    try:
        frame_files = sorted([os.path.join(frames_dir, f) for f in os.listdir(frames_dir) if f.endswith(".jpg")])
        sizes = [os.path.getsize(p) for p in frame_files] or [0]
        import statistics
        visual_score = statistics.pstdev(sizes) if len(sizes) > 1 else 0.0
        audio_score = os.path.getsize(audio_path)
        # simple normalization
        combined = (visual_score / (max(sizes) + 1)) * 0.7 + (min(audio_score, 1000000) / 1000000) * 0.3
        result = {
            "visual_score": float(visual_score),
            "audio_score": int(audio_score),
            "combined_score": float(combined),
            "top_frames": [os.path.basename(p) for p in frame_files[:4]]
        }
    except Exception as e:
        set_job_status(job_id, "error")
        write_job_result(job_id, {"error": "inference failed", "detail": str(e)})
        return

    # write result and finish
    write_job_result(job_id, result, status="completed")
    set_job_status(job_id, "completed")

# ---------- Job endpoints ----------
@app.get("/jobs")
def list_jobs():
    cur = DB.cursor()
    cur.execute("SELECT id, filename, status, created_at, updated_at, metadata, result FROM jobs ORDER BY created_at DESC")
    rows = cur.fetchall()
    out = []
    for r in rows:
        out.append({
            "id": r[0], "filename": r[1], "status": r[2],
            "created_at": r[3], "updated_at": r[4],
            "metadata": json.loads(r[5]) if r[5] else None,
            "result": json.loads(r[6]) if r[6] else None
        })
    return out

@app.get("/jobs/{job_id}", response_model=JobSummary)
def get_job(job_id: str):
    cur = DB.cursor()
    cur.execute("SELECT id, filename, status, created_at, updated_at, metadata, result FROM jobs WHERE id = ?", (job_id,))
    r = cur.fetchone()
    if not r:
        raise HTTPException(status_code=404, detail="job not found")
    return {
        "id": r[0], "filename": r[1], "status": r[2],
        "created_at": r[3], "updated_at": r[4],
        "metadata": json.loads(r[5]) if r[5] else None,
        "result": json.loads(r[6]) if r[6] else None
    }

@app.get("/jobs/{job_id}/frames")
def list_frames(job_id: str):
    job_art_dir = os.path.join(ARTIFACTS_DIR, job_id)
    frames_dir = os.path.join(job_art_dir, "frames")
    if not os.path.exists(frames_dir):
        raise HTTPException(status_code=404, detail="frames not found (still processing?)")
    frames = sorted([f for f in os.listdir(frames_dir) if f.endswith(".jpg")])
    # return URLs for frontend (mounted at /artifacts)
    urls = [f"/artifacts/{job_id}/frames/{f}" for f in frames]
    return {"frames": urls}

@app.get("/jobs/{job_id}/frames/{frame_name}")
def get_frame(job_id: str, frame_name: str):
    path = os.path.join(ARTIFACTS_DIR, job_id, "frames", frame_name)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="frame not found")
    return FileResponse(path, media_type="image/jpeg")

@app.get("/jobs/{job_id}/heatmap")
def get_heatmap(job_id: str):
    # Placeholder: in hackathon return a fake image or 501
    # You can implement Grad-CAM / overlay later.
    return JSONResponse({"note": "heatmap not implemented in this MVP"})

@app.get("/jobs/{job_id}/spectrogram")
def get_spectrogram(job_id: str):
    return JSONResponse({"note": "spectrogram not implemented in this MVP"})

# ---------- Verification pack (basic zip of JSONs + small files) ----------
@app.get("/verification/{job_id}")
def verification_pack(job_id: str):
    cur = DB.cursor()
    cur.execute("SELECT filename, metadata, result FROM jobs WHERE id = ?", (job_id,))
    r = cur.fetchone()
    if not r:
        raise HTTPException(status_code=404, detail="job not found")
    tmp = os.path.join(DATA_DIR, f"verif_{job_id}")
    if os.path.exists(tmp):
        shutil.rmtree(tmp)
    os.makedirs(tmp, exist_ok=True)
    # dump jsons
    meta = json.loads(r[1]) if r[1] else {}
    res = json.loads(r[2]) if r[2] else {}
    with open(os.path.join(tmp, "metadata.json"), "w") as f:
        json.dump(meta, f, indent=2)
    with open(os.path.join(tmp, "result.json"), "w") as f:
        json.dump(res, f, indent=2)
    # copy first 2 frames if exist
    frames_src = os.path.join(ARTIFACTS_DIR, job_id, "frames")
    if os.path.exists(frames_src):
        frames = sorted([f for f in os.listdir(frames_src) if f.endswith(".jpg")])[:2]
        for fr in frames:
            shutil.copy(os.path.join(frames_src, fr), os.path.join(tmp, fr))
    # create zip
    zip_path = os.path.join(DATA_DIR, f"verif_{job_id}.zip")
    shutil.make_archive(base_name=zip_path.replace('.zip', ''), format='zip', root_dir=tmp)
    return FileResponse(zip_path, media_type="application/zip", filename=f"verification_{job_id}.zip")

# ---------- Health ----------
@app.get("/health")
def health():
    return {"status": "ok", "db": os.path.exists(DB_PATH)}

# ---------- Root ----------
@app.get("/")
def root():
    return {"msg": "VeriSight minimal backend. Use /docs to explore."}

