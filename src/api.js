const API = "/gas";

// --- Throttling Mechanism ---
// Queue to hold pending requests
const queue = [];
let isProcessing = false;

// Function to process the queue sequentially
const processQueue = async () => {
  if (isProcessing || queue.length === 0) return;
  isProcessing = true;

  const { url, options, resolve, reject } = queue.shift();

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    resolve(data);
  } catch (error) {
    reject(error);
  } finally {
    // Rate limit: Wait 1000ms before allowing next request
    setTimeout(() => {
      isProcessing = false;
      processQueue();
    }, 1000);
  }
};

// Wrapper for fetch to enforce throttling
const throttledFetch = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    queue.push({ url, options, resolve, reject });
    processQueue();
  });
};
// ----------------------------

export const getPending = () =>
  throttledFetch(`${API}?action=list&status=Pending Review`);

export const getApproved = () =>
  throttledFetch(`${API}?action=list&status=Approved`);

export const updateInvoice = (d) =>
  throttledFetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...d, action: "update" })
  });

export const approveInvoice = (row) =>
  throttledFetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "approve", row })
  });
