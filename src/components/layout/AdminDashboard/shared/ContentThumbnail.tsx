import { Blog } from '@/src/lib/BlogTypes';
import { News } from '@/src/lib/NewsTypes';
import { FileText, Star } from 'lucide-react';
import React from 'react'

type Props =
  | {
      content: Blog;
      type: "blog";
    }
  | {
      content: News;
      type: "news";
    };

const ContentThumbnail = ({ content, type }: Props) => {
  return (
    <div className="flex items-center gap-3">
      {/* Image */}
      {content.image ? (
        <img
          src={content.image}
          alt={content.title}
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
            title={content.title}
          >
            {content.title}
          </p>

          {type === "blog" && content.featured && (
            <Star
              size={14}
              fill="currentColor"
              className="shrink-0 text-amber-500"
            />
          )}
        </div>

        {type === "blog" && (
          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
            {content.excerpt}
          </p>
        )}

        {type === "news" && (
          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
            {content.summary}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentThumbnail