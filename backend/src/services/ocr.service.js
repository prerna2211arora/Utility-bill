// import axios from "axios";

// export const healthCheckOCR = async () => {
//   try {
//     const response = await axios.get(
//       process.env.OCR_SERVICE
//     );

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

import axios from "axios";

export const processOCR = async (pdfPath) => {
  const response = await axios.post(
    `${process.env.OCR_SERVICE}/ocr`,
    {
      pdf_path: pdfPath,
    }
  );

  return response.data;
};