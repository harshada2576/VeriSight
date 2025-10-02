import json
from database import SessionLocal
from models.product import Product
from ..utils.paths import absolute_path 

JSON_PATH = absolute_path("data", "seed_data.json") 

with open(JSON_PATH) as f:
    data = json.load(f)

db = SessionLocal()
for item in data["products"]:
    product = Product(**item)
    db.add(product)
db.commit()
db.close()