import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { blogPosts } from "../../src/data/blog.js";
import { featuredCaseStudies } from "../../src/data/case-studies.js";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env for seeding");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    create: { email, passwordHash, name: "Admin" },
    update: { passwordHash },
  });

  await prisma.contactInfo.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      email: "hello@caliper.com",
      phone: "",
      address: "",
      socials: JSON.stringify({ twitter: "", linkedin: "" }),
    },
    update: {},
  });

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: {
        slug: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: `${post.excerpt}\n\n(Full article body can be edited in admin.)`,
        coverImage: post.image,
        readTime: post.readTime,
        published: true,
        publishedAt: new Date(post.date),
      },
      update: {
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        coverImage: post.image,
        readTime: post.readTime,
        published: true,
        publishedAt: new Date(post.date),
      },
    });
  }

  for (const cs of featuredCaseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      create: {
        slug: cs.slug,
        client: cs.client,
        industry: cs.industry,
        headline: cs.headline,
        challenge: cs.challenge,
        solution: cs.solution ?? null,
        metric: cs.metric,
        metricLabel: cs.metricLabel,
        featured: cs.featured ?? false,
        implementation: JSON.stringify(cs.implementation ?? []),
        results: JSON.stringify(cs.results ?? {}),
        published: true,
      },
      update: {
        client: cs.client,
        industry: cs.industry,
        headline: cs.headline,
        challenge: cs.challenge,
        solution: cs.solution ?? null,
        metric: cs.metric,
        metricLabel: cs.metricLabel,
        featured: cs.featured ?? false,
        implementation: JSON.stringify(cs.implementation ?? []),
        results: JSON.stringify(cs.results ?? {}),
        published: true,
      },
    });
  }

  const sampleArticles = [
    {
      slug: "why-measurement-matters",
      title: "Why measurement matters for GenAI products",
      summary: "A short take on evals, regression tests, and shipping with confidence.",
      content: "## Overview\n\nMeasurement is not optional when models change weekly.\n\n### Key ideas\n\n- Offline eval suites\n- Online guardrails\n- Human review loops",
      tags: ["GenAI", "Engineering"],
    },
    {
      slug: "from-pilot-to-production",
      title: "From pilot to production without losing velocity",
      summary: "Practical gates that keep teams fast while reducing incident risk.",
      content: "## Pilots\n\nStart narrow, measure outcomes, expand scope with clear rollback paths.",
      tags: ["Strategy", "Delivery"],
    },
    {
      slug: "observability-for-agents",
      title: "Observability patterns for agentic workflows",
      summary: "Tracing tool calls, latency budgets, and failure modes in multi-step agents.",
      content: "## Tracing\n\nCorrelate user sessions with tool traces and model versions.",
      tags: ["Agents", "Observability"],
    },
  ];

  for (const a of sampleArticles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      create: {
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        content: a.content,
        tags: JSON.stringify(a.tags),
        published: true,
        publishedAt: new Date(),
      },
      update: {
        title: a.title,
        summary: a.summary,
        content: a.content,
        tags: JSON.stringify(a.tags),
        published: true,
      },
    });
  }

  console.log("Seed completed.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    void prisma.$disconnect();
    process.exit(1);
  });
