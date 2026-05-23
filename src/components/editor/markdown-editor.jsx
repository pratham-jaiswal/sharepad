"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

function injectAroundSelection(textarea, before, after = before) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const selected = value.slice(start, end);
  const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
  const cursor = end + before.length + after.length;
  return { next, cursor };
}

function getSelectedLineRange(value, start, end) {
  const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
  const lineEndIdx = value.indexOf("\n", end);
  const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
  return { lineStart, lineEnd };
}

export function MarkdownEditor({
  slug,
  initialMarkdown,
  initialExpiresAt,
  isProtected,
}) {
  const [markdown, setMarkdown] = useState(initialMarkdown || "");
  const [status, setStatus] = useState("Saved");
  const [showPreview, setShowPreview] = useState(true);
  const [expiresAt, setExpiresAt] = useState(
    initialExpiresAt ? new Date(initialExpiresAt) : null,
  );
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef(null);
  const saveErrorToastShown = useRef(false);
  const dirtyRef = useRef(false);

  const expiryText = useMemo(() => {
    if (!expiresAt) return "Expiry unavailable";
    if (!mounted)
      return expiresAt.toISOString().replace("T", " ").replace(".000Z", " UTC");
    return expiresAt.toLocaleString();
  }, [expiresAt, mounted]);

  function setNextValue(next, cursorStart = null, cursorEnd = null) {
    dirtyRef.current = true;
    setMarkdown(next);
    if (cursorStart === null) return;
    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      textarea.setSelectionRange(cursorStart, cursorEnd ?? cursorStart);
    });
  }

  function toggleWrapper(before, after = before) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selected = value.slice(start, end);
    const wrapped =
      selected.startsWith(before) &&
      selected.endsWith(after) &&
      selected.length >= before.length + after.length;

    if (wrapped) {
      const inner = selected.slice(
        before.length,
        selected.length - after.length,
      );
      const next = `${value.slice(0, start)}${inner}${value.slice(end)}`;
      setNextValue(next, start, start + inner.length);
      return;
    }

    const { next, cursor } = injectAroundSelection(textarea, before, after);
    setNextValue(next, cursor, cursor);
  }

  function toggleLinePrefix(prefix) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const { lineStart, lineEnd } = getSelectedLineRange(value, start, end);
    const block = value.slice(lineStart, lineEnd);
    const lines = block.split("\n");
    const allPrefixed = lines.every((line) => line.startsWith(prefix));

    const nextLines = lines.map((line) => {
      if (allPrefixed)
        return line.startsWith(prefix) ? line.slice(prefix.length) : line;
      return line.startsWith(prefix) ? line : `${prefix}${line}`;
    });

    const replaced = nextLines.join("\n");
    const next = `${value.slice(0, lineStart)}${replaced}${value.slice(lineEnd)}`;
    setNextValue(next, lineStart, lineStart + replaced.length);
  }

  function toggleNumberedList() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const { lineStart, lineEnd } = getSelectedLineRange(value, start, end);
    const block = value.slice(lineStart, lineEnd);
    const lines = block.split("\n");

    const numberedPattern = /^\d+\.\s/;
    const allNumbered = lines.every((line) => numberedPattern.test(line));
    if (allNumbered) return;

    const nextLines = lines.map((line, idx) => {
      if (numberedPattern.test(line)) return line;
      return `${idx + 1}. ${line}`;
    });
    const replaced = nextLines.join("\n");
    const next = `${value.slice(0, lineStart)}${replaced}${value.slice(lineEnd)}`;
    setNextValue(next, lineStart, lineStart + replaced.length);
  }

  function insertAtCursor(snippet) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const next = `${value.slice(0, start)}${snippet}${value.slice(end)}`;
    const cursor = start + snippet.length;
    setNextValue(next, cursor, cursor);
  }

  function insertLink() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const url = window.prompt("Enter URL (https://..., ftp://..., mailto:...)");
    if (!url) return;
    const safeUrl = url.trim();
    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(safeUrl)) {
      toast.error(
        "Please enter a valid URL with a scheme (https:, http:, ftp:, mailto:, etc.)",
      );
      return;
    }
    const selected =
      textarea.value.slice(textarea.selectionStart, textarea.selectionEnd) ||
      "Link text";
    const snippet = `[${selected}](${safeUrl})`;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const next = `${value.slice(0, start)}${snippet}${value.slice(end)}`;
    setNextValue(next, start, start + snippet.length);
  }

  function insertImageFromUrl() {
    const url = window.prompt("Enter image URL (https://..., ftp://..., etc.)");
    if (!url) return;
    const safeUrl = url.trim();
    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(safeUrl)) {
      toast.error("Please enter a valid image URL with a scheme.");
      return;
    }
    const alt = window.prompt("Optional alt text") || "Image";
    insertAtCursor(`![${alt}](${safeUrl})`);
  }

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
      <div className="editor-controls">
        <button
          className="tool-btn secondary"
          onClick={() => setShowPreview((v) => !v)}
          type="button"
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      <div className="toolbar">
        <button
          className="tool-btn"
          onClick={() => toggleWrapper("**")}
          type="button"
        >
          Bold
        </button>
        <button
          className="tool-btn"
          onClick={() => toggleWrapper("*")}
          type="button"
        >
          Italic
        </button>
        <button
          className="tool-btn"
          onClick={() => toggleWrapper("~~")}
          type="button"
        >
          Strike
        </button>
        <button
          className="tool-btn"
          onClick={() => toggleWrapper("`")}
          type="button"
        >
          Inline Code
        </button>
        <button
          className="tool-btn"
          onClick={() => insertAtCursor("\n```\ncode\n```\n")}
          type="button"
        >
          Code Block
        </button>
        <button
          className="tool-btn"
          onClick={() => toggleLinePrefix("# ")}
          type="button"
        >
          H1
        </button>
        <button
          className="tool-btn"
          onClick={() => toggleLinePrefix("## ")}
          type="button"
        >
          H2
        </button>
        <button
          className="tool-btn"
          onClick={() => toggleLinePrefix("- ")}
          type="button"
        >
          Bullet List
        </button>
        <button className="tool-btn" onClick={toggleNumberedList} type="button">
          Numbered List
        </button>
        <button
          className="tool-btn"
          onClick={() => toggleLinePrefix("> ")}
          type="button"
        >
          Quote
        </button>
        <button className="tool-btn" onClick={insertLink} type="button">
          Hyperlink
        </button>
        <button className="tool-btn" onClick={insertImageFromUrl} type="button">
          Image URL
        </button>
      </div>

      <div className={`editor-grid ${showPreview ? "" : "preview-hidden"}`}>
        <textarea
          ref={textareaRef}
          value={markdown}
          onChange={(e) => {
            dirtyRef.current = true;
            setMarkdown(e.target.value);
          }}
          className="markdown-input"
          aria-label="Markdown input"
          placeholder="Write markdown..."
        />
        {showPreview ? (
          <article className="markdown-preview">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {markdown}
            </ReactMarkdown>
          </article>
        ) : null}
      </div>
    </section>
  );
}
