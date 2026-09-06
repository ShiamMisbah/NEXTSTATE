import { RecentContent } from "../components/layout/AdminDashboard/ContentManagement/RecentContentCard";
import { Blog } from "./BlogTypes";
import { News } from "./NewsTypes";

export const mapBlogToRecentContent = (blog: Blog): RecentContent => ({
  title: blog.title,
  category: blog.category,
  date: new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  status: blog.published ? "Published" : "Draft",
  author: blog.author,
  views: blog.views,
});

export const mapNewsToRecentContent = (news: News): RecentContent => ({
  title: news.title,
  date: new Date(news.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  status: news.published ? "Published" : "Draft",
  author: news.author,
  views: news.views,
});
