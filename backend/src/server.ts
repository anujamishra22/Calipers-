import fs from "node:fs";
import path from "node:path";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { apiRouter } from "./modules/index.js";
import { adminRouter } from "./admin/router.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

app.set("view engine", "ejs");

const viewsRoot =
  env.NODE_ENV === "production" && fs.existsSync(path.join(process.cwd(), "dist", "admin", "views"))
    ? path.join(process.cwd(), "dist", "admin", "views")
    : path.join(process.cwd(), "src", "admin", "views");
app.set("views", viewsRoot);

const adminStatic =
  env.NODE_ENV === "production" && fs.existsSync(path.join(process.cwd(), "dist", "admin", "public"))
    ? path.join(process.cwd(), "dist", "admin", "public")
    : path.join(process.cwd(), "src", "admin", "public");

app.use(
  helmet({
    contentSecurityPolicy: false,
    // Default CORP is `same-origin`, which blocks <img> on the Next site (e.g. :3000)
    // from loading files served here (e.g. :4000/uploads/...). Public covers must be embeddable.
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(compression());
app.use(morgan("dev"));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/admin/static", express.static(adminStatic));

app.use("/api", apiRouter);
app.use("/admin", adminRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Backend listening on http://localhost:${env.PORT}`);
});
