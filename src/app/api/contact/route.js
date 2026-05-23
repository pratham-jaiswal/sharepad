import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation/contact";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { env, requireEnv } from "@/lib/env";
import { getClientIp, jsonError } from "@/lib/http";

async function sendWithResend(data) {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) return;

  const resend = new Resend(requireEnv("RESEND_API_KEY"));
  const { error } = await resend.emails.send({
    from: "SharePad Contact <contact@prathamjaiswal.com>",
    to: [requireEnv("CONTACT_TO_EMAIL")],
    replyTo: data.email,
    template: {
      id: "sharepad-contact",

      variables: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    },
  });

  if (error) {
    throw new Error(error.message || "Failed to send contact email.");
  }
}

export async function POST(request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`contact:${ip}`, { limit: 8, windowMs: 60_000 });
  if (!rate.allowed)
    return jsonError("Too many requests. Please try later.", 429);

  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return jsonError("Invalid contact form data.", 400);

  if (parsed.data.website) return jsonError("Spam detected.", 400);

  try {
    await sendWithResend(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact send failed:", error);
    return jsonError(
      "Unable to send message right now. Please try again later.",
      502,
    );
  }
}
