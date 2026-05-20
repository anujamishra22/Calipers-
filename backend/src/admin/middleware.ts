import type { NextFunction, Request, Response } from "express";
import { getTokenFromRequest, verifyToken } from "../middleware/auth.js";

export function requireAdminPage(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.redirect("/admin/login");
  }
  try {
    req.auth = verifyToken(token);
    return next();
  } catch {
    return res.redirect("/admin/login");
  }
}
