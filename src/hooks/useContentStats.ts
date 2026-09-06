import { useEffect, useState } from "react";

import { useAuth } from "@clerk/react";

export interface ContentStats {
  blogs: {
    total: number;
    published: number;
    drafts: number;
    featured: number;
  };

  news: {
    total: number;
    published: number;
    drafts: number;
  };
}

export interface ContentStatsResponse {
  success: boolean;
  data: ContentStats;
}

export const useContentStats = () => {
  // ✅ Hook called at top level
  const { getToken } = useAuth();

  const [stats, setStats] = useState<ContentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // ✅ use the getToken function obtained above
      const token = await getToken();
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch content statistics");
      }

      const result: ContentStatsResponse = await response.json();

      setStats(result.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch content statistics",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
};