import { Router } from "express";

import { getContentStats } from "../controllers/stats.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/", getContentStats);

export default router;
