import { CreditCard, Clock, BarChart, Smartphone, Shield, Users } from "lucide-react"

export const benefitsData = [
  {
    id: "integration",
    icon: <CreditCard className="h-4 w-4 text-emerald-600" />,
    title: "Intégration Facile",
    description: "La solution AVADAPAY s'intègre à toute plateforme existante, du site web à l'application",
  },
  {
    id: "monitoring",
    icon: <Clock className="h-4 w-4 text-emerald-600" />,
    title: "Monitoring en Temps Réel",
    description: "Monitoring des paiements en temps réel et gestion optimisée de la comptabilité",
  },
  {
    id: "statistics",
    icon: <BarChart className="h-4 w-4 text-emerald-600" />,
    title: "Statistiques Détaillées",
    description: "Statistiques sur les produits les plus vendus pour optimiser votre offre",
  },
  {
    id: "mobile-money",
    icon: <Smartphone className="h-4 w-4 text-emerald-600" />,
    title: "Paiements Mobile Money",
    description: "Le paiement s'effectue via mobile money, Airtel Money, Mpesa, Orange Money et Afrimoney",
  },
  {
    id: "security",
    icon: <Shield className="h-4 w-4 text-emerald-600" />,
    title: "Sécurisation des Flux",
    description: "Sécurisation du flux monétaire avec moins de circulation de cash main à main",
  },
  {
    id: "satisfaction",
    icon: <Users className="h-4 w-4 text-emerald-600" />,
    title: "Satisfaction Client",
    description:
      "Optimisation des recettes et de la satisfaction client grâce à la numérisation du système de paiement",
  },
]
