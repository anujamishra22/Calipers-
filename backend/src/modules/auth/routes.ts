import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { loginLimiter } from "../../middleware/rateLimit.js";
import * as ctrl from "./controller.js";
import { loginBodySchema } from "./schema.js";

export const authRouter = Router();

authRouter.post("/login", loginLimiter, validateBody(loginBodySchema), asyncHandler(ctrl.login));
authRouter.post("/logout", asyncHandler(ctrl.logout));
authRouter.get("/me", requireAuth, asyncHandler(ctrl.me));
