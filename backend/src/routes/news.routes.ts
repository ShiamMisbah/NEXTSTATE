import { Router } from "express";

import {
  getNews,
  getNewsById,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
  getPublishedNews,
} from "../controllers/news.controller";

import { requireAuth } from "@clerk/express";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/published", getPublishedNews);
router.get("/", getNews);
router.get("/slug/:slug", getNewsBySlug);
router.get("/:id", getNewsById);

// Protected routes
router.post("/", authMiddleware, createNews);
router.put("/:id", authMiddleware, updateNews);
router.delete("/:id", authMiddleware, deleteNews);

export default router;
