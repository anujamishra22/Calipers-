import type { Service } from "@/types";

const commonProcess = [
  {
    step: "01",
    title: "Assess",
    detail: "Map data sources, risks, and automation surfaces with executive alignment.",
  },
  {
    step: "02",
    title: "Design",
    detail: "Architecture, model strategy, integration patterns, and rollout waves.",
  },
  {
    step: "03",
    title: "Build",
    detail: "Implement pipelines, models, integrations, and observability.",
  },
];

export const services: Service[] = [
  {
    id: "gen-ai-platform",
    number: "01",
    title: "Generative AI & Agent Platforms",
    subtitle: "LLMs & Agents",
    icon: "Cpu",
    tags: ["GENAI", "AI"],
    description:
      "Production-ready assistants, retrieval-augmented answers, and agent workflows grounded in your data. We ship evaluation harnesses, guardrails, and tracing so teams iterate safely—from first prototype to thousands of daily conversations—without sacrificing latency or clarity.",
    features: [
      "RAG pipelines and vector stores",
      "Tool-calling agents with approvals",
      "Prompt/version management",
      "Evaluation suites and regression checks",
      "Latency and cost observability",
    ],
    benefits: [
      "→ Ship GenAI features in weeks, not quarters",
      "→ Fewer hallucinations via grounded retrieval",
      "→ Repeatable releases with measurable quality",
    ],
    stats: { value: "94%", label: "Avg Answer Quality Score" },
    process: [
      {
        step: "01",
        title: "Prototype",
        detail: "Ground models on curated corpora and user journeys",
      },
      {
        step: "02",
        title: "Harden",
        detail: "Add evals, policy filters, and human review where needed",
      },
      {
        step: "03",
        title: "Scale",
        detail: "Deploy with autoscaling, caching, and cost controls",
      },
    ],
    industries: ["SaaS", "BFSI", "Healthcare"],
  },
  {
    id: "automation",
    number: "02",
    title: "Enterprise AI Automation",
    subtitle: "Workflow Intelligence",
    icon: "Bot",
    tags: ["AUTOMATION", "AI"],
    description:
      "AI agents for workflows across HR, IT, and Sales ops with intelligent process automation. We orchestrate approvals, ticketing, provisioning, and document workflows with policy-aware guardrails. Enterprises see a 65% reduction in manual workflows while improving SLA adherence and auditability across every department.",
    features: [
      "Policy-aware AI agents",
      "Human-in-the-loop approvals",
      "Deep ERP/ITSM integrations",
      "Natural language task intake",
      "Continuous optimization loops",
    ],
    benefits: [
      "→ 65% reduction in manual workflows",
      "→ Faster cycle times across HR and IT",
      "→ Measurable ROI within two quarters",
    ],
    stats: { value: "65%", label: "Reduction in Manual Workflows" },
    process: commonProcess,
    industries: ["SaaS", "Manufacturing", "E-commerce"],
  },
  {
    id: "analytics",
    number: "03",
    title: "Predictive Analytics & Intelligence",
    subtitle: "Decision Velocity",
    icon: "TrendingUp",
    tags: ["ANALYTICS", "DATA"],
    description:
      "Real-time dashboards with AI insights. 50TB+ data processed monthly across 120+ enterprise dashboards. We unify streaming and batch signals into governed feature sets, enabling forecasting, anomaly surfacing, and executive-ready narratives without sacrificing data residency requirements.",
    features: [
      "Streaming + batch fusion",
      "Forecasting and anomaly layers",
      "Governed metrics catalog",
      "Embedded NL insights",
      "Role-based narrative summaries",
    ],
    benefits: [
      "→ 92% forecasting accuracy on benchmark workloads",
      "→ Faster decisions with trusted metrics",
      "→ Lower cost of insight per business user",
    ],
    stats: { value: "92%", label: "Forecasting Accuracy" },
    process: commonProcess,
    industries: ["E-commerce", "BFSI", "Manufacturing"],
  },
  {
    id: "ai-software",
    number: "04",
    title: "AI-Native Software Engineering",
    subtitle: "Products & Platforms",
    icon: "Code",
    tags: ["SOFTWARE", "ENGINEERING"],
    description:
      "Full-stack delivery for AI-powered products: APIs, web apps, data pipelines, and integrations. Calipers pairs modern TypeScript/Python stacks with rigorous testing and CI/CD so your roadmap stays predictable—from MVPs to multi-region deployments.",
    features: [
      "Domain-driven APIs and services",
      "Frontend experiences for AI workflows",
      "Observability and feature flags",
      "Automated test and release pipelines",
      "Performance tuning for ML backends",
    ],
    benefits: [
      "→ Predictable releases with shorter cycle times",
      "→ Shared codebase patterns across squads",
      "→ Lower operational surprise in production",
    ],
    stats: { value: "2×", label: "Faster Release Cadence" },
    process: commonProcess,
    industries: ["SaaS", "E-commerce", "BFSI"],
  },
  {
    id: "custom-ai",
    number: "05",
    title: "Custom AI Model Development",
    subtitle: "Domain Models",
    icon: "Brain",
    tags: ["AI", "ML"],
    description:
      "LLM-based enterprise assistants, domain-specific AI models, NLP and Computer Vision solutions across 15+ industries. We deliver evaluation harnesses, safety filters, and deployment patterns that match regulated environments while keeping iteration speed high for product teams.",
    features: [
      "Fine-tuning and RAG stacks",
      "Evaluation harnesses",
      "Safety and policy filters",
      "Vision + document AI",
      "Edge and cloud deployment",
    ],
    benefits: [
      "→ 94% avg model accuracy post-tuning",
      "→ Faster release cycles with MLOps",
      "→ IP retained in your tenancy",
    ],
    stats: { value: "94%", label: "Avg Model Accuracy" },
    process: commonProcess,
    industries: ["Healthcare", "Manufacturing", "SaaS"],
  },
  {
    id: "cloud",
    number: "06",
    title: "Cloud & AI Infrastructure",
    subtitle: "MLOps Scale",
    icon: "Cloud",
    tags: ["CLOUD", "MLOPS"],
    description:
      "Scalable AI pipelines on AWS, Azure, GCP with MLOps and model lifecycle management. We implement IaC, observability, cost guardrails, and resilient training clusters so teams can ship models without surprises. Uptime targets are backed by SRE playbooks and automated failover patterns.",
    features: [
      "Multi-cloud pipelines",
      "IaC and policy as code",
      "Cost and performance guardrails",
      "Model registry and promotion",
      "SRE-backed operations",
    ],
    benefits: [
      "→ 99.98% infrastructure uptime",
      "→ Predictable cloud spend",
      "→ Faster experimentation safely",
    ],
    stats: { value: "99.98%", label: "Infrastructure Uptime" },
    process: commonProcess,
    industries: ["SaaS", "E-commerce", "BFSI"],
  },
  {
    id: "consulting",
    number: "07",
    title: "AI Readiness & Transformation Consulting",
    subtitle: "Strategy",
    icon: "Compass",
    tags: ["CONSULTING", "STRATEGY"],
    description:
      "AI adoption strategy, digital transformation roadmap, enterprise AI maturity assessment. We align executives, product, and engineering on a sequenced plan with measurable checkpoints. Workshops, architecture reviews, and value models ensure every initiative ladders to P&L outcomes.",
    features: [
      "Maturity assessments",
      "Value modeling",
      "AI-native architecture roadmaps",
      "Vendor and build decisions",
      "Change management kits",
    ],
    benefits: [
      "→ 120 days avg ROI timeline",
      "→ Shared language across teams",
      "→ De-risked execution waves",
    ],
    stats: { value: "120 days", label: "Avg ROI Timeline" },
    process: commonProcess,
    industries: ["BFSI", "Healthcare", "Manufacturing"],
  },
];
