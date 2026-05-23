import Link from "next/link";
import { BackHomeLinks } from "@/components/back-home-links";

export default function NotFoundPage() {
  return (
    <section className="card stack">
      <h1>Pad Not Found</h1>
      <p>The pad does not exist or it may have expired.</p>
      <BackHomeLinks />
      <Link href="/" className="inline-link">
        Go Home
      </Link>
    </section>
  );
}
