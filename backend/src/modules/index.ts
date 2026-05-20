import { Router } from "express";
import { authRouter } from "./auth/routes.js";
import { articlesRouter } from "./articles/routes.js";
import { blogsRouter } from "./blogs/routes.js";
import { caseStudiesRouter } from "./case-studies/routes.js";
import {
  contactInfoRouter,
  contactPostRouter,
  contactSubmissionsRouter,
} from "./contact/routes.js";
import { uploadsRouter } from "./uploads/routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/blogs", blogsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/case-studies", caseStudiesRouter);
apiRouter.use("/contact", contactPostRouter);
apiRouter.use("/contact-info", contactInfoRouter);
apiRouter.use("/contact-submissions", contactSubmissionsRouter);
apiRouter.use("/uploads", uploadsRouter);
