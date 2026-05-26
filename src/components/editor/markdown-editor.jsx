"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import {
  decryptMarkdownWithKeyMaterial,
  encryptMarkdownWithKeyMaterial,
} from "@/lib/crypto-client";
import {
  clearPadKeyMaterial,
  getPadKeyMaterial,
} from "@/lib/client-secret-store";

const MDXEditorInner = dynamic(
  () => import("./mdx-editor-inner").then((m) => m.MDXEditorInner),
  {
    ssr: false,
  },
);

export function MarkdownEditor({
  slug,
  initialMarkdown,
  initialExpiresAt,
  isProtected,
  initialEncryptedPayload,
}) {
  const [markdown, setMarkdown] = useState(
    isProtected ? "" : initialMarkdown || "",
  );
  const [status, setStatus] = useState("Saved");
  const [ready, setReady] = useState(!isProtected);
  const [waitingMessage, setWaitingMessage] = useState(
    isProtected ? "Preparing secure session..." : "",
  );
  const [expiresAt, setExpiresAt] = useState(
    initialExpiresAt ? new Date(initialExpiresAt) : null,
  );
  const [mounted, setMounted] = useState(false);
  const saveErrorToastShown = useRef(false);
  const dirtyRef = useRef(false);
  const encryptedPayloadRef = useRef(initialEncryptedPayload || null);

  const expiryText = useMemo(() => {
    if (!expiresAt) return "Expiry unavailable";
    if (!mounted)
      return expiresAt.toISOString().replace("T", " ").replace(".000Z", " UTC");
    return expiresAt.toLocaleString();
  }, [expiresAt, mounted]);

  useEffect(() => {
    if (isProtected && !ready) return;
    if (!dirtyRef.current) return;
    setStatus("Saving...");
    const timer = setTimeout(async () => {
      try {
        let body;
        if (isProtected) {
          const keyMaterial = getPadKeyMaterial(slug);
          if (!keyMaterial) throw new Error("Missing local encryption key.");
          const encryptedPayload = await encryptMarkdownWithKeyMaterial(
            keyMaterial,
            markdown,
          );
          encryptedPayloadRef.current = encryptedPayload;
          body = JSON.stringify({ encryptedPayload, revision: 0 });
        } else {
          body = JSON.stringify({ markdown, revision: 0 });
        }

        const res = await fetch(`/api/pads/${slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body,
        });
        if (!res.ok) throw new Error("Save failed");
        const data = await res.json();
        if (data?.expiresAt) setExpiresAt(new Date(data.expiresAt));
        if (data?.encryptedPayload) {
          encryptedPayloadRef.current = data.encryptedPayload;
        }
        setStatus("Saved");
        saveErrorToastShown.current = false;
        dirtyRef.current = false;
      } catch (error) {
        setStatus("Retry needed");
        if (!saveErrorToastShown.current) {
          toast.error(
            error?.message || "Autosave failed. Check your connection.",
          );
          saveErrorToastShown.current = true;
        }
      }
    }, 650);
    return () => clearTimeout(timer);
  }, [markdown, slug, isProtected, ready]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isProtected) return;
    const payload = initialEncryptedPayload;
    if (!payload?.ciphertext) {
      setReady(true);
      return;
    }

    const keyMaterial = getPadKeyMaterial(slug);
    if (!keyMaterial) {
      setWaitingMessage("Session locked. Redirecting to unlock...");
      fetch(`/api/pads/${slug}/lock`, {
        method: "POST",
        keepalive: true,
      }).finally(() => {
        window.location.replace(window.location.pathname);
      });
      return;
    }

    (async () => {
      try {
        const plain = await decryptMarkdownWithKeyMaterial(keyMaterial, payload);
        setMarkdown(plain);
        encryptedPayloadRef.current = payload;
        dirtyRef.current = false;
        setReady(true);
      } catch {
        toast.error("Unable to decrypt this pad with current password.");
        setWaitingMessage("Unable to decrypt. Redirecting to unlock...");
        fetch(`/api/pads/${slug}/lock`, {
          method: "POST",
          keepalive: true,
        }).finally(() => {
          window.location.replace(window.location.pathname);
        });
      }
    })();
  }, [isProtected, initialEncryptedPayload, slug]);

  useEffect(() => {
    if (!isProtected) return;

    const lock = () => {
      const url = `/api/pads/${slug}/lock`;
      clearPadKeyMaterial(slug);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([], { type: "application/json" }));
      } else {
        fetch(url, { method: "POST", keepalive: true });
      }
    };

    window.addEventListener("pagehide", lock);
    return () => window.removeEventListener("pagehide", lock);
  }, [slug, isProtected]);

  return (
    <section className="editor-shell">
      <div className="editor-head">
        <h1>Pad: {slug}</h1>
        <p>Expires: {expiryText}</p>
        <span className={`status ${status === "Saved" ? "ok" : ""}`}>
          {status}
        </span>
      </div>

      <div className="editor-grid mdx-only">
        <div className="mdx-wrapper">
          {ready ? (
            <MDXEditorInner
              markdown={markdown}
              setMarkdown={setMarkdown}
              dirtyRef={dirtyRef}
            />
          ) : (
            <div style={{ padding: "1rem", color: "var(--text-soft)" }}>
              {waitingMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
