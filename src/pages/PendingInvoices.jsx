import React, { useEffect, useState } from "react";
import { getPending, updateInvoice, approveInvoice } from "../api";

const PendingInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await getPending();
      setInvoices(data);
    } catch (err) {
      setNotice({ type: "error", message: "❌ Failed to load invoices" });
    }
  };

  const handleSelect = (invoice) => {
    setSelected(invoice);
  };

  const handleChange = (field, value) => {
    setSelected({ ...selected, [field]: value });
  };

  const handleSave = async () => {
    try {
      const res = await updateInvoice(selected);
      if (res.success) {
        setNotice({ type: "success", message: "Invoice updated successfully ✅" });
        setSelected(null);
        loadInvoices();
      }
    } catch {
      setNotice({ type: "error", message: "❌ Failed to save invoice" });
    }
  };

  const handleApprove = async () => {
    try {
      const res = await approveInvoice(selected.row);
      if (res.success) {
        setNotice({ type: "success", message: "Invoice approved successfully ✅" });
        setSelected(null);
        loadInvoices();
      }
    } catch {
      setNotice({ type: "error", message: "❌ Failed to approve invoice" });
    }
  };

  return (
    <div className="p-4 space-y-6">

      {/* Notice */}
      {notice && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm transition
            ${notice.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"}
          `}
        >
          {notice.message}
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <h2 className="text-lg font-semibold p-4 border-b">
            Pending Invoices
          </h2>

          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Vendor</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-right">Tax</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {invoices.map((inv, i) => {
                const isSelected = selected?.row === inv.row;
                return (
                  <tr
                    key={i}
                    onClick={() => handleSelect(inv)}
                    className={`cursor-pointer transition
                      ${isSelected ? "bg-blue-100 border-l-4 border-blue-600" : "hover:bg-gray-100"}
                    `}
                  >
                    <td className="px-4 py-3">{inv.Date}</td>
                    <td className="px-4 py-3 font-medium">{inv.Vendor}</td>
                    <td className="px-4 py-3 text-right">{inv.Amount}</td>
                    <td className="px-4 py-3 text-right">{inv.Tax}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                        {inv.Status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Section */}
      {selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">

          {/* Edit Form */}
          <div className="space-y-3">
            <h3 className="font-semibold">Invoice Details</h3>

            <input
              className="w-full border p-2 rounded"
              value={selected.Vendor}
              onChange={(e) => handleChange("Vendor", e.target.value)}
              placeholder="Vendor"
            />

            <input
              className="w-full border p-2 rounded"
              value={selected.Amount}
              onChange={(e) => handleChange("Amount", e.target.value)}
              placeholder="Amount"
            />

            <input
              className="w-full border p-2 rounded"
              value={selected.Tax}
              onChange={(e) => handleChange("Tax", e.target.value)}
              placeholder="Tax"
            />

            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleApprove}
              >
                Approve
              </button>
            </div>
          </div>

          {/* PDF Preview */}
          <div className="h-[500px] border rounded">
            <iframe
              title="Invoice PDF"
              className="w-full h-full"
              src={`https://drive.google.com/file/d/${selected.FileId}/preview`}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default PendingInvoices;
