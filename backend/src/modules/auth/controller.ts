import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { prisma } from "../../db/client.js";
import { AppError } from "../../middleware/error.js";
import { clearAuthCookie, setAuthCookie, signToken } from "../../middleware/auth.js";
import type { LoginBody } from "./schema.js";

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as LoginBody;
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  const token = signToken({ sub: user.id, email: user.email });
  setAuthCookie(res, token);
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
}

export async function logout(_req: Request, res: Response): Promise<void> {
  clearAuthCookie(res);
  res.json({ ok: true });
}

export async function me(req: Request, res: Response): Promise<void> {
  const auth = req.auth;
  if (!auth) throw new AppError(401, "UNAUTHORIZED", "Authentication required");
  const user = await prisma.adminUser.findUnique({
    where: { id: auth.sub },
    select: { id: true, email: true, name: true, createdAt: true },
  });
  if (!user) throw new AppError(401, "UNAUTHORIZED", "User not found");
  res.json({ user });
}
