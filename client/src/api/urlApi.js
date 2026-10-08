const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000").replace(/\/+$/, "");

const MESSAGES_BY_CODE = {
  INVALID_BODY: "Paste a link to shorten.",
  INVALID_URL: "That doesn't look like a link. Start it with http:// or https://.",
  UNSUPPORTED_PROTOCOL: "Only http:// and https:// links can be shortened.",
  SELF_REFERENCE: "That link already points to this shortener. Paste a different one.",
  URL_TOO_LONG: "That link is too long. Links can be up to 2048 characters.",
  RATE_LIMITED: "You've created a lot of links in a short time. Try again in a few minutes.",
  NETWORK: "Can't reach the server. Check that the backend is running and try again.",
};

export const getErrorMessage = (err) =>
  MESSAGES_BY_CODE[err?.code] ?? err?.message ?? "Something went wrong. Please try again.";

const request = async (path, options = {}) => {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    const error = new Error(MESSAGES_BY_CODE.NETWORK);
    error.code = "NETWORK";
    throw error;
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    // Non-JSON response; handled below.
  }

  if (!response.ok || !body?.success) {
    const error = new Error(body?.message ?? "Something went wrong. Please try again.");
    error.code = body?.code;
    error.status = response.status;
    throw error;
  }

  return body.data;
};

export const createShortUrl = (originalUrl) =>
  request("/api/urls", { method: "POST", body: JSON.stringify({ originalUrl }) });

export const fetchUrlStats = (shortCode) =>
  request(`/api/urls/${encodeURIComponent(shortCode)}`);