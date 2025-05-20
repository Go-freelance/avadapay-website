"use client";

import { useState, useRef } from "react";
import { sendContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { contactInfo } from "@/data/contact";
import {
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/locales/client";

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
  const t = useI18n();

  const { toast } = useToast();

  // Validation functions
  const validateName = (name: string) => {
    if (!name || name.trim() === "") {
      return t("validation.required", {});
    }
    if (name.trim().length < 2) {
      return t("validation.minLength", { min: 2 });
    }
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email || email.trim() === "") {
      return t("validation.required", {});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return t("validation.email", {});
    }
    return "";
  };

  const validateMessage = (message: string) => {
    if (!message || message.trim() === "") {
      return t("validation.required", {});
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
        title: t("validation.error", {}),
        description: t("validation.error", {}),
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
          title: t("contact.form.success.title", {}),
          description: t("contact.form.success.message", {}),
          variant: "success",
        });
      } else {
        toast({
          title: t("validation.error", {}),
          description: result.error || t("validation.error", {}),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("validation.error", {}),
        description: t("validation.error", {}),
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
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold mb-4 text-foreground">
            {t("contact.title", {})}{" "}
            <span className="gradient-text">{t("contact.title2", {})}</span>
          </h2>
          <div className="w-20 h-1 bg-avada-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle", {})}
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
                      {t("contact.form.success.title")}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t("contact.form.success.message")}
                    </p>
                    <Button
                      onClick={resetForm}
                      className="bg-avada-500 hover:bg-avada-600 text-white"
                    >
                      {t("contact.form.success.button")}
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
                          {t("contact.form.name")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder={t("contact.form.name")}
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
                          {t("contact.form.email")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder={t("contact.form.email")}
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
                        {t("contact.form.message")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder={t("contact.form.message")}
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
                            {t("contact.form.sending")}
                          </>
                        ) : (
                          t("contact.form.submit")
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
            className="space-y-8"
          >
            <div className="bg-card shadow-lg rounded-xl border border-border p-8">
              <h3 className="text-xl font-bold mb-6 text-foreground">
                {t("contact.info.title")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-avada-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("contact.info.phone")}
                    </p>
                    <p className="text-foreground">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-avada-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("contact.info.email")}
                    </p>
                    <p className="text-foreground">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-avada-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("contact.info.address")}
                    </p>
                    <p className="text-foreground">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-5 w-5 text-avada-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("contact.info.hours")}
                    </p>
                    <p className="text-foreground">
                      {t("contact.info.hours.value")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
