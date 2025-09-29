# services/auth_service.py
from database import SessionLocal
from models.user import User

def get_user_by_email(email):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    db.close()
    return user