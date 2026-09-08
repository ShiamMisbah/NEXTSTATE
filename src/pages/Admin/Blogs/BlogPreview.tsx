import Loading from "@/src/components/ui/Loading";
import { Blog } from "@/src/lib/BlogTypes";
import { handleGetLocalStorage } from "@/src/lib/LocalStorageFunc";
import { ArrowLeft, Calendar, Clock, Loader2, Tag, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

type Props = {};


const BlogPreview = (props: Props) => {

  const blog = handleGetLocalStorage("blogPreview")

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Preview Blog is unavailable.</p>
      </div>
    );
  }

  return (
    <main className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

        {/* Page Heading */}
        <div className="text-center  mb-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-600 mb-6">
            Blog Preview
          </h1>
          <hr />
        </div>

        {/* Hero */}
        <section className="border-b border-gray-100">
          <div className="mx-auto max-w-7xl">
            <div className="">
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
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                      {blog.author.charAt(0).toUpperCase()}
                    </div>

                    <span className="font-medium text-slate-700">
                      {blog.author}
                    </span>
                  </div>
                )}

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
        <section className="py-12 ">
          <article
            className="view-content"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />
        </section>
      </div>
    </main>
  );
};

export default BlogPreview;
