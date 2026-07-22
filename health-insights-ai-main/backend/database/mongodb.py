import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
client = None
db = None

if MONGODB_URI:
    try:
        client = AsyncIOMotorClient(MONGODB_URI)
        db = client.health_insights
        print("Connected to MongoDB successfully.")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
else:
    print("MONGODB_URI not set. Skipping database connection.")

async def save_report(user_id: str, report_data: dict):
    if db is not None:
        report_data['user_id'] = user_id
        await db.reports.insert_one(report_data)
        return True
    return False

async def get_user_reports(user_id: str):
    if db is not None:
        cursor = db.reports.find({"user_id": user_id}).sort("_id", -1)
        reports = await cursor.to_list(length=100)
        # Convert ObjectId to string
        for r in reports:
            r["_id"] = str(r["_id"])
        return reports
    return []
