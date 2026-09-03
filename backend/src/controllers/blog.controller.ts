import { Request, Response } from "express";
import Blog from "../models/Blog";
import { clerkClient, getAuth } from "@clerk/express";

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
  console.log("ashche");
  
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      image,
      readTime,
      featured,
      published,
    } = req.body;

    // Clerk authenticated user
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, excerpt, content and category are required",
      });
    }

    
    
    // You can replace this with Clerk user information
    const author = user.username;

    if (!author) {
      return res.status(400).json({
        success: false,
        message: "Author is required",
      });
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      image: image || "",
      author,
      authorId: userId,
      readTime: readTime || "5 min read",
      featured: Boolean(featured),
      published: published !== false,
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
      readTime,
      featured,
      published,
    } = req.body;

    // Clerk authenticated user
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, excerpt, content and category are required",
      });
    }

    // You can replace this with Clerk user information
    const author = user.username;

    if (!author) {
      return res.status(400).json({
        success: false,
        message: "Author is required",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.author = author;
    blog.authorId = userId;
    blog.title = title;
    blog.slug = slug;
    blog.excerpt = excerpt;
    blog.content = content;
    blog.category = category;
    blog.image = image;
    blog.readTime = readTime || "5 min read";
    blog.featured = Boolean(featured);
    blog.published = published !== false;

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
