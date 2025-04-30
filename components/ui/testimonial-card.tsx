interface TestimonialCardProps {
  name: string
  company: string
  since: string
  quote: string
  initial: string
}

export function TestimonialCard({ name, company, since, quote, initial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-emerald-600 text-xl font-bold">{initial}</span>
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-500">{since}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">{quote}</p>
    </div>
  )
}
