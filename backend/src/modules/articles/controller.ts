import type { Prisma } from "@prisma/client";
import type { Request, Response } from "express";
import { prisma } from "../../db/client.js";
import { AppError } from "../../middleware/error.js";
import { parseJsonArray } from "../../utils/jsonFields.js";
import { slugify } from "../../utils/slugify.js";
import { prismaPaginate } from "../../utils/pagination.js";
import type { CreateArticleInput, UpdateArticleInput } from "./schema.js";
import { segment } from "../../utils/params.js";
import { listArticlesQuerySchema } from "./schema.js";

export async function listArticles(req: Request, res: Response) {
  const q = listArticlesQuerySchema.parse(req.query);
  const isAdmin = Boolean(req.auth);
  const where: Prisma.ArticleWhereInput = {};
  if (!isAdmin) where.published = true;
  else if (q.published === "true") where.published = true;
  else if (q.published === "false") where.published = false;

  const result = await prismaPaginate(
    (args) => prisma.article.findMany({ where, orderBy: { publishedAt: "desc" }, ...args }),
    () => prisma.article.count({ where }),
    q.page,
    q.pageSize,
  );
  return res.json({
    ...result,
    data: result.data.map((a) => ({ ...a, tags: parseJsonArray(a.tags) })),
  });
}

export async function getArticle(req: Request, res: Response) {
  const param = segment(req.params.param);
  const isAdmin = Boolean(req.auth);
  const where = isAdmin
    ? { OR: [{ slug: param }, { id: param }] }
    : { AND: [{ OR: [{ slug: param }, { id: param }] }, { published: true }] };
  const article = await prisma.article.findFirst({ where });
  if (!article) throw new AppError(404, "NOT_FOUND", "Article not found");
  return res.json({ ...article, tags: parseJsonArray(article.tags) });
}

export async function createArticle(req: Request, res: Response) {
  const body = req.body as CreateArticleInput;
  const slug = body.slug?.trim() || slugify(body.title);
  const existing = await prisma.article.findUnique({ where: { slug } });
  if (existing) throw new AppError(409, "SLUG_TAKEN", "Slug already exists");
  const published = body.published ?? false;
  const article = await prisma.article.create({
    data: {
      slug,
      title: body.title,
      summary: body.summary,
      content: body.content,
      tags: JSON.stringify(body.tags),
      coverImage: body.coverImage ?? null,
      published,
      publishedAt: published ? (body.publishedAt ?? new Date()) : null,
    },
  });
  return res.status(201).json({ ...article, tags: parseJsonArray(article.tags) });
}

export async function updateArticle(req: Request, res: Response) {
  const id = segment(req.params.id);
  const body = req.body as UpdateArticleInput;
  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Article not found");
  if (body.slug && body.slug !== existing.slug) {
    const clash = await prisma.article.findUnique({ where: { slug: body.slug } });
    if (clash) throw new AppError(409, "SLUG_TAKEN", "Slug already exists");
  }

  let publishedAt = existing.publishedAt;
  if (body.published === true) publishedAt = body.publishedAt ?? existing.publishedAt ?? new Date();
  if (body.published === false) publishedAt = null;
  if (body.published === undefined && body.publishedAt !== undefined) publishedAt = body.publishedAt;

  const article = await prisma.article.update({
    where: { id },
    data: {
      ...(body.slug !== undefined ? { slug: body.slug } : {}),
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.summary !== undefined ? { summary: body.summary } : {}),
      ...(body.content !== undefined ? { content: body.content } : {}),
      ...(body.tags !== undefined ? { tags: JSON.stringify(body.tags) } : {}),
      ...(body.coverImage !== undefined ? { coverImage: body.coverImage } : {}),
      ...(body.published !== undefined ? { published: body.published } : {}),
      publishedAt,
    },
  });
  return res.json({ ...article, tags: parseJsonArray(article.tags) });
}

export async function deleteArticle(req: Request, res: Response) {
  const id = segment(req.params.id);
  try {
    await prisma.article.delete({ where: { id } });
  } catch {
    throw new AppError(404, "NOT_FOUND", "Article not found");
  }
  return res.status(204).send();
}
