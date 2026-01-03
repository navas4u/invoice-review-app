// src/pages/Review.jsx
import { useEffect, useState } from "react";
import { getPending, updateInvoice, approveInvoice } from "../api";

export default function Review() {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    getPending().then(setItems);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
        {items.map(i => (
          <div key={i.row} onClick={() => setCurrent(i)}>
            {i.Vendor} | {i.Amount}
          </div>
        ))}
      </div>

      {current && (
        <div style={{ width: "70%", padding: 10 }}>
          <iframe
            src={`https://drive.google.com/file/d/${current.FileId}/preview`}
            width="100%"
            height="350"
          />

          {["Date", "Vendor", "Amount", "Tax"].map(f => (
            <input
              key={f}
              value={current[f]}
              onChange={e =>
                setCurrent({ ...current, [f]: e.target.value })
              }
            />
          ))}

          <button
  className="px-2 py-1 bg-blue-600 text-white rounded"
  onClick={async () => {
    try {
      await updateInvoice({
        row: current.row,
        Date: current.Date,
        Vendor: current.Vendor,
        Amount: current.Amount,
        Tax: current.Tax,
        FileName: inv.FileName,
        FileId: inv.FileId
      });
      alert("Saved successfully");
    } catch (err) {
      alert("Error saving");
      console.error(err);
    }
  }}
>
  Save
</button>

          <button
  className="px-2 py-1 bg-green-600 text-white rounded"
  onClick={async () => {
    try {
      await approveInvoice(inv.row);
      alert("Approved");

      // OPTIONAL: remove row from UI
      setInvoices(prev => prev.filter(r => r.row !== inv.row));

    } catch (err) {
      alert("Error approving");
      console.error(err);
    }
  }}
>
  Approve
</button>

        </div>
      )}
    </div>
  );
}
