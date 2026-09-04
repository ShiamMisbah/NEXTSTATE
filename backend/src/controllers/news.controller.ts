import { Request, Response } from "express";
import News from "../models/News";
import { clerkClient, getAuth } from "@clerk/express";

// GET /api/news?page=1&limit=10
export const getNews = async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const skip = (page - 1) * limit;

    const [news, totalNews] = await Promise.all([
      News.find().sort({ createdAt: -1 }).skip(skip).limit(limit),

      News.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalNews / limit);

    return res.status(200).json({
      success: true,
      data: news,
      pagination: {
        currentPage: page,
        limit,
        totalNews,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get news error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch news",
    });
  }
};

// GET /api/news/:id
export const getNewsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Get news error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch news",
    });
  }
};

// GET /api/news/slug/:slug
export const getNewsBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const news = await News.findOne({ slug });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Get news by slug error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch news",
    });
  }
};

// POST /api/news
export const createNews = async (req: Request, res: Response) => {
  try {
    const { title, slug, summary, content, image, published, publishedAt } =
      req.body;

    // Clerk authenticated user
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    if (!title || !summary || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, summary, and content are required",
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

    const news = await News.create({
      title,
      slug,
      summary,
      content,
      image: image || "",
      author,
      authorId: userId,
      published: published !== false,
      publishedAt: publishedAt || new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "News created successfully",
      data: news,
    });
  } catch (error: any) {
    console.error("Create news error:", error);

    // Duplicate slug
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A news article with this slug already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create news",
    });
  }
};

// PUT /api/news/:id
export const updateNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { title, slug, summary, content, image, published, publishedAt } =
      req.body;

    // Clerk authenticated user
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    if (title !== undefined) news.title = title;
    if (slug !== undefined) news.slug = slug;
    if (summary !== undefined) news.summary = summary;
    if (content !== undefined) news.content = content;
    if (image !== undefined) news.image = image;
    if (published !== undefined) news.published = published;

    if (publishedAt) {
      news.publishedAt = publishedAt;
    }

    // Only change author when you are intentionally attributing
    // the update to the current Clerk user.
    const user = await clerkClient.users.getUser(userId);

    const author =
      user.username || user.firstName || user.emailAddresses?.[0]?.emailAddress;

    if (author) {
      news.author = author;
      news.authorId = userId;
    }

    const updatedNews = await news.save();

    return res.status(200).json({
      success: true,
      message: "News updated successfully",
      data: updatedNews,
    });
  } catch (error: any) {
    console.error("Update news error:", error);

    // Duplicate slug
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A news article with this slug already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update news",
    });
  }
};

// DELETE /api/news/:id
export const deleteNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    await news.deleteOne();

    return res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("Delete news error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete news",
    });
  }
};
