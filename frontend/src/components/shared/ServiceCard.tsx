import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  HelpCircle,
  ShoppingBasket,
  Stethoscope,
  Wheat,
  Wrench,
} from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const iconMap = {
  ClipboardList,
  BookOpen,
  Stethoscope,
  Wheat,
  ShoppingBasket,
  Wrench,
} as Record<string, React.ComponentType<{ size?: number | string; className?: string }>>

export function getLucideIcon(name: string) {
  return iconMap[name] || HelpCircle
}

type ServiceCardProps = {
  title: string
  short_description: string
  icon_name: string
  slug: string
}

export function ServiceCard({ title, short_description, icon_name, slug }: ServiceCardProps) {
  const Icon = getLucideIcon(icon_name)

  return (
    <Card
      className={cn(
        "transition-shadow hover:shadow-md",
        "h-full"
      )}
    >
      <CardHeader className="gap-3">
        <div className="flex size-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
          <Icon className="size-6" aria-hidden />
        </div>
        <CardTitle className="text-lg font-semibold leading-snug">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">{short_description}</p>
      </CardContent>
      <CardFooter className="border-t-0 pt-0">
        <Link
          href={`/services/${slug}`}
          className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800"
        >
          Read More
          <ArrowRight className="ml-1 size-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
