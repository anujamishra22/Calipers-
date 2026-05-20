import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { optionalAuth, requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import * as ctrl from "./controller.js";
import { createBlogSchema, updateBlogSchema } from "./schema.js";

export const blogsRouter = Router();

blogsRouter.get("/", optionalAuth, asyncHandler(ctrl.listBlogs));
blogsRouter.get("/:param", optionalAuth, asyncHandler(ctrl.getBlog));
blogsRouter.post("/", requireAuth, validateBody(createBlogSchema), asyncHandler(ctrl.createBlog));
blogsRouter.put("/:id", requireAuth, validateBody(updateBlogSchema), asyncHandler(ctrl.updateBlog));
blogsRouter.delete("/:id", requireAuth, asyncHandler(ctrl.deleteBlog));
