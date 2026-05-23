"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

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
}) {
  const [markdown, setMarkdown] = useState(initialMarkdown || "");
  const [status, setStatus] = useState("Saved");
  const [expiresAt, setExpiresAt] = useState(
    initialExpiresAt ? new Date(initialExpiresAt) : null,
  );
  const [mounted, setMounted] = useState(false);
  const saveErrorToastShown = useRef(false);
  const dirtyRef = useRef(false);

  const expiryText = useMemo(() => {
    if (!expiresAt) return "Expiry unavailable";
    if (!mounted)
      return expiresAt.toISOString().replace("T", " ").replace(".000Z", " UTC");
    return expiresAt.toLocaleString();
  }, [expiresAt, mounted]);

  useEffect(() => {
    if (!dirtyRef.current) return;
    setStatus("Saving...");
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/pads/${slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ markdown, revision: 0 }),
        });
        if (!res.ok) throw new Error("Save failed");
        const data = await res.json();
        if (data?.expiresAt) setExpiresAt(new Date(data.expiresAt));
        setStatus("Saved");
        saveErrorToastShown.current = false;
        dirtyRef.current = false;
      } catch (error) {
        setStatus("Retry needed");
        if (!saveErrorToastShown.current) {
          toast.error("Autosave failed. Check your connection.");
          saveErrorToastShown.current = true;
        }
      }
    }, 650);
    return () => clearTimeout(timer);
  }, [markdown, slug]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isProtected) return;

    const lock = () => {
      const url = `/api/pads/${slug}/lock`;
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
          <MDXEditorInner
            markdown={markdown}
            setMarkdown={setMarkdown}
            dirtyRef={dirtyRef}
          />
        </div>
      </div>
    </section>
  );
}
