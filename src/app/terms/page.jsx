import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "SharePad Terms",
  description: "Terms for using SharePad.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="card prose">
      <h1>Terms and Acceptable Use</h1>
      <p>You agree to use SharePad lawfully and avoid uploading abusive, illegal, or malicious content.</p>
      <p>
        SharePad is provided as-is. You are responsible for content backups and for sharing pad URLs/passwords
        only with trusted people.
      </p>
      <p>We may remove abusive content and apply rate limits to preserve platform reliability.</p>
    </article>
  );
}
