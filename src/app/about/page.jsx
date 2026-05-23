import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "About SharePad",
  description: "SharePad is a secure markdown-first collaboration notepad with 24h retention.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="card prose">
      <h1>About SharePad</h1>
      <p>
        SharePad is a no-login markdown collaboration pad designed for speed, privacy, and clarity.
      </p>
      <p>
        Create a pad, optionally protect it with a password, and share the link. Every pad expires 1 year
        after the last access for lightweight privacy-by-default workflows.
      </p>
    </article>
  );
}
