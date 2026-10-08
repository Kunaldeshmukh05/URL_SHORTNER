import ApiError from "../utils/apiError.js";

// Mount after all routes: turns unmatched requests into a consistent 404.
export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`, "NOT_FOUND"));
};

// Mount last. Express recognises error handlers by their 4 arguments.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ success: false, message: err.message, code: err.code });
  }

  // Malformed JSON body (thrown by express.json)
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON body", code: "INVALID_JSON" });
  }

  // Body larger than the express.json limit
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ success: false, message: "Request body too large", code: "BODY_TOO_LARGE" });
  }

  // Mongoose schema validation failure
  if (err?.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join("; ");
    return res.status(422).json({ success: false, message, code: "VALIDATION_ERROR" });
  }

  console.error(err);
  return res
    .status(500)
    .json({ success: false, message: "Internal server error", code: "INTERNAL_ERROR" });
};