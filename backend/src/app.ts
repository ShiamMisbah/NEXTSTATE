import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import blogRoutes from "./routes/blog.routes";
import newsRoutes from "./routes/news.routes";


const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(clerkMiddleware());

app.use("/api/blogs", blogRoutes);
app.use("/api/news", newsRoutes);

export default app;
