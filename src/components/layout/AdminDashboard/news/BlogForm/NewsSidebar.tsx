import React from "react";
import { useUser } from "@clerk/react";
import { Loader2, Save, Send } from "lucide-react";
import { BLOG_CATEGORIES, BlogCategory, BlogForm } from "@/src/lib/BlogTypes";
import { NewsForm } from "@/src/lib/NewsTypes";

type Props = {
  form: NewsForm;
  updateField: <K extends keyof NewsForm>(field: K, value: NewsForm[K]) => void;
  loading: boolean;
  isEditMode: boolean;
};

const NewsSidebar = ({
  form,
  loading,
  updateField,
  isEditMode = false,
}: Props) => {
  const { user } = useUser();
  return (
    <div className="space-y-6">
      {/* Publish */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Publishing
        </h2>

        <div className="space-y-4">
          {/* Published */}
          <label className="flex cursor-pointer items-center justify-between rounded-lg bg-slate-50 p-3">
            <div>
              <p className="text-sm font-medium text-slate-800">Published</p>

              <p className="text-xs text-slate-400">
                Make this news visible publicly
              </p>
            </div>

            <button
              type="button"
              onClick={() => updateField("published", !form.published)}
              className={`relative h-6 w-11 rounded-full transition ${
                form.published ? "bg-emerald" : "bg-slate-400"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                  form.published ? "left-6" : "left-1"
                }`}
              />
            </button>
          </label>
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
              ? "Update News"
              : "Publish News"}
        </button>

        <p className="mt-3 text-center text-xs text-slate-400">
          Your News will be saved to the database.
        </p>
      </div>
    </div>
  );
};

export default NewsSidebar;
