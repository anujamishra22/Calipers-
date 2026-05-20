import { z } from "zod";
import { paginationQuerySchema } from "../../utils/pagination.js";

export const listCaseStudiesQuerySchema = paginationQuerySchema.extend({
  featured: z.enum(["true", "false"]).optional(),
  published: z.enum(["true", "false"]).optional(),
});

export const createCaseStudySchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  client: z.string().min(1).max(500),
  industry: z.string().min(1).max(200),
  headline: z.string().min(1).max(500),
  challenge: z.string().min(1),
  solution: z.string().nullable().optional(),
  metric: z.string().min(1).max(100),
  metricLabel: z.string().min(1).max(200),
  featured: z.boolean().optional(),
  implementation: z.array(z.string()).default([]),
  results: z.record(z.string(), z.string()).default({}),
  coverImage: z.string().max(2000).nullable().optional(),
  published: z.boolean().optional(),
});

export const updateCaseStudySchema = createCaseStudySchema.partial();

export type CreateCaseStudyInput = z.infer<typeof createCaseStudySchema>;
export type UpdateCaseStudyInput = z.infer<typeof updateCaseStudySchema>;
