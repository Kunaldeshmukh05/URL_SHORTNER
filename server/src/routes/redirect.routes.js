import { Router } from "express";
import { redirectToOriginal } from "../controllers/url.controller.js";

const router = Router();

// Mounted at "/" and must be registered AFTER /api routes and /health,
// otherwise /:shortCode would swallow them.
router.get("/:shortCode", redirectToOriginal);

export default router;