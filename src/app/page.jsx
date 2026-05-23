import { CreatePadForm } from "@/components/create-pad-form";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "SharePad | Markdown-First Shared Notes",
  description: "Create secure markdown pads and share them instantly with optional password protection.",
  path: "/",
});

export default function HomePage() {
  return <CreatePadForm />;
}
