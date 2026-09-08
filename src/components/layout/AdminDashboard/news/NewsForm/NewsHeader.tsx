import { NewsForm } from '@/src/lib/NewsTypes';
import { ArrowLeft, Eye, Loader2, Save, Send } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';



type Props = {
  isEditMode: boolean;
  slug: string;
  handlePreview: () => void;
};

const NewsHeader = ({ isEditMode = false, slug, handlePreview }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <button
          type="button"
          onClick={() => navigate("/admin/news")}
          className="mb-3 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to News
        </button>

        <h1 className="text-2xl font-bold text-slate-900">
          {isEditMode ? "Edit News" : "Create News"}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {isEditMode
            ? "Update your news article."
            : "Create and publish a new news article."}
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

export default NewsHeader