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
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute right-[10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[150px]" />
      </div>

      <section className="relative z-10 border-b border-neutral-900/50 px-6 pb-12 pt-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#work"
            className="mb-6 inline-flex text-sm font-medium text-neutral-400 transition hover:text-purple-400"
          >
            ← Back to home
          </Link>
          <p className="mb-3 text-xs font-semibold tracking-widest text-purple-300 uppercase">
            {label} index
          </p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            {plural}
          </h1>
          <p className="max-w-2xl text-lg text-neutral-400">{subtitle}</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <WorkTile key={item.slug} item={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
