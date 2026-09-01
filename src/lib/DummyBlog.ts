
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Software Is Becoming Invisible",
    excerpt:
      "How intelligent interfaces, automation and AI are changing the way we build digital products.",
    category: "Technology",
    author: "Alex Morgan",
    date: "Aug 28, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Designing Interfaces That Feel Alive",
    excerpt:
      "Motion, depth and interaction are becoming essential parts of modern product design.",
    category: "Design",
    author: "Sarah Chen",
    date: "Aug 24, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "AI Agents Are Changing Modern Development",
    excerpt:
      "A practical look at how autonomous AI systems are transforming software development.",
    category: "AI",
    author: "Daniel Kim",
    date: "Aug 20, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Why Startups Are Building Smaller Teams",
    excerpt:
      "Lean teams equipped with powerful technology are creating products faster than ever.",
    category: "Business",
    author: "Michael Ross",
    date: "Aug 17, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "The New Rules of Web Development",
    excerpt:
      "From server components to edge computing, the web stack is evolving rapidly.",
    category: "Development",
    author: "James Wilson",
    date: "Aug 14, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "The New Rules of Web Development",
    excerpt:
      "From server components to edge computing, the web stack is evolving rapidly.",
    category: "Development",
    author: "James Wilson",
    date: "Aug 14, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    title: "The New Rules of Web Development",
    excerpt:
      "From server components to edge computing, the web stack is evolving rapidly.",
    category: "Development",
    author: "James Wilson",
    date: "Aug 14, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
  },
];
