"use client";

import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  ListsToggle,
  CodeToggle,
  InsertCodeBlock,
  InsertThematicBreak,
  Separator,
  StrikeThroughSupSubToggles,
  TooltipWrap,
  ButtonOrDropdownButton,
} from "@mdxeditor/editor";
import { useEffect, useRef } from "react";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { toast } from "sonner";
import { Copy, Download, Share2, ClipboardPaste } from "lucide-react";
import { exportMarkdownFile } from "@/lib/export";

export function MDXEditorInner({
  markdown,
  setMarkdown,
  dirtyRef,
  slug,
  onReady,
}) {
  const canShare = typeof navigator !== "undefined" && "share" in navigator;
  const editorRef = useRef(null);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  async function pasteMarkdown() {
    try {
      const text = await navigator.clipboard.readText();
      editorRef.current?.insertMarkdown(text);
      toast.success("Markdown imported");
    } catch {
      toast.error("Couldn't read clipboard");
    }
  }

  const codeBlockLanguages = Object.fromEntries(
    Object.entries({
      txt: "Text",
      bash: "Bash",
      shell: "Shell",
      sh: "Shell",
      zsh: "Zsh",
      fish: "Fish",

      js: "JavaScript",
      jsx: "JavaScript JSX",
      ts: "TypeScript",
      tsx: "TypeScript JSX",

      html: "HTML",
      css: "CSS",
      scss: "SCSS",
      sass: "Sass",
      less: "Less",

      json: "JSON",
      yaml: "YAML",
      yml: "YAML",
      toml: "TOML",
      xml: "XML",

      md: "Markdown",

      py: "Python",
      rb: "Ruby",
      php: "PHP",
      java: "Java",
      kotlin: "Kotlin",
      scala: "Scala",
      groovy: "Groovy",

      c: "C",
      cpp: "C++",
      cs: "C#",
      rs: "Rust",
      go: "Go",

      swift: "Swift",
      dart: "Dart",

      sql: "SQL",

      dockerfile: "Dockerfile",

      nginx: "Nginx",
      apache: "Apache",

      graphql: "GraphQL",

      powershell: "PowerShell",

      lua: "Lua",
      perl: "Perl",
      r: "R",
      matlab: "MATLAB",

      ini: "INI",

      plaintext: "Plain Text",
    }).sort(([a], [b]) => a.localeCompare(b)),
  );

  function copyMarkdown() {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied");
  }

  async function handleExport(format) {
    try {
      await exportMarkdownFile(format, markdown, slug || "sharepad");
      toast.success(`${format.toUpperCase()} download ready`);
    } catch (error) {
      toast.error(error?.message || "Download failed");
    }
  }

  async function shareLink() {
    const url = `${window.location.origin}/${slug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "SharePad",
          text: "Check out this note",
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch (err) {
      if (err?.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      } catch {
        toast.error("Couldn't share the link");
      }
    }
  }

  return (
    <MDXEditor
      ref={editorRef}
      spellCheck={false}
      markdown={markdown}
      onChange={(value) => {
        dirtyRef.current = true;
        setMarkdown(value);
      }}
      contentEditableClassName="mdx-content"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        codeBlockPlugin({
          defaultCodeBlockLanguage: "txt",
        }),
        codeMirrorPlugin({
          theme:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? githubDark
              : githubLight,

          codeBlockLanguages: codeBlockLanguages,
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <StrikeThroughSupSubToggles />
              <Separator />
              <BlockTypeSelect />
              <ListsToggle />
              <Separator />
              <CreateLink />
              <InsertImage />
              <Separator />
              <InsertTable />
              <InsertThematicBreak />
              <Separator />
              <CodeToggle />
              <InsertCodeBlock />
              <Separator />
              <TooltipWrap title="Paste Markdown">
                <button
                  type="button"
                  className="mdx-toolbar-icon-btn"
                  onClick={pasteMarkdown}
                >
                  <ClipboardPaste size={18} />
                </button>
              </TooltipWrap>
              <div style={{ flex: 1 }} />
              <ButtonOrDropdownButton
                title="Download"
                items={[
                  // { label: "PDF", value: "pdf" },
                  { label: "DOCX", value: "docx" },
                  { label: "Markdown", value: "md" },
                  { label: "Text", value: "txt" },
                  { label: "HTML", value: "html" },
                ]}
                onChoose={(value) => {
                  if (!value) return;
                  void handleExport(value);
                }}
              >
                <Download size={18} />
              </ButtonOrDropdownButton>
              <TooltipWrap title="Copy markdown">
                <button
                  type="button"
                  className="mdx-toolbar-icon-btn"
                  onClick={copyMarkdown}
                  aria-label="Copy markdown"
                >
                  <Copy size={18} />
                </button>
              </TooltipWrap>
              <TooltipWrap
                title={canShare ? "Share this pad" : "Copy pad link"}
              >
                <button
                  type="button"
                  className="mdx-toolbar-icon-btn"
                  onClick={shareLink}
                  aria-label={canShare ? "Share this pad" : "Copy pad link"}
                >
                  <Share2 size={18} />
                </button>
              </TooltipWrap>
            </>
          ),
        }),
      ]}
    />
  );
}
