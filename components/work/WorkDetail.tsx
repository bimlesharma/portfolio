"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-12 pb-12">
        <Link
          href={indexHref}
          className="mb-6 inline-flex text-sm font-medium text-zinc-400 transition hover:text-white"
        >
          ← All {kindPlural.toLowerCase()}
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge variant="secondary">
            {workKindLabel(item.kind)}
          </Badge>
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
              <Button asChild className="bg-white text-zinc-950 hover:bg-zinc-200">
                <a href={item.demo} target="_blank" rel="noopener noreferrer">
                  {demoLabel}
                </a>
              </Button>
            ) : null}
            {item.github ? (
              <Button variant="outline" asChild className="border-zinc-700 bg-transparent text-white hover:bg-zinc-900">
                <a href={item.github} target="_blank" rel="noopener noreferrer">
                  {githubLabel}
                </a>
              </Button>
            ) : null}
          </div>
        ) : null}

        <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-none border border-zinc-800 bg-zinc-950">
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
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        {item.highlights && item.highlights.length > 0 && (
          <ul className="mb-8 grid gap-2 sm:grid-cols-2">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-none border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {item.sections && item.sections.length > 0 && (
          <div className="mb-8 space-y-6">
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
                <span className="text-base font-semibold text-white group-hover:text-zinc-300">
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
                <span className="text-base font-semibold text-white group-hover:text-zinc-300">
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
