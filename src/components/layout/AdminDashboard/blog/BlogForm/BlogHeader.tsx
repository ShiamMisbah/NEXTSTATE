import { ArrowLeft, Loader2, Save, Send } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';



type Props = {
    loading: boolean;
    isEditMode: boolean
}

const BlogHeader = ({loading, isEditMode = false}: Props) => {
    const navigate = useNavigate();
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <button
          type="button"
          onClick={() => navigate("/admin/blog")}
          className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </button>

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {isEditMode ? "Edit Blog" : "Create Blog"}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {isEditMode
            ? "Update your blog article."
            : "Create and publish a new article."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/blogs")}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          form="create-blog-form"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={17} className="animate-spin" />
          ) : isEditMode ? (
            <Save size={17} />
          ) : (
            <Send size={17} />
          )}

          {loading
            ? isEditMode
              ? "Updating..."
              : "Publishing..."
            : isEditMode
              ? "Update Blog"
              : "Publish Blog"}
        </button>
      </div>
    </div>
  );
}

export default BlogHeader