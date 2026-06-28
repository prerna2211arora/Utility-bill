from fastapi import APIRouter
from pydantic import BaseModel

from python.services.pdf_service import convert_pdf_to_images

router = APIRouter()


class PdfRequest(BaseModel):

    pdf_path: str


@router.post("/convert")

def convert(request: PdfRequest):

    images = convert_pdf_to_images(
        request.pdf_path
    )

    return {
        "success": True,
        "pages": len(images),
        "images": images
    }