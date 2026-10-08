import Url, { SHORT_CODE_LENGTH, SHORT_CODE_PATTERN } from "../models/url.model.js";
import generateCode from "../utils/generateCode.js";
import ApiError from "../utils/apiError.js";

const MAX_CREATE_ATTEMPTS = 5;

const isValidShortCode = (code) =>
  typeof code === "string" && code.length === SHORT_CODE_LENGTH && SHORT_CODE_PATTERN.test(code);

/**
 * Create a short URL. The unique index on shortCode is the real collision guard:
 * on a duplicate-key error for shortCode we regenerate and retry.
 */
export const createShortUrl = async (originalUrl) => {
  for (let attempt = 1; attempt <= MAX_CREATE_ATTEMPTS; attempt++) {
    try {
      return await Url.create({ originalUrl, shortCode: generateCode() });
    } catch (err) {
      const isCodeCollision = err?.code === 11000 && err?.keyPattern?.shortCode;
      if (!isCodeCollision) throw err;
    }
  }

  throw new ApiError(
    500,
    "Could not generate a unique short code, please try again",
    "CODE_GENERATION_FAILED"
  );
};

/**
 * Resolve a short code to its original URL and record the click atomically.
 * Throws 404 if unknown, 410 if expired.
 */
export const resolveShortCode = async (shortCode) => {
  if (!isValidShortCode(shortCode)) {
    throw new ApiError(404, "Short link not found", "NOT_FOUND");
  }

  const now = new Date();

  const doc = await Url.findOneAndUpdate(
    {
      shortCode,
      $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: now } }],
    },
    { $inc: { clicks: 1 }, $set: { lastAccessedAt: now } },
    { new: true, timestamps: false } // clicks should not bump updatedAt
  ).lean();

  if (doc) return doc.originalUrl;

  // Not resolvable: distinguish expired (410) from unknown (404).
  const exists = await Url.exists({ shortCode });
  if (exists) throw new ApiError(410, "This short link has expired", "LINK_EXPIRED");

  throw new ApiError(404, "Short link not found", "NOT_FOUND");
};

/** Metadata for a short code, without counting a click. */
export const getUrlStats = async (shortCode) => {
  if (!isValidShortCode(shortCode)) {
    throw new ApiError(404, "Short link not found", "NOT_FOUND");
  }

  const doc = await Url.findOne({ shortCode })
    .select("originalUrl shortCode clicks lastAccessedAt expiresAt createdAt")
    .lean();

  if (!doc) throw new ApiError(404, "Short link not found", "NOT_FOUND");

  return doc;
};