import type { ReactNode } from "react"

interface BenefitItemProps {
  icon: ReactNode
  title: string
  description: string
}

export function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <li className="flex items-start">
      <div className="mr-4 mt-1">
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </li>
  )
}
