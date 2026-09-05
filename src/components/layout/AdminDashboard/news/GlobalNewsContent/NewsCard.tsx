import { News } from '@/src/lib/NewsTypes';
import { formatDate } from '@/src/pages/Admin/Blogs/AdminBlogs';
import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
    news: News
}

const NewsCard = ({news}: Props) => {
  return (
    <div>
      <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
        {/* Image */}
        <Link to={`/news/${news.slug}`}>
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            {news.image ? (
              <img
                src={news.image}
                alt={news.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                No image
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
            <span>{formatDate(news.publishedAt || news.createdAt)}</span>

            {news.author && (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{news.author}</span>
              </>
            )}
          </div>

          {/* Title */}
          <Link to={`/news/${news.slug}`}>
            <h2 className="line-clamp-2 text-xl font-semibold leading-7 text-slate-900 transition-colors group-hover:text-blue-600">
              {news.title}
            </h2>
          </Link>

          {/* Summary */}
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {news.summary}
          </p>

          {/* Read more */}
          <Link
            to={`/news/${news.slug}`}
            className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Read more
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </article>
    </div>
  );
}

export default NewsCard