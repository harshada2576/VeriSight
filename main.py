# main.py or init_db.py
from database import Base, engine
from models.user import User
from models.product import Product

Base.metadata.create_all(bind=engine)