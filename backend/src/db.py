# src/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import DATABASE_URL
# src/db.py (only modify sessionmaker line)
from sqlalchemy.orm import sessionmaker


# create engine and session factory here
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, expire_on_commit=False)

def get_session():
    return SessionLocal()

def init_db():
    """
    Create tables. Import models here to ensure Base is defined from models.py
    without creating circular imports at module import time.
    """
    # local import to avoid circular import at module load time
    from src import models  # import here
    models.Base.metadata.create_all(bind=engine)

