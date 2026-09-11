import type { Metadata } from "next";
import BlogNavbar from "@/components/BlogNavbar";
import WorkIndex from "@/components/work/WorkIndex";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies and builds — StockBubbles, ShieldLLM, Smart Delhi Ideathon, and more.",
  openGraph: {
    title: "Projects | Bimlesh",
    description:
      "Case studies and builds — StockBubbles, ShieldLLM, Smart Delhi Ideathon, and more.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <BlogNavbar />
      <WorkIndex kind="project" />
    </>
  );
}
