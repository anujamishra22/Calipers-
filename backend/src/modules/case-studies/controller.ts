import type { Prisma } from "@prisma/client";
import type { Request, Response } from "express";
import { prisma } from "../../db/client.js";
import { AppError } from "../../middleware/error.js";
import { parseJsonArray, parseJsonObject } from "../../utils/jsonFields.js";
import { slugify } from "../../utils/slugify.js";
import { prismaPaginate } from "../../utils/pagination.js";
import type { CreateCaseStudyInput, UpdateCaseStudyInput } from "./schema.js";
import { segment } from "../../utils/params.js";
import { listCaseStudiesQuerySchema } from "./schema.js";

export async function listCaseStudies(req: Request, res: Response) {
  const q = listCaseStudiesQuerySchema.parse(req.query);
  const isAdmin = Boolean(req.auth);
  const where: Prisma.CaseStudyWhereInput = {};
  if (!isAdmin) where.published = true;
  else if (q.published === "true") where.published = true;
  else if (q.published === "false") where.published = false;
  if (q.featured === "true") where.featured = true;
  if (q.featured === "false") where.featured = false;

  const result = await prismaPaginate(
    (args) =>
      prisma.caseStudy.findMany({
        where,
        orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
        ...args,
      }),
    () => prisma.caseStudy.count({ where }),
    q.page,
    q.pageSize,
  );
  return res.json({
    ...result,
    data: result.data.map((row) => ({
      ...row,
      implementation: parseJsonArray(row.implementation),
      results: parseJsonObject(row.results),
    })),
  });
}

export async function getCaseStudy(req: Request, res: Response) {
  const param = segment(req.params.param);
  const isAdmin = Boolean(req.auth);
  const where = isAdmin
    ? { OR: [{ slug: param }, { id: param }] }
    : { AND: [{ OR: [{ slug: param }, { id: param }] }, { published: true }] };
  const cs = await prisma.caseStudy.findFirst({ where });
  if (!cs) throw new AppError(404, "NOT_FOUND", "Case study not found");
  return res.json({
    ...cs,
    implementation: parseJsonArray(cs.implementation),
    results: parseJsonObject(cs.results),
  });
}

export async function createCaseStudy(req: Request, res: Response) {
  const body = req.body as CreateCaseStudyInput;
  const slug = body.slug?.trim() || slugify(body.headline);
  const existing = await prisma.caseStudy.findUnique({ where: { slug } });
  if (existing) throw new AppError(409, "SLUG_TAKEN", "Slug already exists");
  const published = body.published ?? true;
  const cs = await prisma.caseStudy.create({
    data: {
      slug,
      client: body.client,
      industry: body.industry,
      headline: body.headline,
      challenge: body.challenge,
      solution: body.solution ?? null,
      metric: body.metric,
      metricLabel: body.metricLabel,
      featured: body.featured ?? false,
      implementation: JSON.stringify(body.implementation),
      results: JSON.stringify(body.results),
      coverImage: body.coverImage ?? null,
      published,
    },
  });
  return res.status(201).json({
    ...cs,
    implementation: parseJsonArray(cs.implementation),
    results: parseJsonObject(cs.results),
  });
}

export async function updateCaseStudy(req: Request, res: Response) {
  const id = segment(req.params.id);
  const body = req.body as UpdateCaseStudyInput;
  const existing = await prisma.caseStudy.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "NOT_FOUND", "Case study not found");
  if (body.slug && body.slug !== existing.slug) {
    const clash = await prisma.caseStudy.findUnique({ where: { slug: body.slug } });
    if (clash) throw new AppError(409, "SLUG_TAKEN", "Slug already exists");
  }
  const cs = await prisma.caseStudy.update({
    where: { id },
    data: {
      ...(body.slug !== undefined ? { slug: body.slug } : {}),
      ...(body.client !== undefined ? { client: body.client } : {}),
      ...(body.industry !== undefined ? { industry: body.industry } : {}),
      ...(body.headline !== undefined ? { headline: body.headline } : {}),
      ...(body.challenge !== undefined ? { challenge: body.challenge } : {}),
      ...(body.solution !== undefined ? { solution: body.solution } : {}),
      ...(body.metric !== undefined ? { metric: body.metric } : {}),
      ...(body.metricLabel !== undefined ? { metricLabel: body.metricLabel } : {}),
      ...(body.featured !== undefined ? { featured: body.featured } : {}),
      ...(body.implementation !== undefined ? { implementation: JSON.stringify(body.implementation) } : {}),
      ...(body.results !== undefined ? { results: JSON.stringify(body.results) } : {}),
      ...(body.coverImage !== undefined ? { coverImage: body.coverImage } : {}),
      ...(body.published !== undefined ? { published: body.published } : {}),
    },
  });
  return res.json({
    ...cs,
    implementation: parseJsonArray(cs.implementation),
    results: parseJsonObject(cs.results),
  });
}

export async function deleteCaseStudy(req: Request, res: Response) {
  const id = segment(req.params.id);
  try {
    await prisma.caseStudy.delete({ where: { id } });
  } catch {
    throw new AppError(404, "NOT_FOUND", "Case study not found");
  }
  return res.status(204).send();
}
