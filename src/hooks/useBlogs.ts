import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

import { Blog, BlogPagination } from "../lib/BlogTypes";

interface UseBlogsOptions {
  limit?: number;
  autoFetch?: boolean;
  global?: boolean;
}

export const useBlogs = ({
  limit = 10,
  autoFetch = true,
  global = false,
}: UseBlogsOptions = {}) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<BlogPagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    if (!global && (!isLoaded || !isSignedIn)) return;

    try {
      setLoading(true);
      setError(null);

      const endpoint = global ? "/api/blog/published" : "/api/blog";

      const headers: HeadersInit = {};

      if (!global) {
        const token = await getToken();

        if (!token) {
          throw new Error("Authentication token not found");
        }

        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}?page=${page}&limit=${limit}`,
        {
          headers,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(data.data || []);
      setPagination(data.pagination || null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch blogs",
      );
    } finally {
      setLoading(false);
    }
  }, [global, page, limit, isLoaded, isSignedIn, getToken]);

  useEffect(() => {
    if (!autoFetch) return;

    if (global) {
      fetchBlogs();
      return;
    }

    if (!isLoaded || !isSignedIn) return;

    fetchBlogs();

  }, [autoFetch, global, isLoaded, isSignedIn, fetchBlogs]);

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
