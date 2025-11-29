# config.py
import os
BASE_DIR = os.path.dirname(__file__)
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'verisight.db')}"
UPLOAD_DIR = os.path.join(BASE_DIR, "storage")
ALLOWED_EXT = {".mp4", ".mov", ".mkv", ".avi"}
MAX_UPLOAD_BYTES = 500 * 1024 * 1024 # 500 MB
