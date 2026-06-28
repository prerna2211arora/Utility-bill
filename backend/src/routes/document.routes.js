import express from "express";

import upload from "../middleware/upload.js";

import {
  uploadDocuments,
  getDocuments,
  getDocumentById,
  deleteDocument,
  testOCRConnection,
} from "../controllers/document.controller.js";

const router = express.Router();

router.post("/upload", upload.array("documents", 20), uploadDocuments);

router.get("/", getDocuments);

router.get("/:id", getDocumentById);

router.delete("/:id", deleteDocument);

export default router;
