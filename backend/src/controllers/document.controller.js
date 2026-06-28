import Document from "../models/Document.js";
import fs from "fs";
export const uploadDocuments =
  async (req, res) => {
    try {
      const files = req.files;

      const savedDocs = [];

      for (const file of files) {
        const document =
          await Document.create({
            originalName:
              file.originalname,

            storedName:
              file.filename,

            filePath:
              file.path,

            fileType:
              file.mimetype,

            fileSize:
              file.size,
          });

        savedDocs.push(document);
      }

      return res.status(201).json({
        success: true,
        message:
          "Files uploaded successfully",

        data: savedDocs,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getDocuments =
  async (req, res) => {
    try {
      const docs =
        await Document.find().sort({
          createdAt: -1,
        });

      return res.json({
        success: true,
        data: docs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
      });
    }
  };

export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params.id);
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await document.deleteOne();

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};