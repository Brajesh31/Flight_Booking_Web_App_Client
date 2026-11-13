# Support

## Before opening an issue

1. Read the root README and relevant guide in `docs/`.
2. Run `npm ci`, `npm run lint`, and `npm run build`.
3. Check the browser console and Network panel.
4. Confirm whether the issue is in the frontend or a companion backend.
5. Reproduce using test accounts and synthetic passenger data.

## Bug reports

Use the GitHub bug report template. Include the affected route, steps to reproduce, expected and actual behavior, browser/OS details, and sanitized request status information.

## What not to share

Do not attach Clerk cookies, access tokens, secret keys, payment credentials, full passenger records, or production booking payloads. Redact personal data from screenshots and logs.

## Backend issues

This repository contains the frontend only. Flight search, itinerary persistence, booking creation, and payment verification depend on separate backend services. Include the failing endpoint and response status, but report backend defects to the repository or service that owns that endpoint.

## Security reports

Use the private reporting instructions in [SECURITY.md](SECURITY.md). Do not disclose exploitable details or customer data in a public issue.
