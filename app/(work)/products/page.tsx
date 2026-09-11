import type { Metadata } from "next";
import WorkIndex from "@/components/work/WorkIndex";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Live products I am actively shipping — CleanPulse, ListPeers, and more.",
  openGraph: {
    title: "Products | Bimlesh",
    description:
      "Live products I am actively shipping — CleanPulse, ListPeers, and more.",
    type: "website",
  },
};

export default function ProductsPage() {
  return <WorkIndex kind="product" />;
}
