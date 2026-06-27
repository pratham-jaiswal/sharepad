# SharePad

A privacy-first, markdown-first collaborative notepad built with Next.js.

Create a pad, share the link, and start collaborating—no accounts, no registration, and no unnecessary friction. Password-protected pads use client-side encryption, ensuring only users with the correct password can read the content.

---

## Features

- 📝 Markdown editor with live preview and formatting toolbar
- ⚡ Automatic saving while you write
- 🔒 Optional password-protected pads with client-side encryption
- 🍪 Secure HTTP-only session authentication for protected pads
- 🎨 Light, dark, and system theme support
- ⏳ Automatic pad expiry after a configurable inactivity period
- 📬 Contact form with validation and anti-spam protection
- 🔍 SEO-friendly metadata, sitemap, robots.txt, and structured data
- 🚀 Built with the Next.js App Router
- 📈 Error monitoring and crash reporting with Sentry

---

## Getting Started

### Prerequisites

- Node.js 22+
- MongoDB

### Installation

Clone the repository:

```bash
git clone https://github.com/pratham-jaiswal/sharepad.git
cd sharepad
```

Install dependencies:

```bash
npm install
```

Copy the example environment file:

```bash
cp .env-example .env.local
```

Configure the required environment variables:

```env
MONGODB_URL=mongodb://localhost:27017/sharepadDB
JWT_SECRET=change-me-to-a-long-random-secret
APP_BASE_URL=http://localhost:3000

CONTACT_TO_EMAIL=hello@example.com
RESEND_API_KEY=your=-resend-api-key
PAD_EXPIRY_DAYS=365

SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Environment Variables

| Variable            | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `MONGODB_URL`       | MongoDB connection string                                      |
| `JWT_SECRET`        | Secret used to sign authentication tokens                      |
| `APP_BASE_URL`      | Public base URL of the application                             |
| `CONTACT_TO_EMAIL`  | Destination email for contact form submissions                 |
| `RESEND_API_KEY`    | API key for the email provider                                 |
| `PAD_EXPIRY_DAYS`   | Number of days of inactivity before pads expire (default: 365) |
| `SENTRY_AUTH_TOKEN` | Authentication token used during build to upload source maps   |

---

## Security

- Password-protected pads are encrypted in the browser before being uploaded.
- Only encrypted content is stored on the server for protected pads.
- HTTP-only session cookies are used for authentication.
- Pads automatically expire after the configured inactivity period.
- SharePad does not require user accounts.
- Application errors are monitored using Sentry to improve reliability.

For more information, see the project's Privacy Policy and Terms of Service.

---

## Contributing

Contributions are welcome.

Whether you're fixing bugs, improving documentation, or proposing new features, your help is appreciated.

Before contributing:

- Search existing issues before opening a new one.
- Discuss large changes through an issue first.
- Follow the project's coding standards.
- Read the [Contribution Guide](./CONTRIBUTING.md).

---

## Notes

- This repository contains the current Next.js implementation of SharePad.
- Protected pad pages are excluded from search engine indexing.

---

## License

Copyright (C) 2023-2026 Pratham Jaiswal (MaxxDevs)

SharePad is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0-only)**. See the [LICENSE](./LICENSE) file for the complete license text.

Organizations or individuals wishing to use, modify, or self-host SharePad without the obligations of the AGPL—for example, for proprietary internal deployments or commercial products—may contact the maintainer to discuss commercial licensing options.

---

## Support

SharePad is developed and maintained as an independent open-source project.

If you find it useful and would like to support its continued development, consider supporting the project on [Patreon](https://www.patreon.com/collection/1819237). Your support helps cover hosting costs, maintenance, and future improvements.

<a href="https://www.patreon.com/MaxxDevs"><img width="200px" src="https://res.cloudinary.com/dhzmockpa/image/upload/v1745678642/PATREON_Lockup_Horizontal_BLACK_RGB_rgl86v.svg" alt="Patreon" /></a>
