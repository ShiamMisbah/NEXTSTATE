import Empty from '@/src/components/ui/Empty';
import Loading from '@/src/components/ui/Loading';
import { News } from '@/src/lib/NewsTypes';
import { formatDate } from '@/src/pages/Admin/Blogs/AdminBlogs';
import { Calendar } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react'
import NewsActionButtonSet from './NewsActionButtonSet';
import ContentThumbnail from '../../shared/ContentThumbnail';

type Props = {
  loading: boolean;
  filteredNews: News[];
  setNews: Dispatch<SetStateAction<News[]>>;
};

const DesktopNewsListTable = ({ loading, filteredNews, setNews }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50">
          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            Blog
          </th>

          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            Author
          </th>

          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            Status
          </th>

          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            Date
          </th>

          <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-100">
        {loading ? (
          <tr>
            <td colSpan={6} className="py-20 text-center">
              <Loading content="Loading Blogs ..." />
            </td>
          </tr>
        ) : filteredNews.length === 0 ? (
          <tr>
            <td colSpan={6} className="py-20 text-center">
              <Empty content="No blogs found" />
            </td>
          </tr>
        ) : (
          filteredNews.map((news) => (
            <tr key={news._id} className="transition hover:bg-slate-50">
              {/* news */}
              <td className="max-w-md px-5 py-4">
                <ContentThumbnail type='news' content={news} />
              </td>

              {/* Author */}
              <td className="px-5 py-4">
                <span className="text-sm text-slate-600">{news.author}</span>
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    news.published
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {news.published ? "Published" : "Draft"}
                </span>
              </td>

              {/* Date */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={14} />

                  {formatDate(news.createdAt)}
                </div>
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <NewsActionButtonSet news={news} setNews={setNews} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DesktopNewsListTable