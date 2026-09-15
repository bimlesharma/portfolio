import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PointerList from "@/components/PointerList";
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
  const sections = item.sections ?? [];

  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:px-8">
        <div className="min-w-0">
        <PageHeader
          crumbs={[
            { label: "Home", href: "/#work" },
            { label: kindPlural, href: indexHref },
            { label: item.title },
          ]}
          eyebrow={<Badge variant="secondary">{workKindLabel(item.kind)}</Badge>}
          title={item.title}
          description={
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{item.tagline}</p>
              <p>{item.summary}</p>
            </div>
          }
        >
          {isCaseStudyOnly ? (
            <p className="text-sm text-muted-foreground">
              Case study — no live demo yet.
            </p>
          ) : hasExternalCtas ? (
            <div className="flex flex-wrap gap-3">
              {item.demo ? (
                <Button asChild>
                  <a href={item.demo} target="_blank" rel="noopener noreferrer">
                    {demoLabel}
                  </a>
                </Button>
              ) : null}
              {item.github ? (
                <Button variant="outline" asChild>
                  <a href={item.github} target="_blank" rel="noopener noreferrer">
                    {githubLabel}
                  </a>
                </Button>
              ) : null}
            </div>
          ) : null}
        </PageHeader>

        <div className="relative mb-8 aspect-[16/10] overflow-hidden border border-border bg-muted">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        {item.highlights && item.highlights.length > 0 ? (
          <PointerList items={item.highlights} />
        ) : null}

        {item.description.length > 0 ? (
          <div className="mt-8 space-y-4">
            {item.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        {item.sections && item.sections.length > 0 ? (
          <div className="mt-8 space-y-6">
            {item.sections.map((section) => (
              <section key={section.heading} id={sectionId(section.heading)}>
                <h2 className="mb-2 text-xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        {prev || next ? (
          <>
            <hr className="mt-12 border-border" />
            <nav
              aria-label="Adjacent work"
              className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-start sm:justify-between"
            >
              {prev ? (
                <Link
                  href={workHref(prev)}
                  className="group max-w-xs transition hover:opacity-90"
                >
                  <span className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Previous
                  </span>
                  <span className="text-base font-semibold text-foreground group-hover:text-muted-foreground">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={workHref(next)}
                  className="group max-w-xs text-left transition hover:opacity-90 sm:ml-auto sm:text-right"
                >
                  <span className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Next
                  </span>
                  <span className="text-base font-semibold text-foreground group-hover:text-muted-foreground">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          </>
        ) : null}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            {sections.length > 0 ? (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-foreground">On this page</h2>
                <ul className="space-y-2 text-sm">
                  {sections.map((section) => (
                    <li key={section.heading}>
                      <a
                        href={`#${sectionId(section.heading)}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div>
              <h2 className="mb-3 text-sm font-semibold text-foreground">Stack</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {item.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
