export type ImpactSecondaryMetric = {
  value: string;
  label: string;
  icon: "database" | "shield" | "zap";
  /** Optional bottom decorative image (e.g. SLA shield, growth chart). */
  decoImage?: string;
};

export const impactMetrics = {
  primary: [
    {
      value: 3,
      suffix: "x",
      label: "FASTER IDEATION TO PROD",
      sublabel: "Enterprise average",
    },
    {
      value: 45,
      suffix: "%",
      label: "ENGINEERING TIME SAVED",
      sublabel: "Via automation & reuse",
    },
    {
      value: 65,
      suffix: "%",
      label: "AUTOMATION ACROSS OPS",
      sublabel: "Manual workflow reduction",
    },
    {
      value: 90,
      suffix: "%+",
      label: "PREDICTIVE ACCURACY",
      sublabel: "Avg model performance",
    },
  ],
  secondary: [
    {
      value: "5TB+",
      label: "Monthly Data Processed",
      icon: "database",
      decoImage: "/images/monthly-data-processed-deco.png",
    },
    {
      value: "99.9%",
      label: "SLA Guarantee",
      icon: "shield",
      decoImage: "/images/sla-guarantee-deco.png",
    },
    {
      value: "10K+",
      label: "Automated Actions/Day",
      icon: "zap",
      decoImage: "/images/automated-actions-deco.png",
    },
  ] satisfies ImpactSecondaryMetric[],
  platform: {
    clients: 120,
    countries: 10,
    deployments: 1000,
    uptime: "99.98%",
    integrations: 50,
  },
};
