import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/layout/navbar";
import { AppToaster } from "@/components/layout/toaster";
import { generateMetadata } from "@/lib/seo";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata = {
  ...generateMetadata({
    title: "SharePad | Secure Markdown Notes",
    description: "Create secure, shareable markdown pads with optional password protection.",
    path: "/",
  }),
  metadataBase: new URL(process.env.APP_BASE_URL || "http://localhost:3000"),
  keywords: [
    "sharepad",
    "markdown editor",
    "online notepad",
    "secure note sharing",
    "collaborative notes",
  ],
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SharePad",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    url: process.env.APP_BASE_URL || "http://localhost:3000",
    description: "Secure markdown-first shared notes with optional password protection.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">{`
          (() => {
            try {
              const stored = localStorage.getItem("theme");
              const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              const theme = stored === "light" || stored === "dark" ? stored : (systemDark ? "dark" : "light");
              document.documentElement.dataset.theme = theme;
            } catch (_) {}
          })();
        `}</Script>
        <Script id="sharepad-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
        <Navbar />
        <AppToaster />
        <main className="container page">{children}</main>
      </body>
    </html>
  );
}
