import Link from "next/link";
import WorkTile from "@/components/work/WorkTile";
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
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <section className="relative z-10 border-b border-zinc-800 px-6 pb-8 pt-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#work"
            className="mb-6 inline-flex text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            ← Back to home
          </Link>
          <p className="mb-3 text-xs font-semibold tracking-widest text-zinc-400 uppercase">
            {label} index
          </p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            {plural}
          </h1>
          <p className="max-w-2xl text-lg text-neutral-400">{subtitle}</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5">
          {items.map((item, index) => (
            <WorkTile key={item.slug} item={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
