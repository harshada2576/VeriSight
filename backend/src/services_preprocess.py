import os, traceback
from src.db import get_session
from src.models import Job
from src.utils_ffmpeg import ffprobe_metadata, extract_frames, make_preview_clip, detect_corruption
from src.ai_video_detector import analyze_video
from datetime import datetime

BASE = os.path.dirname(os.path.dirname(__file__))

def process_job_background(job_id: str):
    """Background job: extract metadata, frames, preview, run detector, save result"""
    try:
        s = get_session()
        job = s.query(Job).filter(Job.id == job_id).first()
        s.close()
        if not job:
            return

        # update state to preprocessing
        s2 = get_session()
        j2 = s2.query(Job).filter(Job.id == job_id).first()
        j2.state = "preprocessing"
        s2.commit()
        s2.close()

        path = job.local_path

        meta = ffprobe_metadata(path)
        s3 = get_session()
        j3 = s3.query(Job).filter(Job.id == job_id).first()
        j3.meta = {"ffprobe": meta}
        j3.state = "preprocessing"
        s3.commit()
        s3.close()

        if detect_corruption(path):
            s4 = get_session()
            j4 = s4.query(Job).filter(Job.id == job_id).first()
            j4.state = "failed"
            j4.meta = {**(j4.meta or {}), **{"error": "corrupted_file"}}
            s4.commit()
            s4.close()
            return

        job_dir = os.path.dirname(path)
        frames_dir = os.path.join(job_dir, "frames")
        os.makedirs(frames_dir, exist_ok=True)
        extract_frames(path, frames_dir, fps=1)

        preview_path = os.path.join(job_dir, "preview.mp4")
        make_preview_clip(path, preview_path, duration=10)

        s5 = get_session()
        j5 = s5.query(Job).filter(Job.id == job_id).first()
        j5.state = "inference"
        j5.meta = {**(j5.meta or {}), **{"frames_dir": frames_dir, "preview": preview_path}}
        s5.commit()
        s5.close()

        analyze_target = preview_path if os.path.exists(preview_path) else path
        try:
            analysis = analyze_video(analyze_target, width=640, z_threshold=5, require_votes=2)
        except Exception as e:
            analysis = {"error": "analysis_failed", "error_msg": str(e)}

        # save result
        s6 = get_session()
        j6 = s6.query(Job).filter(Job.id == job_id).first()
        res = {"score": analysis.get("score", 0.0), "analysis": analysis}
        j6.result = res
        j6.state = "completed"
        s6.commit()
        s6.close()
    except Exception as e:
        traceback.print_exc()
        s7 = get_session()
        j7 = s7.query(Job).filter(Job.id == job_id).first()
        if j7:
            j7.state = "failed"
            j7.meta = {**(j7.meta or {}), **{"error": str(e)}}
            s7.commit()
        s7.close()

