# src/models.py
from sqlalchemy import Column, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Job(Base):
    __tablename__ = "jobs"
    id = Column(String, primary_key=True, index=True)
    owner = Column(String, nullable=True)
    local_path = Column(String, nullable=False)
    state = Column(String, default="created")
    meta = Column(JSON, default={})         # <-- renamed from `metadata` to `meta`
    result = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="user")
    created_at = Column(DateTime, default=datetime.utcnow)

# ---------- add this to the bottom of src/models.py ----------

# Small runtime CRUD helpers. They import the session factory inside the function
# to avoid circular import problems during module import.
from typing import Optional, Dict, Any

def save_job(job: "Job") -> None:
    from src.db import get_session
    s = get_session()
    s.add(job)
    s.commit()
    s.close()

def get_job_by_id(job_id: str) -> Optional["Job"]:
    from src.db import get_session
    s = get_session()
    j = s.query(Job).filter(Job.id == job_id).first()
    s.close()
    return j

def update_job_state(job_id: str, state: str, extra: Optional[Dict[str, Any]] = None) -> None:
    from src.db import get_session
    s = get_session()
    j = s.query(Job).filter(Job.id == job_id).first()
    if not j:
        s.close()
        return
    j.state = state
    if extra:
        # merge into meta (internal column name)
        j.meta = {**(j.meta or {}), **extra}
    s.commit()
    s.close()

def save_job_result(job_id: str, result: Dict[str, Any]) -> None:
    from src.db import get_session
    s = get_session()
    j = s.query(Job).filter(Job.id == job_id).first()
    if not j:
        s.close()
        return
    j.result = result
    j.state = "completed"
    s.commit()
    s.close()

# User helpers
def create_user(user: "User") -> None:
    from src.db import get_session
    s = get_session()
    s.add(user)
    s.commit()
    s.close()

def get_user_by_email(email: str) -> Optional["User"]:
    from src.db import get_session
    s = get_session()
    u = s.query(User).filter(User.email == email).first()
    s.close()
    return u

def get_user_by_id(user_id: str) -> Optional["User"]:
    from src.db import get_session
    s = get_session()
    u = s.query(User).filter(User.id == user_id).first()
    s.close()
    return u

# -------------------------------------------------------------

