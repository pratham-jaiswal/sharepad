import Link from "next/link";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "About | SharePad",
  description:
    "Learn about SharePad, a privacy-first, markdown-first collaboration notepad with optional password-protected encryption.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="card prose">
      <h1>About SharePad</h1>

      <section>
        <h2>What is SharePad?</h2>

        <p>
          SharePad is a privacy-first, markdown-first collaboration notepad
          designed to make sharing notes as simple as sharing a link. Create a
          pad in seconds, write in Markdown, and collaborate without creating an
          account or signing in.
        </p>

        <p>
          Whether you're sharing documentation, meeting notes, code snippets, or
          temporary information, SharePad aims to provide a fast, lightweight,
          and secure experience with minimal friction.
        </p>
      </section>

      <section>
        <h2>Core Principles</h2>

        <p>SharePad is built around three guiding principles:</p>

        <ul>
          <li>
            <strong>Privacy First:</strong> No user accounts, no advertising,
            and no behavioral analytics. Limited technical monitoring is used
            solely to detect errors, improve reliability, and maintain the
            service.
          </li>

          <li>
            <strong>Security by Design:</strong> Password-protected pads are
            encrypted in your browser before being uploaded, allowing only
            someone with the correct password to read the content.
          </li>

          <li>
            <strong>Simplicity:</strong> Open a pad, start writing, and share
            the link. No installation, registration, or unnecessary features.
          </li>
        </ul>
      </section>

      <section>
        <h2>How It Works</h2>

        <ol>
          <li>
            Choose a unique URL slug (the address of your pad) and optionally
            protect it with a password.
          </li>

          <li>Create or edit your content using Markdown.</li>

          <li>Your changes are saved automatically.</li>

          <li>
            Share the link with others. Anyone with the URL can access the pad.
            If a password is set, the correct password is also required.
          </li>

          <li>
            Pads automatically expire after the configured inactivity period
            since their last access to help reduce unused data.
          </li>
        </ol>
      </section>

      <section>
        <h2>Features</h2>

        <ul>
          <li>
            <strong>Automatic Saving:</strong> Changes are saved automatically
            while you work.
          </li>

          <li>
            <strong>Markdown Editor:</strong> Write using familiar Markdown with
            live preview and formatting tools.
          </li>

          <li>
            <strong>Password Protection:</strong> Secure sensitive pads with an
            optional password.
          </li>

          <li>
            <strong>Client-Side Encryption:</strong> For password-protected
            pads, encryption takes place entirely in your browser before data is
            uploaded.
          </li>

          <li>
            <strong>Multiple Themes:</strong> Choose between light, dark, or
            system themes.
          </li>

          <li>
            <strong>No Registration:</strong> Start collaborating immediately
            without creating an account.
          </li>

          <li>
            <strong>Automatic Expiry:</strong> Pads are automatically removed
            after the configured inactivity period since their last access.
          </li>
        </ul>
      </section>

      <section>
        <h2>Privacy &amp; Security</h2>

        <p>Protecting your privacy is one of SharePad's primary goals.</p>

        <ul>
          <li>
            <strong>Minimal Data Collection:</strong> SharePad does not require
            user accounts. During normal use, we do not collect personal
            information beyond what is necessary to operate the service. If you
            contact us, we collect only the information you voluntarily provide
            to respond to your inquiry.
          </li>

          <li>
            <strong>Password-Protected Encryption:</strong> Protected pads are
            encrypted before they leave your device. Without the correct
            password, neither SharePad nor anyone with access to the server can
            read their contents.
          </li>

          <li>
            <strong>HTTP-Only Sessions:</strong> Protected pad access uses
            HTTP-only session cookies, helping protect authentication cookies
            from being accessed by client-side JavaScript.
          </li>

          <li>
            <strong>Automatic Expiry:</strong> Every pad is automatically
            deleted after the configured inactivity period since their last
            access.
          </li>

          <li>
            <strong>No Built-in Backups:</strong> SharePad should not be used as
            your only copy of important information. Maintain your own backups
            for content you cannot afford to lose.
          </li>

          <li>
            <strong>Abuse Protection:</strong> Rate limiting and other technical
            safeguards help protect the platform from abuse and maintain service
            stability.
          </li>
        </ul>

        <p>
          For complete details, please read our{" "}
          <Link href="/privacy" className="inline-link">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="inline-link">
            Terms of Service
          </Link>
          .
        </p>
      </section>

      <section>
        <h2>Open Source</h2>

        <p>
          SharePad is open source and licensed under the GNU Affero General
          Public License v3.0 (AGPL-3.0-only). You are welcome to inspect the
          source code, report issues, suggest improvements, and contribute to
          the project.
        </p>

        <p>
          Learn more on the{" "}
          <Link href="/source-code" className="inline-link">
            Source Code
          </Link>{" "}
          page.
        </p>
      </section>

      <section>
        <h2>Important Notice</h2>

        <p>
          SharePad is provided on an "as is" and "as available" basis. Although
          we strive to provide a reliable and secure service, we cannot
          guarantee uninterrupted availability or permanent data retention. You
          are responsible for keeping backups of important information.
          Additionally, if you forget the password for an encrypted pad, its
          contents cannot be recovered.
        </p>
      </section>

      <section>
        <h2>About the Creator</h2>

        <p>
          SharePad was created by <strong>Pratham Jaiswal</strong> as a modern,
          privacy-focused collaboration tool. The project continues to evolve
          through community feedback, open-source contributions, and ongoing
          improvements.
        </p>

        <p>
          SharePad is developed and maintained in my spare time and is free to
          use. If you find the project useful and would like to support its
          continued development, please consider supporting it through{" "}
          <a
            href="https://www.patreon.com/collection/1819237"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patreon
          </a>
          .
        </p>

        <p>
          Have a question, found a bug, or want to suggest a feature? Visit the{" "}
          <Link href="/contact" className="inline-link">
            Contact
          </Link>{" "}
          page.
        </p>
      </section>
    </article>
  );
}
