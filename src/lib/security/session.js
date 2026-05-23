import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { requireEnv } from "@/lib/env";

function cookieNameForSlug(slug) {
  return `sharepad_access_${slug}`;
}

export function signPadAccessToken(slug) {
  return jwt.sign({ slug }, requireEnv("JWT_SECRET"), {
    expiresIn: "12h",
  });
}

export async function setPadAccessCookie(slug) {
  const token = signPadAccessToken(slug);

  const cookieStore = await cookies();

  cookieStore.set(cookieNameForSlug(slug), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12,
    path: "/",
  });
}

export async function clearPadAccessCookie(slug) {
  const cookieStore = await cookies();

  cookieStore.set(cookieNameForSlug(slug), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export async function hasPadAccess(slug) {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieNameForSlug(slug))?.value;

  if (!token) return false;

  try {
    const decoded = jwt.verify(token, requireEnv("JWT_SECRET"));
    return decoded.slug === slug;
  } catch {
    return false;
  }
}