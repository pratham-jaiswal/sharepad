import { ContactForm } from "@/components/contact-form";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Contact SharePad",
  description: "Contact the SharePad team.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactForm />;
}
