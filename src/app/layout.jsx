import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { cookies } from "next/headers";
import { Navbar } from "@/components/layout/navbar";
import { AppToaster } from "@/components/layout/toaster";
import { generateMetadata } from "@/lib/seo";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  ...generateMetadata({
    title: "SharePad | Secure Markdown Notes",
    description:
      "Create secure, shareable markdown pads with optional password protection.",
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

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const storedTheme = cookieStore.get("sharepad_theme")?.value;
  const ssrTheme =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SharePad",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    url: process.env.APP_BASE_URL || "http://localhost:3000",
    description:
      "Secure markdown-first shared notes with optional password protection.",
  };

  return (
    <html lang="en" data-theme={ssrTheme} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${grotesk.variable}`}
        suppressHydrationWarning
      >
        <Script id="theme-init" strategy="beforeInteractive">{`
          (() => {
            try {
              const stored = localStorage.getItem("theme");
              const cookieTheme = document.cookie
                .split("; ")
                .find((c) => c.startsWith("sharepad_theme="))
                ?.split("=")[1];
              const preferred = stored || cookieTheme || "system";
              const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              const theme = preferred === "light" || preferred === "dark"
                ? preferred
                : (systemDark ? "dark" : "light");
              document.documentElement.dataset.theme = theme;
            } catch (_) {}
          })();
        `}</Script>
        <Script
          id="sharepad-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
        <a
          href="https://www.patreon.com/collection/1819237"
          target="_blank"
          rel="noopener"
          id="floating-patreon-btn"
          area-label="Support Me on Patreon"
        >
          <img
            width="20px"
            src="https://res.cloudinary.com/dhzmockpa/image/upload/v1745674680/PATREON_SYMBOL_1_BLACK_RGB_trsdty.svg"
            alt="Support Me on Patreon"
          />
        </a>
        <Navbar />
        <AppToaster />
        <main className="container page">{children}</main>
        <footer>
          <p className="footer-main">
            <span>© 2023–{new Date().getFullYear()} SharePad</span>

            <span className="footer-builtby">
              Built by Pratham Jaiswal (MaxxDevs)
            </span>
          </p>

          <p>Share, edit, repeat.</p>
        </footer>
      </body>
    </html>
  );
}
