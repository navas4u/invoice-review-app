export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // CORS Headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Target GAS URL (from your original file)
  const GAS_URL = "https://script.google.com/macros/s/AKfycbycnSJnT9ILsx8MhkjIIKBcLECmh5y1LZyTEXdYZA-2xSQgFHS5XT3Xj_tRLRM1lJE9ug/exec";

  // Construct Target URL
  let targetUrl = GAS_URL;
  if (request.method === "GET") {
    targetUrl += url.search;
  }

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: request.method === "POST" ? request.body : undefined,
    });

    const text = await response.text();

    return new Response(text, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
