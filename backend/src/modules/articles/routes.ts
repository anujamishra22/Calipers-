import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { optionalAuth, requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import * as ctrl from "./controller.js";
import { createArticleSchema, updateArticleSchema } from "./schema.js";

export const articlesRouter = Router();

articlesRouter.get("/", optionalAuth, asyncHandler(ctrl.listArticles));
articlesRouter.get("/:param", optionalAuth, asyncHandler(ctrl.getArticle));
articlesRouter.post("/", requireAuth, validateBody(createArticleSchema), asyncHandler(ctrl.createArticle));
articlesRouter.put("/:id", requireAuth, validateBody(updateArticleSchema), asyncHandler(ctrl.updateArticle));
articlesRouter.delete("/:id", requireAuth, asyncHandler(ctrl.deleteArticle));
