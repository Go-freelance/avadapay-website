import type React from "react";
import "./globals.css";
import { Mulish } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata = {
  title: "AvadaPay | Agrégateur de Paiement en Ligne",
  description:
    "AvadaPay est une fintech innovante installée en RDC depuis 2018, agréée par la Banque Centrale du Congo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${mulish.variable} scroll-smooth`}>
      <body
        className={`${mulish.variable} font-sans min-h-screen w-full overflow-x-hidden relative`}
      >
        <main className="relative w-full">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
