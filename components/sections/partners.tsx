import Image from "next/image";

const partners = [
  { name: "Fyatu", logo: "/images/fyatu.png" },
  // { name: "Maxi Cash", logo: "/images/maxicash.png" },
  { name: "KoboPay", logo: "/images/kobopay.png" },
  { name: "MaishaPay", logo: "/images/maisha.png" },
  { name: "Betika", logo: "/images/betika.png" },
  { name: "Monetbil", logo: "/images/monetbil.png" },
  { name: "Curalife", logo: "/images/curalife.png" },
  { name: "Melbet", logo: "/images/melbet.png" },
  { name: "As Vclub", logo: "/images/as.png" },
  { name: "X Cash", logo: "/images/xcash.png" },
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-16 bg-background border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-foreground section-title">
            Ils nous ont fait confiances
          </h2>
          <p className="text-muted-foreground">
            Infrastructure de paiement connectée à tous les opérateurs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-card p-4 rounded-lg shadow-sm flex items-center justify-center h-20 w-full border border-border hover:border-primary/50 transition-colors"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="max-h-12 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
