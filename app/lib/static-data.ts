
export const projects = [
    {
        key: 0,
        title: "Personalized Investment Explorer",
        desc: "An investment learning tool based on personal interests. Integrated with Claude. Built with:",
        tech: ["Next.js", "Tailwind", "Claude Sonnet", "TypeScript", "Zustand", "Zod"],
        href: "https://slice.vercel.app",
    },
    {
        key: 1,
        title: "US Jobs & Inflation Report",
        desc: "Economic data visualization comparing job growth and inflation trends. Built with:",
        tech: ["Next.js", "Tailwind", "Recharts", "TypeScript", "REST"],
        href: "https://jobsandinflation.vercel.app",
    },
];

export const experience = [
  {
    id: 1,
    company: "Zumiez",
    role: "Frontend Developer",
    period: { start: 2022, end: 2025 },
    location: "Lynnwood, WA",
    description:
      "Global specialty retailer with 700+ stores. Led frontend modernization efforts across the web platform.",
    highlights: [
      "50% LCP improvement via React PWA migration",
      "Component library cut design-to-production time 30%",
      "GraphQL restructuring reduced API latency by 40%",
      "100% WCAG AA compliance across checkout experience",
    ],
    bg: "linear-gradient(150deg, #0d1f2d 0%, #1a3040 60%, #0a1520 100%)",
  },
  {
    id: 2,
    company: "Ventec Life Systems",
    role: "IT Support Specialist",
    period: { start: 2020, end: 2022 },
    location: "Bothell, WA",
    description:
      "Medical device manufacturer. Managed cloud infrastructure and enterprise system migrations.",
    highlights: [
      "$150K annual savings via Azure cloud consolidation",
      "200+ account migration from Google Workspace to O365",
      "99.98% ERP uptime via NGINX & SQL optimization",
    ],
    bg: "linear-gradient(150deg, #0a1520 0%, #0f2030 60%, #080e1a 100%)",
  },
];