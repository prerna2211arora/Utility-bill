from fastapi import APIRouter
from pydantic import BaseModel

from python.services.ai_service import classify_document

router = APIRouter()


class OCRRequest(BaseModel):
    text: str


@router.post("/classify")
def classify(request: OCRRequest):

    result = classify_document(request.text)

    return result