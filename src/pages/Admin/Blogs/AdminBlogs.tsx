import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Loader2,
  MoreVertical,
  FileText,
  Calendar,
} from "lucide-react";
import { Blog, BLOG_CATEGORIES } from "@/src/lib/BlogTypes";
import BlogListHeader from "./AdminBlogList/BlogListHeader";
import BlogListStat from "./AdminBlogList/BlogListStat";
import BlogListFilter from "./AdminBlogList/BlogListFilter";
import BlogThumbnail from "./AdminBlogList/BlogListCard/BlogThumbnail";
import ActionButtonSet from "./AdminBlogList/BlogListCard/ActionButtonSet";
import MobileBlogThumbnail from "./AdminBlogList/BlogListCard/MobileBlogThumbnail";
import DesktopBlogListTable from "./AdminBlogList/DesktopBlogListTable";
import MobileBlogCard from "./AdminBlogList/MobileBlogCard";

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const AdminBlogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(data.data || []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || blog.category === category;

    const matchesStatus =
      status === "All" ||
      (status === "Published" && blog.published) ||
      (status === "Draft" && !blog.published);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

        {/* Header */}
        <BlogListHeader />

        {/* Stats */}
        <BlogListStat blogs={blogs} />

        {/* Filters */}
        <BlogListFilter
          category={category}
          search={search}
          status={status}
          setCategory={setCategory}
          setSearch={setSearch}
          setStatus={setStatus}
        />

        {/* Blog List */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <DesktopBlogListTable loading={loading} filteredBlogs={filteredBlogs} setBlogs={setBlogs} />
          </div>

          {/* =========================================
              MOBILE LIST
          ========================================= */}
          <div className="md:hidden">
            {loading ? (
              <div className="py-20 text-center">
                <Loader2
                  size={24}
                  className="mx-auto animate-spin text-slate-400"
                />

                <p className="mt-3 text-sm text-slate-500">Loading blogs...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="py-20 text-center">
                <FileText size={40} className="mx-auto text-slate-300" />

                <p className="mt-3 font-medium text-slate-600">
                  No blogs found
                </p>
              </div>
            ) : (
              <MobileBlogCard filteredBlogs={filteredBlogs} setBlogs={setBlogs} />
            )}
          </div>
        </div>

        {/* Result count */}
        {!loading && (
          <div className="mt-4 text-sm text-slate-400">
            Showing {filteredBlogs.length} of {blogs.length} blogs
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
