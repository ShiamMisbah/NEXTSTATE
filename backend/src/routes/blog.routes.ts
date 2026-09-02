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

const router = Router();

// Public
router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.get("/:id", getBlogById);

// Protected
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
