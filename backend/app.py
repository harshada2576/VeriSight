import os
import uuid
from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.staticfiles import StaticFiles
from starlette.responses import JSONResponse
from src import db
from src.models import Job, save_job, update_job_state
from config import UPLOAD_DIR, ALLOWED_EXT, MAX_UPLOAD_BYTES
from src.services_preprocess import process_job_background

os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(title="VeriSight Prototype (SQLite + Local Storage)")

# Mount static serving for evidence and previews
app.mount("/storage", StaticFiles(directory=UPLOAD_DIR), name="storage")

@app.on_event("startup")
def startup():
    db.init_db()  # create tables for prototype

@app.post("/upload", status_code=201)
async def upload_video(background_tasks: BackgroundTasks, file: UploadFile = File(...), user_id: str = "dev"):
    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail="Unsupported video format")
    contents = await file.read()
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="File too large")
    job_id = uuid.uuid4().hex
    job_dir = os.path.join(UPLOAD_DIR, "jobs", job_id)
    os.makedirs(job_dir, exist_ok=True)
    saved_path = os.path.join(job_dir, f"upload{ext}")
    with open(saved_path, "wb") as f:
        f.write(contents)

    # create DB job record
    job = Job(id=job_id, owner=user_id, s3_key=None, local_path=saved_path, state="created", metadata={})
    save_job(job)

    # schedule background processing
    background_tasks.add_task(process_job_background, job_id)

    return JSONResponse({"job_id": job_id, "upload_path": f"/storage/jobs/{job_id}/upload{ext}"})

@app.get("/jobs/{job_id}")
def get_job(job_id: str):
    session = db.get_session()
    j = session.query(Job).filter(Job.id == job_id).first()
    session.close()
    if not j:
        raise HTTPException(status_code=404, detail="job not found")
    return {
        "job_id": j.id,
        "state": j.state,
        "metadata": j.metadata,
        "result": j.result
    }
