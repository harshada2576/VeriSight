from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks, Depends
import os, uuid
from starlette.responses import JSONResponse
from src.security import get_current_user
from src.models import Job
from src.db import get_session
from config import UPLOAD_DIR, ALLOWED_EXT, MAX_UPLOAD_BYTES
from src.services_preprocess import process_job_background
from datetime import datetime

router = APIRouter()

@router.post("/upload", status_code=201)
async def upload_video(background_tasks: BackgroundTasks, file: UploadFile = File(...), current_user = Depends(get_current_user)):
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
    j = Job(id=job_id, owner=current_user.id, local_path=saved_path, state="created", metadata={}, result=None)
    s = get_session()
    s.add(j)
    s.commit()
    s.close()

    # schedule background processing
    background_tasks.add_task(process_job_background, job_id)

    return JSONResponse({"job_id": job_id, "upload_path": f"/storage/jobs/{job_id}/upload{ext}"})

