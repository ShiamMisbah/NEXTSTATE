import { Router } from "express";

import {
  getBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { requireAuth } from "@clerk/express";

const router = Router();

// Public
router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.get("/:id", getBlogById);

// Protected
router.post("/", requireAuth(), createBlog);
router.put("/:id", requireAuth(), updateBlog);
router.delete("/:id", requireAuth(), deleteBlog);

export default router;
