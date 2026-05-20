export type Service = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  tags: string[];
  description: string;
  features: string[];
  benefits: string[];
  stats: { value: string; label: string };
  process: { step: string; title: string; detail: string }[];
  industries?: string[];
};

export type BlogPost = {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  slug: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  headline: string;
  metric: string;
  metricLabel: string;
  featured?: boolean;
  solution?: string;
  implementation?: string[];
  results?: Record<string, string>;
};

export type Role = {
  title: string;
  department: string;
  location: string;
  type: string;
};
