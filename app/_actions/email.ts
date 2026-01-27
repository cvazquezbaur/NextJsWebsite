"use server";
import { Resend } from 'resend';
import { ContactTemplate } from '@/emails/ContactTemplate'; // Path to your template

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['cvazquezbaur@gmail.com'],
      subject: `Portfolio Message from ${name}`,
      // Use 'react' instead of 'text' or 'html'
      react: ContactTemplate({ name, message }),
    });

    return { success: true, message: "Email sent with style!" };
  } catch (error) {
    return { success: false, message: "Failed to send email." };
  }
}