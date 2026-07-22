from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from ai.gemini_service import analyze_medical_report
from database.mongodb import save_report
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Medical Report Analyzer API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Medical Report Analyzer API is running"}

@app.post("/api/upload")
async def upload_report(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/") and file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only images and PDFs are supported.")
    
    try:
        file_bytes = await file.read()
        analysis_json_str = analyze_medical_report(file_bytes, file.content_type)
        analysis_data = json.loads(analysis_json_str)
        
        # Optionally save to DB (mocking user_id for now)
        await save_report("test_user_123", analysis_data)
        
        return {
            "message": "File analyzed successfully",
            "filename": file.filename,
            "analysis": analysis_data
        }
    except ValueError as ve:
        raise HTTPException(status_code=500, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
