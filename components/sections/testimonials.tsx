import Image from "next/image";

const testimonials = [
  {
    name: "MaxiCash",
    role: "Partenaire depuis 2020",
    quote:
      "AvadaPay nous a permis d'optimiser nos transactions et d'améliorer considérablement l'expérience de nos clients. Une solution fiable et performante.",
    avatar: "/placeholder.svg?height=60&width=60&text=M",
  },
  {
    name: "KoboPay",
    role: "Partenaire depuis 2021",
    quote:
      "L'intégration avec AvadaPay a été simple et rapide. Leur service client est réactif et leurs solutions sont parfaitement adaptées au marché congolais.",
    avatar: "/placeholder.svg?height=60&width=60&text=K",
  },
  {
    name: "CuraLife",
    role: "Partenaire depuis 2019",
    quote:
      "Grâce à AvadaPay, nous avons pu numériser l'ensemble de nos paiements et réduire considérablement les risques liés à la manipulation d'espèces.",
    avatar: "/placeholder.svg?height=60&width=60&text=C",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ce que nos <span className="gradient-text">clients disent</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez pourquoi les entreprises font confiance à AvadaPay pour
            leurs solutions de paiement
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-colors creative-card"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
