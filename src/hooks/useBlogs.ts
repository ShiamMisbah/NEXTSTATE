import { useCallback, useEffect, useState } from "react";
import { Blog, BlogPagination } from "../lib/BlogTypes";

interface UseBlogsOptions {
  limit?: number;
  autoFetch?: boolean;
}

export const useBlogs = ({
  limit = 10,
  autoFetch = true,
}: UseBlogsOptions = {}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<BlogPagination | null>(null);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog?page=${page}&limit=${limit}`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(data.data || []);
      setPagination(data.pagination || null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch blogs";

      console.error("Failed to fetch blogs:", error);

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    if (autoFetch) {
      fetchBlogs();
    }
  }, [autoFetch, fetchBlogs]);

  const nextPage = () => {
    if (pagination?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (pagination?.hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    blogs,
    pagination,
    page,
    loading,
    error,

    setPage,
    nextPage,
    previousPage,

    refetch: fetchBlogs,
  };
};
