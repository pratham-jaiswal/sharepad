import { NextResponse } from "next/server";
import { clearPadAccessCookie } from "@/lib/security/session";

export async function POST(_request, { params }) {
  const { slug } = await params;
  await clearPadAccessCookie(slug);
  return NextResponse.json({ ok: true });
}
