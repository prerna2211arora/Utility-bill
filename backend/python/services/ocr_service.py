# from paddleocr import PaddleOCR

# # Load model only once when the application starts
# ocr = PaddleOCR(
#     use_doc_orientation_classify=False,
#     use_doc_unwarping=False,
#     use_textline_orientation=False,
#     lang="en"
# )


# def extract_text(image_path: str):
#     result = ocr.predict(image_path)

#     extracted_lines = []

#     average_confidence = []

#     if not result:
#         return {
#             "text": "",
#             "confidence": 0
#         }

#     page = result[0]

#     if "rec_texts" in page:

#         for text, score in zip(
#             page["rec_texts"],
#             page["rec_scores"]
#         ):

#             extracted_lines.append(text)
#             average_confidence.append(score)

#     final_text = "\n".join(extracted_lines)

#     confidence = (
#         sum(average_confidence) / len(average_confidence)
#         if average_confidence
#         else 0
#     )

#     return {
#         "text": final_text,
#         "confidence": round(confidence, 3)
#     }

from paddleocr import PaddleOCR

ocr = PaddleOCR(
    use_angle_cls=True,
    lang="en"
)

def extract_text(image_path: str):

    result = ocr.ocr(image_path, cls=True)

    lines = []
    scores = []

    if not result:
        return {
            "text": "",
            "confidence": 0
        }

    for line in result[0]:

        text = line[1][0]
        score = line[1][1]

        lines.append(text)
        scores.append(score)

    confidence = (
        sum(scores) / len(scores)
        if scores
        else 0
    )

    return {
        "text": "\n".join(lines),
        "confidence": round(confidence, 3)
    }