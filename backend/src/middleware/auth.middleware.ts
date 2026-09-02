import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { isAuthenticated } = getAuth(req);

  if (!isAuthenticated) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};
