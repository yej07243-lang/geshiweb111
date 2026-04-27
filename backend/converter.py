import subprocess
from pathlib import Path

from PIL import Image


def convert_image(input_path: Path, output_path: Path, quality: int = 85):
    """Convert or compress an image with Pillow."""
    with Image.open(input_path) as img:
        if img.mode in ("RGBA", "P") and output_path.suffix.lower() in [".jpg", ".jpeg"]:
            img = img.convert("RGB")
        img.save(output_path, quality=quality)


def convert_office_to_pdf(input_path: Path, output_dir: Path):
    """Convert Office documents to PDF with LibreOffice."""
    try:
        cmd = [
            "libreoffice",
            "--headless",
            "--convert-to",
            "pdf",
            "--outdir",
            str(output_dir),
            str(input_path),
        ]
        subprocess.run(cmd, check=True, capture_output=True)
        output_path = output_dir / (input_path.stem + ".pdf")
        if output_path.exists() and output_path.stat().st_size > 0:
            return output_path
        return None
    except Exception as e:
        print(f"LibreOffice conversion error: {e}")
        return None


def convert_pdf_to_word(input_path: Path, output_dir: Path):
    """Convert PDF to DOCX with pdf2docx first, then LibreOffice as fallback."""
    output_path = output_dir / (input_path.stem + ".docx")

    try:
        from pdf2docx import Converter

        converter = Converter(str(input_path))
        try:
            converter.convert(str(output_path), start=0, end=None)
        finally:
            converter.close()

        if output_path.exists() and output_path.stat().st_size > 0:
            return output_path
    except Exception as e:
        print(f"pdf2docx conversion error: {e}")

    try:
        cmd = [
            "libreoffice",
            "--headless",
            "--convert-to",
            "docx",
            "--outdir",
            str(output_dir),
            str(input_path),
        ]
        subprocess.run(cmd, check=True, capture_output=True)
        if output_path.exists() and output_path.stat().st_size > 0:
            return output_path
        return None
    except Exception as e:
        print(f"PDF to Word error: {e}")
        return None
