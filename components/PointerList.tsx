type PointerListProps = {
  items: string[]
}

export default function PointerList({ items }: PointerListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
        >
          <span className="mt-2 size-1.5 shrink-0 bg-foreground" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
