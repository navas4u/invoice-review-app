const API =
  "https://invoice-review-proxy.netlify.app/.netlify/functions/gas";
  
export const getPending = () =>
  fetch(`${API}?action=list&status=Pending Review`).then(r => r.json());

export const getApproved = () =>
  fetch(`${API}?action=list&status=Approved`).then(r => r.json());

export const updateInvoice = (d) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...d, action: "update" })
  }).then(r => r.json());

export const approveInvoice = (row) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "approve", row })
  }).then(r => r.json());
