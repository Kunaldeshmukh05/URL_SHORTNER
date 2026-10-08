import rateLimit from "express-rate-limit";

// Limits link creation only; redirects stay unthrottled.
// If the API runs behind a proxy (Render, Nginx, etc.), also set app.set("trust proxy", 1)
// so the limiter sees the real client IP.
export const createUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many links created. Please try again in a few minutes.",
      code: "RATE_LIMITED",
    });
  },
});