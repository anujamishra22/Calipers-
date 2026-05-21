import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { AppError } from "./error.js";

function allowedOrigins(): string[] {
  if (env.CORS_ORIGIN === "*") {
    return [];
  }
  return env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean);
}

/** Block cross-site admin POSTs in production when CORS origin is configured. */
export function requireAdminSameOrigin(req: Request, _res: Response, next: NextFunction) {
  if (env.NODE_ENV !== "production" || req.method !== "POST") {
    return next();
  }

  const allowed = allowedOrigins();
  if (allowed.length === 0) {
    return next();
  }

  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if (typeof origin === "string" && allowed.some((a) => origin === a)) {
    return next();
  }

  if (typeof referer === "string" && allowed.some((a) => referer.startsWith(a))) {
    return next();
  }

  const host = req.headers.host;
  if (typeof host === "string" && typeof referer === "string") {
    try {
      const ref = new URL(referer);
      if (ref.host === host) return next();
    } catch {
      /* ignore */
    }
  }

  next(new AppError(403, "ORIGIN", "Request blocked"));
}
