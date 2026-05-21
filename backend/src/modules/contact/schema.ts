import { z } from "zod";
import { paginationQuerySchema } from "../../utils/pagination.js";

export const createContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  size: z.string().max(100).optional(),
  message: z.string().min(1).max(10000),
  budget: z.string().max(100).optional(),
  interests: z.array(z.string()).optional().default([]),
  /** Honeypot — must be empty (bots often fill hidden fields). */
  website: z.string().max(0).optional().default(""),
});

export const updateContactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string().max(200).nullable().optional(),
  address: z.string().max(500).nullable().optional(),
  socials: z.record(z.string(), z.string()).optional().default({}),
});

export const patchSubmissionSchema = z.object({
  status: z.enum(["NEW", "READ", "ARCHIVED"]),
});

export const listSubmissionsQuerySchema = paginationQuerySchema.extend({
  status: z.enum(["NEW", "READ", "ARCHIVED"]).optional(),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInfoInput = z.infer<typeof updateContactInfoSchema>;
