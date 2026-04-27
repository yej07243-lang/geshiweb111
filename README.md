# FastConvert MVP

A simple, fast, and secure online file converter built with Next.js, FastAPI, and LibreOffice.

## Features
- **PDF to Word**: Experimental high-fidelity conversion.
- **Word to PDF**: Professional conversion using LibreOffice.
- **Image Conversion**: JPG, PNG, WebP support via Pillow.
- **Image Compression**: Optimize images for the web.
- **Security**: 20MB limit, auto-deletion after 30 minutes, IP rate limiting.
- **SEO**: Dynamic metadata, sitemaps, and FAQ schemas.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: FastAPI (Python 3.11), Pillow, LibreOffice Headless.
- **Infrastructure**: Docker, Docker Compose, Nginx.

## Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+
- LibreOffice (for document conversions)

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Deployment with Docker

1. Clone the repository:
```bash
git clone https://github.com/yej07243-lang/-1.git
cd -1/file-converter-mvp
```

2. Start the services:
```bash
docker-compose up -d --build
```

3. Access the site:
Open `http://localhost` in your browser.

## Security Notes
- Files are stored in `backend/uploads` and `backend/outputs`.
- A background task `cleanup.py` runs every 10 minutes to delete files older than 30 minutes.
- Nginx limits the request body size to 20MB.

## License
MIT
