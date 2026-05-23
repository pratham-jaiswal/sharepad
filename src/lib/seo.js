import { env } from "@/lib/env";

export function absoluteUrl(path = "/") {
  return `${env.APP_BASE_URL}${path}`;
}

export function generateMetadata({
  title,
  description,
  path = "/",
  image = "/images/sharepad.png",
  noIndex = false,
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "SharePad",
      type: "website",
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
