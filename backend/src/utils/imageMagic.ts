import fs from "node:fs";

const SIGNATURES: { mime: string; bytes: number[] }[] = [
  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/gif", bytes: [0x47, 0x49, 0x46] },
  { mime: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] },
];

const ALLOWED_MIMES = new Set(SIGNATURES.map((s) => s.mime));
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

export function isAllowedImageMime(mimetype: string): boolean {
  return ALLOWED_MIMES.has(mimetype);
}

export function isAllowedImageExtension(ext: string): boolean {
  return ALLOWED_EXT.has(ext.toLowerCase());
}

export function detectImageMime(filePath: string): string | null {
  const fd = fs.openSync(filePath, "r");
  try {
    const buf = Buffer.alloc(12);
    fs.readSync(fd, buf, 0, 12, 0);
    for (const sig of SIGNATURES) {
      if (sig.bytes.every((b, i) => buf[i] === b)) {
        if (sig.mime === "image/webp") {
          const webp = buf.toString("ascii", 8, 12);
          if (webp !== "WEBP") return null;
        }
        return sig.mime;
      }
    }
    return null;
  } finally {
    fs.closeSync(fd);
  }
}
