# Security Policy

## Scope

This repository contains the browser-facing React frontend for a flight booking workflow. It integrates Clerk authentication and calls separate backend services for flight search, itinerary operations, and booking operations.

The frontend is not the security authority for booking, inventory, pricing, or payment settlement. Those controls must be implemented by the backend and payment provider.

## Reporting a vulnerability

Use GitHub's private vulnerability reporting option for this repository when available. Do not publish exploit details, credentials, passenger data, cookies, or tokens in public issues.

Include the affected route or component, reproduction steps using test data, browser details, impact, and sanitized request/response examples.

## Security boundaries

### Client-side credentials

Vite bundles client-side code. Any variable exposed to the browser must be considered public. Do not place Clerk secret keys, payment secrets, database URLs, private API keys, or backend credentials in Vite variables.

### Authentication

Clerk UI state can control what the frontend renders, but the backend must independently validate authentication for protected operations. Never assume that hiding a page prevents direct API access.

### Booking integrity

The backend must verify the authenticated user, flight inventory, passenger count, itinerary ownership, and final price. Client-supplied values can be modified and must not be trusted for financial decisions.

### Payment processing

Payment authorization and settlement must be verified server-side. Do not show a final confirmed booking solely because a browser redirect or local state says payment succeeded. The backend should validate provider callbacks and make processing idempotent.

### Personal information

Passenger names, contact details, and travel information may be sensitive. Do not log or expose this data unnecessarily. Sanitize screenshots and bug reports.

### API transport

The current service helpers use plain HTTP localhost URLs for local development. Production deployments must use HTTPS for public API traffic and configure strict CORS policies on the backend.

## Production checklist

- [ ] Only public keys are included in the frontend bundle.
- [ ] Backend endpoints validate authentication independently.
- [ ] User and itinerary ownership are checked server-side.
- [ ] Flight availability and pricing are revalidated by the backend.
- [ ] Booking and payment operations are idempotent.
- [ ] Payment provider callbacks are verified server-side.
- [ ] Production API traffic uses HTTPS.
- [ ] CORS allows only intended frontend origins.
- [ ] Passenger data is not written to client logs or public issue reports.
- [ ] Error messages do not reveal secrets or internal implementation details.

## Credential exposure

If a credential is exposed, revoke or rotate it at the provider immediately. Removing a value from the current branch does not remove it from Git history, forks, caches, or existing clones. Review provider logs for unexpected use.

## Responsible testing

Only test accounts and systems that you own or have explicit permission to assess. Do not probe live airline, payment, or identity systems without authorization.
