import { Router } from "express";

import {
  getNews,
  getNewsById,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/news.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { requireAuth } from "@clerk/express";

const router = Router();

// Public routes
router.get("/", getNews);
router.get("/slug/:slug", getNewsBySlug);
router.get("/:id", getNewsById);

// Protected routes
router.post("/", requireAuth(), createNews);
router.put("/:id", requireAuth(), updateNews);
router.delete("/:id", requireAuth(), deleteNews);

export default router;
