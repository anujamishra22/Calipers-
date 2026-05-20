import type { Request, Response } from "express";
import { prisma } from "../../db/client.js";
import { AppError } from "../../middleware/error.js";
import { parseJsonArray, parseJsonObject } from "../../utils/jsonFields.js";
import { prismaPaginate } from "../../utils/pagination.js";
import type { CreateContactInput, UpdateContactInfoInput } from "./schema.js";
import { segment } from "../../utils/params.js";
import { listSubmissionsQuerySchema, patchSubmissionSchema } from "./schema.js";

const CONTACT_INFO_ID = 1;

export async function createSubmission(req: Request, res: Response) {
  const body = req.body as CreateContactInput;
  const row = await prisma.contactSubmission.create({
    data: {
      name: body.name,
      email: body.email,
      company: body.company,
      size: body.size,
      message: body.message,
      budget: body.budget,
      interests: JSON.stringify(body.interests ?? []),
    },
  });
  return res.status(201).json({
    ...row,
    interests: parseJsonArray(row.interests),
  });
}

export async function getContactInfo(_req: Request, res: Response) {
  const info = await prisma.contactInfo.findUnique({ where: { id: CONTACT_INFO_ID } });
  if (!info) throw new AppError(404, "NOT_FOUND", "Contact info not configured");
  return res.json({ ...info, socials: parseJsonObject(info.socials) });
}

export async function putContactInfo(req: Request, res: Response) {
  const body = req.body as UpdateContactInfoInput;
  const info = await prisma.contactInfo.upsert({
    where: { id: CONTACT_INFO_ID },
    create: {
      id: CONTACT_INFO_ID,
      email: body.email,
      phone: body.phone ?? null,
      address: body.address ?? null,
      socials: JSON.stringify(body.socials ?? {}),
    },
    update: {
      email: body.email,
      ...(body.phone !== undefined ? { phone: body.phone } : {}),
      ...(body.address !== undefined ? { address: body.address } : {}),
      ...(body.socials !== undefined ? { socials: JSON.stringify(body.socials) } : {}),
    },
  });
  return res.json({ ...info, socials: parseJsonObject(info.socials) });
}

export async function listSubmissions(req: Request, res: Response) {
  const q = listSubmissionsQuerySchema.parse(req.query);
  const where = q.status ? { status: q.status } : {};
  const result = await prismaPaginate(
    (args) =>
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        ...args,
      }),
    () => prisma.contactSubmission.count({ where }),
    q.page,
    q.pageSize,
  );
  return res.json({
    ...result,
    data: result.data.map((row) => ({
      ...row,
      interests: parseJsonArray(row.interests),
    })),
  });
}

export async function patchSubmission(req: Request, res: Response) {
  const id = segment(req.params.id);
  const body = patchSubmissionSchema.parse(req.body);
  try {
    const row = await prisma.contactSubmission.update({
      where: { id },
      data: { status: body.status },
    });
    return res.json({ ...row, interests: parseJsonArray(row.interests) });
  } catch {
    throw new AppError(404, "NOT_FOUND", "Submission not found");
  }
}

export async function deleteSubmission(req: Request, res: Response) {
  const id = segment(req.params.id);
  try {
    await prisma.contactSubmission.delete({ where: { id } });
  } catch {
    throw new AppError(404, "NOT_FOUND", "Submission not found");
  }
  return res.status(204).send();
}
