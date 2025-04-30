"use client";

import { useState, useRef } from "react";
import { sendContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { contactInfo } from "@/data/contact";
import { Phone, Mail, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  // Validation functions
  const validateName = (name: string) => {
    if (!name || name.trim() === "") {
      return "Le nom est requis";
    }
    if (name.trim().length < 2) {
      return "Le nom doit contenir au moins 2 caractères";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email || email.trim() === "") {
      return "L'email est requis";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Veuillez entrer une adresse email valide";
    }
    return "";
  };

  const validateMessage = (message: string) => {
    if (!message || message.trim() === "") {
      return "Le message est requis";
    }
    return "";
  };

  const validateForm = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);

    const newErrors: FormErrors = {};
    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    // Validate form
    if (!validateForm(formData)) {
      setIsSubmitting(false);
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await sendContactForm(formData);

      if (result.success) {
        setIsSuccess(true);
        setErrors({});
        toast({
          title: "Message envoyé !",
          description: "Nous vous contacterons bientôt.",
          variant: "success",
        });
      } else {
        toast({
          title: "Erreur",
          description:
            result.error || "Une erreur s'est produite. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const resetForm = () => {
    setIsSuccess(false);
    setErrors({});
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-muted/50 relative overflow-hidden section-with-graphic graphic-top-right graphic-bottom-left"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Prêt à{" "}
            <span className="gradient-text">simplifier vos paiements</span> ?
          </h2>
          <div className="w-20 h-1 bg-avada-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une démonstration personnalisée
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-card shadow-lg rounded-xl border border-border p-8 relative overflow-hidden">
              <div className="relative z-10">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-avada-500/10 rounded-full flex items-center justify-center text-avada-500 mx-auto mb-6">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      Message envoyé!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Merci de nous avoir contacté. Notre équipe vous répondra
                      dans les plus brefs délais.
                    </p>
                    <Button
                      onClick={resetForm}
                      className="bg-avada-500 hover:bg-avada-600 text-white"
                    >
                      Envoyer un autre message
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    id="contact-form"
                    ref={formRef}
                    action={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Votre nom"
                          required
                          className={`w-full ${
                            errors.name
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          aria-invalid={errors.name ? "true" : "false"}
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="mt-1 text-sm text-red-500 flex items-center"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="votre@email.com"
                          required
                          className={`w-full ${
                            errors.email
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          aria-invalid={errors.email ? "true" : "false"}
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="mt-1 text-sm text-red-500 flex items-center"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.email}
                          </p>
                        )}
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
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Comment pouvons-nous vous aider?"
                        required
                        className={`w-full ${
                          errors.message
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="mt-1 text-sm text-red-500 flex items-center"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div className="text-center">
                      <Button
                        type="submit"
                        className="bg-avada-500 hover:bg-avada-600 text-white px-8 py-3 text-base"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-card shadow-lg rounded-lg border border-border p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 text-foreground gradient-text">
                  Nos coordonnées
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-8 h-8 bg-avada-500/10 rounded-full flex items-center justify-center">
                        <Phone className="h-4 w-4 text-avada-500" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-foreground">
                        Téléphone
                      </h4>
                      <p className="text-muted-foreground">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-8 h-8 bg-avada-500/10 rounded-full flex items-center justify-center">
                        <Mail className="h-4 w-4 text-avada-500" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-foreground">
                        Email
                      </h4>
                      <p className="text-muted-foreground">
                        {contactInfo.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-8 h-8 bg-avada-500/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-avada-500" />
                      </div>
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
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
