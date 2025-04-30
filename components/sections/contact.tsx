"use client";

import { useState } from "react";
import { sendContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { contactInfo } from "@/data/contact";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    try {
      const result = await sendContactForm(formData);

      if (result.success) {
        setIsSuccess(true);
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      } else {
        console.error("Form submission error:", result.error);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Prêt à{" "}
            <span className="gradient-text">simplifier vos paiements</span> ?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une démonstration personnalisée
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-sm border border-border p-8 creative-border">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    Message envoyé!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Merci de nous avoir contacté. Notre équipe vous répondra
                    dans les plus brefs délais.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form
                  id="contact-form"
                  action={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Nom complet
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Votre nom"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="votre@email.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-foreground mb-1"
                    >
                      Entreprise
                    </label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Nom de votre entreprise"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-1"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Comment pouvons-nous vous aider?"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base"
                      disabled={isSubmitting}
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner className="mr-2" />
                          Envoi en cours...
                        </>
                      ) : (
                        "Envoyer ma demande"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div>
            <div className="bg-card rounded-xl shadow-sm border border-border p-8 creative-border">
              <h3 className="text-xl font-bold mb-6 text-foreground gradient-text">
                Nos coordonnées
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">
                      Téléphone
                    </h4>
                    <p className="text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">Email</h4>
                    <p className="text-muted-foreground">{contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">
                      Adresse
                    </h4>
                    <p className="text-muted-foreground">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-medium mb-2 text-foreground">
                  Heures d'ouverture
                </h4>
                <p className="text-muted-foreground mb-1">
                  Lundi - Vendredi: 8h00 - 17h00
                </p>
                <p className="text-muted-foreground">Samedi: 9h00 - 13h00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
