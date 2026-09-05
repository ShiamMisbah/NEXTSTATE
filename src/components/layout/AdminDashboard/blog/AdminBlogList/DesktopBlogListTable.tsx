import { Calendar, FileText, Loader2 } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react'
import ActionButtonSet from './ActionButtonSet';
import BlogThumbnail from '../../shared/ContentThumbnail';
import { Blog } from '@/src/lib/BlogTypes';
import { formatDate } from '@/src/pages/Admin/Blogs/AdminBlogs';
import Loading from '@/src/components/ui/Loading';
import Empty from '@/src/components/ui/Empty';
import ContentThumbnail from '../../shared/ContentThumbnail';

type Props = {
  loading: boolean;
  filteredBlogs: Blog[];
  setBlogs: Dispatch<SetStateAction<Blog[]>>;
};

const DesktopBlogListTable = ({ loading, filteredBlogs, setBlogs }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50">
          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            Blog
          </th>

          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            Category
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
        ) : filteredBlogs.length === 0 ? (
          <tr>
            <td colSpan={6} className="py-20 text-center">
              <Empty content="No blogs found" />
            </td>
          </tr>
        ) : (
          filteredBlogs.map((blog) => (
            <tr key={blog._id} className="transition hover:bg-slate-50">
              {/* Blog */}
              <td className="max-w-md px-5 py-4">
                <ContentThumbnail type='blog' content={blog} />
              </td>

              {/* Category */}
              <td className="px-5 py-4">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {blog.category}
                </span>
              </td>

              {/* Author */}
              <td className="px-5 py-4">
                <span className="text-sm text-slate-600">{blog.author}</span>
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    blog.published
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {blog.published ? "Published" : "Draft"}
                </span>
              </td>

              {/* Date */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={14} />

                  {formatDate(blog.createdAt)}
                </div>
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <ActionButtonSet blog={blog} setBlogs={setBlogs} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DesktopBlogListTable