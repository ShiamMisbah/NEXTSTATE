import { Blog } from '@/src/lib/BlogTypes';
import { FileText, Star } from 'lucide-react';
import React from 'react'

type Props = {
    blog: Blog
}

const BlogThumbnail = ({blog}: Props) => {
  return (
    <div className="flex items-center gap-3">
      {/* Image */}
      {blog.image ? (
        <img
          src={blog.image}
          alt={blog.title}
          className="h-14 w-20 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          <FileText size={20} className="text-slate-400" />
        </div>
      )}

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p
            className="truncate text-sm font-semibold text-slate-900"
            title={blog.title}
          >
            {blog.title}
          </p>

          {blog.featured && (
            <Star
              size={14}
              fill="currentColor"
              className="shrink-0 text-amber-500"
            />
          )}
        </div>

        <p className="mt-1 line-clamp-1 text-xs text-slate-500">
          {blog.excerpt}
        </p>
      </div>
    </div>
  );
}

export default BlogThumbnail