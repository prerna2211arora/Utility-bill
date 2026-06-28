import Document from "../models/Document.js";
import fs from "fs";
import { saveUploadedDocuments } from "../services/document.service.js";

export const uploadDocuments = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const documents = await saveUploadedDocuments(files);

    return res.status(201).json({
      success: true,
      message: "Documents uploaded successfully",
      data: documents,
    });
  } catch (error) {
    console.error(error);

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