import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { getI18n } from "@/locales/server";
import { I18nProviderClient } from "@/locales/client";
import Script from "next/script";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PopupSystem } from "@/components/popup-system";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AvadaPay | Agrégateur de Paiement en Ligne",
  description:
    "AvadaPay est une fintech innovante installée en RDC depuis 2018, agréée par la Banque Centrale du Congo.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = await getI18n();
  const locale = params.locale || "en";

  return (
    <html lang={locale} className={`${mulish.variable} scroll-smooth`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E7ZJCLFBL4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E7ZJCLFBL4');
          `}
        </Script>
      </head>
      <body className="font-mulish antialiased overflow-x-hidden">
        <I18nProviderClient locale={locale}>
          <PopupSystem>
            {children}
            <Toaster />
          </PopupSystem>
        </I18nProviderClient>
      </body>
    </html>
  );
}
