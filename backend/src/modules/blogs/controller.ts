import type { Prisma } from "@prisma/client";
import type { Request, Response } from "express";
import { prisma } from "../../db/client.js";
import { AppError } from "../../middleware/error.js";
import { slugify } from "../../utils/slugify.js";
import { prismaPaginate } from "../../utils/pagination.js";
import type { CreateBlogInput, UpdateBlogInput } from "./schema.js";
import { segment } from "../../utils/params.js";
import { listBlogsQuerySchema } from "./schema.js";

export async function listBlogs(req: Request, res: Response) {
  const q = listBlogsQuerySchema.parse(req.query);
  const isAdmin = Boolean(req.auth);
  const where: Prisma.BlogPostWhereInput = {};
  if (!isAdmin) {
    where.published = true;
  } else if (q.published === "true") where.published = true;
  else if (q.published === "false") where.published = false;
  if (q.category) where.category = q.category;

  const result = await prismaPaginate(
    (args) => prisma.blogPost.findMany({ where, orderBy: { publishedAt: "desc" }, ...args }),
    () => prisma.blogPost.count({ where }),
    q.page,
    q.pageSize,
  );
  return res.json(result);
}

export async function getBlog(req: Request, res: Response) {
  const param = segment(req.params.param);
  const isAdmin = Boolean(req.auth);
  const where = isAdmin
    ? { OR: [{ slug: param }, { id: param }] }
    : { AND: [{ OR: [{ slug: param }, { id: param }] }, { published: true }] };
  const post = await prisma.blogPost.findFirst({ where });
  if (!post) throw new AppError(404, "NOT_FOUND", "Blog not found");
  return res.json(post);
}

export async function createBlog(req: Request, res: Response) {
  const body = req.body as CreateBlogInput;
  const slug = body.slug?.trim() || slugify(body.title);
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) throw new AppError(409, "SLUG_TAKEN", "Slug already exists");
  const published = body.published ?? false;
  const post = await prisma.blogPost.create({
    data: {
      slug,
      title: body.title,
      category: body.category,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage ?? null,
      readTime: body.readTime,
      published,
      publishedAt: published ? (body.publishedAt ?? new Date()) : null,
    },
  });
  return res.status(201).json(post);
}

export async function updateBlog(req: Request, res: Response) {
  const id = segment(req.params.id);
  const body = req.body as UpdateBlogInput;
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Blog not found");
  if (body.slug && body.slug !== existing.slug) {
    const clash = await prisma.blogPost.findUnique({ where: { slug: body.slug } });
    if (clash) throw new AppError(409, "SLUG_TAKEN", "Slug already exists");
  }

  let publishedAt = existing.publishedAt;
  if (body.published === true) publishedAt = body.publishedAt ?? existing.publishedAt ?? new Date();
  if (body.published === false) publishedAt = null;
  if (body.published === undefined && body.publishedAt !== undefined) publishedAt = body.publishedAt;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(body.slug !== undefined ? { slug: body.slug } : {}),
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.category !== undefined ? { category: body.category } : {}),
      ...(body.excerpt !== undefined ? { excerpt: body.excerpt } : {}),
      ...(body.content !== undefined ? { content: body.content } : {}),
      ...(body.coverImage !== undefined ? { coverImage: body.coverImage } : {}),
      ...(body.readTime !== undefined ? { readTime: body.readTime } : {}),
      ...(body.published !== undefined ? { published: body.published } : {}),
      publishedAt,
    },
  });
  return res.json(post);
}

export async function deleteBlog(req: Request, res: Response) {
  const id = segment(req.params.id);
  try {
    await prisma.blogPost.delete({ where: { id } });
  } catch {
    throw new AppError(404, "NOT_FOUND", "Blog not found");
  }
  return res.status(204).send();
}
