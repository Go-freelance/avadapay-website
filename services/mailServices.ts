import nodeMailer from "nodemailer";
import type { Transporter } from "nodemailer";

interface MailOptions {
  to: string[];
  subject: string;
  html: string;
}

export const transporter: Transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
} as nodeMailer.TransportOptions);

export async function sendMail({ to, subject, html }: MailOptions) {
  try {
    await transporter.sendMail({
      from: `"AvadaPay DRC" <${process.env.SMTP_USER}>`,
      to: to,
      subject,
      html: html,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
