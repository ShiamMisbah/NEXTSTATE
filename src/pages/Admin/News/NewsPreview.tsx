import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { News } from "@/src/lib/NewsTypes";
import Loading from "@/src/components/ui/Loading";
import { handleGetLocalStorage } from "@/src/lib/LocalStorageFunc";

type Props = {};

const NewsPreview = (props: Props) => {
  const news = handleGetLocalStorage("NewsPreview");

  if (!news) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Preview News is unavailable.</p>
      </div>
    );
  }

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />
        <main className="min-h-screen">
          {/* Article Header */}
          <section className="">
            <div className="">
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

export default NewsPreview;
