import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ContactTemplateProps {
  name: string;
  message: string;
}

export const ContactTemplate = ({ name, message }: ContactTemplateProps) => (
  <Html>
    <Head />
    <Preview>New message from your portfolio</Preview>
    <Tailwind>
      <Body className="bg-gray-100 font-sans">
        <Container className="bg-white border border-gray-200 p-10 my-10 rounded-lg">
          <Heading className="text-2xl font-bold text-gray-800">
            New Contact Form Submission
          </Heading>
          <Section className="mt-4">
            <Text className="text-gray-600"><strong>From:</strong> {name}</Text>
            <Text className="text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-4">
              "{message}"
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ContactTemplate;