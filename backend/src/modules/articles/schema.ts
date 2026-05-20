import { z } from "zod";
import { paginationQuerySchema } from "../../utils/pagination.js";

export const listArticlesQuerySchema = paginationQuerySchema.extend({
  published: z.enum(["true", "false"]).optional(),
});

export const createArticleSchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  title: z.string().min(1).max(500),
  summary: z.string().min(1).max(2000),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().max(2000).nullable().optional(),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().nullable().optional(),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
