import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

   const auth = getAuth(req);

  
  if (!auth.isAuthenticated) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};
