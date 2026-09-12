export type WorkKind = "product" | "project";

export type WorkSection = {
  heading: string;
  body: string;
};

export type WorkItem = {
  kind: WorkKind;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string[];
  tech: string[];
  color: string;
  image: string;
  github: string;
  /** Button label for github URL. Defaults to "Source". Use "Releases" when source is closed. */
  githubLabel?: string;
  demo: string;
  featured?: boolean;
  highlights?: string[];
  sections?: WorkSection[];
};

export const workItems: WorkItem[] = [
  {
    kind: "product",
    slug: "cleanpulse",
    title: "CleanPulse",
    tagline: "Mac cleaner for developers",
    summary:
      "Scan and clear regenerable clutter and large files on your Mac — local-first, account-gated, built with Tauri.",
    description: [
      "CleanPulse helps developers reclaim disk space without guessing. It finds regenerable clutter like node_modules and package caches, plus bulky files matched by filters, then lets you confirm what actually goes.",
      "Paths stay on the Mac. The desktop app is a Tauri + Rust scanner with a React UI; the marketing site and install flow run on Next.js with Clerk auth.",
    ],
    tech: ["Tauri", "Rust", "React", "Next.js", "TypeScript", "Clerk"],
    color: "#FF6A2B",
    image: "/images/cleanpulse-preview.png",
    github: "https://github.com/bimlesharma/cleanpulse-releases/releases",
    githubLabel: "Releases",
    demo: "https://cleanpulse.bimlesh.dev",
    featured: true,
    highlights: [
      "Local scans — paths are not inventoried in the cloud",
      "macOS confirmation sheet before deletes",
      "Curl / Homebrew install with signed releases",
      "Account-gated access for the promo stage",
    ],
    sections: [
      {
        heading: "Problem",
        body: "Dev machines fill up with regenerable junk and large artifacts. Generic cleaners are blunt; manual cleanup is slow and easy to get wrong.",
      },
      {
        heading: "Approach",
        body: "CleanPulse categorizes regenerable clutter and large-file matches, shows size first, and keeps the final delete under macOS approval. The web site handles signup, install commands, and release discovery.",
      },
      {
        heading: "Stack",
        body: "Desktop: Tauri 2, Rust scanner, React UI. Web: Next.js, Clerk, Vercel. Releases via GitHub + Homebrew cask.",
      },
    ],
  },
  {
    kind: "product",
    slug: "listpeers",
    title: "ListPeers",
    tagline: "Privacy-first academic analytics",
    summary:
      "Consent-driven SGPA/CGPA trends and peer comparisons with strict visibility modes and Row-Level Security.",
    description: [
      "ListPeers lets students visualize academic trends and peer comparisons without treating grades as public by default.",
      "Visibility modes (Anonymous / Pseudonymous / Visible), Supabase Auth, and Postgres Row-Level Security keep access boundaries explicit.",
    ],
    tech: ["Next.js", "React", "Supabase", "PostgreSQL", "OAuth"],
    color: "#EC4899",
    image: "/images/listpeers-preview.png",
    github: "https://github.com/bimlesharma/listpeers",
    demo: "https://listpeers.vercel.app/",
    highlights: [
      "Consent-driven peer comparisons",
      "Anonymous / Pseudonymous / Visible modes",
      "Supabase Auth + RLS",
    ],
    sections: [
      {
        heading: "Problem",
        body: "Campus analytics often ignore privacy. Students want insight without exposing identity or grades by default.",
      },
      {
        heading: "Approach",
        body: "Build comparisons on explicit visibility modes and enforce access in the database with Row-Level Security, not just UI checks.",
      },
      {
        heading: "Outcome",
        body: "A live academic analytics product where privacy boundaries are part of the data model.",
      },
    ],
  },
  {
    kind: "project",
    slug: "stockbubbles",
    title: "StockBubbles.net",
    tagline: "Real-time market bubble charts",
    summary:
      "Dynamic bubble charts for Indian indices with Redis-backed low-latency delivery and Docker/CI deploys.",
    description: [
      "Real-time stock-market visualization using dynamic bubble charts with performance-based sizing and coloring.",
      "Integrated multiple Indian indices with smooth dataset switching, powered by MongoDB Atlas + Redis caching for low-latency data delivery. Deployed on VPS using Docker and CI/CD workflows.",
    ],
    tech: ["React", "Express.js", "MongoDB Atlas", "Redis", "Docker", "WebSockets"],
    color: "#10B981",
    image: "/images/stockbubbles-preview.png",
    github: "",
    demo: "https://stockbubbles.net",
    highlights: [
      "Multi-index bubble visualization",
      "Redis caching for low latency",
      "Docker + CI/CD on VPS",
    ],
    sections: [
      {
        heading: "What it is",
        body: "A live market visualization that maps performance into bubble size and color so index moves are readable at a glance.",
      },
    ],
  },
  {
    kind: "project",
    slug: "shieldllm",
    title: "ShieldLLM",
    tagline: "Secure multi-LLM SaaS",
    summary:
      "Multi-tenant LLM platform with FastAPI sanitization, Auth0 RBAC, and LangChain + Gemini RAG workflows.",
    description: [
      "Secure multi-LLM SaaS with FastAPI and spaCy-driven data sanitization for safer prompt processing across organizations.",
      "Multi-tenant architecture using Auth0 (RBAC), MongoDB Atlas for logs and knowledge bases, and Next.js + Zustand for the chat UI. Gemini + LangChain pipelines support customizable AI workflows and RAG.",
    ],
    tech: [
      "Next.js",
      "FastAPI",
      "MongoDB Atlas",
      "Redis",
      "FAISS",
      "Auth0",
      "LangChain",
      "Gemini API",
    ],
    color: "#8B5CF6",
    image: "/images/multi-llm-preview.png",
    github: "",
    demo: "",
    highlights: [
      "spaCy-driven prompt sanitization",
      "Auth0 RBAC multi-tenant access",
      "LangChain + Gemini RAG pipelines",
    ],
    sections: [
      {
        heading: "What it is",
        body: "An org-ready chat platform that sanitizes prompts before they hit LLMs and isolates tenants with Auth0 roles.",
      },
    ],
  },
  {
    kind: "project",
    slug: "sdi2025",
    title: "Smart Delhi Ideathon 2025",
    tagline: "High-traffic event portal",
    summary:
      "Next.js event portal for 5,000+ participants with secure registration and project submission workflows.",
    description: [
      "Scalable Next.js event portal handling high-traffic spikes from 5,000+ participants.",
      "Built 15+ reusable components and a SQL-backed system for registrations and project submissions with strong validation and data-integrity workflows.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Firebase", "Vercel", "AWS"],
    color: "#3B82F6",
    image: "/images/sdi2025-preview.png",
    github: "https://github.com/bimlesharma/sdi2025-website",
    demo: "https://sdi2025-website.vercel.app/",
    highlights: [
      "5,000+ participant traffic",
      "15+ reusable UI components",
      "Validated registration + submissions",
    ],
    sections: [
      {
        heading: "What it is",
        body: "The public web portal for Smart Delhi Ideathon 2025 — registrations, submissions, and event info under load.",
      },
    ],
  },
];

export function getAllWork(): WorkItem[] {
  return workItems;
}

export function getWorkByKind(kind: WorkKind): WorkItem[] {
  return workItems.filter((item) => item.kind === kind);
}

export function getWorkBySlug(
  kind: WorkKind,
  slug: string,
): WorkItem | undefined {
  return workItems.find((item) => item.kind === kind && item.slug === slug);
}

export function workHref(item: WorkItem): string {
  return `/${item.kind === "product" ? "products" : "projects"}/${item.slug}`;
}

export function workKindLabel(kind: WorkKind): string {
  return kind === "product" ? "Product" : "Project";
}

export function workDemoLabel(kind: WorkKind): string {
  return kind === "product" ? "Visit site" : "Live Demo";
}

export function workGithubLabel(item: WorkItem): string {
  return item.githubLabel?.trim() || "Source";
}

export function workIndexHref(kind: WorkKind): string {
  return kind === "product" ? "/products" : "/projects";
}

export function getAdjacentWork(item: WorkItem): {
  prev: WorkItem | null;
  next: WorkItem | null;
} {
  const siblings = getWorkByKind(item.kind);
  const index = siblings.findIndex((sibling) => sibling.slug === item.slug);
  if (index < 0) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? siblings[index - 1]! : null,
    next: index < siblings.length - 1 ? siblings[index + 1]! : null,
  };
}
