import { Blog } from '@/src/lib/BlogTypes';
import React from 'react'



export interface RecentContent {
  title: string;
  author: string;
  category?: string;
  date: string;
  status: "Published" | "Draft";
}

type Props = {
  content: RecentContent;
};

const RecentContentCard = ({content}: Props) => {
  return (
    <div
      key={content.title}
      className="flex items-center justify-between gap-4 p-5"
    >
      <div className="min-w-0">
        <h3 className="truncate text-sm font-medium text-gray-900">
          {content.title}
        </h3>

        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
          {content.category ? (
            <span>{content.category}</span>
          ) : (
            <span>{content.author}</span>
          )}
          <span>•</span>
          <span>{content.date}</span>
        </div>
      </div>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
          content.status === "Published"
            ? "bg-green-50 text-green-700"
            : "bg-yellow-50 text-yellow-700"
        }`}
      >
        {content.status}
      </span>
    </div>
  );
}

export default RecentContentCard