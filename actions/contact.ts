"use server"

import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  company: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function sendContactForm(formData: FormData) {
  try {
    // Extract form data
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    }

    // Validate form data
    const validatedData = contactFormSchema.safeParse(data)

    if (!validatedData.success) {
      return {
        success: false,
        error: "Veuillez vérifier les informations saisies",
      }
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically send the data to your backend or email service
    console.log("Contact form submitted:", validatedData.data)

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      error: "Une erreur s'est produite lors de l'envoi du formulaire",
    }
  }
}
