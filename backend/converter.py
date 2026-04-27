import os
import subprocess
from PIL import Image
from pathlib import Path

def convert_image(input_path: Path, output_path: Path, quality: int = 85):
    """使用 Pillow 转换图片格式或压缩"""
    with Image.open(input_path) as img:
        if img.mode in ("RGBA", "P") and output_path.suffix.lower() in [".jpg", ".jpeg"]:
            img = img.convert("RGB")
        img.save(output_path, quality=quality)

def convert_office_to_pdf(input_path: Path, output_dir: Path):
    """使用 LibreOffice 将 Office 文档转换为 PDF"""
    try:
        cmd = [
            "libreoffice", "--headless", "--convert-to", "pdf",
            "--outdir", str(output_dir), str(input_path)
        ]
        subprocess.run(cmd, check=True, capture_output=True)
        return output_dir / (input_path.stem + ".pdf")
    except Exception as e:
        print(f"LibreOffice conversion error: {e}")
        return None

def convert_pdf_to_word(input_path: Path, output_dir: Path):
    """实验功能：PDF 转 Word (使用 LibreOffice 尝试)"""
    try:
        # LibreOffice 对 PDF 转 Word 的支持有限，通常是导入到 Writer
        cmd = [
            "libreoffice", "--headless", "--convert-to", "docx",
            "--outdir", str(output_dir), str(input_path)
        ]
        subprocess.run(cmd, check=True, capture_output=True)
        return output_dir / (input_path.stem + ".docx")
    except Exception as e:
        print(f"PDF to Word error: {e}")
        return None
