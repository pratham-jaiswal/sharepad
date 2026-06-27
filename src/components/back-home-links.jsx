"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function BackHomeLinks() {
  const router = useRouter();

  return (
    <div className="notfound-actions">
      <button
        type="button"
        className="text-link-btn"
        onClick={() => router.back()}
        aria-label="Go back to previous page"
      >
        Go Back
      </button>
      <Link href="/" className="inline-link" aria-label="Go to home page">
        Go Home
      </Link>
    </div>
  );
}
