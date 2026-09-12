import Link from "next/link";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { Button } from "@/components/ui/button";

export default function ContactCta() {
  return (
    <section className="bg-background py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-3">
          <AvailabilityBadge />
          <p className="text-lg font-semibold text-foreground">Have a project or a role in mind?</p>
        </div>
        <Button asChild>
          <Link href="/contact">Let&apos;s Connect</Link>
        </Button>
      </div>
    </section>
  );
}
