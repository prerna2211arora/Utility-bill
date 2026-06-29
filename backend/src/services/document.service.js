import Document from "../models/Document.js";
import { extractTextFromPdf, hasEnoughText } from "./pdf.service.js";

import { processOCR } from "./ocr.service.js";

export const saveUploadedDocuments = async (files) => {
  const savedDocuments = [];

  for (const file of files) {
    const document = await Document.create({
      originalName: file.originalname,
      storedName: file.filename,
      filePath: file.path,
      fileType: file.mimetype,
      fileSize: file.size,
      status: "uploaded",
    });

    savedDocuments.push(document);
  }

  return savedDocuments;
};


export const processUploadedDocument = async (document) => {
  const pdfResult = await extractTextFromPdf(document.filePath);

  if (hasEnoughText(pdfResult.text)) {
    document.status = "ocr_completed";

    document.ocr = {
      text: pdfResult.text,
      pages: pdfResult.pages,
      confidence: 1,
      engine: "pdf-parse",
    };

    await document.save();

    return document;
  }

  const ocr = await processOCR(document.filePath);

  document.status = "ocr_completed";

  document.ocr = {
    text: ocr.text,

    pages: ocr.pages.length,

    confidence: ocr.pages[0]?.confidence ?? 0,

    engine: "PaddleOCR",
  };

  await document.save();

  return document;
};
