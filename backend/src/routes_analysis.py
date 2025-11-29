from fastapi import APIRouter, Depends, HTTPException
from src.db import get_session
from src.models import Job
from src.security import get_current_user
from src.ai_video_detector import analyze_video
import os
from src.models import Job as JobModel
from src.db import get_session

router = APIRouter()

@router.get("/jobs/{job_id}/analyze")
def get_or_run_analysis(job_id: str, current_user = Depends(get_current_user)):
    s = get_session()
    j = s.query(JobModel).filter(JobModel.id == job_id).first()
    s.close()
    if not j:
        raise HTTPException(status_code=404, detail="job not found")
    if j.owner != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="forbidden")
    # return existing if present
    if j.result and isinstance(j.result, dict) and "analysis" in j.result:
        return {"job_id": job_id, "analysis": j.result["analysis"], "score": j.result.get("score", 0.0)}

    # run analysis on preview if available
    job_dir = os.path.dirname(j.local_path)
    preview = os.path.join(job_dir, "preview.mp4")
    target = preview if os.path.exists(preview) else j.local_path
    try:
        analysis = analyze_video(target, width=640)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"analysis failed: {e}")

    # save into result (simple save)
    s2 = get_session()
    job_obj = s2.query(JobModel).filter(JobModel.id == job_id).first()
    res = job_obj.result or {}
    res.update({"analysis": analysis, "score": analysis.get("score", 0.0)})
    job_obj.result = res
    job_obj.state = "completed"
    s2.commit()
    s2.close()
    return {"job_id": job_id, "analysis": analysis}

