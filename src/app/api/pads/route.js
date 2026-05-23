import { NextResponse } from "next/server";
import { createPad } from "@/features/pads/service";
import { createPadSchema } from "@/lib/validation/pads";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getClientIp, jsonError } from "@/lib/http";
import { isReservedSlug } from "@/lib/reserved-slugs";

export async function POST(request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`create:${ip}`, { limit: 12, windowMs: 60_000 });
  if (!rate.allowed)
    return jsonError("Too many requests. Try again soon.", 429);

  const payload = await request.json().catch(() => null);
  const parsed = createPadSchema.safeParse(payload);
  if (!parsed.success) return jsonError("Invalid pad input.", 400);

  const { slug, password } = parsed.data;
  if (isReservedSlug(slug))
    return jsonError("That pad ID is reserved. Choose a different one.", 400);
  const result = await createPad({ slug, password: password || "" });
  if (result.error) return jsonError(result.error, 409);

  return NextResponse.json({
    slug: result.pad.slug,
    passwordProtected: Boolean(result.pad.passwordHash),
  });
}
