"use client";

import { contactInfo } from "@/data/contact";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/locales/client";
import { ContactForm } from "@/components/forms/contact-form";

export default function Contact() {
  const t = useI18n();
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
          <h2 className="text-3xl font-extrabold mb-4 text-foreground break-words">
            {t("contact.title")}{" "}
            <span className="gradient-text">{t("contact.title2")}</span>
          </h2>
          <div className="w-20 h-1 bg-avada-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto break-words">
            {t("contact.subtitle")}
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
                <ContactForm />
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
              <h3 className="text-xl font-bold mb-6 text-foreground break-words">
                {t("contact.info.title")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-avada-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground break-words">
                      {t("contact.info.phone")}
                    </p>
                    <p className="text-foreground break-words">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-avada-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground break-words">
                      {t("contact.info.email")}
                    </p>
                    <p className="text-foreground break-words">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-avada-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground break-words">
                      {t("contact.info.address")}
                    </p>
                    <p className="text-foreground break-words">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-5 w-5 text-avada-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground break-words">
                      {t("contact.info.hours")}
                    </p>
                    <p className="text-foreground break-words">
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
