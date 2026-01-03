// src/api.js
const API = "/api";

//const API_URL = import.meta.env.VITE_GAS_URL;

/* ---------- LOAD PENDING ---------- */
export async function getPending() {
  const res = await fetch(`${API}?action=list&status=Pending%20Review`);
  if (!res.ok) throw new Error("Failed to load invoices");
  return res.json();
}

/* ---------- SAVE INVOICE ---------- */
export async function updateInvoice(invoice) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "update",
      ...invoice
    })
  });

  const data = await res.json();
  if (!data.success) throw new Error("Save failed");
  return data;
}

/* ---------- APPROVE INVOICE ---------- */
export async function approveInvoice(row) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "approve",
      row
    })
  });

    
  const data = await res.json();
  if (!data.success) throw new Error("Approve failed");
  return data;
}

export const getApproved = () =>
  fetch(`${API}?action=list&status=Approved`)
    .then(r => r.json());




