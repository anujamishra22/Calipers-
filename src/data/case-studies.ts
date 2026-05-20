import type { CaseStudy } from "../types";

export const featuredCaseStudies: CaseStudy[] = [
  {
    slug: "tier1-bank-assistants",
    client: "A Tier-1 Private Sector Bank (India)",
    industry: "BFSI",
    challenge:
      "Call center and digital support could not keep up with product growth. NPS was flat while volume doubled.",
    headline: "How a Tier-1 Bank Scaled Support with GenAI",
    metric: "40%",
    metricLabel: "Handle time reduction",
    featured: true,
    solution:
      "Retrieval-grounded assistants with human handoff, integrated to core banking and CRM, with full eval and release discipline.",
    implementation: [
      "Week 1-2: Content and policy corpora, red-team scenarios, design review",
      "Week 3-4: RAG stack, guardrails, and traceability in staging",
      "Week 5-6: Pilots on two product lines with quality gates",
      "Week 7-8: Phased production with model and prompt version control",
      "Week 9-12: Tuning, analytics, and self-serve content updates",
    ],
    results: {
      handleTime: "40% faster",
      resolution: "2.1× more FCR on digital",
      cost: "30% lower cost per contact",
    },
  },
  {
    slug: "manufacturing-downtime",
    client: "Global Manufacturing Conglomerate",
    industry: "Manufacturing",
    challenge:
      "Unplanned downtime exceeded 400 hours annually across 12 plants, eroding margin and OTIF performance.",
    headline: "Manufacturing Giant Achieves 60% Downtime Reduction",
    metric: "60%",
    metricLabel: "Downtime reduction",
    featured: true,
    solution:
      "Predictive maintenance models on vibration and thermal telemetry, unified MLOps, and edge inference.",
    implementation: [
      "Month 1: Sensor harmonization and historian integration",
      "Month 2: Baseline failure signatures and labeling",
      "Month 3: Pilot on two lines with shadow scoring",
      "Month 4-5: Rollout with maintenance workflow hooks",
      "Month 6: Continuous learning and SLA reporting",
    ],
    results: {
      downtimeReduction: "60%",
      defectDetection: "99.1%",
      energySavings: "25%",
    },
  },
  {
    slug: "ecommerce-recommendations",
    client: "Leading E-Commerce Marketplace",
    industry: "E-commerce",
    challenge:
      "Generic recommendations drove low AOV; churn pressure on margins despite healthy traffic.",
    headline: "E-Commerce Platform 3x Revenue with AI Recommendations",
    metric: "3x",
    metricLabel: "Revenue lift",
    featured: true,
    solution:
      "Real-time personalization stack with demand forecasting and inventory-aware ranking.",
    implementation: [
      "Phase 1: Event stream unification and feature store",
      "Phase 2: Ranking experiments with guardrails",
      "Phase 3: Online learning with human-in-the-loop review",
      "Phase 4: Global rollout with latency SLOs",
    ],
    results: {
      revenueLift: "3x from AI recommendations",
      cartAbandonment: "50% reduction",
      conversionLift: "18% checkout conversion",
    },
  },
  {
    slug: "healthcare-analytics",
    client: "A leading multi-hospital network",
    industry: "Healthcare",
    challenge:
      "Clinical teams needed faster operational insight without slowing day-to-day care.",
    headline: "Clinical ops dashboards in half the time",
    metric: "40%",
    metricLabel: "Faster insight cycles",
    featured: true,
    solution:
      "Unified analytics layer across EHR, staffing, and throughput signals with role-based views and near-real-time refreshes—without pulling clinicians into BI tooling.",
    implementation: [
      "Month 1: Data governance, PHI-safe aggregates, and metric definitions with clinical sponsors",
      "Month 2: Executive and ward-level dashboards with drill-down guardrails",
      "Month 3: Alerts for census pressure and SLA breaches tied to escalation paths",
      "Month 4+: Adoption analytics, feedback loops, and iterative KPI refinement",
    ],
    results: {
      insightCycles: "40% faster cycles",
      reportingHours: "62% less analyst rework",
      adoption: "Leadership review weekly → daily",
    },
  },
  {
    slug: "saas-mlops-scale",
    client: "High-growth SaaS unicorn",
    industry: "SaaS",
    challenge: "Model releases were manual; teams could not iterate quickly enough.",
    headline: "5x faster model deployment",
    metric: "45%",
    metricLabel: "Cloud cost reduction",
    featured: true,
    solution:
      "Git-backed ML pipelines, automated evaluation gates, and progressive rollout with feature flags—aligned to product releases instead of ad-hoc notebook pushes.",
    implementation: [
      "Quarter 1: Standardized environments, artifact registry, and CI/CD for training jobs",
      "Quarter 2: Shadow deployments, canaries, and rollback hooks in the inference tier",
      "Quarter 3: Cost telemetry per tenant and autoscaling tuned to SLOs",
      "Quarter 4: Self-serve retraining templates owned by squads",
    ],
    results: {
      deploymentFrequency: "5× faster releases",
      cloudCost: "45% infra savings",
      incidents: "Major Sev-1 cut by half",
    },
  },
];

/** Same ordering as featured grid + detail sections (single source of truth). */
export const caseStudyCards: CaseStudy[] = featuredCaseStudies;
