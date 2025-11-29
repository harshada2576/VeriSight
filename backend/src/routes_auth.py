from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import uuid
from src.models import User
from src.db import get_session
from src.security import hash_password, create_access_token, verify_password, get_user_by_email

router = APIRouter()

class RegisterIn(BaseModel):
    email: EmailStr
    password: str

class LoginIn(BaseModel):
    email: EmailStr
    password: str

@router.post("/register")
def register(payload: RegisterIn):
    if get_user_by_email(payload.email):
        raise HTTPException(status_code=400, detail="email already registered")
    # create id up-front so we don't rely on accessing SQLAlchemy instance after commit
    user_id = uuid.uuid4().hex
    user = User(id=user_id, email=payload.email, password_hash=hash_password(payload.password))
    s = get_session()
    s.add(user)
    s.commit()
    s.close()
    # use plain user_id for token instead of reading user.id from possibly-detached instance
    token = create_access_token(user_id)
    return {"access_token": token, "token_type": "bearer"}


@router.post("/login")
def login(payload: LoginIn):
    user = get_user_by_email(payload.email)
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=400, detail="invalid credentials")
    token = create_access_token(user.id)
    return {"access_token": token, "token_type": "bearer"}

