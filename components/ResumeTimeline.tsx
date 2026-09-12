import type { ElementType, ReactNode } from "react";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type TimelineBadge = {
  label: string;
  variant?: "default" | "secondary" | "outline";
};

export type TimelineEntry = {
  id: string;
  icon: ElementType;
  title: string;
  subtitle?: ReactNode;
  dates: string;
  badges?: TimelineBadge[];
  children?: ReactNode;
  footer?: ReactNode;
};

export default function ResumeTimeline({ items }: { items: TimelineEntry[] }) {
  return (
    <ol className="relative">
      {items.map((item, index) => {
        const Icon = item.icon;
        const last = index === items.length - 1;

        return (
          <li key={item.id} className={cn("relative flex gap-4", !last && "pb-4")}>
            {!last ? (
              <span
                className="absolute top-4 bottom-0 left-4 w-px -translate-x-1/2 bg-border"
                aria-hidden
              />
            ) : null}
            <span className="relative z-10 flex size-8 shrink-0 items-center justify-center border border-border bg-background text-foreground">
              <Icon className="size-4" aria-hidden />
            </span>
            <Card className="min-w-0 flex-1 gap-3 py-4">
              <CardHeader className="gap-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1.5">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    {item.subtitle ? <CardDescription>{item.subtitle}</CardDescription> : null}
                  </div>
                  <p className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <Calendar className="size-3.5" aria-hidden />
                    {item.dates}
                  </p>
                </div>
                {item.badges?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {item.badges.map((badge) => (
                      <Badge key={badge.label} variant={badge.variant ?? "outline"}>
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </CardHeader>
              {item.children ? <CardContent>{item.children}</CardContent> : null}
              {item.footer ? <CardFooter className="flex-wrap gap-2">{item.footer}</CardFooter> : null}
            </Card>
          </li>
        );
      })}
    </ol>
  );
}
