"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreatePadForm() {
  const [slug, setSlug] = useState("");
  const [joinSlug, setJoinSlug] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/pads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create pad.");
      toast.success("Pad created.");
      router.push(`/${data.slug}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleJoin(event) {
    event.preventDefault();
    const cleaned = joinSlug.trim().toLowerCase();
    if (cleaned.length < 6) {
      toast.error("Pad ID must be at least 6 characters.");
      return;
    }
    router.push(`/${cleaned}`);
  }

  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Share fast. Collaborate cleanly.</p>
        <h1>Markdown pads built for instant teamwork.</h1>
        <p>
          Create a secure pad in seconds, share the link, and edit together with autosave. Pads expire 1 year
          after last access.
        </p>
      </div>

      <div className="hero-forms">
        <form className="card stack" onSubmit={onSubmit}>
          <h2>Create a new pad</h2>
          <label>
            Pad ID
            <input
              required
              minLength={6}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="launch-plan-2026"
            />
          </label>
          <label>
            Password (optional)
            <input
              minLength={6}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Protect this pad"
            />
          </label>
          <button disabled={loading} type="submit">
            {loading ? "Creating..." : "Create Pad"}
          </button>
        </form>

        <form className="card stack join-card" onSubmit={handleJoin}>
          <h2>Open an existing pad</h2>
          <label>
            Enter pad ID
            <input
              value={joinSlug}
              onChange={(e) => setJoinSlug(e.target.value)}
              placeholder="team-notes"
            />
          </label>
          <button type="submit">Open Pad</button>
        </form>
      </div>
    </section>
  );
}
