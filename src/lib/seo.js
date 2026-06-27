import { env } from "@/lib/env";

const baseUrl = env.APP_BASE_URL.replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  const cleanedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanedPath}`;
}

export function generateMetadata({
  title,
  description,
  path = "/",
  image = "/og.png",
  noIndex = false,
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    authors: [{ name: "Pratham Jaiswal", url: baseUrl }],
    creator: "Pratham Jaiswal",
    keywords: [
      "sharepad",
      "markdown editor",
      "online notepad",
      "secure note sharing",
      "collaborative notes",
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: "SharePad",
      type: "website",
      locale: "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
