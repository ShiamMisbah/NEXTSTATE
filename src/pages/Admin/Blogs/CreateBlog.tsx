import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  Loader2,
  Save,
  Send,
} from "lucide-react";
import { useUser } from "@clerk/react";
import BlogHeader from "./BlogForm/BlogHeader";
import BlogSidebar from "./BlogForm/BlogSidebar";
import BlogMainForm from "./BlogForm/BlogMainForm";
import { BlogForm } from "@/src/lib/BlogTypes";

const CreateBlog = () => {
  const { blogId } = useParams<{ blogId: string }>();

  const isEditMode = Boolean(blogId);

  const navigate = useNavigate();
  const { user } = useUser();

  const [form, setForm] = useState<BlogForm>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    readTime: "5 min read",
    featured: false,
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = <K extends keyof BlogForm>(
    field: K,
    value: BlogForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blog/${blogId}`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch blog");
        }

        const blog = data.data;

        setForm({
          title: blog.title || "",
          slug: blog.slug || "",
          excerpt: blog.excerpt || "",
          content: blog.content || "",
          category: blog.category || "",
          image: blog.image || "",
          readTime: blog.readTime || "5 min read",
          featured: blog.featured || false,
          published: blog.published ?? true,
        });
      } catch (err: any) {
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!user) {
      setError("You must be logged in to create a blog.");
      return;
    }

    if (!form.title.trim()) {
      setError("Please enter a blog title.");
      return;
    }

    if (!form.excerpt.trim()) {
      setError("Please enter an excerpt.");
      return;
    }

    if (!form.content.trim()) {
      setError("Please enter blog content.");
      return;
    }

    if (!form.category) {
      setError("Please select a category.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        isEditMode
          ? `${import.meta.env.VITE_API_URL}/api/blog/${blogId}`
          : `${import.meta.env.VITE_API_URL}/api/blog`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: form.title,
            slug: form.slug,
            excerpt: form.excerpt,
            content: form.content,
            category: form.category,
            image: form.image,
            readTime: form.readTime,
            featured: form.featured,
            published: form.published,
          }),
        },
      );

      const data = await response.json();      

      if (!response.ok) {
        throw new Error(data.message || "Failed to create blog");
      }

      navigate("/admin/blog");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

        {/* Header */}
        <BlogHeader isEditMode={isEditMode} loading={loading} />

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          id="create-blog-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]"
        >
          {/* ========================================
              MAIN CONTENT
          ======================================== */}
          <BlogMainForm
            form={form}
            setForm={setForm}
            loading={loading}
            updateField={updateField}
          />

          {/* ========================================
              SIDEBAR
          ======================================== */}
          <BlogSidebar
            isEditMode={isEditMode}
            loading={loading}
            form={form}
            updateField={updateField}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
