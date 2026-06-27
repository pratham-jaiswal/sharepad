import { NextResponse } from "next/server";

export function jsonError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  );
}
