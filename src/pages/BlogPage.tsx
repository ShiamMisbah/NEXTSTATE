import { ArrowLeft, Calendar, Clock, Loader2, Tag, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Blog } from "../lib/BlogTypes";

type Props = {};

const BlogPage = (props: Props) => {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blog/slug/${slug}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch blog");
        }

        setBlog(data.data);
      } catch (error) {
        console.error("Fetch blog error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load blog",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading blog...</span>
        </div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Blog not found</h1>

        <p className="mt-2 text-gray-500">
          {error || "The blog you're looking for doesn't exist."}
        </p>

        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

        {/* Hero */}
        <section className="border-b border-gray-100">
          <div className="mx-auto max-w-7xl">
            {/* Back */}
            <Link
              to="/blog"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mx-auto max-w-4xl">
              {/* Category */}
              <div className="mb-5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
                  <Tag className="h-3.5 w-3.5" />
                  {blog.category}
                </span>

                {blog.featured && (
                  <span className="rounded-full bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                {blog.title}
              </h1>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
                  {blog.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {blog.image && (
          <section className="mx-auto max-w-6xl pt-10">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-auto max-h-[650px] w-full object-cover"
              />
            </div>
          </section>
        )}

        {/* Content */}
        <section className="mx-auto max-w-4xl py-12 ">
          <article
            className="
            prose
            prose-lg
            max-w-none
            prose-headings:font-semibold
            prose-headings:tracking-tight
            prose-p:text-gray-700
            prose-p:leading-8
            prose-a:text-blue-600
            prose-a:no-underline
            hover:prose-a:underline
            prose-img:rounded-xl
            prose-strong:text-gray-900
            prose-blockquote:border-l-gray-300
            prose-blockquote:text-gray-600
          "
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />
        </section>
      </div>
    </main>
  );
};

export default BlogPage;
