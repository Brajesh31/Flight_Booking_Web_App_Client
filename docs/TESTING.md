# Testing and Verification

## Current automated checks

The package scripts currently provide:

| Command | Purpose |
|---|---|
| `npm ci` | Install the lockfile-defined dependency graph |
| `npm run lint` | Run ESLint |
| `npm run build` | Create the Vite production bundle |
| `npm run preview` | Serve the production bundle locally |

There is no dedicated test runner or test script in the current `package.json`. Do not describe the application as having unit, component, or end-to-end test coverage until those tests exist.

The GitHub Actions workflow runs dependency installation, lint, and build. A passing workflow confirms static analysis and bundling only. It does not verify backend availability, Clerk authentication, flight inventory, payment processing, or booking persistence.

## Local baseline

```bash
npm ci
npm run lint
npm run build
npm run preview
```

## Manual smoke test

Use a non-production Clerk account and test backend data.

1. Open the landing page.
2. Try submitting an empty search and confirm validation feedback.
3. Search between supported cities and choose a date.
4. Confirm the browser sends the expected request to the flight-search service.
5. Review results and test minimum and maximum price filters.
6. Select a flight and verify itinerary creation.
7. Open checkout using the returned itinerary ID.
8. Enter passenger details and select seats.
9. Confirm passenger data is saved before booking creation.
10. Verify booking creation and inspect the returned booking identifier.
11. Sign in through Clerk and open the payment route.
12. Exercise the dummy payment flow only against a test backend.
13. Confirm the confirmation page reflects authoritative backend state.
14. Refresh payment and confirmation routes directly.
15. Sign out and verify protected frontend routes redirect to sign-in.

A successful manual run against a mock or local backend does not establish production payment safety.

## API contract tests

The companion backend should have tests for:

- Invalid and expired authentication.
- User attempting to read another user's itinerary or booking.
- Invalid flight instance IDs.
- Stale or unavailable inventory.
- Client-submitted price differing from authoritative price.
- Passenger count limits and passenger field validation.
- Duplicate booking and payment submissions.
- Payment provider signature verification.
- Retry behavior and idempotency.
- Booking state transitions and confirmation.

## Browser and accessibility checks

- Keyboard-only navigation through search and checkout.
- Visible focus states for interactive elements.
- Labels and accessible names for all inputs and icon-only controls.
- Error messages associated with relevant fields.
- Loading feedback for asynchronous requests.
- No duplicate submissions while a request is pending.
- Responsive layout at mobile, tablet, and desktop widths.
- Direct navigation and refresh for every registered route.

## Test data safety

- Use synthetic passenger details.
- Use test provider credentials only.
- Never use real card details or production payment secrets.
- Do not commit API responses containing passenger data.
- Do not paste Clerk cookies, tokens, or booking payloads into public issues.

## CI interpretation

The existing CI job is a lint/build gate. Expand it with a test runner only after selecting and configuring a framework and writing meaningful tests. Do not add a placeholder test command that always succeeds.
