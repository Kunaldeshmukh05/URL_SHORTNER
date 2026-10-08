import { Router } from "express";
import { createUrl, getUrlDetails } from "../controllers/url.controller.js";
import { validateCreateUrl } from "../middlewares/validateUrl.middleware.js";

const router = Router();

// Mounted at /api/urls
router.post("/", validateCreateUrl, createUrl);
router.get("/:shortCode", getUrlDetails);

export default router;