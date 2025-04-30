import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: ReactNode
  title2?: ReactNode
  description?: string
  className?: string
}

export function SectionHeading({ title, title2, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl mx-auto text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">
        {title} {title2 && <span className="gradient-text">{title2}</span>}
      </h2>
      <div className="w-20 h-1 avada-gradient mx-auto mb-6 rounded-full"></div>
      {description && <p className="text-lg text-gray-600">{description}</p>}
    </div>
  )
}
