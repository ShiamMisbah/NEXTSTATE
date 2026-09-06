import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import blogRoutes from "./routes/blog.routes";
import newsRoutes from "./routes/news.routes";
import statsRoutes from "./routes/stats.routes";



const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(clerkMiddleware());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/blog", blogRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/stats", statsRoutes);

export default app;
