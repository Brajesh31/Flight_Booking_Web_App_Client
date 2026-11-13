# Contributing to Flight Booking Frontend

## Contribution goals

Contributions should improve the clarity, accessibility, reliability, and maintainability of the flight booking experience. The frontend is only one part of the system, so changes must respect the contracts and trust boundaries of the companion backend services.

## Before making changes

Read the root README and the documentation in `docs/`. Identify whether the work belongs to a page, reusable component, Redux slice, context provider, route definition, or service module.

## Local setup

```bash
git clone https://github.com/Brajesh31/Flight_Booking_Web_App_Client.git
cd Flight_Booking_Web_App_Client
npm ci
npm run dev
```

Configure Clerk using the public key expected by the current source. Start the companion backend services separately when testing API-dependent flows.

## Code organization

- Page-level booking experiences belong in `src/pages`.
- Reusable UI belongs in `src/components`.
- Authentication integration belongs in `src/clerk`.
- Shared application state belongs in `src/redux` or the established context providers.
- HTTP request helpers belong in `src/services`.
- Shared formatting and lookup logic belongs in `src/utils`.

Avoid moving responsibilities across these boundaries without a clear reason.

## Booking and payment safety

Never trust client-side prices, user IDs, passenger counts, flight availability, or booking identifiers. The backend must authenticate the user, authorize the itinerary, verify inventory, calculate the final amount, and make payment operations idempotent.

Do not put secret credentials in client-side environment variables. Do not log passenger personal information or authentication tokens.

## Verification

Before submitting a pull request:

```bash
npm run lint
npm run build
```

For changes to the booking journey, test the relevant route and backend request using non-production accounts and test data. Document any backend dependency that reviewers need to reproduce the change.

## Pull request description

Include the problem, intended user impact, affected pages or services, screenshots where UI changes are involved, API contract changes, authentication implications, verification steps, and known limitations.

Keep changes focused. Do not combine unrelated visual refactors, API contract changes, and authentication changes into one large pull request unless they are inseparable.

## Bug reports

Provide the route, browser, steps to reproduce, expected behavior, actual behavior, and sanitized network errors. Remove cookies, authorization headers, passenger data, payment details, and private account information.

## Security issues

Do not publish exploitable vulnerabilities or credential exposures in a public issue. Follow the repository's security reporting policy.
