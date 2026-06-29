import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextFromPdf = async (pdfPath) => {
  try {
    const pdfBuffer = await fs.readFile(pdfPath);

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(pdfBuffer),
    });

    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      fullText += pageText + "\n";
    }

    return {
      success: true,
      text: fullText.trim(),
      pages: pdf.numPages,
    };
  } catch (error) {
    console.error("PDF Extraction Error:", error);

    return {
      success: false,
      text: "",
      pages: 0,
      error: error.message,
    };
  }
};
export const hasEnoughText = (text) => {

    if (!text)
        return false;

    return text.trim().length > 300;
};
