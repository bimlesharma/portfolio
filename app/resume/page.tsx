import type { Metadata } from "next";
import type { ElementType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  Calendar,
  Cloud,
  Code2,
  Database,
  Download,
  FolderKanban,
  Github,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  LayoutTemplate,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  Trophy,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PointerList from "@/components/PointerList";
import ResumeTimeline, { type TimelineEntry } from "@/components/ResumeTimeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getResumeProjects,
  resumeAchievements,
  resumeContacts,
  resumeEducation,
  resumeExperience,
  resumeSkillGroups,
  resumeSummary,
  type ResumeProject,
} from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Bimlesh, a full-stack software engineer building geospatial systems, SaaS platforms, and production web applications.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume | Bimlesh",
    description:
      "Resume of Bimlesh, a full-stack software engineer building geospatial systems, SaaS platforms, and production web applications.",
    url: "https://bimlesh.dev/resume",
    type: "website",
  },
};

const contactIcons: Record<(typeof resumeContacts)[number]["label"], ElementType> = {
  Phone,
  Email: Mail,
  LinkedIn: Linkedin,
  GitHub: Github,
  Portfolio: Globe,
};

const skillIcons: Record<(typeof resumeSkillGroups)[number]["label"], ElementType> = {
  Languages: Code2,
  Frontend: LayoutTemplate,
  Backend: Server,
  "Cloud & DevOps": Cloud,
  Databases: Database,
};

export default function ResumePage() {
  const projects = getResumeProjects();

  return (
    <main className="min-h-screen bg-background pt-24 text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeader
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Resume" },
          ]}
          eyebrow="Full-Stack Software Engineer"
          title="Bimlesh"
          description={resumeSummary}
        >
          <ul className="flex flex-wrap gap-2">
            {resumeContacts.map((item) => {
              const Icon = contactIcons[item.label];
              return (
                <li key={item.label}>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={item.href}
                      aria-label={`${item.label}: ${item.value}`}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <Icon aria-hidden />
                      {item.value}
                    </a>
                  </Button>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="/bimlesh_resume.pdf" download="Bimlesh-Resume.pdf">
                <Download aria-hidden />
                Download PDF
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Let&apos;s Connect</Link>
            </Button>
          </div>
        </PageHeader>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="min-w-0 space-y-12">
            <section>
              <SectionTitle icon={Briefcase}>Experience</SectionTitle>
              <ResumeTimeline items={resumeExperience.map(toExperienceEntry)} />
            </section>

            <section>
              <SectionTitle icon={FolderKanban}>Projects</SectionTitle>
              <ResumeTimeline items={projects.map(toProjectEntry)} />
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <Card className="gap-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <GraduationCap className="size-4" aria-hidden />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeEducation.map((item, index) => (
                  <div key={item.title}>
                    {index > 0 ? <Separator className="mb-4" /> : null}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <Badge variant="secondary">{item.detail}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.place}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <Calendar className="size-3.5" aria-hidden />
                      {item.dates}
                    </p>
                    {item.note ? (
                      <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
                    ) : null}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Code2 className="size-4" aria-hidden />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeSkillGroups.map((group, index) => {
                  const Icon = skillIcons[group.label];
                  return (
                    <div key={group.label}>
                      {index > 0 ? <Separator className="mb-4" /> : null}
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Icon className="size-3.5 text-muted-foreground" aria-hidden />
                        {group.label}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{group.items}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="gap-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Trophy className="size-4" aria-hidden />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeAchievements.map((item, index) => (
                  <div key={`${item.event}-${item.year}`}>
                    {index > 0 ? <Separator className="mb-4" /> : null}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="flex items-start gap-2 text-sm font-semibold text-foreground">
                        <Award className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                        {item.title}
                      </h3>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">{item.year}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.event}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function toExperienceEntry(job: (typeof resumeExperience)[number]): TimelineEntry {
  const hasBody = Boolean(job.focus || job.bullets.length);

  return {
    id: `${job.company}-${job.dates}`,
    icon: job.employmentType === "Full-time" ? Briefcase : Landmark,
    title: job.role,
    subtitle: (
      <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="size-3.5" aria-hidden />
          {job.company}
        </span>
        {job.location ? (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden />
            {job.location}
            {job.workplace ? ` · ${job.workplace}` : ""}
          </span>
        ) : null}
      </span>
    ),
    dates: job.dates,
    badges: job.employmentType ? [{ label: job.employmentType, variant: "outline" }] : undefined,
    children: hasBody ? (
      <div className="space-y-3">
        {job.focus ? <p className="text-sm text-muted-foreground">{job.focus}</p> : null}
        {job.bullets.length ? <PointerList items={[...job.bullets]} /> : null}
      </div>
    ) : undefined,
  };
}

function toProjectEntry(project: ResumeProject): TimelineEntry {
  const badges = [
    ...(project.freelance ? [{ label: "Freelance", variant: "secondary" as const }] : []),
    ...(project.href ? [{ label: project.kindLabel, variant: "outline" as const }] : []),
  ];
  const hasLinks = Boolean(project.href || project.demo || project.github);

  return {
    id: project.href || project.title,
    icon: project.freelance ? Handshake : FolderKanban,
    title: project.title,
    subtitle: project.tagline,
    dates: project.dates,
    badges,
    children: (
      <div className="space-y-3">
        <PointerList items={project.bullets} />
        {project.tech.length ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Tech:</span> {project.tech.join(", ")}
          </p>
        ) : null}
      </div>
    ),
    footer: hasLinks ? (
      <>
        {project.href ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={project.href}>
              Case study
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        ) : null}
        {project.demo ? (
          <Button variant="ghost" size="sm" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              {project.demoLabel}
              <ArrowUpRight aria-hidden />
            </a>
          </Button>
        ) : null}
        {project.github ? (
          <Button variant="ghost" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              {project.githubLabel}
              <ArrowUpRight aria-hidden />
            </a>
          </Button>
        ) : null}
      </>
    ) : undefined,
  };
}

function SectionTitle({ icon: Icon, children }: { icon: ElementType; children: string }) {
  return (
    <h2 className="mb-5 flex items-center gap-2 border-b border-border pb-2 font-mono text-xs font-semibold tracking-widest text-foreground uppercase">
      <Icon className="size-4" aria-hidden />
      {children}
    </h2>
  );
}
