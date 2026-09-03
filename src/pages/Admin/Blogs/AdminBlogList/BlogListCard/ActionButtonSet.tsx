import { Blog } from "@/src/lib/BlogTypes";
import { Edit, Eye, EyeOff, Loader2, Star, Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  blog: Blog;
  setBlogs: Dispatch<SetStateAction<Blog[]>>
};

const ActionButtonSet = ({ blog, setBlogs }: Props) => {
  const navigate = useNavigate();  

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handlePublishToggle = async (blog: Blog) => {
    try {
      setActionLoading(blog._id);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${blog._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            published: !blog.published,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      setBlogs((prev) =>
        prev.map((item) =>
          item._id === blog._id
            ? {
                ...item,
                published: !item.published,
              }
            : item,
        ),
      );
    } catch (error: any) {
      alert(error.message || "Failed to update blog");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (blog: Blog) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`,
    );

    if (!confirmed) return;

    try {
      setActionLoading(blog._id);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${blog._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete blog");
      }

      setBlogs((prev) => prev.filter((item) => item._id !== blog._id));
    } catch (error: any) {
      alert(error.message || "Failed to delete blog");
    } finally {
      setActionLoading(null);
    }
  };

  const handleFeatureToggle = async (blog: Blog) => {
    try {
      setActionLoading(blog._id);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${blog._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            featured: !blog.featured,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      setBlogs((prev) =>
        prev.map((item) =>
          item._id === blog._id
            ? {
                ...item,
                featured: !item.featured,
              }
            : item,
        ),
      );
    } catch (error: any) {
      alert(error.message || "Failed to update blog");
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
        onClick={() => navigate(`/blog/${blog.slug}`)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
      >
        <Eye size={17} />
      </button>

      {/* Edit */}
      <button
        type="button"
        title="Edit"
        onClick={() => navigate(`/admin/blog/${blog._id}/edit`)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
      >
        <Edit size={17} />
      </button>

      {/* Publish */}
      <button
        type="button"
        title={blog.published ? "Unpublish" : "Publish"}
        disabled={actionLoading === blog._id}
        onClick={() => handlePublishToggle(blog)}
        className={`rounded-lg p-2 transition ${
          blog.published
            ? "text-emerald-600 hover:bg-emerald-50"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {actionLoading === blog._id ? (
          <Loader2 size={17} className="animate-spin" />
        ) : blog.published ? (
          <EyeOff size={17} />
        ) : (
          <Eye size={17} />
        )}
      </button>

      {/* Feature */}
      <button
        type="button"
        title={blog.featured ? "Remove Featured" : "Feature"}
        disabled={actionLoading === blog._id}
        onClick={() => handleFeatureToggle(blog)}
        className={`rounded-lg p-2 transition ${
          blog.featured
            ? "text-amber-500 hover:bg-amber-50"
            : "text-slate-400 hover:bg-slate-100 hover:text-amber-500"
        }`}
      >
        <Star size={17} fill={blog.featured ? "currentColor" : "none"} />
      </button>

      {/* Delete */}
      <button
        type="button"
        title="Delete"
        disabled={actionLoading === blog._id}
        onClick={() => handleDelete(blog)}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
};

export default ActionButtonSet;
