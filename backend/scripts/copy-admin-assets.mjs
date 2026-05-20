import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, name.name);
    const to = path.join(dest, name.name);
    if (name.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

const viewsSrc = path.join(root, "src", "admin", "views");
const viewsDest = path.join(root, "dist", "admin", "views");
const pubSrc = path.join(root, "src", "admin", "public");
const pubDest = path.join(root, "dist", "admin", "public");

if (fs.existsSync(viewsSrc)) copyDir(viewsSrc, viewsDest);
if (fs.existsSync(pubSrc)) copyDir(pubSrc, pubDest);
console.log("Admin assets copied to dist/");
