import ContactForm from "@/components/ContactForm";
import TextContainer from "@/components/TextContainer";

const headerText = {
  title: "Contact Me",
  content: [
    "I'd love to hear from you! Whether you have a question, a project idea, or just want to say hello, feel free to reach out.",
    "You can fill out the contact form below and I'll get back to you as soon as possible.",
  ],
};

export default function ContactPage() {
  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
      <TextContainer textSections={[headerText]}>
        <ContactForm />
      </TextContainer>
    </main>
  );
}
