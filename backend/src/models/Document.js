import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },

    storedName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "ocr_completed", "failed"],
      default: "uploaded",
    },
    ocr: {
    text: {
        type: String,
        default: "",
    },

    engine: {
        type: String,
        default: "",
    },

    confidence: {
        type: Number,
        default: 0,
    },

    pages: {
        type: Number,
        default: 0,
    },
},
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Document", documentSchema);
