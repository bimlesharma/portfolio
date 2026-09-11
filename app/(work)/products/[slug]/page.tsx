import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetail from "@/components/work/WorkDetail";
import { getWorkByKind, getWorkBySlug } from "@/lib/work";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkByKind("product").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug("product", slug);
  if (!item) {
    return { title: "Product not found" };
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

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getWorkBySlug("product", slug);
  if (!item) notFound();

  return <WorkDetail item={item} />;
}
