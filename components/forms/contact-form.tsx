"use client";

import { useState } from "react";
import { sendContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    try {
      const result = await sendContactForm(formData);

      if (result.success) {
        toast({
          title: "Message envoyé!",
          description: "Nous vous contacterons bientôt.",
          variant: "success",
        });

        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
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

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom complet
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Votre nom"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="votre@email.com"
            required
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Entreprise
        </Label>
        <Input
          type="text"
          id="company"
          name="company"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Nom de votre entreprise"
        />
      </div>
      <div>
        <Label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Comment pouvons-nous vous aider?"
          required
        />
      </div>
      <div className="text-center">
        <Button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-md text-base font-medium transition-colors"
          disabled={isSubmitting}
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
  );
}
