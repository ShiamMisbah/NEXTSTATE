import { Request, Response } from "express";
import  News  from "../models/News";

// GET /api/news
export const getNews = async (
  req: Request,
  res: Response
) => {
  try {
    const news = await News.find()
      .sort({ publishedAt: -1 });

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


// GET /api/news/:id
export const getNewsById = async (
  req: Request,
  res: Response
) => {
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
export const getNewsBySlug = async (
  req: Request,
  res: Response
) => {
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
export const createNews = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      slug,
      summary,
      content,
      image,
      author,
      published,
      publishedAt,
    } = req.body;

    // Always get the author ID from Clerk
    const authorId = req.auth.userId;

    const news = await News.create({
      title,
      slug,
      summary,
      content,
      image,
      author,
      authorId,
      published,
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
export const updateNews = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      summary,
      content,
      image,
      author,
      published,
      publishedAt,
    } = req.body;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    news.title = title;
    news.slug = slug;
    news.summary = summary;
    news.content = content;
    news.image = image;
    news.author = author;
    news.published = published;

    if (publishedAt) {
      news.publishedAt = publishedAt;
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
export const deleteNews = async (
  req: Request,
  res: Response
) => {
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
