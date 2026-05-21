import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  void next;
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
  }
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: { code: "UPLOAD_ERROR", message: err.message },
    });
  }
  if (
    err instanceof Error &&
    (err.message === "Only image uploads are allowed" ||
      err.message === "Only JPEG, PNG, GIF, and WebP images are allowed")
  ) {
    return res.status(400).json({
      error: { code: "INVALID_FILE_TYPE", message: err.message },
    });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request",
        details: err.flatten(),
      },
    });
  }
  console.error(err);
  return res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
  });
}
