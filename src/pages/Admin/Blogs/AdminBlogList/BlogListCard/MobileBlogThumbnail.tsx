import { Blog } from '@/src/lib/BlogTypes';
import { FileText, Star } from 'lucide-react';
import React from 'react'

type Props = {
    blog: Blog;
}

const MobileBlogThumbnail = ({blog}: Props) => {
  return (
    <div className="flex gap-3">
      {/* Image */}
      {blog.image ? (
        <img
          src={blog.image}
          alt={blog.title}
          className="h-20 w-24 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          <FileText size={20} className="text-slate-400" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
            {blog.title}
          </h3>

          {blog.featured && (
            <Star
              size={15}
              fill="currentColor"
              className="shrink-0 text-amber-500"
            />
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {blog.category}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              blog.published
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {blog.published ? "Published" : "Draft"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MobileBlogThumbnail