import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Terms and Acceptable Use | SharePad",
  description: "Terms of service and acceptable use policy for SharePad.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="card prose">
      <h1>Terms of Service and Acceptable Use</h1>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          In these Terms, "SharePad", "we", "our", and "us" refer to the
          operator of the SharePad service.
        </p>

        <p>
          By accessing and using SharePad, you agree to be bound by these Terms
          of Service. If you do not agree to these terms, you must not use
          SharePad. We reserve the right to modify these terms at any time.
          Continued use after modification constitutes your acceptance of the
          updated terms.
        </p>
      </section>

      <section>
        <h2>2. Service Description</h2>
        <p>
          SharePad is a web-based markdown collaboration notepad service. We
          provide the platform and infrastructure to create, edit, and share
          markdown content. The service is provided on an "as-is" basis without
          guarantees of uptime, reliability, or permanence.
        </p>
      </section>

      <section>
        <h2>3. Eligibility</h2>
        <p>
          You must be at least 13 years old to use SharePad. By using this
          service, you represent and warrant that you have the legal right and
          ability to enter into this agreement.
        </p>
      </section>

      <section>
        <h2>4. Acceptable Use</h2>
        <p>
          You agree to use SharePad only for lawful purposes and in compliance
          with all applicable laws, rules, and regulations. You specifically
          agree not to:
        </p>
        <ul>
          <li>
            Upload, store, or share content that is illegal, threatening,
            abusive, defamatory, obscene, or invasive of privacy.
          </li>
          <li>
            Engage in harassment, hate speech, or discrimination based on race,
            ethnicity, gender, religion, disability, sexual orientation, or any
            protected characteristic.
          </li>
          <li>
            Impersonate any person or entity or falsely claim affiliation with
            another individual or organization.
          </li>
          <li>
            Distribute viruses, malware, ransomware, or any other malicious code
            or software.
          </li>
          <li>
            Attempt to gain unauthorized access to SharePad systems, other user
            accounts, or any part of the platform.
          </li>
          <li>
            Interfere with the security, functionality, or operation of
            SharePad.
          </li>
          <li>
            Engage in data scraping, automated crawling, or unauthorized data
            collection.
          </li>
          <li>
            Use SharePad for phishing, spam, or mass unsolicited communications.
          </li>
          <li>
            Engage in activities that violate intellectual property rights
            (copyright, trademark, patent) of others.
          </li>
          <li>
            Use the service to facilitate gambling, illegal transactions, or
            money laundering.
          </li>
        </ul>
        <p>
          We reserve the right to suspend or terminate your access to SharePad
          at any time, without notice, if we determine that you have violated
          these terms or engaged in harmful, illegal, or abusive behavior.
        </p>
      </section>

      <section>
        <h2>5. Content Responsibility</h2>
        <p>
          You are solely responsible for all content you create, upload, or
          share using SharePad. You grant SharePad a limited license to store
          and serve your content for the purposes of providing the service.
        </p>
        <p>You warrant that:</p>
        <ul>
          <li>You own or have permission to use all content you upload.</li>
          <li>Your content does not violate any laws or these terms.</li>
          <li>
            You have obtained all necessary rights and permissions from third
            parties (e.g., for images, quotes, or data).
          </li>
        </ul>
        <p>
          We are not responsible for the accuracy, quality, legality, or
          reliability of your content.
        </p>
      </section>

      <section>
        <h2>6. Moderation and Enforcement</h2>
        <p>
          We may investigate reports of abuse, monitor service usage, and review
          publicly accessible content to protect SharePad and its users. Because
          password-protected pads are encrypted in your browser, we cannot
          inspect their plaintext contents. We may:
        </p>
        <ul>
          <li>
            Remove or disable access to content that violates these Terms.
          </li>
          <li>
            Block or restrict access for users engaging in repeated abuse or
            malicious activity.
          </li>
          <li>
            Cooperate with law enforcement where required by applicable law.
          </li>
          <li>
            Apply rate limits or other technical measures to protect service
            stability and prevent abuse.
          </li>
        </ul>
        <p>
          We are not obligated to pre-screen content or provide notice before
          taking enforcement action. We reserve the right to determine, in our
          reasonable discretion, whether content or conduct violates these
          Terms.
        </p>
      </section>

      <section>
        <h2>7. Privacy and Data Protection</h2>
        <p>
          <strong>Personal Data:</strong> SharePad does not require user
          accounts or intentionally collect personal information during normal
          use of the service. If you contact us through the contact form, we
          collect the information you provide (such as your name, email address,
          and message) solely to respond to your inquiry.
        </p>
        <p>
          <strong>Pad Content Storage:</strong> Pad content is stored on our
          servers for the duration that the pad is active. Public pads may be
          visible to anyone with the URL. Protected pads are encrypted on your
          device (client-side), and only you can decrypt the content.
        </p>
        <p>
          <strong>Server and Administrator Access:</strong> For public pads,
          server administrators may access content for maintenance, security, or
          compliance reasons. For protected pads encrypted with your password,
          administrators cannot read your content even if they access the
          database.
        </p>
        <p>
          <strong>Automatic Expiry:</strong> All pads are automatically deleted
          after the configured inactivity period since their last access. You
          are not responsible for manually deleting content—we handle this
          automatically.
        </p>
        <p>
          <strong>No Data Portability:</strong> We do not provide backups or
          export tools for pads. If you want to keep your content, you are
          responsible for maintaining your own copy. If the service experiences
          data loss or server failure, your pads may be permanently lost.
        </p>
        <p>
          <strong>Cookies and Sessions:</strong> We use HTTP-only cookies to
          manage sessions for protected pads. These cookies are not accessible
          to JavaScript and are used only for authentication purposes. You can
          clear cookies to end your session at any time.
        </p>
      </section>

      <section>
        <h2>8. Protected Pad Security</h2>
        <p>
          Protected pads use password-based encryption to secure content.
          Important information:
        </p>
        <ul>
          <li>
            <strong>Single Password Model:</strong> The pad password serves both
            as the access key and the encryption key derivation source.
          </li>
          <li>
            <strong>Client-Side Encryption:</strong> Encryption and decryption
            happen entirely in your browser. The plaintext content never leaves
            your device during encryption operations.
          </li>
          <li>
            <strong>Key Derivation:</strong> Your password is processed through
            PBKDF2 (key derivation function) to create an encryption key. Only
            this derived key is used for AES-256-GCM encryption.
          </li>
          <li>
            <strong>No Password Recovery:</strong> If you forget your password,
            your encrypted content cannot be recovered. There is no "forgot
            password" mechanism.
          </li>
          <li>
            <strong>Session Management:</strong> Access to protected pads is
            managed via HTTP-only session cookies. These cookies are
            automatically cleared when you close the tab (on browser close) or
            manually lock the pad.
          </li>
          <li>
            <strong>Your Responsibility:</strong> You are responsible for
            protecting your pad password. Do not share it with untrusted
            parties. SharePad does not store or transmit your plaintext
            password—only a hashed verifier for authentication.
          </li>
        </ul>
      </section>

      <section>
        <h2>9. Disclaimer of Warranties</h2>
        <p>
          SHAREPAD IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY
          WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
        </p>
        <ul>
          <li>
            Warranties of merchantability, fitness for a particular purpose, or
            non-infringement.
          </li>
          <li>
            Warranties regarding uptime, availability, reliability, or
            performance.
          </li>
          <li>
            Warranties that the service will be error-free, secure, or
            uninterrupted.
          </li>
          <li>Warranties that defects or issues will be corrected.</li>
        </ul>
        <p>
          You use SharePad at your own risk. We make no guarantee that the
          service will remain available, that your content will always be
          accessible or preserved, or that the service will meet your specific
          requirements.
        </p>
      </section>

      <section>
        <h2>10. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHAREPAD AND ITS OPERATORS
          SHALL NOT BE LIABLE FOR:
        </p>
        <ul>
          <li>Loss or corruption of data or content.</li>
          <li>Service interruptions, downtime, or unavailability.</li>
          <li>Unauthorized access to or alteration of your content.</li>
          <li>
            Consequences arising from your loss of password or failure to
            maintain secure access.
          </li>
          <li>
            Any indirect, incidental, special, consequential, or punitive
            damages.
          </li>
          <li>Loss of profits, revenue, data, or business opportunities.</li>
        </ul>
        <p>
          IN NO EVENT SHALL SHAREPAD'S TOTAL LIABILITY EXCEED $0 (ZERO DOLLARS).
          SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS ON LIABILITY, SO THIS
          RESTRICTION MAY NOT APPLY TO YOU.
        </p>
      </section>

      <section>
        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless SharePad, its
          operators, and its service providers from any claims, damages, losses,
          or expenses (including attorney's fees) arising from:
        </p>
        <ul>
          <li>Your use or misuse of SharePad.</li>
          <li>Your violation of these terms.</li>
          <li>Your violation of any applicable laws or regulations.</li>
          <li>Your content or the consequences of your content.</li>
          <li>Your use of features or services related to SharePad.</li>
        </ul>
      </section>

      <section>
        <h2>12. Third-Party Services</h2>
        <p>
          SharePad may use third-party service providers, including providers
          for hosting, email delivery, and technical monitoring, to operate,
          secure, and improve the service. These providers process only the
          information necessary to perform their services.
        </p>
        <p>
          SharePad does not use advertising services or behavioral analytics for
          user profiling or targeted advertising.
        </p>
      </section>

      <section>
        <h2>13. Intellectual Property</h2>
        <p>
          These Terms govern your use of the hosted SharePad service. The
          SharePad application and its source code are licensed separately under
          the GNU Affero General Public License v3.0 (AGPL-3.0). Under that
          license, the source code may be copied, modified, and redistributed as
          long as the terms of AGPL-3.0 are followed.
        </p>
        <p>
          Your right to use the hosted service is subject to these Terms. If you
          wish to obtain a license permitting uses not allowed under the
          AGPL-3.0 (for example, private proprietary deployments), please
          contact the maintainer regarding commercial licensing options.
        </p>
        <p>
          Your content remains your own intellectual property, and you retain
          all rights to it. By uploading content to SharePad, you grant us a
          license to store, serve, and display your content to authorized users.
        </p>
      </section>

      <section>
        <h2>14. Rate Limiting and Service Restrictions</h2>
        <p>
          We may impose rate limits on API requests, pad creation, or other
          operations to protect service stability and prevent abuse. Users who
          exceed rate limits may be temporarily or permanently blocked from
          accessing SharePad.
        </p>
      </section>

      <section>
        <h2>15. Governing Law and Jurisdiction</h2>
        <p>
          These Terms of Service are governed by and construed in accordance
          with the laws of India, without regard to its conflict of law
          principles. Any dispute arising out of or relating to these Terms or
          the use of SharePad shall be subject to the exclusive jurisdiction of
          the courts located in Kolkata, West Bengal, India.
        </p>
      </section>

      <section>
        <h2>16. Changes to Terms</h2>
        <p>
          We may update these Terms of Service at any time, in our sole
          discretion. Changes will be posted on this page, and the "Last
          Updated" date will be revised accordingly. Continued use of SharePad
          after the updated Terms become effective constitutes your acceptance
          of the revised Terms.
        </p>
      </section>

      <section>
        <h2>17. Contact Us</h2>
        <p>
          If you have questions about these terms, concerns about your use of
          SharePad, or wish to report abuse, please{" "}
          <a href="/contact" className="inline-link">
            contact us
          </a>
          .
        </p>
      </section>

      <section>
        <h2>18. Severability</h2>
        <p>
          If any provision of these Terms of Service is found to be invalid,
          illegal, or unenforceable, that provision shall be modified to the
          minimum extent necessary to make it valid, or if such modification is
          not possible, it shall be severed. All other provisions shall remain
          in full force and effect.
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
