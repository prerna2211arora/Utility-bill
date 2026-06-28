function DocumentTable({
  documents,
  onView,
  onDelete,
}) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>File</th>
          <th>Type</th>
          <th>Status</th>
          <th>Uploaded</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {documents.map((doc) => (
          <tr key={doc._id}>
            <td>{doc.originalName}</td>

            <td>{doc.fileType}</td>

            <td>{doc.status}</td>

            <td>
              {new Date(
                doc.createdAt
              ).toLocaleDateString()}
            </td>

            <td>
              <button
                onClick={() =>
                  onView(doc._id)
                }
              >
                View
              </button>

              <button
                onClick={() =>
                  onDelete(doc._id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DocumentTable;