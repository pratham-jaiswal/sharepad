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
  AdmonitionDirectiveDescriptor,
  directivesPlugin,
  InsertAdmonition,
  Separator,
  StrikeThroughSupSubToggles,
  TooltipWrap,
} from "@mdxeditor/editor";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export function MDXEditorInner({ markdown, setMarkdown, dirtyRef }) {
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

  return (
    <MDXEditor
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
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
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
              <InsertAdmonition />
              <div style={{ flex: 1 }} />
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
            </>
          ),
        }),
      ]}
    />
  );
}
