import {
  workDemoLabel,
  workGithubLabel,
  workHref,
  workItems,
  workKindLabel,
  type WorkItem,
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

type ResumeOnlyProject = {
  title: string;
  tagline: string;
  dates: string;
  /** YYYY-MM, used only to order the timeline. */
  start: string;
  end: string;
  freelance?: boolean;
  bullets: string[];
  tech: string[];
  demo: string;
  demoLabel: string;
};

/** Projects that appear on the resume but not in the work catalog. */
const resumeOnlyProjects: ResumeOnlyProject[] = [
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

type ResumeProjectSortable = ResumeProject & {
  start: string;
  end: string;
};

export function getResumeProjects(): ResumeProject[] {
  const fromWork: ResumeProjectSortable[] = workItems
    .filter((item): item is WorkItem & { resume: NonNullable<WorkItem["resume"]> } =>
      Boolean(item.resume),
    )
    .map((item) => ({
      title: item.title,
      href: workHref(item),
      kindLabel: workKindLabel(item.kind),
      tagline: item.tagline,
      dates: item.resume.dates,
      freelance: Boolean(item.resume.freelance),
      bullets: item.resume.bullets,
      tech: item.tech,
      demo: item.demo,
      demoLabel: workDemoLabel(item.kind),
      github: item.github,
      githubLabel: workGithubLabel(item),
      start: item.resume.start,
      end: item.resume.end,
    }));

  const fromResumeOnly: ResumeProjectSortable[] = resumeOnlyProjects.map((entry) => ({
    title: entry.title,
    href: "",
    kindLabel: "Project",
    tagline: entry.tagline,
    dates: entry.dates,
    freelance: Boolean(entry.freelance),
    bullets: entry.bullets,
    tech: entry.tech,
    demo: entry.demo,
    demoLabel: entry.demoLabel,
    github: "",
    githubLabel: "",
    start: entry.start,
    end: entry.end,
  }));

  return [...fromWork, ...fromResumeOnly]
    .sort((a, b) => b.start.localeCompare(a.start) || b.end.localeCompare(a.end))
    .map(({ start: _start, end: _end, ...project }) => project);
}

