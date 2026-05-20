import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { contactSubmitLimiter } from "../../middleware/rateLimit.js";
import * as ctrl from "./controller.js";
import {
  createContactSchema,
  patchSubmissionSchema,
  updateContactInfoSchema,
} from "./schema.js";

export const contactPostRouter = Router();
contactPostRouter.post(
  "/",
  contactSubmitLimiter,
  validateBody(createContactSchema),
  asyncHandler(ctrl.createSubmission),
);

export const contactInfoRouter = Router();
contactInfoRouter.get("/", asyncHandler(ctrl.getContactInfo));
contactInfoRouter.put(
  "/",
  requireAuth,
  validateBody(updateContactInfoSchema),
  asyncHandler(ctrl.putContactInfo),
);

export const contactSubmissionsRouter = Router();
contactSubmissionsRouter.get("/", requireAuth, asyncHandler(ctrl.listSubmissions));
contactSubmissionsRouter.patch(
  "/:id",
  requireAuth,
  validateBody(patchSubmissionSchema),
  asyncHandler(ctrl.patchSubmission),
);
contactSubmissionsRouter.delete("/:id", requireAuth, asyncHandler(ctrl.deleteSubmission));
