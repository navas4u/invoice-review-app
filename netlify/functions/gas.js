export async function handler(event) {
  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbycnSJnT9ILsx8MhkjIIKBcLECmh5y1LZyTEXdYZA-2xSQgFHS5XT3Xj_tRLRM1lJE9ug/exec";

  try {
    let url = GAS_URL;

    if (event.httpMethod === "GET" && event.queryStringParameters) {
      const params = new URLSearchParams(event.queryStringParameters);
      url += "?" + params.toString();
    }

    const gasResponse = await fetch(url, {
      method: event.httpMethod,
      headers: { "Content-Type": "application/json" },
      body:
        event.httpMethod === "POST"
          ? event.body
          : undefined,
    });

    const text = await gasResponse.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
