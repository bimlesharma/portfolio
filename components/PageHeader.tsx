import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export type Crumb = {
  label: string
  href?: string
}

type PageHeaderProps = {
  crumbs: Crumb[]
  eyebrow?: React.ReactNode
  title: string
  description?: React.ReactNode
  children?: React.ReactNode
}

export default function PageHeader({
  crumbs,
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="mb-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          {crumbs.flatMap((crumb, index) => {
            const last = index === crumbs.length - 1
            const item = (
              <BreadcrumbItem key={`${crumb.label}-${index}`}>
                {last || !crumb.href ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            )
            if (last) return [item]
            return [
              item,
              <BreadcrumbSeparator key={`${crumb.label}-${index}-sep`} />,
            ]
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {eyebrow ? (
        <div className="mb-3">
          {typeof eyebrow === "string" ? (
            <Badge variant="outline">{eyebrow}</Badge>
          ) : (
            eyebrow
          )}
        </div>
      ) : null}

      <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>

      {description ? (
        <div className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </div>
      ) : null}

      {children ? <div className="mt-6 space-y-4">{children}</div> : null}
    </header>
  )
}
