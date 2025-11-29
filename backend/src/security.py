# src/security.py
import os
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.db import get_session
from src.models import User
from config import JWT_SECRET, JWT_ALGO, ACCESS_TOKEN_EXPIRE_MINUTES
from typing import Optional

# Use sha256_crypt for prototype portability (no bcrypt C-extension required)
pwd_ctx = CryptContext(schemes=["sha256_crypt"], deprecated="auto")
bearer_scheme = HTTPBearer()

# bcrypt has a 72-byte limit; trim to be defensive for any backend
MAX_PWD_BYTES = 72

def _normalize_password(p: str) -> str:
    if not isinstance(p, str):
        p = str(p)
    # truncate to avoid bcrypt limit if someday switched back; harmless for sha256_crypt
    if len(p.encode("utf-8")) > MAX_PWD_BYTES:
        return p.encode("utf-8")[:MAX_PWD_BYTES].decode("utf-8", errors="ignore")
    return p

def hash_password(password: str) -> str:
    password = _normalize_password(password)
    return pwd_ctx.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    plain = _normalize_password(plain)
    try:
        return pwd_ctx.verify(plain, hashed)
    except Exception:
        return False

def create_access_token(user_id: str, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    payload = {"sub": user_id, "exp": int(expire.timestamp())}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)
    return token

def decode_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="invalid token")

def get_user_by_id(user_id: str) -> Optional[User]:
    s = get_session()
    u = s.query(User).filter(User.id == user_id).first()
    s.close()
    return u

def get_user_by_email(email: str) -> Optional[User]:
    s = get_session()
    u = s.query(User).filter(User.email == email).first()
    s.close()
    return u

def get_current_user(creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = creds.credentials
    payload = decode_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="invalid token payload")
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=401, detail="user not found")
    return user

