import {
  getWorkBySlug,
  workDemoLabel,
  workGithubLabel,
  workHref,
  workKindLabel,
  type WorkKind,
} from "@/lib/work";

export const resumeSummary =
  "Full-Stack Software Engineer with production experience building scalable SaaS platforms and complex geospatial web applications. Proven ability to architect multi-tier systems, from distributed backend services and containerized deployments to responsive user interfaces and persistent state management.";

export const resumeContacts = [
  {
    label: "Phone",
    value: "+91-7070519696",
    href: "tel:+917070519696",
    external: false,
  },
  {
    label: "Email",
    value: "bimlesh.mdb@gmail.com",
    href: "mailto:bimlesh.mdb@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "bimlesharma",
    href: "https://www.linkedin.com/in/bimlesharma/",
    external: true,
  },
  {
    label: "GitHub",
    value: "bimlesharma",
    href: "https://github.com/bimlesharma",
    external: true,
  },
  {
    label: "Portfolio",
    value: "bimlesh.dev",
    href: "https://bimlesh.dev",
    external: true,
  },
] as const;

export const resumeExperience = [
  {
    role: "Software Engineer",
    company: "SkyServe",
    employmentType: "Full-time",
    location: "Delhi, India",
    workplace: "On-site",
    dates: "Aug 2026 – Present",
    focus: "Software Infrastructure and Engineering",
    bullets: [],
  },
  {
    role: "SDE Intern",
    company: "Dfy Graviti",
    employmentType: "Internship",
    location: "New Delhi, India",
    workplace: "On-site",
    dates: "Jun 2026 – Jul 2026",
    focus: "",
    bullets: [],
  },
  {
    role: "Software Developer Intern",
    company: "Government of India",
    employmentType: "Internship",
    location: "New Delhi",
    workplace: "",
    dates: "Jan 2026 – Apr 2026",
    focus: "",
    bullets: [
      "Architected the backend for the Ocean Data Viewer (ODV) using Express.js and GeoServer, enabling offline deployments in secure, air-gapped environments.",
      "Designed a multi-tier deployment of 6 Docker Compose services behind an Nginx reverse proxy, packaged as a ~1.1 GB self-contained install for those air-gapped environments.",
      "Engineered high-performance GIS query pipelines using PostGIS ST_Intersects and GiST indexing, handling 50M+ rows per table and reducing query latency to milliseconds.",
      "Developed a fully integrated admin dashboard protected by secure JWT authentication, automatic dual-token rotation, and multi-tier RBAC.",
      "Built a state management system backed by Redis and MongoDB to persist complex user sessions and map viewports.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Government of India",
    employmentType: "Internship",
    location: "New Delhi",
    workplace: "",
    dates: "Jun 2025 – Sep 2025",
    focus: "",
    bullets: [
      "Developed a custom React and Next.js ENC Viewer to visualize 170+ real-time maritime geospatial layer types.",
      "Engineered spatial analysis tools (buffering, intersection) using Turf.js, optimizing algorithms to boost analysts' operational efficiency by 40%.",
      "Developed a Styled Layer Descriptor (SLD) Editor using GeoServer REST APIs, enabling dynamic styling and customization of map layers.",
    ],
  },
] as const;

export const resumeEducation = [
  {
    title: "B.Tech in Artificial Intelligence & Data Science",
    place: "Guru Gobind Singh Indraprastha University — USAR, New Delhi",
    dates: "2022 – 2026",
    detail: "CGPA 8.68",
    note: "Joint Secretary, IEEE USAR",
  },
  {
    title: "CBSE Class XII",
    place: "Smt. Misri Devi Gyan Niketan, New Delhi",
    dates: "2021",
    detail: "91.84%",
    note: "",
  },
  {
    title: "CBSE Class X",
    place: "Adarsh Jain Dharmik Shiksha Sadan, New Delhi",
    dates: "2019",
    detail: "87.17%",
    note: "",
  },
] as const;

export const resumeSkillGroups = [
  {
    label: "Languages",
    items: "Python, JavaScript, TypeScript, C/C++, Go, Rust, SQL",
  },
  {
    label: "Frontend",
    items: "React.js, Next.js, Tailwind CSS, Zustand, Redux, Tauri, Jest",
  },
  {
    label: "Backend",
    items: "Node.js, Express.js, FastAPI, GeoServer, GraphQL, REST APIs, Microservices",
  },
  {
    label: "Cloud & DevOps",
    items: "Docker, Kubernetes, Nginx, AWS EC2, AWS S3, GCP, Firebase, Vercel, VPS, Supabase, Auth0, Clerk, Git",
  },
  {
    label: "Databases",
    items: "MongoDB, PostgreSQL, PostGIS, Redis, ClickHouse, FAISS, Qdrant",
  },
] as const;

export const resumeAchievements = [
  {
    title: "MLH Track Winner",
    event: "HackCBS 8.0",
    year: "2025",
    detail: "Recognized for best use of Generative AI and Auth0.",
  },
  {
    title: "Top 10 Global Finalist",
    event: "GSMA Gateway Hackathon · Nokia Network as Code",
    year: "2025",
    detail: "Top 10 globally at IMC 2025.",
  },
  {
    title: "Finalist",
    event: "Smart India Hackathon 2024",
    year: "2024",
    detail: "Top 5 of 500 teams for Problem Statement 1682.",
  },
  {
    title: "4th Position",
    event: "HackUnicorn 1.0",
    year: "2023",
    detail: "Placed 4th against competing engineering teams.",
  },
  {
    title: "3rd Position",
    event: "Hack Heaven Hackathon",
    year: "2023",
    detail: "3rd place for problem-solving and technical execution.",
  },
] as const;

type ResumeProjectSource = {
  kind?: WorkKind;
  slug?: string;
  title?: string;
  tagline?: string;
  dates: string;
  /** YYYY-MM, used only to order the timeline. */
  start: string;
  end: string;
  freelance?: boolean;
  bullets: string[];
  tech?: string[];
  demo?: string;
  demoLabel?: string;
};

const resumeProjects: ResumeProjectSource[] = [
  {
    kind: "project",
    slug: "shieldllm",
    dates: "Nov 2025 – Present",
    start: "2025-11",
    end: "9999-12",
    bullets: [
      "Architected a production-grade SaaS platform with a FastAPI backend, orchestrating data pipelines and third-party APIs for customizable retrieval workflows.",
      "Built an end-to-end search pipeline using FAISS vector indexing and Redis-based semantic caching, reducing retrieval latency by 60%.",
      "Implemented a spaCy-driven PII sanitization layer to filter sensitive data before processing.",
      "Designed a multi-tenant architecture using Auth0 for RBAC and MongoDB Atlas for knowledge-base management.",
      "Used Gemini and LangChain for customizable AI workflows and RAG on those tenant knowledge bases.",
    ],
  },
  {
    kind: "product",
    slug: "listpeers",
    dates: "Dec 2025 – Jan 2026",
    start: "2025-12",
    end: "2026-01",
    bullets: [
      "Built a consent-driven academic analytics platform in Next.js, with dashboards and peer comparison views for SGPA/CGPA trends.",
      "Implemented frontend-controlled visibility modes (Anonymous, Pseudonymous, Visible) with real-time UI updates, backed by Supabase Auth (OAuth).",
      "Enforced privacy boundaries with Row-Level Security and consent-gated APIs so grades are not public by default.",
    ],
  },
  {
    kind: "product",
    slug: "cleanpulse",
    dates: "Sep 2026 – Present",
    start: "2026-09",
    end: "9999-12",
    bullets: [
      "Built a local-first Mac cleaner that finds regenerable clutter and large files, then confirms deletes before anything is removed. Paths stay on the machine.",
      "Desktop app is a Tauri and Rust scanner with a React UI. The marketing site and install flow run on Next.js with Clerk auth.",
      "Ships signed releases with curl and Homebrew install. Source is closed; public releases are the distribution path.",
    ],
  },
  {
    kind: "project",
    slug: "stockbubbles",
    dates: "Oct 2025 – Dec 2025",
    start: "2025-10",
    end: "2025-12",
    freelance: true,
    bullets: [
      "Real-time market visualization using dynamic bubble charts, with size and color driven by performance.",
      "Covers multiple Indian indices with dataset switching, backed by MongoDB Atlas and Redis for low-latency delivery.",
      "Deployed on a VPS with Docker and CI/CD.",
    ],
  },
  {
    kind: "project",
    slug: "sdi2025",
    dates: "Dec 2025 – Feb 2026",
    start: "2025-12",
    end: "2026-02",
    freelance: true,
    bullets: [
      "Next.js event portal built for traffic spikes from 5,000+ participants.",
      "15+ reusable components and a SQL-backed flow for registrations and project submissions, with validation and data-integrity checks.",
    ],
  },
  {
    title: "CryptoWaley",
    tagline: "Freelance web platform",
    dates: "Mar 2024 – Jun 2024",
    start: "2024-03",
    end: "2024-06",
    freelance: true,
    tech: ["React.js"],
    demo: "https://cryptowaly.com",
    demoLabel: "Visit site",
    bullets: [
      "Engineered reusable React.js UI components, improving development speed by 30% and establishing a consistent design system across the platform.",
      "Developed a dynamic, SEO-friendly blog module supporting real-time content publishing, resulting in a 25% increase in user engagement and session duration.",
      "Optimized application performance through state management, code-splitting, and memoization, delivering smoother interactions and faster load times.",
    ],
  },
];

export type ResumeProject = {
  title: string;
  href: string;
  kindLabel: string;
  tagline: string;
  dates: string;
  freelance: boolean;
  bullets: string[];
  tech: string[];
  demo: string;
  demoLabel: string;
  github: string;
  githubLabel: string;
};

export function getResumeProjects(): ResumeProject[] {
  return [...resumeProjects]
    .sort((a, b) => b.start.localeCompare(a.start) || b.end.localeCompare(a.end))
    .map((entry) => {
      if (!entry.kind || !entry.slug) {
        return {
          title: entry.title ?? "Untitled",
          href: "",
          kindLabel: "Project",
          tagline: entry.tagline ?? "",
          dates: entry.dates,
          freelance: Boolean(entry.freelance),
          bullets: entry.bullets,
          tech: entry.tech ?? [],
          demo: entry.demo ?? "",
          demoLabel: entry.demoLabel ?? "Visit site",
          github: "",
          githubLabel: "",
        };
      }

      const work = getWorkBySlug(entry.kind, entry.slug);
      if (!work) {
        throw new Error(`Resume project missing from work catalog: ${entry.kind}/${entry.slug}`);
      }

      return {
        title: work.title,
        href: workHref(work),
        kindLabel: workKindLabel(entry.kind),
        tagline: work.tagline,
        dates: entry.dates,
        freelance: Boolean(entry.freelance),
        bullets: entry.bullets,
        tech: work.tech,
        demo: work.demo,
        demoLabel: workDemoLabel(entry.kind),
        github: work.github,
        githubLabel: workGithubLabel(work),
      };
    });
}
