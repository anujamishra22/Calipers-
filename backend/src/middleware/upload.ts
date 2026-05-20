import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import multer from "multer";
import type { Request } from "express";

const uploadRoot = path.join(process.cwd(), "uploads");

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    const now = new Date();
    const sub = path.join(String(now.getFullYear()), String(now.getMonth() + 1).padStart(2, "0"));
    const dest = path.join(uploadRoot, sub);
    ensureDir(dest);
    cb(null, dest);
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase() || ".bin";
    cb(null, `${randomUUID()}${ext}`);
  },
});

function fileFilter(
  _req: Request,
  file: { mimetype: string; originalname: string },
  cb: multer.FileFilterCallback,
) {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image uploads are allowed"));
    return;
  }
  cb(null, true);
}

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
