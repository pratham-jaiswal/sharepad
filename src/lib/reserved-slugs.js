const RESERVED_SLUGS = [
  "about",
  "terms",
  "contact",
  "api",
  "_next",
  "robots",
  "sitemap",
  "manifest",
  "icon",
  "apple-icon",
  "favicon",
  "sw",
];

export function isReservedSlug(slug) {
  return RESERVED_SLUGS.includes((slug || "").toLowerCase());
}
