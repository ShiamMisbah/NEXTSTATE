import { ArrowLeft, Eye, Loader2, Save, Send } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';



type Props = {
  isEditMode: boolean;
  slug: string;
  handlePreview: () => void
};

const BlogHeader = ({ isEditMode = false, slug, handlePreview }: Props) => {
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

      {isEditMode && (
        <button
          type="button"
          onClick={() => handlePreview()}
          className="hidden items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:flex"
        >
          <Eye size={16} />
          Preview
        </button>
      )}
    </div>
  );
};

export default BlogHeader