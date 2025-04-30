import type React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "AvadaPay | Agrégateur de Paiement en Ligne",
  description:
    "AvadaPay est une fintech innovante installée en RDC depuis 2018, agréée par la Banque Centrale du Congo.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans`}>
          {children}
      </body>
    </html>
  )
}
