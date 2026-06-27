import { absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, priority: 0.8 },
    { url: absoluteUrl("/terms"), lastModified: now, priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, priority: 0.8 },
  ];
}
