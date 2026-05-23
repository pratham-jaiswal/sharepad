const store = new Map();

export function checkRateLimit(key, { limit = 20, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const item = store.get(key);

  if (!item || now > item.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (item.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterMs: item.resetAt - now };
  }

  item.count += 1;
  store.set(key, item);
  return { allowed: true, remaining: limit - item.count };
}
