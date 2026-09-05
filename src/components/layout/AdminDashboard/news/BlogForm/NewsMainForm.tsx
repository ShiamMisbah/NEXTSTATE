import React, { SetStateAction } from "react";
import { ImageIcon } from "lucide-react";
import { BlogForm } from "@/src/lib/BlogTypes";
import { NewsForm } from "@/src/lib/NewsTypes";

type Props = {
  form: NewsForm;
  updateField: <K extends keyof NewsForm>(field: K, value: NewsForm[K]) => void;
  loading: boolean;
  setForm: React.Dispatch<SetStateAction<NewsForm>>;
};

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const NewsMainForm = ({ form, loading, updateField, setForm }: Props) => {
  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  };
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-base font-semibold text-slate-900">
          News Information
        </h2>

        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter news title"
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="news-article-slug"
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />

            <p className="mt-1.5 text-xs text-slate-400">
              Used in the news URL.
            </p>
          </div>

          {/* Summary */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Summary
            </label>

            <textarea
              name="summary"
              value={form.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              placeholder="Write a short summary..."
              rows={4}
              required
              className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Content
            </label>

            <textarea
              name="content"
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="Write your news content..."
              rows={8}
              required
              className="w-full resize-y rounded-lg border border-slate-200 px-4 py-2.5 text-sm leading-6 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Featured Image
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add an image that represents your article.
          </p>
        </div>

        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Image URL
          </label>

          <div className="relative">
            <ImageIcon
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Image Preview */}
          {form.image && (
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <img
                src={form.image}
                alt="Featured image preview"
                className="aspect-video w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsMainForm;
