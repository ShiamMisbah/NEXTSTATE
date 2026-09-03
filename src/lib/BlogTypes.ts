export const BLOG_CATEGORIES = [
  "Technology",
  "AI",
  "Business",
  "Design",
  "Development",
  "Future",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory | "";
  image: string;
  readTime: string;
  featured: boolean;
  published: boolean;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: BlogCategory;
  image: string;
  author: string;
  authorId: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
