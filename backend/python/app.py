from fastapi import FastAPI

from python.routes.ocr_routes import router

app = FastAPI()

app.include_router(router)


@app.get("/")

def home():

    return {
        "message": "OCR Service Running"
    }