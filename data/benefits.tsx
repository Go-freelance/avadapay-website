import { FaCreditCard, FaClock, FaUser } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { MdSmartphone } from "react-icons/md";
import { FaShield } from "react-icons/fa6";

export const benefitsData = [
  {
    id: "integration",
    icon: <FaCreditCard className="h-4 w-4 text-emerald-600" />,
    translationKey: "benefits.items.integration",
    title: "Intégration Facile",
    description:
      "La solution AVADAPAY s'intègre à toute plateforme existante, du site web à l'application",
  },
  {
    id: "monitoring",
    icon: <FaClock className="h-4 w-4 text-emerald-600" />,
    translationKey: "benefits.items.monitoring",
    title: "Monitoring en Temps Réel",
    description:
      "Monitoring des paiements en temps réel et gestion optimisée de la comptabilité",
  },
  {
    id: "statistics",
    icon: <BsBarChartFill className="h-4 w-4 text-emerald-600" />,
    translationKey: "benefits.items.statistics",
    title: "Statistiques Détaillées",
    description:
      "Statistiques sur les produits les plus vendus pour optimiser votre offre",
  },
  {
    id: "mobile-money",
    icon: <MdSmartphone className="h-4 w-4 text-emerald-600" />,
    translationKey: "benefits.items.mobile-money",
    title: "Paiements Mobile Money",
    description:
      "Le paiement s'effectue via mobile money, Airtel Money, Mpesa, Orange Money et Afrimoney",
  },
  {
    id: "security",
    icon: <FaShield className="h-4 w-4 text-emerald-600" />,
    translationKey: "benefits.items.security",
    title: "Sécurisation des Flux",
    description:
      "Sécurisation du flux monétaire avec moins de circulation de cash main à main",
  },
  {
    id: "satisfaction",
    icon: <FaUser className="h-4 w-4 text-emerald-600" />,
    translationKey: "benefits.items.satisfaction",
    title: "Satisfaction Client",
    description:
      "Optimisation des recettes et de la satisfaction client grâce à la numérisation du système de paiement",
  },
];
