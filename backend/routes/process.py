from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from utils.pdf_parser import parse_pdf
from utils.ollama_handler import get_summary_and_score
import shutil
import os
import uuid

router = APIRouter()

UPLOAD_DIR = "backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/process")
async def process_files(jd_file: UploadFile = File(...), cv_file: UploadFile = File(...)):
    print("✅ Endpoint '/process' hit")

    jd_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}_{jd_file.filename}")
    cv_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}_{cv_file.filename}")

    print("📁 Saving uploaded files...")
    with open(jd_path, "wb") as f:
        shutil.copyfileobj(jd_file.file, f)
    print(f"📄 JD file saved to {jd_path}")

    with open(cv_path, "wb") as f:
        shutil.copyfileobj(cv_file.file, f)
    print(f"📄 CV file saved to {cv_path}")

    print("📚 Parsing PDF files...")
    jd_text = parse_pdf(jd_path)
    print("✅ JD PDF parsed")

    cv_text = parse_pdf(cv_path)
    print("✅ CV PDF parsed")

    print("🧠 Sending parsed text to Ollama...")
    result = get_summary_and_score(jd_text, cv_text)
    print("✅ Ollama returned result:", result)


    result["jd_raw"] = jd_text
    result["cv_raw"] = cv_text

    print("🚀 Returning JSON response to frontend")
    return JSONResponse(content=result)
