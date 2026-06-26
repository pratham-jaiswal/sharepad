import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ExternalHyperlink,
  Table,
  TableCell,
  TableRow,
  WidthType,
  BorderStyle,
  ImageRun,
} from "docx";

function normalizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9-_\.]/g, "-").replace(/-+/g, "-");
}

function preprocessMarkdownForExport(markdown = "") {
  const input = markdown.replace(/\r\n/g, "\n");
  const lines = input.split("\n");
  const out = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    out.push(line);
    i += 1;
  }

  return out.join("\n");
}

function resolveImageSource(src) {
  if (!src) return "";
  try {
    const baseHref =
      typeof window !== "undefined" ? window.location.href : "http://localhost/";
    return new URL(src, baseHref).href;
  } catch {
    return src;
  }
}

const defaultParagraphSpacing = {
  before: 120,
  after: 120,
  line: 276,
  lineRule: "auto",
};

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = normalizeFilename(filename);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function markdownToHtml(markdown) {
  const prepared = preprocessMarkdownForExport(markdown || "");
  const raw = marked.parse(prepared);
  return sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "pre",
      "code",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
      code: ["class"],
      pre: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "ftp"],
  });
}

function buildHtmlDocument(markdown, title) {
  const content = markdownToHtml(markdown);
  const safeTitle = String(title || "SharePad").replace(/[<>]/g, "");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${safeTitle}</title>
  <style>
    :root { color-scheme: light; }
    body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; color: #111827; background: #ffffff; padding: 24px; }
    h1, h2, h3, h4, h5, h6 { color: #0f172a; margin-top: 1.6em; margin-bottom: 0.5em; }
    p { margin: 0.85em 0; }
    a { color: #0ea5e9; text-decoration: none; }
    a:hover { text-decoration: underline; }
    code { background: #f1f5f9; padding: 0.15em 0.3em; border-radius: 0.35rem; color: #0f172a; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    pre { background: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.75rem; overflow: auto; }
    pre code { background: transparent; color: inherit; padding: 0; border-radius: 0; }
    blockquote { border-left: 4px solid #94a3b8; margin: 0.7em 0; padding-left: 0.85em; color: #334155; }
    hr { border: 0; border-top: 1px solid #cbd5e1; margin: 1.1em 0; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #cbd5e1; padding: 0.75em 0.85em; }
    th { background: #f8fafc; }
    ul, ol { margin: 0.85em 0 0.85em 1.35em; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}

async function createInlineRuns(tokens = []) {
  const children = [];

  for (const token of tokens) {
    if (!token) continue;

    if (token.type === "text") {
      children.push(new TextRun(token.text));
      continue;
    }

    if (token.type === "strong") {
      children.push(
        new TextRun({
          text: token.text,
          bold: true,
        }),
      );
      continue;
    }

    if (token.type === "em") {
      children.push(
        new TextRun({
          text: token.text,
          italics: true,
        }),
      );
      continue;
    }

    if (token.type === "codespan") {
      children.push(
        new TextRun({
          text: token.text,
          font: "Courier New",
          shading: {
            fill: "f8fafc",
          },
        }),
      );
      continue;
    }

    if (token.type === "link") {
      const href = token.href || token.url || "";
      const linkText = token.text || href || "";
      children.push(
        new ExternalHyperlink({
          link: href,
          children: [
            new TextRun({
              text: linkText,
              color: "0000EE",
              underline: {},
            }),
          ],
        }),
      );
      continue;
    }

    if (token.type === "del") {
      children.push(
        new TextRun({
          text: token.text || "",
          strike: true,
        }),
      );
      continue;
    }

    if (token.type === "image") {
      const source = resolveImageSource(token.href || token.url || token.src || "");
      if (source) {
        try {
          const bytes = await fetchImageBytes(source);
          children.push(
            new ImageRun({
              data: bytes,
              transformation: { width: 560, height: 320 },
              altText: token.text ? { name: token.text } : undefined,
            }),
          );
        } catch {
          children.push(new TextRun(token.text || ""));
        }
      }
      continue;
    }

    if (token.type === "html") {
      const htmlText = token.text || "";
      const supMatch = htmlText.match(/^<sup>([\s\S]*)<\/sup>$/i);
      if (supMatch) {
        children.push(
          new TextRun({
            text: supMatch[1],
            superScript: true,
          }),
        );
        continue;
      }

      const subMatch = htmlText.match(/^<sub>([\s\S]*)<\/sub>$/i);
      if (subMatch) {
        children.push(
          new TextRun({
            text: subMatch[1],
            subScript: true,
          }),
        );
        continue;
      }

      children.push(new TextRun(htmlText.replace(/<[^>]+>/g, "")));
      continue;
    }

    if (token.tokens) {
      children.push(...(await createInlineRuns(token.tokens)));
    }
  }

  return children;
}

function cellToText(cell) {
  if (typeof cell === "string") return cell;
  if (!cell) return "";
  if (typeof cell.text === "string") return cell.text;
  if (Array.isArray(cell.tokens)) {
    return cell.tokens
      .map((t) => t?.text || (typeof t?.raw === "string" ? t.raw : ""))
      .join("")
      .trim();
  }
  return String(cell);
}

function createDocxTable(token) {
  const header = (token.header || []).map(cellToText);
  const rows = (token.rows || token.cells || []).map((row) =>
    row.map(cellToText),
  );
  const align = token.align || [];

  const headerRow = new TableRow({
    children: header.map((cell) =>
      new TableCell({
        children: [
          new Paragraph({
            spacing: defaultParagraphSpacing,
            children: [new TextRun({ text: String(cell || ""), bold: true })],
          }),
        ],
      }),
    ),
  });

  const dataRows = rows.map(
    (row) =>
      new TableRow({
        children: row.map((cell, index) => {
          const value = String(cell || "");
          const alignment =
            align[index] === "center"
              ? "center"
              : align[index] === "right"
                ? "right"
                : "left";

          return new TableCell({
            children: [
              new Paragraph({
                alignment,
                spacing: defaultParagraphSpacing,
                children: [new TextRun({ text: value })],
              }),
            ],
          });
        }),
      }),
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
      insideHorizontal: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "E5E7EB",
      },
      insideVertical: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "E5E7EB",
      },
    },
    rows: [headerRow, ...dataRows],
  });
}

async function fetchImageBytes(src) {
  const response = await fetch(src);
  if (!response.ok) throw new Error("Image download failed");
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

async function createDocxSections(markdown) {
  const prepared = preprocessMarkdownForExport(markdown || "");
  const tokens = marked.lexer(prepared);
  const children = [];

  for (const token of tokens) {
    switch (token.type) {
      case "heading":
        children.push(
          new Paragraph({
            heading: HeadingLevel[`HEADING_${token.depth}`],
            spacing: { before: 240, after: 120, line: 276, lineRule: "auto" },
            children: await createInlineRuns(token.tokens),
          }),
        );
        break;

      case "hr":
        children.push(
          new Paragraph({
            border: {
              bottom: {
                style: BorderStyle.SINGLE,
                size: 2,
                color: "CBD5E1",
              },
            },
            spacing: { before: 180, after: 180 },
          }),
        );
        break;

      case "paragraph":
        children.push(
          new Paragraph({
            spacing: defaultParagraphSpacing,
            children: await createInlineRuns(token.tokens),
          }),
        );
        break;

      case "list":
        for (const item of token.items) {
          children.push(
            new Paragraph({
              spacing: defaultParagraphSpacing,
              numbering: token.ordered
                ? {
                    reference: "ordered-list",
                    level: 0,
                  }
                : undefined,
              bullet: token.ordered
                ? undefined
                : {
                    level: 0,
                  },
              children: await createInlineRuns(item.tokens),
            }),
          );
        }
        break;

      case "blockquote":
        if (token.tokens && token.tokens.length > 0) {
          const quoteChildren = [];
          for (const child of token.tokens) {
            if (child.tokens) {
              quoteChildren.push(...(await createInlineRuns(child.tokens)));
            }
          }
          children.push(
            new Paragraph({
              indent: { left: 360 },
              border: {
                left: {
                  style: BorderStyle.SINGLE,
                  size: 8,
                  color: "94A3B8",
                },
              },
              spacing: defaultParagraphSpacing,
              children: quoteChildren,
            }),
          );
        }
        break;

      case "code":
        (token.text || "")
          .split("\n")
          .forEach((line) =>
            children.push(
              new Paragraph({
                spacing: { before: 60, after: 60, line: 240, lineRule: "auto" },
                shading: { fill: "F8FAFC" },
                children: [
                  new TextRun({
                    text: line.length ? line : " ",
                    font: "Courier New",
                    size: 20,
                  }),
                ],
              }),
            ),
          );
        break;

      case "table":
        children.push(createDocxTable(token));
        break;

      case "image":
        try {
          const source = resolveImageSource(token.href || token.url || token.src || "");
          if (!source) throw new Error("Missing image source");
          const bytes = await fetchImageBytes(source);
          children.push(
            new Paragraph({
              spacing: { before: 120, after: 180, line: 276, lineRule: "auto" },
              children: [
                new ImageRun({
                  data: bytes,
                  transformation: { width: 560, height: 320 },
                  altText: token.text ? { name: token.text } : undefined,
                }),
              ],
            }),
          );
        } catch {
          children.push(
            new Paragraph({
              spacing: defaultParagraphSpacing,
              children: [
                new TextRun({
                  text: `[Image: ${token.href || token.url || token.src || ""}]`,
                  italics: true,
                }),
              ],
            }),
          );
        }
        break;

      case "space":
      default:
        break;
    }
  }

  return children;
}

async function createDocxDocument(markdown) {
  const children = await createDocxSections(markdown);
  return new Document({
    numbering: {
      config: [
        {
          reference: "ordered-list",
          levels: [
            {
              level: 0,
              format: "decimal",
              text: "%1.",
              alignment: "left",
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });
}

export function downloadMarkdownFile(markdown, filename) {
  const blob = new Blob([markdown || ""], { type: "text/markdown;charset=utf-8" });
  downloadBlob(blob, filename);
}

export function downloadTextFile(markdown, filename) {
  const blob = new Blob([markdown || ""], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, filename);
}

export function downloadHtmlFile(markdown, filename) {
  const html = buildHtmlDocument(markdown, filename.replace(/\.[^.]+$/, ""));
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  downloadBlob(blob, filename);
}

export async function downloadDocxFile(markdown, filename) {
  const doc = await createDocxDocument(markdown);
  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, filename);
}

export async function exportMarkdownFile(format, markdown, filenameBase) {
  const base = normalizeFilename(filenameBase || "sharepad");
  switch (format) {
    case "md":
      return downloadMarkdownFile(markdown, `${base}.md`);
    case "txt":
      return downloadTextFile(markdown, `${base}.txt`);
    case "html":
      return downloadHtmlFile(markdown, `${base}.html`);
    case "docx":
      return downloadDocxFile(markdown, `${base}.docx`);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}
