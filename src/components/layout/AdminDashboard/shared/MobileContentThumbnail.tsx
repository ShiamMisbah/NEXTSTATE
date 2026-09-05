import { Blog } from '@/src/lib/BlogTypes';
import { News } from '@/src/lib/NewsTypes';
import { FileText, Star } from 'lucide-react';
import React from 'react'

type Props = | {
      content: Blog;
      type: "blog";
    }
  | {
      content: News;
      type: "news";
    };

const MobileContentThumbnail = ({ content , type}: Props) => {
  return (
    <div className="flex gap-3">
      {/* Image */}
      {content.image ? (
        <img
          src={content.image}
          alt={content.title}
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
            {content.title}
          </h3>

          {type === "blog" && content.featured && (
            <Star
              size={15}
              fill="currentColor"
              className="shrink-0 text-amber-500"
            />
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {type === "blog" && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
              {content.category}
            </span>
          )}
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              content.published
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {content.published ? "Published" : "Draft"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileContentThumbnail;