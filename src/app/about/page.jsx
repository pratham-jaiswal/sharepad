import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "About SharePad",
  description:
    "SharePad is a secure, markdown-first collaboration notepad with optional password protection and zero-knowledge encryption.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="card prose">
      <h1>About SharePad</h1>

      <section>
        <h2>What is SharePad?</h2>
        <p>
          SharePad is a modern, privacy-first collaboration notepad designed for speed, 
          clarity, and security. Create a markdown pad in seconds, share the link, and 
          start collaborating—no account, no login, no friction.
        </p>
      </section>

      <section>
        <h2>Core Values</h2>
        <p>
          We believe sharing information should be simple and private. SharePad is built on three core principles:
        </p>
        <ul>
          <li><strong>Privacy by Default:</strong> No accounts, no tracking. Every pad expires automatically after 1 year of inactivity.</li>
          <li><strong>Zero-Knowledge Security:</strong> Optional password protection encrypts pad content on your device using industry-standard encryption. We cannot read your content.</li>
          <li><strong>Markdown-First:</strong> Focus on writing. SharePad uses markdown for universal formatting that works anywhere.</li>
        </ul>
      </section>

      <section>
        <h2>How It Works</h2>
        <p>
          Using SharePad is straightforward:
        </p>
        <ol>
          <li>Enter a URL slug (your pad's unique address) and optional password.</li>
          <li>Start writing in markdown.</li>
          <li>Your pad saves automatically.</li>
          <li>Share the link. Anyone with the URL (and password, if set) can view and edit.</li>
          <li>The pad automatically expires 1 year after the last access.</li>
        </ol>
      </section>

      <section>
        <h2>Key Features</h2>
        <ul>
          <li><strong>Autosave:</strong> Your work is saved instantly. No manual saves needed.</li>
          <li><strong>Markdown Editor:</strong> Full markdown support with live preview and a toolbar for quick formatting.</li>
          <li><strong>Password Protection:</strong> Secure pads with optional password-based encryption.</li>
          <li><strong>Client-Side Encryption:</strong> For protected pads, encryption happens on your device. SharePad servers never see plaintext content.</li>
          <li><strong>Theme Support:</strong> Light, dark, and system-aware themes for comfortable reading and writing.</li>
          <li><strong>No Registration:</strong> No email, password, or account needed. Just create and share.</li>
          <li><strong>1-Year Auto-Expiry:</strong> Pads are automatically deleted 1 year after the last access for privacy and storage efficiency.</li>
        </ul>
      </section>

      <section>
        <h2>Who Is It For?</h2>
        <p>
          SharePad is perfect for:
        </p>
        <ul>
          <li>Quick note-sharing with colleagues or friends</li>
          <li>Temporary collaborative documentation</li>
          <li>Sharing sensitive information via password-protected pads</li>
          <li>Developers sharing code snippets or configs</li>
          <li>Teams coordinating meeting notes or brainstorms</li>
          <li>Anyone who values privacy and simplicity over features and complexity</li>
        </ul>
      </section>

      <section>
        <h2>Security &amp; Privacy</h2>
        <p>
          Your privacy matters. Here's what we do:
        </p>
        <ul>
          <li><strong>No Personal Data:</strong> We don't collect your email, IP, or any identifying information.</li>
          <li><strong>Zero-Knowledge Mode:</strong> Protected pads are encrypted with AES-256-GCM on your device. Only you hold the decryption key (derived from your password). Even SharePad administrators cannot read your content.</li>
          <li><strong>HTTP-Only Sessions:</strong> Access to protected pads is managed via secure, HTTP-only cookies. No JavaScript can steal your session.</li>
          <li><strong>Automatic Expiry:</strong> All pads—protected or not—are automatically deleted 1 year after last access.</li>
          <li><strong>No Backups of Your Content:</strong> We don't store backups of pad content. If the server resets, pads are lost. You are responsible for keeping your own backups.</li>
          <li><strong>Rate Limiting:</strong> We rate-limit API requests to prevent abuse and protect platform stability.</li>
        </ul>
      </section>

      <section>
        <h2>Important Disclaimer</h2>
        <p>
          SharePad is provided as-is. While we design for reliability and security, we do not guarantee 
          uptime, data permanence, or that content will never be lost. You are solely responsible for 
          maintaining backups of important content. If you lose your pad password, your encrypted content 
          cannot be recovered.
        </p>
      </section>

      <section>
        <h2>About the Creator</h2>
        <p>
          SharePad was created by <strong>Pratham Jaiswal</strong> as a modern, privacy-focused collaboration tool. 
          The project is open-source and continuously improved based on user feedback and evolving security best practices.
        </p>
        <p>
          Have questions, ideas, or found a bug? <a href="/contact" className="inline-link">Get in touch</a>.
        </p>
      </section>
    </article>
  );
}
