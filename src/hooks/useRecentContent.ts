import { useBlogs } from "./useBlogs";
import { useNews } from "./useNews";

type ContentType = "blog" | "news";

export const useRecentContent = ({ contentType, limit = 2 }: { contentType: ContentType; limit?: number }) => {
  const blogResult = useBlogs({
    limit,
    autoFetch: contentType === "blog",
  });

  const newsResult = useNews({
    limit,
    autoFetch: contentType === "news",
  });

  if (contentType === "blog") {
    return {
      content: blogResult.blogs,
      pagination: blogResult.pagination,
      loading: blogResult.loading,
      error: blogResult.error,
      nextPage: blogResult.nextPage,
      previousPage: blogResult.previousPage,
    };
  }

  return {
    content: newsResult.news,
    pagination: newsResult.pagination,
    loading: newsResult.loading,
    error: newsResult.error,
    nextPage: newsResult.nextPage,
    previousPage: newsResult.previousPage,
  };
};
