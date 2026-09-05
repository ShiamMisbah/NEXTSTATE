import { useCallback, useEffect, useState } from "react";
import { News, NewsPagination } from "../lib/NewsTypes";

interface UseNewsOptions {
  limit?: number;
  autoFetch?: boolean;
}

export const useNews = ({
  limit = 10,
  autoFetch = true,
}: UseNewsOptions = {}) => {
  const [news, setNews] = useState<News[]>([]);
  const [pagination, setPagination] = useState<NewsPagination | null>(null);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/news?page=${page}&limit=${limit}`,
        {
          credentials: "include",
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
    if (autoFetch) {
      fetchNews();
    }
  }, [autoFetch, fetchNews]);

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
