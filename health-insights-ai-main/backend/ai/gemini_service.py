import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def analyze_medical_report(file_bytes: bytes, mime_type: str) -> str:
    """
    Sends the medical report to Gemini 1.5 Pro to extract structured data.
    """
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in the .env file.")
    
    # We use Gemini 2.0 Flash as it supports multimodal inputs (images/PDFs) natively
    model = genai.GenerativeModel('gemini-2.0-flash')
    
    prompt = """
    You are an expert AI medical assistant. Analyze the provided medical report.
    Extract the medical parameters, their values, normal ranges, and determine if they are normal or abnormal.
    Provide an easy-to-understand explanation for each parameter and a short lifestyle suggestion.
    
    Return the response as a JSON object matching this schema exactly:
    {
      "name": "Title of the Report (e.g. Complete Blood Count)",
      "date": "Date of the report (e.g. Oct 2026)",
      "patient": {
        "name": "Patient Name",
        "age": "Age",
        "gender": "Gender",
        "bloodGroup": "Blood Group if available"
      },
      "risk": "Low" | "Medium" | "High",
      "healthScore": 0-100,
      "parameters": [
        {
          "name": "Parameter Name (e.g. Hemoglobin)",
          "value": "Value (e.g. 14.5)",
          "unit": "Unit (e.g. g/dL)",
          "normalRange": "Normal Range (e.g. 13.8-17.2)",
          "status": "Normal" | "High" | "Low" | "Borderline",
          "explanation": "Simple explanation of what this parameter means.",
          "suggestion": "Short lifestyle suggestion to improve or maintain this."
        }
      ]
    }
    """
    
    # Create the prompt part for the file
    file_part = {
        "mime_type": mime_type,
        "data": file_bytes
    }
    
    try:
        response = model.generate_content([prompt, file_part])
        # Try to extract the JSON block
        text = response.text
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].strip()
        return text
    except Exception as e:
        print(f"Error during AI analysis: {e}")
        raise e
