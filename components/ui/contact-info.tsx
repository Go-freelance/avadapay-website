import { Phone, Mail, MapPin } from "lucide-react"

interface ContactInfoProps {
  icon: "phone" | "mail" | "map"
  title: string
  content: string
}

export function ContactInfo({ icon, title, content }: ContactInfoProps) {
  const getIcon = () => {
    switch (icon) {
      case "phone":
        return <Phone className="h-6 w-6 text-emerald-600" />
      case "mail":
        return <Mail className="h-6 w-6 text-emerald-600" />
      case "map":
        return <MapPin className="h-6 w-6 text-emerald-600" />
      default:
        return null
    }
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg text-center">
      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {getIcon()}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  )
}
