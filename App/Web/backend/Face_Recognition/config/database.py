import os
from dotenv import load_dotenv
import motor.motor_asyncio

load_dotenv()

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("DATABASE_URI"))
db = client.get_database("pfe")
patient_collection = db.get_collection("patients")
users_collection = db.get_collection("users")
