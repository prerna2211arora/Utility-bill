import Document from "../models/Document.js";

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