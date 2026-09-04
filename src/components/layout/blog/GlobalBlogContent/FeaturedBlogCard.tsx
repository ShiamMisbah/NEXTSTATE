import { Blog } from '@/src/lib/BlogTypes';
import { BlogPost } from '@/src/lib/DummyBlog';
import { formatDate } from '@/src/pages/Admin/Blogs/AdminBlogs';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  featuredPost: Blog;
};

const FeaturedBlogCard = ({featuredPost}: Props) => {
  const navigate = useNavigate();

  return (
    <article className=" group relative mb-6 overflow-hidden rounded-4xl border border-white/80 bg-white/70 p-3 shadow-xl backdrop-blur-2xl col-span-3 lg:col-span-2">
      <div className="h-full grid overflow-hidden rounded-3xl bg-slate-950 lg:grid-cols-[1.1fr_1fr]">
        {/* Image */}
        <div className="relative min-h-80 overflow-hidden lg:min-h-[450px]">
          {featuredPost.image && (
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <span className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl">
            Featured
          </span>

          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-sm text-white/80">
            <TrendingUp size={16} />
            Trending article
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-7 text-white sm:p-10">
          <div>
            <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              {featuredPost.category}
            </span>

            <h2 className="text-3xl font-black leading-tight sm:text-4xl">
              {featuredPost.title}
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              {featuredPost.excerpt}
            </p>
          </div>

          <div className="mt-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 text-xs font-black text-slate-950">
                AM
              </div>

              <div>
                <p className="text-sm font-bold">{featuredPost.author}</p>

                <p className="text-xs text-slate-400">
                  {formatDate(featuredPost.createdAt)} · {featuredPost.readTime}
                </p>
              </div>
            </div>

            <button
              className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              onClick={() => navigate(`/blog/${featuredPost.slug}`)}
            >
              Read article
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default FeaturedBlogCard