import { createShortUrl, resolveShortCode, getUrlStats } from "../services/url.service.js";
import getBaseUrl from "../utils/getBaseUrl.js";
// Express 4 does not catch rejected promises, so forward them to the error handler.
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const toShortUrl = (shortCode) => `${getBaseUrl()}/${shortCode}`;

// POST /api/urls
export const createUrl = asyncHandler(async (req, res) => {
  const doc = await createShortUrl(req.body.originalUrl);

  res.status(201).json({
    success: true,
    data: {
      originalUrl: doc.originalUrl,
      shortCode: doc.shortCode,
      shortUrl: toShortUrl(doc.shortCode),
      createdAt: doc.createdAt,
    },
  });
});

// GET /api/urls/:shortCode
export const getUrlDetails = asyncHandler(async (req, res) => {
  const doc = await getUrlStats(req.params.shortCode);

  res.status(200).json({
    success: true,
    data: { ...doc, shortUrl: toShortUrl(doc.shortCode) },
  });
});

// GET /:shortCode
// 302 (not 301) so browsers do not cache the redirect and clicks keep being counted.
export const redirectToOriginal = asyncHandler(async (req, res) => {
  const originalUrl = await resolveShortCode(req.params.shortCode);
  res.redirect(302, originalUrl);
});