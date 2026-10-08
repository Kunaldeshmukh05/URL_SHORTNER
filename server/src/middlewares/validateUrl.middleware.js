import { MAX_URL_LENGTH } from "../models/url.model.js";
import ApiError from "../utils/ApiError.js";
import getBaseUrl from "../utils/getBaseUrl.js";

export const validateCreateUrl = (req, res, next) => {
  const raw = req.body?.originalUrl;

  if (typeof raw !== "string" || raw.trim() === "") {
    return next(new ApiError(400, "originalUrl is required and must be a string", "INVALID_BODY"));
  }

  const value = raw.trim();

  if (value.length > MAX_URL_LENGTH) {
    return next(
      new ApiError(422, `originalUrl must be at most ${MAX_URL_LENGTH} characters`, "URL_TOO_LONG")
    );
  }

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return next(
      new ApiError(
        422,
        "originalUrl is not a valid URL (include http:// or https://)",
        "INVALID_URL"
      )
    );
  }

  // Blocks javascript:, data:, file:, ftp: etc. (redirecting to javascript: is an XSS vector)
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return next(
      new ApiError(422, "Only http and https URLs are allowed", "UNSUPPORTED_PROTOCOL")
    );
  }

  // Prevent shortening links that point back at this service (redirect loops).
  try {
    if (parsed.host === new URL(getBaseUrl()).host) {
      return next(new ApiError(422, "Cannot shorten a link to this service", "SELF_REFERENCE"));
    }
  } catch {
    // BASE_URL misconfigured: skip the self-reference check rather than blocking requests.
  }

  req.body.originalUrl = value;
  next();
};