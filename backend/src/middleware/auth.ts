import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "./error.js";

const COOKIE_NAME = "admin_session";

export type JwtPayload = { sub: string; email: string };

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  if (typeof decoded !== "object" || decoded === null || !("sub" in decoded) || !("email" in decoded)) {
    throw new AppError(401, "UNAUTHORIZED", "Invalid token");
  }
  return decoded as JwtPayload;
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
}

export function getTokenFromRequest(req: Request): string | null {
  const cookie = req.cookies?.[COOKIE_NAME];
  if (typeof cookie === "string" && cookie.length > 0) return cookie;
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) throw new AppError(401, "UNAUTHORIZED", "Authentication required");
    const payload = verifyToken(token);
    (req as Request & { auth: JwtPayload }).auth = payload;
    next();
  } catch {
    next(new AppError(401, "UNAUTHORIZED", "Authentication required"));
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = getTokenFromRequest(req);
    if (token) {
      const payload = verifyToken(token);
      (req as Request & { auth?: JwtPayload }).auth = payload;
    }
  } catch {
    // ignore invalid token for optional auth
  }
  next();
}
