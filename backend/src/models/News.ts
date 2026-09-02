import mongoose, { Schema, Document, Model } from "mongoose";

export interface INews extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  authorId: string;
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>(
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
    summary: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    author: { type: String, required: true, trim: true },
    authorId: { type: String, required: true, index: true }, // Clerk user id
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

newsSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

const News: Model<INews> = mongoose.model<INews>("News", newsSchema);

export default News;
