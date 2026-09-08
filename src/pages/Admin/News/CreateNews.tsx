import NewsHeader from "@/src/components/layout/AdminDashboard/news/NewsForm/NewsHeader";
import NewsMainForm from "@/src/components/layout/AdminDashboard/news/NewsForm/NewsMainForm";
import NewsSidebar from "@/src/components/layout/AdminDashboard/news/NewsForm/NewsSidebar";
import Loading from "@/src/components/ui/Loading";
import { handleSetLocalStorageWithExpiry } from "@/src/lib/LocalStorageFunc";
import { NewsForm } from "@/src/lib/NewsTypes";
import { getToken, useUser } from "@clerk/react";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const CreateNews = (props: Props) => {
  const { newsId } = useParams<{ newsId: string }>();

  const isEditMode = Boolean(newsId);

  const navigate = useNavigate();
  const { user } = useUser();

  const [form, setForm] = useState<NewsForm>({
    title: "",
    slug: "",
    summary: "",
    content: "",
    image: "",
    published: true,
    publishedAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingNews, setFetchingNews] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!newsId) return;

    setError(null);

    const fetchNews = async () => {
      try {
        setLoading(true);
        setFetchingNews(true);
        setError(null);

        // ✅ use the getToken function obtained above
        const token = await getToken();

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/news/${newsId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch news");
        }

        const news = data.data;

        setForm({
          title: news.title || "",
          slug: news.slug || "",
          summary: news.summary || "",
          content: news.content || "",
          image: news.image || "",
          published: news.published ?? true,
          publishedAt: news.publishedAt
            ? new Date(news.publishedAt).toISOString().slice(0, 16)
            : "",
        });
      } catch (err: any) {
        setError(err.message || "Failed to load news");
      } finally {
        setFetchingNews(false);
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  useEffect(() => {
    handleSetNewsLocally();
  }, [form]);

  const updateField = <K extends keyof NewsForm>(
    field: K,
    value: NewsForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!user) {
      setError("You must be logged in to create a news.");
      return;
    }

    if (!form.title.trim()) {
      setError("Please enter a news title.");
      return;
    }

    if (!form.summary.trim()) {
      setError("Please enter an summary.");
      return;
    }

    if (!form.content.trim()) {
      setError("Please enter news content.");
      return;
    }

    try {
      setLoading(true);

      // ✅ use the getToken function obtained above
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        isEditMode
          ? `${import.meta.env.VITE_API_URL}/api/news/${newsId}`
          : `${import.meta.env.VITE_API_URL}/api/news`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            title: form.title,
            slug: form.slug,
            summary: form.summary,
            content: form.content,
            image: form.image,
            published: form.published,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create news");
      }

      navigate("/admin/news");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSetNewsLocally = () =>
    handleSetLocalStorageWithExpiry("NewsPreview", form, 10 * 60 * 1000);

  const handlePreview = () => {
    handleSetNewsLocally();

    window.open(
      `/admin/news/${form.slug}/preview`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  if (fetchingNews) {
    return <Loading content="Loading Editable Document." />;
  }

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

        {/* Header */}
        <NewsHeader
          handlePreview={handlePreview}
          isEditMode={isEditMode}
          slug={form.slug}
        />

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          id="create-news-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]"
        >
          {/* ========================================
              MAIN CONTENT
          ======================================== */}
          <NewsMainForm
            form={form}
            setForm={setForm}
            loading={loading}
            updateField={updateField}
          />

          {/* ========================================
              SIDEBAR
          ======================================== */}
          <NewsSidebar
            isEditMode={isEditMode}
            loading={loading}
            form={form}
            updateField={updateField}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
