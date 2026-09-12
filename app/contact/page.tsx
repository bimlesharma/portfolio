import type { Metadata } from "next";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ContactSection from "@/components/ContactSection";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Bimlesh about collaboration, projects, or roles.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Bimlesh",
    description: "Get in touch with Bimlesh about collaboration, projects, or roles.",
    url: "https://bimlesh.dev/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-24 text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeader
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
          eyebrow={<AvailabilityBadge />}
          title="Get in touch"
          description="Have a project or a role in mind? Send a note, or reach out directly."
        />
        <ContactSection />
      </div>
    </main>
  );
}
