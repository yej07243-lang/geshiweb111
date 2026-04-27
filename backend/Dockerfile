FROM python:3.11-slim

# 安装 LibreOffice 和基础库
RUN apt-get update && apt-get install -y \
    libreoffice \
    libreoffice-writer \
    libreoffice-calc \
    libreoffice-impress \
    libmagic1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# 创建目录
RUN mkdir -p uploads outputs

EXPOSE 8000

# 启动 API 和 清理后台任务 (简单起见，使用两个进程)
CMD python cleanup.py & uvicorn main:app --host 0.0.0.0 --port 8000
