import { Blog } from '@/src/lib/BlogTypes';
import { Eye, EyeOff, FileText, Star } from 'lucide-react';
import React from 'react'

type Props = {
    blogs: Blog[]
}

const BlogListStat = ({blogs}: Props) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Blogs</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {blogs.length}
            </p>
          </div>

          <div className="rounded-lg bg-slate-100 p-3">
            <FileText size={20} className="text-slate-600" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Published</p>

            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {blogs.filter((blog) => blog.published).length}
            </p>
          </div>

          <div className="rounded-lg bg-emerald-50 p-3">
            <Eye size={20} className="text-emerald-600" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Drafts</p>

            <p className="mt-2 text-2xl font-bold text-slate-600">
              {blogs.filter((blog) => !blog.published).length}
            </p>
          </div>

          <div className="rounded-lg bg-slate-100 p-3">
            <EyeOff size={20} className="text-slate-500" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Featured</p>

            <p className="mt-2 text-2xl font-bold text-amber-500">
              {blogs.filter((blog) => blog.featured).length}
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 p-3">
            <Star size={20} className="text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogListStat