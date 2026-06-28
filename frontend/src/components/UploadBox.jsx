import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadDocuments } from "../api/documentApi";

function UploadBox() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Files Selected:", acceptedFiles);

    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected: (rejectedFiles) => {
      console.log("Rejected:", rejectedFiles);
    },
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024,
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files first");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      setUploading(true);

      await uploadDocuments(formData, (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);

        setProgress(percent);
      });

      alert("Files uploaded successfully");

      setFiles([]);
      setProgress(0);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed gray",
          padding: "50px",
          cursor: "pointer",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <input {...getInputProps()} />

        <h3>Drag & Drop Files Here</h3>

        <p>Supported: PDF, PNG, JPG, JPEG</p>
      </div>

      {/* Selected Files */}
      <h3>Selected Files</h3>

      {files.length === 0 && <p>No files selected</p>}

      {files.map((file) => (
        <div
          key={file.name}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <div>
            <strong>Name:</strong> {file.name}
          </div>

          <div>
            <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
          </div>
        </div>
      ))}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>

      {/* Progress */}
      {uploading && (
        <div style={{ marginTop: "20px" }}>
          <h4>Upload Progress: {progress}%</h4>

          <div
            style={{
              width: "100%",
              height: "20px",
              border: "1px solid gray",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "green",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadBox;
