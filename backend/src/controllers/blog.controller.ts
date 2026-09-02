import { Request, Response } from "express";
import Blog from "../models/Blog";

// GET /api/blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Get blogs error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

// GET /api/blogs/:id
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Get blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

// GET /api/blogs/slug/:slug
export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Get blog by slug error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

// POST /api/blogs
export const createBlog = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      image,
      author,
      readTime,
      featured,
      published,
    } = req.body;

    // Clerk authenticated user
    const authorId = req.auth.userId;

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      image,
      author,
      authorId,
      readTime,
      featured,
      published,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error: any) {
    console.error("Create blog error:", error);

    // Duplicate slug
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

// PUT /api/blogs/:id
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      image,
      author,
      readTime,
      featured,
      published,
    } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.title = title;
    blog.slug = slug;
    blog.excerpt = excerpt;
    blog.content = content;
    blog.category = category;
    blog.image = image;
    blog.author = author;
    blog.readTime = readTime;
    blog.featured = featured;
    blog.published = published;

    const updatedBlog = await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error: any) {
    console.error("Update blog error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
};

// DELETE /api/blogs/:id
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};
