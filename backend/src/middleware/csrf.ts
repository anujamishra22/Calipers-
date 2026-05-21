import { randomBytes, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { AppError } from "./error.js";

export const CSRF_COOKIE = "admin_csrf";

export function createCsrfToken(): string {
  return randomBytes(24).toString("hex");
}

export function setCsrfCookie(res: Response, token: string) {
  res.cookie(CSRF_COOKIE, token, {
    httpOnly: false,
    sameSite: "strict",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function tokensMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export function readCsrfFromRequest(req: Request): string | null {
  const header = req.headers["x-csrf-token"];
  if (typeof header === "string" && header.length > 0) return header;
  const body = req.body as { _csrf?: string } | undefined;
  if (typeof body?._csrf === "string" && body._csrf.length > 0) return body._csrf;
  return null;
}

export function validateCsrf(req: Request): void {
  const cookie = req.cookies?.[CSRF_COOKIE];
  const submitted = readCsrfFromRequest(req);
  if (typeof cookie !== "string" || !submitted || !tokensMatch(cookie, submitted)) {
    throw new AppError(403, "CSRF", "Invalid or missing security token");
  }
}

/** Attach CSRF token to every admin page render. */
export function attachCsrfToken(req: Request, res: Response, next: NextFunction) {
  let token = req.cookies?.[CSRF_COOKIE];
  if (typeof token !== "string" || token.length < 16) {
    token = createCsrfToken();
    setCsrfCookie(res, token);
  }
  res.locals.csrfToken = token;
  next();
}

export function requireCsrfOnPost(req: Request, _res: Response, next: NextFunction) {
  if (req.method !== "POST") return next();
  try {
    validateCsrf(req);
    next();
  } catch (err) {
    next(err);
  }
}
