"use client";

import { useState } from "react";
import { toast } from "sonner";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [loading, setLoading] = useState(false);

  function validate() {
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    if (trimmedName.length < 1) {
      toast.error("Name is required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (trimmedMessage.length <= 10) {
      toast.error("Message body must be more than 10 characters.");
      return false;
    }

    return true;
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Message sent. We will get back to you soon.");
      setForm({ name: "", email: "", message: "", website: "" });
      return;
    }
    const data = await res.json().catch(() => ({}));
    toast.error(data.error || "Failed to send message.");
  }

  return (
    <form className="card stack" onSubmit={onSubmit}>
      <h1>Contact</h1>
      <p>Use this form for feature feedback, bugs, or partnership requests.</p>
      <input
        minLength={1}
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm((x) => ({ ...x, name: e.target.value }))}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((x) => ({ ...x, email: e.target.value }))}
        required
      />
      <textarea
        placeholder="Message"
        rows={8}
        minLength={11}
        value={form.message}
        onChange={(e) => setForm((x) => ({ ...x, message: e.target.value }))}
        required
      />
      <input
        tabIndex={-1}
        autoComplete="off"
        className="honeypot"
        value={form.website}
        onChange={(e) => setForm((x) => ({ ...x, website: e.target.value }))}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
