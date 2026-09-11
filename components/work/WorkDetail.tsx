"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type WorkItem,
  getAdjacentWork,
  workDemoLabel,
  workGithubLabel,
  workHref,
  workIndexHref,
  workKindLabel,
} from "@/lib/work";

type WorkDetailProps = {
  item: WorkItem;
};

export default function WorkDetail({ item }: WorkDetailProps) {
  const demoLabel = workDemoLabel(item.kind);
  const githubLabel = workGithubLabel(item);
  const indexHref = workIndexHref(item.kind);
  const kindPlural = item.kind === "product" ? "Products" : "Projects";
  const hasExternalCtas = Boolean(item.demo || item.github);
  const isCaseStudyOnly = !item.demo && !item.github;
  const { prev, next } = getAdjacentWork(item);

  return (
    <article className="relative min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[-10%] left-[15%] h-[40%] w-[45%] rounded-full opacity-20 blur-[140px]"
          style={{ backgroundColor: item.color }}
        />
        <div className="absolute right-[10%] bottom-[-10%] h-[35%] w-[35%] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-12">
        <Link
          href={indexHref}
          className="mb-8 inline-flex text-sm font-medium text-neutral-400 transition hover:text-purple-400"
        >
          ← All {kindPlural.toLowerCase()}
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span
            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: item.color }}
          >
            {workKindLabel(item.kind)}
          </span>
          <span className="text-sm text-neutral-500">{item.tagline}</span>
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
          {item.title}
        </h1>
        <p className="mb-4 max-w-2xl text-lg leading-relaxed text-neutral-400">
          {item.summary}
        </p>

        {isCaseStudyOnly ? (
          <p className="mb-10 text-sm text-neutral-500">
            Case study — no live demo yet.
          </p>
        ) : null}

        {hasExternalCtas ? (
          <div className="mb-10 flex flex-wrap gap-3">
            {item.demo ? (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: item.color }}
              >
                {demoLabel}
              </a>
            ) : null}
            {item.github ? (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white transition hover:border-neutral-500"
              >
                {githubLabel}
              </a>
            ) : null}
          </div>
        ) : null}

        <div className="relative mb-12 aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
              style={{
                backgroundColor: `${item.color}18`,
                borderColor: `${item.color}40`,
                color: item.color,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {item.highlights && item.highlights.length > 0 && (
          <ul className="mb-12 grid gap-3 sm:grid-cols-2">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm text-neutral-300"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {item.sections && item.sections.length > 0 && (
          <div className="mb-12 space-y-8">
            {item.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-2 text-xl font-bold text-white">
                  {section.heading}
                </h2>
                <p className="leading-relaxed text-neutral-400">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        )}

        <div className="space-y-4 border-t border-neutral-900 pt-10">
          {item.description.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="leading-relaxed text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {(prev || next) && (
          <nav
            aria-label="Adjacent work"
            className="mt-16 flex flex-col gap-6 border-t border-neutral-900 pt-10 sm:flex-row sm:items-start sm:justify-between"
          >
            {prev ? (
              <Link
                href={workHref(prev)}
                className="group max-w-xs transition hover:opacity-90"
              >
                <span className="mb-1 block text-xs font-medium tracking-wide text-neutral-500 uppercase">
                  ← Previous
                </span>
                <span className="text-base font-semibold text-white group-hover:text-purple-300">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={workHref(next)}
                className="group max-w-xs text-right transition hover:opacity-90 sm:ml-auto"
              >
                <span className="mb-1 block text-xs font-medium tracking-wide text-neutral-500 uppercase">
                  Next →
                </span>
                <span className="text-base font-semibold text-white group-hover:text-purple-300">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        )}
      </div>
    </article>
  );
}
