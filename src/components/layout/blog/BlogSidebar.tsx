import { ChevronRight, Sparkles } from 'lucide-react';
import React from 'react'

type Props = {
    activeCategory: string
    setActiveCategory: React.Dispatch<React.SetStateAction<string>>
}

const categoryIcons: Record<string, string> = {
  All: "★",
  Technology: "◈",
  AI: "✦",
  Business: "◫",
  Design: "◇",
  Development: "</>",
};

const BlogSidebar = ({activeCategory, setActiveCategory}: Props) => {
  return (
    <aside className="hidden lg:block mb-6">
      <div className="h-full flex flex-col justify-between rounded-4xl border border-white/80 bg-white/65 p-4 shadow-xl backdrop-blur-2xl">
        <div className="mb-4 px-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Explore
          </p>

          <h3 className="mt-1 text-lg font-black">Topics</h3>
        </div>

        <div className="space-y-1">
          {Object.entries(categoryIcons).map(([category, icon]) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-slate-950 text-emerald-bright"
                  : "text-slate-500 hover:bg-white hover:text-slate-950"
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs">
                {icon}
              </span>

              <span className="flex-1">{category}</span>

              <ChevronRight size={15} />
            </button>
          ))}
        </div>

        {/* Newsletter */}
        <div className="relative mt-6 overflow-hidden rounded-[1.5rem] bg-slate-950 p-5 text-white">
          <Sparkles className="mb-4 text-cyan-300" size={20} />

          <h4 className="text-lg font-black">Stay ahead.</h4>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Get our latest ideas and technology stories in your inbox.
          </p>

          <button className="mt-5 w-full rounded-xl bg-white py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-300">
            Subscribe
          </button>
        </div>
      </div>
    </aside>
  );
}

export default BlogSidebar