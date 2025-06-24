"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useI18n();

  const contactFormSchema = z.object({
    name: z.string().trim().min(2, t("validation.name.min")),
    email: z.string().trim().email(t("validation.email.invalid")),
    phone: z
      .string()
      .trim()
      .min(9, t("validation.phone.required"))
      .regex(/^[0-9+\s()-]{9,}$/i, t("validation.phone.invalid")),
    company: z.string().optional(),
    message: z.string().trim().min(10, t("validation.message.min")),
  });

  type ContactFormData = z.infer<typeof contactFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setSuccess(false);
      setError(null);

      const formData = new FormData();
      formData.set("name", data.name);
      formData.set("email", data.email);
      formData.set("phone", data.phone);
      formData.set("company", data.company || "");
      formData.set("message", data.message);

      const result = await sendContactForm(formData);

      if (result.success) {
        setSuccess(true);
        toast({
          title: t("contact.form.success.title"),
          description: t("contact.form.success.message"),
          variant: "success",
        });
        reset();
      } else {
        setError(result.error || t("validation.error"));
        toast({
          title: t("validation.error"),
          description: result.error || t("validation.error"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(t("validation.error"));
      toast({
        title: t("validation.error"),
        description: t("validation.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md p-4 text-center mb-4">
          <strong className="break-words">
            {t("contact.form.success.title")}
          </strong>
          <div className="break-words">{t("contact.form.success.message")}</div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-4 text-center mb-4">
          <strong className="break-words">{t("validation.error")}</strong>
          <div className="break-words">{error}</div>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="min-w-0">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1 break-words"
          >
            {t("contact.form.name")}
          </Label>
          <Input
            id="name"
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            placeholder={t("contact.form.name")}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 flex items-center break-words">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="min-w-0">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1 break-words"
          >
            {t("contact.form.email")}
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            placeholder={t("contact.form.email")}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center break-words">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <Label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1 break-words"
          >
            {t("contact.form.phone")}
          </Label>
          <Input
            id="phone"
            {...register("phone")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            placeholder={t("contact.form.phone")}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500 flex items-center break-words">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <Label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1 break-words"
          >
            {t("contact.form.company")}
          </Label>
          <Input
            id="company"
            {...register("company")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            placeholder={t("contact.form.company")}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="min-w-0">
        <Label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1 break-words"
        >
          {t("contact.form.message")}
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          placeholder={t("contact.form.message")}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500 flex items-center break-words">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner className="h-4 w-4" />
            <span>{t("contact.form.sending")}</span>
          </div>
        ) : (
          t("contact.form.submit")
        )}
      </Button>
    </form>
  );
}
