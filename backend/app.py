# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os


# ensure package paths
os.makedirs('data/videos', exist_ok=True)
os.makedirs('data/artifacts', exist_ok=True)


app = FastAPI(title="VeriSight Minimal")


app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)


# include routers
from routes import JobsRouter # local import after app created
app.include_router(JobsRouter.router, prefix="", tags=["jobs"])


@app.get("/health")
def health():
return {"status": "ok"}
