import axios from "axios";

export const healthCheckOCR = async () => {
  try {
    const response = await axios.get(
      process.env.OCR_SERVICE
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};