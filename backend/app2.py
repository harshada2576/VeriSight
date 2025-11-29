import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from src import db
from src.routes_auth import router as auth_router
from src.routes_analysis import router as analysis_router
from src.routes_upload import router as upload_router
from src.routes_jobs import router as jobs_router
from config import UPLOAD_DIR

os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(title="VeriSight (Prototype)")

# static artifacts
app.mount("/storage", StaticFiles(directory=UPLOAD_DIR), name="storage")

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(upload_router, prefix="", tags=["upload"])
app.include_router(jobs_router, prefix="/jobs", tags=["jobs"])
app.include_router(analysis_router, prefix="", tags=["analysis"])

@app.on_event("startup")
def startup():
    db.init_db()

@app.get("/health")
def health():
    return {"status": "ok"}

