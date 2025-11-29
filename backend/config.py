import os
BASE_DIR = os.path.dirname(__file__)
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'verisight.db')}"
UPLOAD_DIR = os.path.join(BASE_DIR, "storage")
ALLOWED_EXT = {".mp4", ".mov", ".mkv", ".avi"}
MAX_UPLOAD_BYTES = 500 * 1024 * 1024  # 500 MB
JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret-change-me")  # set JWT_SECRET in env for real use
JWT_ALGO = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 180

