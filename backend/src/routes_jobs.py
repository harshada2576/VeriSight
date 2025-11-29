from fastapi import APIRouter, Depends, HTTPException
from src.db import get_session
from src.models import Job
from src.security import get_current_user

router = APIRouter()

@router.get("/{job_id}")
def get_job(job_id: str, current_user = Depends(get_current_user)):
    s = get_session()
    j = s.query(Job).filter(Job.id == job_id).first()
    s.close()
    if not j:
        raise HTTPException(status_code=404, detail="job not found")
    if j.owner != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="forbidden")
    # Return 'metadata' in response for API compatibility, but source is j.meta
    return {
        "job_id": j.id,
        "state": j.state,
        "metadata": j.meta,
        "result": j.result
    }

