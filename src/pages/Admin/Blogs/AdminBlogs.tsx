import { useEffect, useState } from "react";
import { Blog, BlogStats } from "@/src/lib/BlogTypes";
import { useBlogs } from "@/src/hooks/useBlogs";
import Pagination from "@/src/components/ui/Pagination";
import BlogListFilter from "@/src/components/layout/AdminDashboard/blog/AdminBlogList/BlogListFilter";
import DesktopBlogListTable from "@/src/components/layout/AdminDashboard/blog/AdminBlogList/DesktopBlogListTable";
import MobileBlogCard from "@/src/components/layout/AdminDashboard/shared/MobileContentCard";
import Loading from "@/src/components/ui/Loading";
import Empty from "@/src/components/ui/Empty";
import ContentListStat from "@/src/components/layout/AdminDashboard/shared/ContentListStat";
import ContentListHeader from "@/src/components/layout/AdminDashboard/shared/ContentListHeader";
import MobileContentCard from "@/src/components/layout/AdminDashboard/shared/MobileContentCard";

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const dummyContentStat : BlogStats = {
  totalBlogs: 0,
  totalPublished: 0,
  totalDrafts: 0,
  totalFeatured: 0,
  totalViews: 0,
};

const AdminBlogs = () => {

  const { blogs, pagination, loading, error, nextPage, previousPage } =
    useBlogs({
      limit: 10,
    });

  const [readableBlogs, setReadableBlogs] = useState<Blog[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");


  useEffect(() => {
    setReadableBlogs(blogs);
  }, [blogs]);

  const filteredBlogs = readableBlogs.filter((blog) => {
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
        <ContentListHeader
          heading="Blogs"
          subheading="Manage your blog articles."
          actionButton="Create Blog"
          actionButtonTarget="blog"
        />

        {/* Stats */}
        <ContentListStat contentStat={dummyContentStat} type="blog" />

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
            <DesktopBlogListTable
              loading={loading}
              filteredBlogs={filteredBlogs}
              setBlogs={setReadableBlogs}
            />

            {pagination && (
              <Pagination
                nextPage={nextPage}
                pagination={pagination}
                previousPage={previousPage}
              />
            )}
          </div>

          {/* Mobile Card */}
          <div className="md:hidden">
            {loading ? (
              <Loading content="Loading Blogs ..." />
            ) : filteredBlogs.length === 0 ? (
              <Empty content="No blogs found" />
            ) : (
              <MobileContentCard
                  filteredContent={filteredBlogs}
                  setContent={setReadableBlogs}
                  type="blog"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
