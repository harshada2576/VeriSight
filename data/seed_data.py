import json
from database import SessionLocal
from models.product import Product

with open("data/seed_data.json") as f:
    data = json.load(f)

db = SessionLocal()
for item in data["products"]:
    product = Product(**item)
    db.add(product)
db.commit()
db.close()