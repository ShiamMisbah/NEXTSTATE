import React from 'react'
import { Link } from 'react-router-dom';
import RecentContentCard, { RecentContent } from './RecentContentCard';
import { useBlogs } from '@/src/hooks/useBlogs';
import { Blog } from '@/src/lib/BlogTypes';
import Pagination from '@/src/components/ui/Pagination';
import { FileText, Loader2 } from 'lucide-react';



type Props = {
  cardTitle: string;
  cardSubtitle: string;
  targetLink: "blog" | "news";
  contentType: "blog" | "news";
}

export const mapBlogToRecentContent = (blog: Blog): RecentContent => ({
  title: blog.title,
  category: blog.category,
  date: new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  status: blog.published ? "Published" : "Draft",
});

const RecentBlogCollection = ({cardTitle, cardSubtitle, targetLink}: Props) => {
  const { blogs, pagination, loading, error, nextPage, previousPage } =
    useBlogs({ limit: 2 });

  const recentContent = blogs.map(mapBlogToRecentContent);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 size={24} className="mx-auto animate-spin text-slate-400" />

          <p className="mt-3 text-sm text-slate-500">Loading blogs...</p>
        </div>
      ) : recentContent.length === 0 ? (
        <div className="py-20 text-center">
          <FileText size={40} className="mx-auto text-slate-300" />

          <p className="mt-3 font-medium text-slate-600">No blogs found</p>
        </div>
      ) : (
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="font-semibold text-gray-900">{cardTitle}</h2>
                <p className="mt-1 text-xs text-gray-500">{cardSubtitle}</p>
              </div>

              <Link
                to={`/admin/${targetLink}`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {recentContent.map((content) => (
                <RecentContentCard content={content} key={content.title} />
              ))}
            </div>
          </div>
          {pagination && (
            <Pagination
              nextPage={nextPage}
              previousPage={previousPage}
              pagination={pagination}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default RecentBlogCollection