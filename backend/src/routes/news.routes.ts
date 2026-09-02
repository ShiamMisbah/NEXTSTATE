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

const router = Router();

// Public routes
router.get("/", getNews);
router.get("/slug/:slug", getNewsBySlug);
router.get("/:id", getNewsById);

// Protected routes
router.post("/", authMiddleware, createNews);
router.put("/:id", authMiddleware, updateNews);
router.delete("/:id", authMiddleware, deleteNews);

export default router;
