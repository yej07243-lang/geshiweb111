import os
import uuid
import asyncio
from pathlib import Path
from typing import Dict
from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from converter import convert_image, convert_office_to_pdf, convert_pdf_to_word

# 初始化
app = FastAPI(title="File Converter API")
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 配置
UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("outputs")
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB
ALLOWED_EXTENSIONS = {
    ".pdf", ".docx", ".doc", ".jpg", ".jpeg", ".png", ".webp"
}

# 任务状态存储 (内存中，MVP适用)
jobs: Dict[str, dict] = {}

@app.post("/api/upload")
@limiter.limit("10/minute")
async def upload_file(request: Request, file: UploadFile = File(...)):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file format")
    
    # 检查文件大小 (流式读取以防大文件撑爆内存)
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large (Max 20MB)")
    
    job_id = str(uuid.uuid4())
    file_path = UPLOAD_DIR / f"{job_id}{ext}"
    
    with open(file_path, "wb") as f:
        f.write(content)
    
    jobs[job_id] = {
        "status": "uploaded",
        "original_name": file.filename,
        "path": str(file_path),
        "ext": ext
    }
    
    return {"job_id": job_id}

@app.post("/api/convert")
async def start_convert(job_id: str, target_format: str, background_tasks: BackgroundTasks, quality: int = 85):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs[job_id]
    source_path = Path(job["path"])
    output_filename = f"{job_id}.{target_format.lower()}"
    output_path = OUTPUT_DIR / output_filename
    
    job["status"] = "processing"
    
    async def process_task():
        try:
            if target_format.lower() in ["jpg", "jpeg", "png", "webp"]:
                await asyncio.to_thread(convert_image, source_path, output_path, quality)
            elif target_format.lower() == "pdf":
                result = await asyncio.to_thread(convert_office_to_pdf, source_path, OUTPUT_DIR)
                if result: os.rename(result, output_path)
            elif target_format.lower() == "docx":
                result = await asyncio.to_thread(convert_pdf_to_word, source_path, OUTPUT_DIR)
                if result: os.rename(result, output_path)
            
            if output_path.exists():
                jobs[job_id]["status"] = "completed"
                jobs[job_id]["output_path"] = str(output_path)
            else:
                jobs[job_id]["status"] = "failed"
        except Exception as e:
            print(f"Conversion error: {e}")
            jobs[job_id]["status"] = "failed"

    background_tasks.add_task(process_task)
    return {"status": "started"}

@app.get("/api/status/{job_id}")
async def get_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"status": jobs[job_id]["status"]}

@app.get("/api/download/{job_id}")
async def download_file(job_id: str):
    if job_id not in jobs or jobs[job_id]["status"] != "completed":
        raise HTTPException(status_code=404, detail="File not ready or not found")
    
    path = jobs[job_id]["output_path"]
    original_name = Path(jobs[job_id]["original_name"]).stem
    target_ext = Path(path).suffix
    
    return FileResponse(
        path, 
        filename=f"{original_name}_converted{target_ext}",
        media_type="application/octet-stream"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
