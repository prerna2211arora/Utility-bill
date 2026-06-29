from fastapi import APIRouter
from pydantic import BaseModel

from python.services.pdf_service import convert_pdf_to_images
from python.services.ocr_service import extract_text

router = APIRouter()


class PdfRequest(BaseModel):

    pdf_path: str

@router.post("/ocr")
def run_ocr(request: PdfRequest):

    images = convert_pdf_to_images(request.pdf_path)

    pages = []

    complete_text = []

    for image in images:

        result = extract_text(image)

        pages.append({
            "image": image,
            "text": result["text"],
            "confidence": result["confidence"]
        })

        complete_text.append(result["text"])

    return {
        "success": True,
        "pages": pages,
        "text": "\n".join(complete_text)
    }

# @router.post("/convert")

# def convert(request: PdfRequest):

#     images = convert_pdf_to_images(
#         request.pdf_path
#     )

#     return {
#         "success": True,
#         "pages": len(images),
#         "images": images
#     }