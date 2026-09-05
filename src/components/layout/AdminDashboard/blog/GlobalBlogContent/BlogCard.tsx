import { Blog } from '@/src/lib/BlogTypes';
import { BlogPost } from '@/src/lib/DummyBlog';
import { formatDate } from '@/src/pages/Admin/Blogs/AdminBlogs';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
    blog: Blog;
    index: number
}

const BlogCard = ({blog, index}: Props) => {
  const navigate = useNavigate();
  return (
    <article
      key={blog._id}
      className={`mb-6 group overflow-hidden rounded-[1.7rem] border border-white/90 bg-white/75 p-3 shadow-lg backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-2xl ${
        index === 0 ? "sm:col-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.25rem] ${
          index === 0 ? "aspect-[2/1]" : "aspect-[1.35/1]"
        }`}
      >
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        )}

        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xl">
          {blog.category}
        </span>

        <button
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:scale-110"
          onClick={() => navigate(`/blog/${blog.slug}`)}
        >
          <ArrowUpRight size={17} />
        </button>
      </div>

      <div className="p-3 pb-2">
        <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-tight">
          {blog.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {blog.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white">
              {blog.author
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </div>

            <div>
              <p className="text-xs font-bold">{blog.author}</p>

              <p className="text-[10px] text-slate-400">
                {formatDate(blog.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock3 size={12} />
            {blog.readTime}
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard