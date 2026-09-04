import React, { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

import CustomCursor from "../components/layout/CustomCursor";
import { blogs } from "../lib/DummyBlog";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Loader2,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import BlogCard from "../components/layout/blog/GlobalBlogContent/BlogCard";
import FeaturedBlogCard from "../components/layout/blog/GlobalBlogContent/FeaturedBlogCard";
import BlogSidebar from "../components/layout/blog/GlobalBlogContent/BlogSidebar";
import { useBlogs } from "../hooks/useBlogs";
import { BLOG_CATEGORIES } from "../lib/BlogTypes";
import Pagination from "../components/ui/Pagination";

type Props = {};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as any },
  },
};

const Blog = (props: Props) => {
  const { blogs, pagination, loading, error, nextPage, previousPage } =
    useBlogs({
      limit: 10,
    });

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const featuredPost = useMemo(() => {
    return blogs.find((blog) => blog.featured);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;

      const matchesSearch =
        !searchTerm ||
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, activeCategory, search]);

  const regularBlogs = useMemo(() => {
    return filteredBlogs.filter((blog) => blog._id !== featuredPost?._id);
  }, [filteredBlogs, featuredPost]);

  const categoryRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: "left" | "right") => {
    if (!categoryRef.current) return;

    categoryRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading blog...</span>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <CustomCursor theme="light" />
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <main className="min-h-screen overflow-hidden text-slate-900">
          {/* Background */}
          <div className="pointer-events-none fixed inset-0 -z-0">
            <div className="absolute left-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-300/20 blur-[120px]" />

            <div className="absolute right-[-5%] top-[25%] h-[500px] w-[500px] rounded-full bg-violet-300/20 blur-[120px]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10 mx-auto max-w-[1450px] px-5 py-6 sm:px-8 lg:px-12"
          >
            {/* Hero */}
            <section className="mb-12 text-center">
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald font-mono text-xs uppercase tracking-widest mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Who We Are
              </motion.span>
              <motion.div variants={fadeUp}>
                <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-[-0.06em] sm:text-6xl lg:text-8xl">
                  The{" "}
                  <span className="bg-linear-to-r from-slate-950 via-slate-600 bg-emerald-bright bg-clip-text text-transparent">
                    Blog
                  </span>
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Thoughts, stories and perspectives about technology, design,
                  artificial intelligence and the future.
                </p>
              </motion.div>
            </section>

            {/* Filters */}
            <section className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="lg:hidden relative flex min-w-0 items-center gap-2">
                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={() => scrollCategories("left")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300/70 bg-white/80 text-slate-600 shadow-sm backdrop-blur-xl transition hover:bg-slate-950 hover:text-white"
                  aria-label="Scroll categories left"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Category Container */}
                <div
                  ref={categoryRef}
                  className="flex min-w-0 gap-2 overflow-x-hidden scroll-smooth"
                >
                  <button
                    key={"All"}
                    onClick={() => setActiveCategory("All")}
                    className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      activeCategory === "All"
                        ? "bg-slate-950 text-white shadow-lg"
                        : "border border-slate-300/70 bg-white/60 text-slate-500 hover:bg-white"
                    }`}
                  >
                    All
                  </button>
                  {BLOG_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                        activeCategory === category
                          ? "bg-slate-950 text-white shadow-lg"
                          : "border border-slate-300/70 bg-white/60 text-slate-500 hover:bg-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={() => scrollCategories("right")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300/70 bg-white/80 text-slate-600 shadow-sm backdrop-blur-xl transition hover:bg-slate-950 hover:text-white"
                  aria-label="Scroll categories right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Search */}
              <div className="relative w-full">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search articles..."
                  className="w-full rounded-full border border-slate-300/70 bg-white/60 py-3 pl-11 pr-5 text-sm outline-none backdrop-blur-xl focus:bg-white"
                />
              </div>
            </section>

            {/* Content */}
            <section className="grid gap-6 lg:grid-cols-[1fr]">
              {/* Sidebar */}
              <div>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Featured */}
                  {featuredPost && activeCategory === "All" && !search && (
                    <FeaturedBlogCard featuredPost={featuredPost} />
                  )}

                  {regularBlogs.length > 0 &&
                    (activeCategory !== "All" || search) && (
                      <BlogCard blog={regularBlogs[0]} index={0} />
                    )}

                  {regularBlogs.length === 0 && (
                    <div className="rounded-[2rem] bg-white/70 py-20 text-center col-span-2">
                      <p className="text-lg font-bold">No articles found</p>

                      <p className="mt-2 text-sm text-slate-500">
                        Try another category or search term.
                      </p>
                    </div>
                  )}

                  <BlogSidebar
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                  />
                </div>

                {/* Blog Grid */}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {regularBlogs.slice(1).map((blog, index) => (
                    <BlogCard blog={blog} index={index + 1} />
                  ))}
                </div>
              </div>
            </section>
          </motion.div>

          {pagination && (
            <Pagination nextPage={nextPage} pagination={pagination} previousPage={previousPage} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Blog;
