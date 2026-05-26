import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/db";
import { markdownToSafeHtml } from "@/lib/markdown";
import { Pad } from "@/features/pads/model";

const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

function nextExpiry() {
  return new Date(Date.now() + YEAR_MS);
}

async function ensurePadContentShape(pad) {
  if (!pad) return pad;
  if (typeof pad.contentMarkdown === "string") return pad;

  const legacy = typeof pad.content === "string" ? pad.content : "";
  pad.contentMarkdown = legacy;
  pad.contentHtmlCache = markdownToSafeHtml(legacy);
  await pad.save();
  return pad;
}

export async function createPad({ slug, password }) {
  await connectDb();
  const existing = await Pad.findOne({ slug }).lean();
  if (existing) return { error: "Pad already exists." };

  const passwordHash = password ? await bcrypt.hash(password, 10) : null;
  const pad = await Pad.create({
    slug,
    contentMarkdown: "",
    contentHtmlCache: "",
    passwordHash,
    lastAccessedAt: new Date(),
    expiresAt: nextExpiry(),
  });

  return { pad };
}

export async function getPad(slug) {
  await connectDb();
  const pad = await Pad.findOne({ slug });
  return ensurePadContentShape(pad);
}

export async function touchPadAccess(slug) {
  const pad = await Pad.findOneAndUpdate(
    { slug },
    { lastAccessedAt: new Date(), expiresAt: nextExpiry() },
    { returnDocument: "after" },
  );
  return ensurePadContentShape(pad);
}

export async function updatePadContent(slug, markdown) {
  const safeHtml = markdownToSafeHtml(markdown);
  return Pad.findOneAndUpdate(
    { slug },
    {
      contentMarkdown: markdown,
      contentHtmlCache: safeHtml,
      lastAccessedAt: new Date(),
      expiresAt: nextExpiry(),
    },
    { returnDocument: "after" },
  );
}

export async function updatePadEncryptedContent(slug, encryptedPayload) {
  return Pad.findOneAndUpdate(
    { slug },
    {
      $set: {
        encryptedPayload,
        contentMarkdown: "",
        contentHtmlCache: "",
        lastAccessedAt: new Date(),
        expiresAt: nextExpiry(),
      },
    },
    { returnDocument: "after" },
  );
}

export async function verifyPadPassword(pad, password) {
  if (!pad.passwordHash) return true;
  return bcrypt.compare(password, pad.passwordHash);
}
