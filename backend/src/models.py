from sqlalchemy import Column, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from src.db import engine, SessionLocal

Base = declarative_base()

class Job(Base):
    __tablename__ = "jobs"
    id = Column(String, primary_key=True, index=True)
    owner = Column(String, nullable=True)
    s3_key = Column(String, nullable=True)
    local_path = Column(String, nullable=False)
    state = Column(String, default="created")
    metadata = Column(JSON, default={})
    result = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

def save_job(job: Job):
    db = SessionLocal()
    db.add(job)
    db.commit()
    db.close()

def update_job_state(job_id: str, state: str, extra: dict = None):
    db = SessionLocal()
    j = db.query(Job).filter(Job.id == job_id).one()
    j.state = state
    if extra:
        j.metadata = {**(j.metadata or {}), **extra}
    db.commit()
    db.close()

def save_job_result(job_id: str, result: dict):
    db = SessionLocal()
    j = db.query(Job).filter(Job.id == job_id).one()
    j.result = result
    j.state = "completed"
    db.commit()
    db.close()
