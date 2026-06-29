from fastapi import FastAPI

from python.routes.ocr_routes import router as ocr_router
from python.routes.ai_routes import router as ai_router

app = FastAPI()

app.include_router(ocr_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "message": "Document Intelligence Service Running"
    }