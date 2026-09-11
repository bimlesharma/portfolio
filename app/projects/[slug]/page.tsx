import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogNavbar from "@/components/BlogNavbar";
import WorkDetail from "@/components/work/WorkDetail";
import { getWorkByKind, getWorkBySlug } from "@/lib/work";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkByKind("project").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug("project", slug);
  if (!item) {
    return { title: "Project not found" };
  }
  return {
    title: item.title,
    description: item.tagline || item.summary,
    openGraph: {
      title: `${item.title} | Bimlesh`,
      description: item.summary,
      type: "website",
      images: [{ url: item.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getWorkBySlug("project", slug);
  if (!item) notFound();

  return (
    <>
      <BlogNavbar />
      <WorkDetail item={item} />
    </>
  );
}
