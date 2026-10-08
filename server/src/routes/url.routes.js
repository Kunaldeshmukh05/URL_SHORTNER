import { Router } from "express";
import { createUrl, getUrlDetails } from "../controllers/url.controller.js";
import { validateCreateUrl } from "../middlewares/validateUrl.middleware.js";
import { createUrlLimiter } from "../middlewares/rateLimiter.middlewares.js";
const router = Router();

// Mounted at /api/urls
router.post("/", createUrlLimiter, validateCreateUrl, createUrl);
router.get("/:shortCode", getUrlDetails);

export default router;

