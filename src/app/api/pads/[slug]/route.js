import { NextResponse } from "next/server";
import {
  getPad,
  touchPadAccess,
  updatePadContent,
  updatePadEncryptedContent,
} from "@/features/pads/service";
import { updatePadSchema } from "@/lib/validation/pads";
import { hasPadAccess } from "@/lib/security/session";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getClientIp, jsonError } from "@/lib/http";

function serializePad(pad) {
  const protectedPad = Boolean(pad.passwordHash);
  return {
    slug: pad.slug,
    markdown: protectedPad ? "" : pad.contentMarkdown || "",
    encryptedPayload: protectedPad ? pad.encryptedPayload || null : null,
    expiresAt: pad.expiresAt,
    updatedAt: pad.updatedAt,
    passwordProtected: protectedPad,
  };
}

export async function GET(_request, { params }) {
  const { slug } = await params;
  const pad = await getPad(slug);
  if (!pad) return jsonError("Pad not found.", 404);

  if (pad.passwordHash) {
    const allowed = await hasPadAccess(slug);
    if (!allowed) return jsonError("Unauthorized", 401);
  }

  const touched = await touchPadAccess(slug);
  return NextResponse.json(serializePad(touched));
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  const ip = getClientIp(request);
  const rate = checkRateLimit(`update:${slug}:${ip}`, { limit: 80, windowMs: 60_000 });
  if (!rate.allowed) return jsonError("Too many updates. Slow down.", 429);

  const pad = await getPad(slug);
  if (!pad) return jsonError("Pad not found.", 404);

  if (pad.passwordHash) {
    const allowed = await hasPadAccess(slug);
    if (!allowed) return jsonError("Unauthorized", 401);
  }

  const payload = await request.json().catch(() => null);
  const parsed = updatePadSchema.safeParse(payload);
  if (!parsed.success) return jsonError("Invalid markdown payload.", 400);

  let updated;
  if (pad.passwordHash) {
    if (!parsed.data.encryptedPayload) {
      return jsonError("Encrypted payload required for protected pads.", 400);
    }
    updated = await updatePadEncryptedContent(slug, parsed.data.encryptedPayload);
  } else {
    if (typeof parsed.data.markdown !== "string") {
      return jsonError("Markdown payload required.", 400);
    }
    updated = await updatePadContent(slug, parsed.data.markdown);
  }
  return NextResponse.json(serializePad(updated));
}
