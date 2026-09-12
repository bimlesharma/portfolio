import WorkTile from "@/components/work/WorkTile";
import PageHeader from "@/components/PageHeader";
import {
  type WorkKind,
  getWorkByKind,
  workKindLabel,
} from "@/lib/work";

type WorkIndexProps = {
  kind: WorkKind;
};

export default function WorkIndex({ kind }: WorkIndexProps) {
  const items = getWorkByKind(kind);
  const label = workKindLabel(kind);
  const plural = kind === "product" ? "Products" : "Projects";
  const subtitle =
    kind === "product"
      ? "Live products I am actively shipping and positioning."
      : "Case studies and builds — some live, all worth a look.";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeader
          crumbs={[
            { label: "Home", href: "/#work" },
            { label: plural },
          ]}
          eyebrow={`${label} index`}
          title={plural}
          description={subtitle}
        />

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5">
          {items.map((item, index) => (
            <WorkTile key={item.slug} item={item} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
