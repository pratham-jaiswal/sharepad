import { NextResponse } from "next/server";
import { getPad, verifyPadPassword, touchPadAccess } from "@/features/pads/service";
import { setPadAccessCookie } from "@/lib/security/session";
import { unlockPadSchema } from "@/lib/validation/pads";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getClientIp, jsonError } from "@/lib/http";

export async function POST(request, { params }) {
  const { slug } = await params;
  const ip = getClientIp(request);
  const rate = checkRateLimit(`unlock:${slug}:${ip}`, { limit: 15, windowMs: 60_000 });
  if (!rate.allowed) return jsonError("Too many attempts. Try again later.", 429);

  const pad = await getPad(slug);
  if (!pad) return jsonError("Pad not found.", 404);
  if (!pad.passwordHash) return NextResponse.json({ ok: true, requiresPassword: false });

  const payload = await request.json().catch(() => null);
  const parsed = unlockPadSchema.safeParse(payload);
  if (!parsed.success) return jsonError("Password is required.", 400);

  const ok = await verifyPadPassword(pad, parsed.data.password);
  if (!ok) return jsonError("Incorrect password.", 401);

  await setPadAccessCookie(slug);
  await touchPadAccess(slug);
  return NextResponse.json({ ok: true, requiresPassword: true });
}
