import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import multer from "multer";
import type { Request } from "express";
import {
  isAllowedImageExtension,
  isAllowedImageMime,
} from "../utils/imageMagic.js";

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
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = isAllowedImageExtension(ext) ? ext : ".bin";
    cb(null, `${randomUUID()}${safeExt}`);
  },
});

function fileFilter(
  _req: Request,
  file: { mimetype: string; originalname: string },
  cb: multer.FileFilterCallback,
) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!isAllowedImageMime(file.mimetype) || !isAllowedImageExtension(ext)) {
    cb(new Error("Only JPEG, PNG, GIF, and WebP images are allowed"));
    return;
  }
  cb(null, true);
}

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
});
