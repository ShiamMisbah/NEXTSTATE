import React, { SetStateAction } from "react";
import { BlogForm } from "../CreateBlog";
import { ImageIcon } from "lucide-react";

type Props = {
  form: BlogForm;
  updateField: <K extends keyof BlogForm>(field: K, value: BlogForm[K]) => void;
  loading: boolean;
  setForm: React.Dispatch<SetStateAction<BlogForm>>;
};

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const BlogMainForm = ({ form, loading, updateField, setForm }: Props) => {
  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  };
  return (
    <div className="space-y-6">
      {/* Blog Information */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Blog Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the basic information about your article.
          </p>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter your blog title"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Slug
            </label>

            <input
              id="slug"
              type="text"
              placeholder="your-blog-slug"
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />

            <p className="mt-2 text-xs text-slate-400">
              Your blog URL: /blog/
              <span className="text-slate-600">
                {form.slug || "your-blog-slug"}
              </span>
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-slate-700"
              >
                Excerpt
              </label>

              <span className="text-xs text-slate-400">
                {form.excerpt.length}/300
              </span>
            </div>

            <textarea
              id="excerpt"
              rows={4}
              maxLength={300}
              placeholder="Write a short description of your blog..."
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Content
            </label>

            <textarea
              id="content"
              rows={20}
              placeholder="Write your blog content here..."
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />

            <p className="mt-2 text-xs text-slate-400">
              Rich text editor can be added here later.
            </p>
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

export default BlogMainForm;
