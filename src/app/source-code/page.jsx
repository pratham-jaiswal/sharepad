import Link from "next/link";
import { generateMetadata } from "@/lib/seo";

const REPO_URL = "https://github.com/pratham-jaiswal/sharepad";
const CONTRIBUTING_URL = `${REPO_URL}/blob/main/CONTRIBUTING.md`;
const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;

export const metadata = generateMetadata({
  title: "Source Code and Contribution | SharePad",
  description:
    "Explore the SharePad source code, contribution guidelines, and licensing information.",
  path: "/source-code",
});

export default function SourceCodePage() {
  return (
    <article className="card prose">
      <h1>Source Code &amp; Contribution</h1>
      <section>
        <h2>1. Open Source</h2>

        <p>
          SharePad is an open-source project. Everyone is welcome to inspect the
          source code, report bugs, suggest improvements, and contribute to its
          development.
        </p>

        <p>The source code is hosted on GitHub:</p>

        <p>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            View the SharePad repository on GitHub
          </a>
        </p>
      </section>
      <section>
        <h2>2. Contributing</h2>

        <p>
          Contributions of all sizes are appreciated, whether you're fixing a
          bug, improving documentation, suggesting new features, or submitting
          code.
        </p>

        <p>Before contributing, we recommend that you:</p>

        <ul>
          <li>Search existing issues before creating a new one.</li>
          <li>
            Open an issue for larger changes to discuss the proposed solution.
          </li>
          <li>
            Fork the repository and create a descriptive branch for your work.
          </li>
          <li>
            Follow the project's coding standards and contribution guidelines.
          </li>
        </ul>

        <p>
          For complete contribution instructions, see the repository's
          documentation:
        </p>

        <p>
          <a href={CONTRIBUTING_URL} target="_blank" rel="noopener noreferrer">
            Read the Contribution Guide
          </a>
        </p>
      </section>

      <section id="license">
        <h2>3. License</h2>

        <p>
          The SharePad source code is licensed under the{" "}
          <strong>
            GNU Affero General Public License v3.0 (AGPL-3.0-only)
          </strong>
          .
        </p>

        <p>
          Under the AGPL-3.0 license, you may use, study, modify, and
          redistribute the software provided you comply with the license terms,
          including the requirements that apply when offering modified versions
          over a network.
        </p>

        <p>
          Organizations or individuals who wish to use, modify, or self-host
          SharePad without the obligations of the AGPL-3.0 license—for example,
          for proprietary internal deployments or commercial products—may
          contact the maintainer to discuss commercial licensing options.
        </p>

        <p>
          Use of the hosted SharePad service is governed separately by the{" "}
          <Link href="/terms" className="inline-link">
            Terms of Service
          </Link>
          .
        </p>

        <p>
          <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">
            View the LICENSE file
          </a>
        </p>
      </section>

      <section>
        <h2>4. Reporting Issues</h2>

        <p>
          If you discover a bug, encounter unexpected behavior, or have a
          feature request, please open an issue on GitHub. Providing clear
          reproduction steps, screenshots, or relevant details helps us resolve
          issues more quickly.
        </p>
      </section>
      <section>
        <h2>5. Related Pages</h2>

        <ul>
          <li>
            <Link href="/about">About SharePad</Link>
          </li>

          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>

          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>

          <li>
            <Link href="/source-code#license">License Information</Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Support the Project</h2>

        <p>
          SharePad is developed and maintained as an open-source project and is
          free to use. If you'd like to help cover hosting costs and support
          continued development, consider supporting the project through{" "}
          <a
            href="https://www.patreon.com/collection/1819237"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patreon
          </a>
          .
        </p>
      </section>
    </article>
  );
}
