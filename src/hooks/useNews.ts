import { useCallback, useEffect, useState } from "react";
import { News, NewsPagination } from "../lib/NewsTypes";
import { getToken, useAuth } from "@clerk/react";

interface UseNewsOptions {
  limit?: number;
  autoFetch?: boolean;
  global?: boolean;
}

export const useNews = ({
  limit = 10,
  autoFetch = true,
  global = false,
}: UseNewsOptions = {}) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [news, setNews] = useState<News[]>([]);
  const [pagination, setPagination] = useState<NewsPagination | null>(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    if (!global) {
      if (!isLoaded) return;

      if (!isSignedIn) {
        setError("You must be signed in");
        return;
      }
    }
    try {
      setLoading(true);
      setError(null);

      const endpoint = global ? "/api/news/published" : "/api/news";

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
        throw new Error(data.message || "Failed to fetch News");
      }

      setNews(data.data || []);
      setPagination(data.pagination || null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch News";

      console.error("Failed to fetch News:", error);

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    if (!autoFetch) return;

    if (global) {
      fetchNews();
      return;
    }

    if (isLoaded && isSignedIn) {
      fetchNews();
    }
  }, [autoFetch, global, isLoaded, isSignedIn, fetchNews]);

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
    news,
    pagination,
    page,
    loading,
    error,

    setPage,
    nextPage,
    previousPage,

    refetch: fetchNews,
  };
};
