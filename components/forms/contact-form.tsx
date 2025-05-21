"use client";

import { useState, useEffect } from "react";
import { sendContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/locales/client";

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const t = useI18n();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setServerErrors({});
    setSuccess(false);

    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const company = (formData.get("company") as string)?.trim() || "";
    const message = (formData.get("message") as string)?.trim() || "";

    // Empêcher l'envoi si un champ requis est vide
    if (!name || !email || !message) {
      setIsSubmitting(false);
      setServerErrors({
        name: !name ? t("validation.required") : undefined,
        email: !email ? t("validation.required") : undefined,
        message: !message ? t("validation.required") : undefined,
      });
      toast({
        title: t("validation.error"),
        description: t("validation.required"),
        variant: "destructive",
      });
      return;
    }

    // Créer un nouveau FormData nettoyé
    const cleanedFormData = new FormData();
    cleanedFormData.set("name", name);
    cleanedFormData.set("email", email);
    cleanedFormData.set("company", company);
    cleanedFormData.set("message", message);

    try {
      const result = await sendContactForm(cleanedFormData);

      if (result.success) {
        setSuccess(true);
        toast({
          title: t("contact.form.success.title"),
          description: t("contact.form.success.message"),
          variant: "success",
        });
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      } else {
        setServerErrors(result.errors || {});
        toast({
          title: t("validation.error"),
          description: result.error || t("validation.error"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("validation.error"),
        description: t("validation.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-4">
      {isSubmitting ? (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner className="mb-4" />
          <p className="text-lg font-semibold text-emerald-700">
            {t("contact.form.sending")}
          </p>
        </div>
      ) : (
        <>
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md p-4 text-center mb-4">
              <strong>{t("contact.form.success.title")}</strong>
              <div>{t("contact.form.success.message")}</div>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("contact.form.name")}
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={t("contact.form.name")}
                required
                aria-invalid={!!serverErrors.name}
                aria-describedby={serverErrors.name ? "name-error" : undefined}
                disabled={isSubmitting}
              />
              {serverErrors.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-500 flex items-center"
                >
                  {serverErrors.name._errors?.[0] || serverErrors.name}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("contact.form.email")}
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={t("contact.form.email")}
                required
                aria-invalid={!!serverErrors.email}
                aria-describedby={
                  serverErrors.email ? "email-error" : undefined
                }
                disabled={isSubmitting}
              />
              {serverErrors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-500 flex items-center"
                >
                  {serverErrors.email._errors?.[0] || serverErrors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("contact.form.company")}
            </Label>
            <Input
              type="text"
              id="company"
              name="company"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              placeholder={t("contact.form.company")}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("contact.form.message")}
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              placeholder={t("contact.form.message")}
              required
              aria-invalid={!!serverErrors.message}
              aria-describedby={
                serverErrors.message ? "message-error" : undefined
              }
              disabled={isSubmitting}
            />
            {serverErrors.message && (
              <p
                id="message-error"
                className="mt-1 text-sm text-red-500 flex items-center"
              >
                {serverErrors.message._errors?.[0] || serverErrors.message}
              </p>
            )}
          </div>
          <div className="text-center">
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-md text-base font-medium transition-colors"
              disabled={isSubmitting}
            >
              {t("contact.form.submit")}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
