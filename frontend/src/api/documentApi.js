import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const uploadDocuments = (formData, onUploadProgress) => {
  return api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export const getDocuments = () => {
  return api.get("/documents");
};

export const getDocument = (id) => {
  return api.get(`/documents/${id}`);
};

export const deleteDocument = (id) => {
  return api.delete(`/documents/${id}`);
};