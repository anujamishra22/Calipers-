import bcrypt from "bcryptjs";
import { Router } from "express";
import { prisma } from "../db/client.js";
import { env } from "../config/env.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../middleware/error.js";
import { clearAuthCookie, setAuthCookie, signToken } from "../middleware/auth.js";
import { loginLimiter } from "../middleware/rateLimit.js";
import { requireAdminPage } from "./middleware.js";
import { parseJsonArray, parseJsonObject } from "../utils/jsonFields.js";
import { segment } from "../utils/params.js";
import { slugify } from "../utils/slugify.js";

export const adminRouter = Router();

adminRouter.get("/login", (req, res) => {
  if (req.cookies?.admin_session) {
    return res.redirect("/admin");
  }
  return res.render("login", { title: "Admin login", error: null });
});

adminRouter.post(
  "/login",
  loginLimiter,
  asyncHandler(async (req, res) => {
    const email = String(req.body.email ?? "").trim();
    const password = String(req.body.password ?? "");
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).render("login", {
        title: "Admin login",
        error: "Invalid email or password",
      });
    }
    const token = signToken({ sub: user.id, email: user.email });
    setAuthCookie(res, token);
    return res.redirect("/admin");
  }),
);

adminRouter.get("/logout", (_req, res) => {
  clearAuthCookie(res);
  return res.redirect("/admin/login");
});

adminRouter.use(requireAdminPage);

adminRouter.use((req, res, next) => {
  res.locals.currentPath = req.originalUrl.split("?")[0];
  res.locals.adminEmail = req.auth?.email ?? "";
  next();
});

adminRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const [blogs, articles, caseStudies, submissions] = await Promise.all([
      prisma.blogPost.count(),
      prisma.article.count(),
      prisma.caseStudy.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
    ]);
    const recent = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return res.render("dashboard", {
      title: "Dashboard",
      counts: { blogs, articles, caseStudies, submissions },
      recent,
    });
  }),
);

adminRouter.get(
  "/blogs",
  asyncHandler(async (_req, res) => {
    const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
    return res.render("blogs/list", { title: "Blogs", posts });
  }),
);

adminRouter.get("/blogs/new", (_req, res) => {
  return res.render("blogs/edit", { title: "New blog", post: null, error: null });
});

adminRouter.get(
  "/blogs/:id/edit",
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findUnique({ where: { id: segment(req.params.id) } });
    if (!post) throw new AppError(404, "NOT_FOUND", "Not found");
    return res.render("blogs/edit", { title: "Edit blog", post, error: null });
  }),
);

adminRouter.post(
  "/blogs",
  asyncHandler(async (req, res) => {
    const title = String(req.body.title ?? "").trim();
    const slug = String(req.body.slug ?? "").trim() || slugify(title);
    const published = req.body.published === "on" || req.body.published === "true";
    await prisma.blogPost.create({
      data: {
        slug,
        title,
        category: String(req.body.category ?? "").trim(),
        excerpt: String(req.body.excerpt ?? "").trim(),
        content: String(req.body.content ?? "").trim(),
        coverImage: String(req.body.coverImage ?? "").trim() || null,
        readTime: String(req.body.readTime ?? "5 min").trim(),
        published,
        publishedAt: published ? new Date() : null,
      },
    });
    return res.redirect("/admin/blogs");
  }),
);

adminRouter.post(
  "/blogs/:id/update",
  asyncHandler(async (req, res) => {
    const id = segment(req.params.id);
    const title = String(req.body.title ?? "").trim();
    const slug = String(req.body.slug ?? "").trim() || slugify(title);
    const published = req.body.published === "on" || req.body.published === "true";
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, "NOT_FOUND", "Not found");
    await prisma.blogPost.update({
      where: { id },
      data: {
        slug,
        title,
        category: String(req.body.category ?? "").trim(),
        excerpt: String(req.body.excerpt ?? "").trim(),
        content: String(req.body.content ?? "").trim(),
        coverImage: String(req.body.coverImage ?? "").trim() || null,
        readTime: String(req.body.readTime ?? "").trim(),
        published,
        publishedAt: published ? (existing.publishedAt ?? new Date()) : null,
      },
    });
    return res.redirect("/admin/blogs");
  }),
);

adminRouter.post(
  "/blogs/:id/delete",
  asyncHandler(async (req, res) => {
    await prisma.blogPost.delete({ where: { id: segment(req.params.id) } });
    return res.redirect("/admin/blogs");
  }),
);

adminRouter.get(
  "/articles",
  asyncHandler(async (_req, res) => {
    const articles = await prisma.article.findMany({ orderBy: { updatedAt: "desc" } });
    return res.render("articles/list", { title: "Articles", articles });
  }),
);

adminRouter.get("/articles/new", (_req, res) => {
  return res.render("articles/edit", { title: "New article", article: null, error: null });
});

adminRouter.get(
  "/articles/:id/edit",
  asyncHandler(async (req, res) => {
    const row = await prisma.article.findUnique({ where: { id: segment(req.params.id) } });
    if (!row) throw new AppError(404, "NOT_FOUND", "Not found");
    const article = { ...row, tags: parseJsonArray(row.tags) };
    return res.render("articles/edit", { title: "Edit article", article, error: null });
  }),
);

adminRouter.post(
  "/articles",
  asyncHandler(async (req, res) => {
    const title = String(req.body.title ?? "").trim();
    const slug = String(req.body.slug ?? "").trim() || slugify(title);
    const tags = String(req.body.tags ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const published = req.body.published === "on" || req.body.published === "true";
    await prisma.article.create({
      data: {
        slug,
        title,
        summary: String(req.body.summary ?? "").trim(),
        content: String(req.body.content ?? "").trim(),
        tags: JSON.stringify(tags),
        coverImage: String(req.body.coverImage ?? "").trim() || null,
        published,
        publishedAt: published ? new Date() : null,
      },
    });
    return res.redirect("/admin/articles");
  }),
);

adminRouter.post(
  "/articles/:id/update",
  asyncHandler(async (req, res) => {
    const id = segment(req.params.id);
    const title = String(req.body.title ?? "").trim();
    const slug = String(req.body.slug ?? "").trim() || slugify(title);
    const tags = String(req.body.tags ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const published = req.body.published === "on" || req.body.published === "true";
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, "NOT_FOUND", "Not found");
    await prisma.article.update({
      where: { id },
      data: {
        slug,
        title,
        summary: String(req.body.summary ?? "").trim(),
        content: String(req.body.content ?? "").trim(),
        tags: JSON.stringify(tags),
        coverImage: String(req.body.coverImage ?? "").trim() || null,
        published,
        publishedAt: published ? (existing.publishedAt ?? new Date()) : null,
      },
    });
    return res.redirect("/admin/articles");
  }),
);

adminRouter.post(
  "/articles/:id/delete",
  asyncHandler(async (req, res) => {
    await prisma.article.delete({ where: { id: segment(req.params.id) } });
    return res.redirect("/admin/articles");
  }),
);

adminRouter.get(
  "/case-studies",
  asyncHandler(async (_req, res) => {
    const studies = await prisma.caseStudy.findMany({ orderBy: { updatedAt: "desc" } });
    return res.render("case-studies/list", { title: "Case studies", studies });
  }),
);

adminRouter.get("/case-studies/new", (_req, res) => {
  return res.render("case-studies/edit", { title: "New case study", study: null, error: null });
});

adminRouter.get(
  "/case-studies/:id/edit",
  asyncHandler(async (req, res) => {
    const study = await prisma.caseStudy.findUnique({ where: { id: segment(req.params.id) } });
    if (!study) throw new AppError(404, "NOT_FOUND", "Not found");
    return res.render("case-studies/edit", { title: "Edit case study", study, error: null });
  }),
);

adminRouter.post(
  "/case-studies",
  asyncHandler(async (req, res) => {
    const headline = String(req.body.headline ?? "").trim();
    const slug = String(req.body.slug ?? "").trim() || slugify(headline);
    const implementation = String(req.body.implementation ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    let results: Record<string, string> = {};
    try {
      results = JSON.parse(String(req.body.results ?? "{}")) as Record<string, string>;
    } catch {
      results = {};
    }
    const published = req.body.published === "on" || req.body.published === "true";
    const featured = req.body.featured === "on" || req.body.featured === "true";
    await prisma.caseStudy.create({
      data: {
        slug,
        client: String(req.body.client ?? "").trim(),
        industry: String(req.body.industry ?? "").trim(),
        headline,
        challenge: String(req.body.challenge ?? "").trim(),
        solution: String(req.body.solution ?? "").trim() || null,
        metric: String(req.body.metric ?? "").trim(),
        metricLabel: String(req.body.metricLabel ?? "").trim(),
        featured,
        implementation: JSON.stringify(implementation),
        results: JSON.stringify(results),
        coverImage: String(req.body.coverImage ?? "").trim() || null,
        published,
      },
    });
    return res.redirect("/admin/case-studies");
  }),
);

adminRouter.post(
  "/case-studies/:id/update",
  asyncHandler(async (req, res) => {
    const id = segment(req.params.id);
    const headline = String(req.body.headline ?? "").trim();
    const slug = String(req.body.slug ?? "").trim() || slugify(headline);
    const implementation = String(req.body.implementation ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    let results: Record<string, string> = {};
    try {
      results = JSON.parse(String(req.body.results ?? "{}")) as Record<string, string>;
    } catch {
      results = {};
    }
    const published = req.body.published === "on" || req.body.published === "true";
    const featured = req.body.featured === "on" || req.body.featured === "true";
    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, "NOT_FOUND", "Not found");
    await prisma.caseStudy.update({
      where: { id },
      data: {
        slug,
        client: String(req.body.client ?? "").trim(),
        industry: String(req.body.industry ?? "").trim(),
        headline,
        challenge: String(req.body.challenge ?? "").trim(),
        solution: String(req.body.solution ?? "").trim() || null,
        metric: String(req.body.metric ?? "").trim(),
        metricLabel: String(req.body.metricLabel ?? "").trim(),
        featured,
        implementation: JSON.stringify(implementation),
        results: JSON.stringify(results),
        coverImage: String(req.body.coverImage ?? "").trim() || null,
        published,
      },
    });
    return res.redirect("/admin/case-studies");
  }),
);

adminRouter.post(
  "/case-studies/:id/delete",
  asyncHandler(async (req, res) => {
    await prisma.caseStudy.delete({ where: { id: segment(req.params.id) } });
    return res.redirect("/admin/case-studies");
  }),
);

adminRouter.get(
  "/contact/submissions",
  asyncHandler(async (_req, res) => {
    const rows = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return res.render("contact/submissions", { title: "Contact submissions", rows });
  }),
);

adminRouter.post(
  "/contact/submissions/:id/status",
  asyncHandler(async (req, res) => {
    const status = String(req.body.status ?? "READ");
    if (!["NEW", "READ", "ARCHIVED"].includes(status)) {
      return res.redirect("/admin/contact/submissions");
    }
    await prisma.contactSubmission.update({
      where: { id: segment(req.params.id) },
      data: { status: status as "NEW" | "READ" | "ARCHIVED" },
    });
    return res.redirect("/admin/contact/submissions");
  }),
);

adminRouter.post(
  "/contact/submissions/:id/delete",
  asyncHandler(async (req, res) => {
    await prisma.contactSubmission.delete({ where: { id: segment(req.params.id) } });
    return res.redirect("/admin/contact/submissions");
  }),
);

adminRouter.get(
  "/contact/info",
  asyncHandler(async (_req, res) => {
    let info = await prisma.contactInfo.findUnique({ where: { id: 1 } });
    if (!info) {
      info = await prisma.contactInfo.create({
        data: {
          id: 1,
          email: env.ADMIN_EMAIL,
          phone: "",
          address: "",
          socials: "{}",
        },
      });
    }
    const socialsText = JSON.stringify(parseJsonObject(info.socials), null, 2);
    return res.render("contact/info", { title: "Contact info", info, socialsText });
  }),
);

adminRouter.post(
  "/contact/info",
  asyncHandler(async (req, res) => {
    let socials: Record<string, string> = {};
    try {
      socials = JSON.parse(String(req.body.socials ?? "{}")) as Record<string, string>;
    } catch {
      socials = {};
    }
    await prisma.contactInfo.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        email: String(req.body.email ?? "").trim(),
        phone: String(req.body.phone ?? "").trim() || null,
        address: String(req.body.address ?? "").trim() || null,
        socials: JSON.stringify(socials),
      },
      update: {
        email: String(req.body.email ?? "").trim(),
        phone: String(req.body.phone ?? "").trim() || null,
        address: String(req.body.address ?? "").trim() || null,
        socials: JSON.stringify(socials),
      },
    });
    return res.redirect("/admin/contact/info");
  }),
);
