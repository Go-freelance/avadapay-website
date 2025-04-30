import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { paymentPartners } from "@/data/partners"

interface SolutionCardProps {
  id: string
  title: string
  description: string | React.ReactNode
  features?: {
    title: string
    items: string[]
  }[]
  image?: {
    src: string
    alt: string
  }
  additionalContent?: React.ReactNode
  icons?: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
}

export function SolutionCard({ id, title, description, features, image, additionalContent, icons }: SolutionCardProps) {
  return (
    <div id={id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.01]">
      <div className="bg-emerald-500 py-4 px-6">
        <h3 className="text-3xl font-bold text-white">{title}</h3>
      </div>
      <div className="p-6 md:p-8">
        {image && description && (
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>{typeof description === "string" ? <p className="text-lg mb-6">{description}</p> : description}</div>
            <div className="relative">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        )}

        {!image && description && (
          <div className="mb-6">
            {typeof description === "string" ? <p className="text-lg">{description}</p> : description}
          </div>
        )}

        {features && features.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <span className="h-2 w-2 bg-emerald-500 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {additionalContent && (
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100 mb-8">{additionalContent}</div>
        )}

        {icons && icons.length > 0 && (
          <div className={cn("grid md:grid-cols-3 gap-6 mb-8")}>
            {icons.map((item, index) => (
              <div key={index} className="bg-emerald-50 p-6 rounded-lg border border-emerald-100 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {id === "online-payment" && (
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {paymentPartners.map((partner) => (
              <Image
                key={partner.id}
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={80}
                height={40}
                className="h-8 w-auto"
              />
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="#contact"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-md text-base font-medium transition-colors inline-flex items-center"
          >
            En savoir plus <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
