import { Request, Response } from "express";
import Blog from "../models/Blog";
import News from "../models/News";


export const getContentStats = async (req: Request, res: Response) => {
    console.log("ashche");
    
  try {
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      featuredBlogs,
      totalNews,
      publishedNews,
      draftNews,
    ] = await Promise.all([
      Blog.countDocuments(),

      Blog.countDocuments({
        published: true,
      }),

      Blog.countDocuments({
        published: false,
      }),

      Blog.countDocuments({
        featured: true,
      }),

      News.countDocuments(),

      News.countDocuments({
        published: true,
      }),

      News.countDocuments({
        published: false,
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          drafts: draftBlogs,
          featured: featuredBlogs,
        },

        news: {
          total: totalNews,
          published: publishedNews,
          drafts: draftNews,
        },
      },
    });
  } catch (error) {
    console.error("Error getting content stats:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get content statistics",
    });
  }
};
