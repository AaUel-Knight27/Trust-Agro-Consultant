import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  tag?: string
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeader({ tag, title, subtitle, centered }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-3",
        centered && "mx-auto text-center"
      )}
    >
      {tag ? (
        <p className="text-xs font-medium uppercase tracking-widest text-green-700">{tag}</p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle ? (
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  )
}
