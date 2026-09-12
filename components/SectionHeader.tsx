import { Badge } from "@/components/ui/badge"

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 text-center">
      {eyebrow ? (
        <Badge variant="outline" className="mb-3">
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
