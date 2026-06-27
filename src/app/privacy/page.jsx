import Link from "next/link";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Privacy Policy | SharePad",
  description:
    "SharePad privacy policy describing what data is collected, how it is used, and how protected pads work.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="card prose">
      <h1>Privacy Policy</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy explains how SharePad collects, uses, and protects
          information when you use the service. By using SharePad, you
          acknowledge the practices described in this Privacy Policy.
        </p>
        <p>
          SharePad is designed to minimize data collection and protect your
          content. We do not require user accounts, and we do not use analytics
          or advertising tools to track your browsing behavior.
        </p>
      </section>

      <section>
        <h2>2. Who We Are</h2>
        <p>
          In this Privacy Policy, "SharePad", "we", "our", and "us" refer to the
          operator of SharePad.
        </p>
      </section>

      <section>
        <h2>3. Information We Collect</h2>

        <p>
          The only personal information SharePad intentionally collects is the
          information you voluntarily provide through the contact form, such as
          your name, email address, and message.
        </p>

        <p>
          Contact form submissions are used only to respond to your inquiry.
          They are sent through an email delivery service and are not used for
          advertising, analytics, or user profiling.
        </p>

        <p>
          Like most websites, our hosting provider may temporarily process
          technical information such as IP addresses in server logs for
          security, troubleshooting, and abuse prevention. We do not use this
          information to identify users or build profiles.
        </p>
      </section>

      <section>
        <h2>4. Theme Preferences</h2>

        <p>
          SharePad stores your selected theme preference locally in your browser
          so it can remember your preferred appearance between visits. This
          information never leaves your device.
        </p>
      </section>

      <section>
        <h2>5. Protected Pads and Session Cookies</h2>

        <p>
          Protected pads use HTTP-only session cookies to keep you authenticated
          after unlocking a pad. These cookies cannot be accessed by JavaScript
          and are used solely for authentication.
        </p>

        <p>
          For password-protected pads, content is encrypted in your browser
          before it is sent to the server. The server stores only encrypted
          content and cannot decrypt it without the correct password. Your
          password is never stored in plaintext and is never used by our servers
          to decrypt your content.
        </p>
      </section>

      <section>
        <h2>6. Pad Content and Retention</h2>

        <p>
          SharePad stores pad content so it can be shared and loaded. Public
          pads are accessible to anyone with the link, while password-protected
          pads store only encrypted content.
        </p>

        <p>
          Pads are automatically deleted after the configured inactivity period
          since their last access. Although we make reasonable efforts to
          preserve data during that period, SharePad should not be relied upon
          as your sole backup.
        </p>
      </section>

      <section>
        <h2>7. Third-Party Services</h2>

        <p>
          SharePad relies on third-party infrastructure providers, such as
          hosting and email delivery services, to operate the service. These
          providers process only the information necessary to provide their
          services.
        </p>

        <p>
          SharePad does not use third-party analytics or advertising services.
        </p>
      </section>

      <section>
        <h2>8. Your Choices</h2>

        <p>
          You may stop using SharePad at any time. For password-protected pads,
          you can end your authenticated session by locking the pad or clearing
          your browser cookies.
        </p>
      </section>

      <section>
        <h2>9. Changes to This Privacy Policy</h2>

        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and the "Last Updated" date below will be
          revised accordingly. Your continued use of SharePad after any changes
          become effective constitutes your acceptance of the updated Privacy
          Policy.
        </p>
      </section>

      <section>
        <h2>10. Contact Us</h2>

        <p>
          If you have questions about this Privacy Policy or SharePad's privacy
          practices, please use the{" "}
          <Link href="/contact" className="inline-link">
            contact page
          </Link>
          .
        </p>
      </section>

      <p
        style={{
          marginTop: "2rem",
          color: "var(--text-soft)",
          fontSize: "0.9rem",
        }}
      >
        <strong>Last Updated:</strong> June 27, 2026
      </p>
    </article>
  );
}
