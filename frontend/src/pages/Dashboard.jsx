import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getDocuments,
  deleteDocument,
} from "../api/documentApi";

import DocumentTable from "../components/DocumentTable";

function Dashboard() {
  const [documents, setDocuments] = useState([]);

  const loadDocuments = async () => {
    try {
      const response = await getDocuments();

      setDocuments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this document?"
    );

    if (!ok) return;

    try {
      await deleteDocument(id);

      loadDocuments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (id) => {
    console.log(id);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Uploaded Documents
        </h1>

        <Link
          to="/upload"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Upload Documents
        </Link>
      </div>

      <DocumentTable
        documents={documents}
        onDelete={handleDelete}
        onView={handleView}
      />
    </DashboardLayout>
  );
}

export default Dashboard;