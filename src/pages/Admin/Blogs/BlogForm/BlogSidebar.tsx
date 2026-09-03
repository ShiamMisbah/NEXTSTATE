import React from 'react'
import { useUser } from '@clerk/react';
import { Loader2, Save, Send } from 'lucide-react';
import { BLOG_CATEGORIES, BlogCategory, BlogForm } from '@/src/lib/BlogTypes';

type Props = {
  form: BlogForm;
  updateField: <K extends keyof BlogForm>(field: K, value: BlogForm[K]) => void;
  loading: boolean;
  isEditMode: boolean;
};

const BlogSidebar = ({form, loading, updateField, isEditMode = false}: Props) => {
    const { user } = useUser();
  return (
    <div className="space-y-6">
      {/* Publishing */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-6 text-lg font-semibold text-slate-900">
          Publishing
        </h2>

        <div className="space-y-5">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Category
            </label>

            <select
              id="category"
              value={form.category}
              onChange={(e) =>
                updateField("category", e.target.value as BlogCategory)
              }
              className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            >
              <option value="">Select category</option>

              {BLOG_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Read Time */}
          <div>
            <label
              htmlFor="readTime"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Read Time
            </label>

            <input
              id="readTime"
              type="text"
              placeholder="5 min read"
              value={form.readTime}
              onChange={(e) => updateField("readTime", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Published */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
            <div>
              <p className="text-sm font-medium text-slate-900">Published</p>

              <p className="mt-1 text-xs text-slate-500">
                Make this article publicly visible.
              </p>
            </div>

            <button
              type="button"
              onClick={() => updateField("published", !form.published)}
              className={`relative h-6 w-11 rounded-full transition ${
                form.published ? "bg-emerald" : "bg-emerald-bright"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                  form.published ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Featured */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
            <div>
              <p className="text-sm font-medium text-slate-900">Featured</p>

              <p className="mt-1 text-xs text-slate-500">
                Show this article as featured.
              </p>
            </div>

            <button
              type="button"
              onClick={() => updateField("featured", !form.featured)}
              className={`relative h-6 w-11 rounded-full transition ${
                form.featured ? "bg-emerald" : "bg-emerald-bright"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                  form.featured ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Author */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-5 text-lg font-semibold text-slate-900">Author</h2>

        <div className="flex items-center gap-3">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName || "Author"}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {user?.firstName?.charAt(0) || "A"}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user?.fullName || user?.firstName || "Admin"}
            </p>

            <p className="text-xs text-slate-500">Current Clerk user</p>
          </div>
        </div>
      </div>

      {/* Create button */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
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

        <p className="mt-3 text-center text-xs text-slate-400">
          Your blog will be saved to the database.
        </p>
      </div>
    </div>
  );
}

export default BlogSidebar