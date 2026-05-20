import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { optionalAuth, requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import * as ctrl from "./controller.js";
import { createCaseStudySchema, updateCaseStudySchema } from "./schema.js";

export const caseStudiesRouter = Router();

caseStudiesRouter.get("/", optionalAuth, asyncHandler(ctrl.listCaseStudies));
caseStudiesRouter.get("/:param", optionalAuth, asyncHandler(ctrl.getCaseStudy));
caseStudiesRouter.post(
  "/",
  requireAuth,
  validateBody(createCaseStudySchema),
  asyncHandler(ctrl.createCaseStudy),
);
caseStudiesRouter.put(
  "/:id",
  requireAuth,
  validateBody(updateCaseStudySchema),
  asyncHandler(ctrl.updateCaseStudy),
);
caseStudiesRouter.delete("/:id", requireAuth, asyncHandler(ctrl.deleteCaseStudy));
