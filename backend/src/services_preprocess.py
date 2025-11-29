# src/services_preprocess.py
import os
import traceback
from src.db import SessionLocal
from src.models import Job, update_job_state, save_job_result
from src.utils_ffmpeg import ffprobe_metadata, extract_frames, make_preview_clip, detect_corruption

STORAGE_ROOT = os.path.join(os.path.dirname(__file__), "..", "storage")

def process_job_background(job_id: str):
    try:
        db = SessionLocal()
        job = db.query(Job).filter(Job.id == job_id).one()
        db.close()

        update_job_state(job_id, "preprocessing")
        path = job.local_path

        # metadata
        meta = ffprobe_metadata(path)
        update_job_state(job_id, "preprocessing", extra={"ffprobe": meta})

        # detect corruption
        if detect_corruption(path):
            update_job_state(job_id, "failed", extra={"error": "corrupted_file"})
            return

        # extract frames (sample 1 fps)
        frames_dir = os.path.join(STORAGE_ROOT, "jobs", job_id, "frames")
        os.makedirs(frames_dir, exist_ok=True)
        extract_frames(path, frames_dir, fps=1)

        # preview clip
        preview_path = os.path.join(STORAGE_ROOT, "jobs", job_id, "preview.mp4")
        make_preview_clip(path, preview_path, duration=10)

        update_job_state(job_id, "inference", extra={"frames_dir": frames_dir})

        # naive "inference" for prototype: random heuristic
        result = {
            "score": 0.42,
            "confidence": 0.7,
            "checks": [
                {"name": "face_blend", "result": False, "confidence": 0.2},
                {"name": "audio_video_mismatch", "result": False, "confidence": 0.1}
            ]
        }
        save_job_result(job_id, result)
    except Exception as e:
        traceback.print_exc()
        update_job_state(job_id, "failed", extra={"error": str(e)})

