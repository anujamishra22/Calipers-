import { z } from "zod";
import { paginationQuerySchema } from "../../utils/pagination.js";

export const listBlogsQuerySchema = paginationQuerySchema.extend({
  category: z.string().optional(),
  published: z.enum(["true", "false"]).optional(),
});

export const createBlogSchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  title: z.string().min(1).max(500),
  category: z.string().min(1).max(100),
  excerpt: z.string().min(1).max(2000),
  content: z.string().min(1),
  coverImage: z.string().max(2000).nullable().optional(),
  readTime: z.string().min(1).max(50),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().nullable().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
