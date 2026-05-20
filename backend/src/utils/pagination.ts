import { z } from "zod";

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length;
  const start = (page - 1) * pageSize;
  const data = items.slice(start, start + pageSize);
  return {
    data,
    meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) || 1 },
  };
}

export async function prismaPaginate<T>(
  findMany: (args: { skip: number; take: number }) => Promise<T[]>,
  count: () => Promise<number>,
  page: number,
  pageSize: number,
) {
  const skip = (page - 1) * pageSize;
  const [data, total] = await Promise.all([findMany({ skip, take: pageSize }), count()]);
  return {
    data,
    meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) || 1 },
  };
}
