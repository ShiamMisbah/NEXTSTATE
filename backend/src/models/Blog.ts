import mongoose, { Schema, Document, Model } from "mongoose";

export const BLOG_CATEGORIES = [
  "Technology",
  "AI",
  "Business",
  "Design",
  "Development",
  "Future",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  image: string;
  author: string;
  authorId: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: BLOG_CATEGORIES,
    },
    image: { type: String, default: "" },
    author: { type: String, required: true, trim: true },
    authorId: { type: String, required: true, index: true }, // Clerk user id
    readTime: { type: String, default: "5 min read" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Auto-generate a slug from the title if one wasn't provided
blogSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});
 
const Blog: Model<IBlog> = mongoose.model<IBlog>("Blog", blogSchema);
 
export default Blog;
