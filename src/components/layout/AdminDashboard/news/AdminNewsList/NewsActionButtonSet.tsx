import { News } from "@/src/lib/NewsTypes";
import { Edit, Eye, EyeOff, Loader2, Star, Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  news: News;
  setNews: Dispatch<SetStateAction<News[]>>
};

const NewsActionButtonSet = ({ news, setNews }: Props) => {
  const navigate = useNavigate();

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handlePublishToggle = async (news: News) => {
    try {
      setActionLoading(news._id);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/news/${news._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            published: !news.published,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update news");
      }

      setNews((prev) =>
        prev.map((item) =>
          item._id === news._id
            ? {
                ...item,
                published: !item.published,
              }
            : item,
        ),
      );
    } catch (error: any) {
      alert(error.message || "Failed to update news");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (news: News) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${news.title}"?`,
    );

    if (!confirmed) return;

    try {
      setActionLoading(news._id);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/news/${news._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete news");
      }

      setNews((prev) => prev.filter((item) => item._id !== news._id));
    } catch (error: any) {
      alert(error.message || "Failed to delete news");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1 mx-2">
      {/* View */}
      <button
        type="button"
        title="View"
        onClick={() => navigate(`/news/${news.slug}`)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
      >
        <Eye size={17} />
      </button>

      {/* Edit */}
      <button
        type="button"
        title="Edit"
        onClick={() => navigate(`/admin/news/${news._id}/edit`)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
      >
        <Edit size={17} />
      </button>

      {/* Publish */}
      <button
        type="button"
        title={news.published ? "Unpublish" : "Publish"}
        disabled={actionLoading === news._id}
        onClick={() => handlePublishToggle(news)}
        className={`rounded-lg p-2 transition ${
          news.published
            ? "text-emerald-600 hover:bg-emerald-50"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {actionLoading === news._id ? (
          <Loader2 size={17} className="animate-spin" />
        ) : news.published ? (
          <EyeOff size={17} />
        ) : (
          <Eye size={17} />
        )}
      </button>

      {/* Delete */}
      <button
        type="button"
        title="Delete"
        disabled={actionLoading === news._id}
        onClick={() => handleDelete(news)}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
};

export default NewsActionButtonSet;
