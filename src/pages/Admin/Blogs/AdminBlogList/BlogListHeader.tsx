import { Plus } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const BlogListHeader = (props: Props) => {
    const navigate = useNavigate();
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Blogs</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your blog articles.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/admin/blog/create")}
        className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        <Plus size={18} />
        Create Blog
      </button>
    </div>
  );
}

export default BlogListHeader