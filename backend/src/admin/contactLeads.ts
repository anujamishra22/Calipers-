import type { ContactSubmission } from "@prisma/client";
import { parseJsonArray } from "../utils/jsonFields.js";
import { rowsToCsv } from "../utils/csv.js";

const HEADERS = [
  "id",
  "created_at",
  "name",
  "email",
  "company",
  "company_size",
  "budget",
  "interests",
  "message",
  "status",
];

export function contactLeadsToCsv(rows: ContactSubmission[]): string {
  const data = rows.map((row) => [
    row.id,
    row.createdAt.toISOString(),
    row.name,
    row.email,
    row.company ?? "",
    row.size ?? "",
    row.budget ?? "",
    parseJsonArray(row.interests).join("; "),
    row.message,
    row.status,
  ]);
  return rowsToCsv(HEADERS, data.map((r) => r.map(String)));
}

export function contactLeadsCsvFilename(): string {
  const stamp = new Date().toISOString().slice(0, 10);
  return `contact-leads-${stamp}.csv`;
}
