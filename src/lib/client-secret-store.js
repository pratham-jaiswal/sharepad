"use client";

const memoryStore = new Map();

function getGlobalStore() {
  if (typeof window === "undefined") return memoryStore;
  const key = "__sharepadSecretStore";
  if (!window[key]) window[key] = new Map();
  return window[key];
}

export function setPadSecret(slug, secret) {
  getGlobalStore().set(slug, secret);
}

export function getPadSecret(slug) {
  return getGlobalStore().get(slug) || null;
}

export function clearPadSecret(slug) {
  getGlobalStore().delete(slug);
}
