// ApprovedInvoices.jsx
import React, { useState, useEffect } from "react";
import { getApproved } from "../api"; // Ensure your api.js has getApproved
import * as XLSX from "xlsx";

const ApprovedInvoices = () => {
  // 1️⃣ States
  const [approvedInvoices, setApprovedInvoices] = useState([]); // All approved invoices
  const [loading, setLoading] = useState(true);                 // Loading state
  const [error, setError] = useState(null);                     // Error state
  const [previewRow, setPreviewRow] = useState(null);           // Single row for PDF preview
  const [checkedRows, setCheckedRows] = useState([]);           // Multiple rows for export
  const [selectAll, setSelectAll] = useState(false);            // Select All checkbox

  // 2️⃣ Load approved invoices from API
  useEffect(() => {
    getApproved()
      .then((data) => {
        setApprovedInvoices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load approved invoices");
        setLoading(false);
      });
  }, []);

  // 3️⃣ Handle row click → preview PDF
  const handleRowClick = (row) => {
    setPreviewRow(row);
  };

  // 4️⃣ Handle individual checkbox toggle
  const handleCheck = (row) => {
    if (checkedRows.includes(row)) {
      setCheckedRows(checkedRows.filter((r) => r !== row));
    } else {
      setCheckedRows([...checkedRows, row]);
    }
  };

  // 5️⃣ Handle Select All checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedRows([]);
      setSelectAll(false);
    } else {
      setCheckedRows(approvedInvoices.map((inv) => inv.row));
      setSelectAll(true);
    }
  };

  // 6️⃣ Get only checked invoices for export
  const getCheckedInvoices = () =>
    approvedInvoices.filter((inv) => checkedRows.includes(inv.row));

  // 7️⃣ Export JSON
  const exportJSON = () => {
    const data = getCheckedInvoices();
    if (!data.length) {
      alert("No invoices selected for export");
      return;
    }
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "approved_invoices.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // 8️⃣ Export CSV
  const exportCSV = () => {
    const data = getCheckedInvoices();
    if (!data.length) {
      alert("No invoices selected for export");
      return;
    }
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","), // Header row
      ...data.map((row) =>
        headers
          .map((field) => `"${row[field] != null ? row[field] : ""}"`)
          .join(",")
      ),
    ];
    const csvString = csvRows.join("\r\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "approved_invoices.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // 9️⃣ Export Excel (XLSX)
  const exportExcel = () => {
    const data = getCheckedInvoices();
    if (!data.length) {
      alert("No invoices selected for export");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ApprovedInvoices");
    XLSX.writeFile(workbook, "approved_invoices.xlsx");
  };

  // 10️⃣ Loading / Error UI
  if (loading) return <div>Loading approved invoices...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Approved Invoices</h2>

      {/* Export buttons */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={exportJSON}
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Export JSON
        </button>
        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
        <button
          onClick={exportExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
      </div>

      {/* Invoice table */}
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Vendor</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3 text-right">Tax</th>
            <th className="px-4 py-3">File Name</th>
          </tr>
        </thead>
        <tbody>
          {approvedInvoices.map((inv) => (
            <tr
              key={inv.row}
              onClick={() => handleRowClick(inv.row)}
              className={`cursor-pointer transition ${
                previewRow === inv.row
                  ? "bg-blue-100 border-l-4 border-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={checkedRows.includes(inv.row)}
                  onChange={(e) => {
                    e.stopPropagation(); // prevent triggering row click
                    handleCheck(inv.row);
                  }}
                />
              </td>
              <td className="px-4 py-3">{inv.Date}</td>
              <td className="px-4 py-3">{inv.Vendor}</td>
              <td className="px-4 py-3 text-right">{inv.Amount}</td>
              <td className="px-4 py-3 text-right">{inv.Tax}</td>
              <td className="px-4 py-3">{inv.FileName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PDF preview */}
      {previewRow && (
        <div className="mt-4 border p-4">
          <h3 className="font-semibold mb-2">PDF Preview</h3>
          {(() => {
            const inv = approvedInvoices.find((i) => i.row === previewRow);
            if (!inv) return null;
            return (
              <iframe
                src={`https://drive.google.com/file/d/${inv.FileId}/preview`}
                width="100%"
                height="600px"
                title="Invoice Preview"
              ></iframe>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ApprovedInvoices;
