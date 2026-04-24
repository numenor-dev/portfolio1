
export const projects = [
    {
        key: 0,
        title: "Personalized Investment Explorer",
        desc: "An investment learning tool based on personal interests. Integrated with Claude.",
        tech: ["Next.js", "Tailwind", "Claude Sonnet", "TypeScript", "Zustand", "Zod"],
        href: "https://slice.vercel.app",
    },
    {
        key: 1,
        title: "US Jobs & Inflation Report",
        desc: "Economic data visualization comparing job growth and inflation trends.",
        tech: ["Next.js", "Tailwind", "Recharts", "TypeScript", "REST"],
        href: "https://jobsandinflation.vercel.app",
    },
];

export const experience = [
    {
        company: "Zumiez",
        role: "Frontend Developer",
        date: "2022 - 2025",
        location: "Lynnwood, WA",
        highlights: [
            "50% faster page load via React PWA migration",
            "40% quicker API responses after GraphQL restructuring",
            "50% fewer checkout steps by integrating Aurus tokenization",
            "30% faster design-to-production via reusable component library",
            
        ],
    },
    {
        company: "Ventec Life Systems",
        role: "IT Support",
        date: "2020 - 2022",
        location: "Bothell, WA",
        highlights: [
            "Saved $150K annually with Azure cloud consolidation",
            "99.98% ERP uptime via NGINX and SQL Server tuning",
            "200+ account migration from Google Workspace to O365",
        ],
    },
];

export const techDelay = projects.reduce<number[]>((total, project, i) => {
    const prev = i === 0 ? 0 : total[i - 1] + projects[i - 1].tech.length * 0.7 + 1;
    total.push(0.7 + prev);
    return total;
}, []);