import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { News } from "../lib/NewsTypes";
import { ArrowLeft, Calendar } from "lucide-react";
import Loading from "../components/ui/Loading";
import { formatDate } from "./Admin/Blogs/AdminBlogs";
import CustomCursor from "../components/layout/CustomCursor";

type Props = {};

const NewsPage = (props: Props) => {
  const { slug } = useParams<{ slug: string }>();

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchnews = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/news/slug/${slug}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch news");
        }

        setNews(data.data);
      } catch (error) {
        console.error("Fetch news error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load news",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchnews();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error || !news) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">news not found</h1>

        <p className="mt-2 text-gray-500">
          {error || "The news you're looking for doesn't exist."}
        </p>

        <Link
          to="/news"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Link>
      </main>
    );
  }

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <CustomCursor theme="light" />
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />
        <main className="min-h-screen">
          {/* Article Header */}
          <section className="">
            <div className="">
              {/* Back */}
              <Link
                to="/news"
                className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Link>
              {/* Title */}
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {news.title}
              </h1>

              {/* Summary */}
              {news.summary && (
                <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600 sm:text-xl">
                  {news.summary}
                </p>
              )}

              {/* Meta */}
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                {news.author && (
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                      {news.author.charAt(0).toUpperCase()}
                    </div>

                    <span className="font-medium text-slate-700">
                      {news.author}
                    </span>
                  </div>
                )}

                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(news.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          {news.image && (
            <section className="mx-auto max-w-6xl pt-10">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={news.image}
                  alt={news.title}
                  className="h-auto max-h-[600px] w-full object-cover"
                />
              </div>
            </section>
          )}

          {/* Article Content */}
          <section className="py-12 ">
            <article
              className="view-content"
              dangerouslySetInnerHTML={{ __html: news.content || "" }}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default NewsPage;
