"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <section className="card stack">
      <h1>Something went wrong</h1>
      <p>{error?.message || "Unexpected error occurred."}</p>
      <button
        type="button"
        onClick={() => reset()}
        aria-label="Retry the operation"
      >
        Retry
      </button>
    </section>
  );
}
