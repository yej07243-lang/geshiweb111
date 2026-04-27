import os
import time
import shutil
from pathlib import Path

def cleanup_files(directory: Path, max_age_seconds: int = 1800):
    """清理目录下过期的文件"""
    now = time.time()
    if not directory.exists():
        return
        
    for item in directory.iterdir():
        if item.is_file():
            if now - item.stat().st_mtime > max_age_seconds:
                try:
                    item.unlink()
                except Exception as e:
                    print(f"Error deleting file {item}: {e}")
        elif item.is_dir():
             if now - item.stat().st_mtime > max_age_seconds:
                try:
                    shutil.rmtree(item)
                except Exception as e:
                    print(f"Error deleting dir {item}: {e}")

if __name__ == "__main__":
    # 简单的定时清理循环
    UPLOAD_DIR = Path("uploads")
    OUTPUT_DIR = Path("outputs")
    while True:
        cleanup_files(UPLOAD_DIR)
        cleanup_files(OUTPUT_DIR)
        time.sleep(600)  # 每10分钟检查一次
