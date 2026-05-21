import "dotenv/config";
import { z } from "zod";

const envSchema = z
  .object({
    DATABASE_URL: z.string().min(1),
    PORT: z.coerce.number().default(4000),
    JWT_SECRET: z.string().min(8),
    COOKIE_SECRET: z.string().min(8),
    ADMIN_EMAIL: z.string().email(),
    ADMIN_PASSWORD: z.string().min(8),
    CORS_ORIGIN: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  })
  .superRefine((data, ctx) => {
    if (data.NODE_ENV === "production") {
      if (data.CORS_ORIGIN === "*") {
        ctx.addIssue({
          code: "custom",
          path: ["CORS_ORIGIN"],
          message: "CORS_ORIGIN cannot be * in production",
        });
      }
      if (data.JWT_SECRET.length < 32) {
        ctx.addIssue({
          code: "custom",
          path: ["JWT_SECRET"],
          message: "JWT_SECRET must be at least 32 characters in production",
        });
      }
      if (data.COOKIE_SECRET.length < 32) {
        ctx.addIssue({
          code: "custom",
          path: ["COOKIE_SECRET"],
          message: "COOKIE_SECRET must be at least 32 characters in production",
        });
      }
      const weak = new Set([
        "change-me",
        "changeme",
        "changeme123",
        "secret",
        "password",
      ]);
      if (weak.has(data.ADMIN_PASSWORD.toLowerCase())) {
        ctx.addIssue({
          code: "custom",
          path: ["ADMIN_PASSWORD"],
          message: "ADMIN_PASSWORD is too weak for production",
        });
      }
    }
  });

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
