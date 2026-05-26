"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setPadKeyMaterial } from "@/lib/client-secret-store";
import { createKeyMaterialFromPassword } from "@/lib/crypto-client";

export function UnlockForm({ slug }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/pads/${slug}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unlock failed.");

      const padRes = await fetch(`/api/pads/${slug}`, { method: "GET" });
      if (!padRes.ok) throw new Error("Unable to load encrypted pad metadata.");
      const padData = await padRes.json();
      const salt = padData?.encryptedPayload?.salt || null;
      const iterations = padData?.encryptedPayload?.kdf?.iterations || 600000;
      const keyMaterial = await createKeyMaterialFromPassword(
        password,
        salt,
        iterations,
      );
      setPadKeyMaterial(slug, keyMaterial);

      toast.success("Pad unlocked.");
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card stack" onSubmit={onSubmit}>
      <h1>Protected Pad</h1>
      <p>Enter the pad password to continue.</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Unlocking..." : "Unlock"}
      </button>
    </form>
  );
}
