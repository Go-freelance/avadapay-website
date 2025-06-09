"use server";

import { z } from "zod";
import { sendMail } from "@/services/mailServices";
import { getI18n } from "@/locales/server";

const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom est requis").trim(),
  email: z.string().email("Email invalide").trim(),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .trim(),
});

export async function sendContactForm(formData: FormData) {
  const t = await getI18n();

  try {
    // Extract form data
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    // Validate form data
    const validatedData = contactFormSchema.safeParse(data);

    if (!validatedData.success) {
      console.log("Validation failed:", validatedData.error.format());
      const errors = validatedData.error.format();
      return {
        success: false,
        error: t("validation.error"),
        errors,
      };
    }

    // Préparer le contenu HTML de l'email
    const htmlContent = `
      <h2>${t("contact.email.title")}</h2>
      <p><strong>${t("contact.form.name")}:</strong> ${
      validatedData.data.name
    }</p>
      <p><strong>${t("contact.form.email")}:</strong> ${
      validatedData.data.email
    }</p>
      ${
        validatedData.data.company
          ? `<p><strong>${t("contact.form.company")}:</strong> ${
              validatedData.data.company
            }</p>`
          : ""
      }
      <p><strong>${t("contact.form.message")}:</strong></p>
      <p>${validatedData.data.message}</p>
    `;

    // Envoyer l'email
    await sendMail({
      to: process.env.EMAIL_RECIPIENTS?.split(",") || [],
      subject: "Nouveau message de contact - AvadaPay",
      html: htmlContent,
    });

    return {
      success: true,
      message: t("contact.form.success.message"),
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: t("contact.form.error"),
    };
  }
}
