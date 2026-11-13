# Roadmap

This document separates the current frontend from possible future work. Items below are proposals, not shipped capabilities or delivery commitments.

## Current baseline

- [x] React 19 and Vite frontend.
- [x] Landing and flight search pages.
- [x] Itinerary and passenger checkout flow.
- [x] Clerk frontend authentication integration.
- [x] Redux shared state and reusable UI components.
- [x] Payment and confirmation screens.
- [x] API helper modules for search, itinerary, and booking.
- [x] Lint and production build checks in CI.

## Production readiness

- [ ] Move backend origins into validated environment configuration.
- [ ] Replace the dummy payment action with a real server-side payment provider integration.
- [ ] Verify payment webhooks and server-side booking state transitions.
- [ ] Replace the static idempotency header with per-payment idempotency.
- [ ] Make passenger update completion explicit before booking creation.
- [ ] Ensure every protected backend request validates Clerk identity and resource ownership.
- [ ] Remove or redact sensitive console output.
- [ ] Replace hard-coded seat availability with live server-side inventory.
- [ ] Make confirmation display authoritative booking status.

## Reliability and user experience

- [ ] Add automated component and service tests.
- [ ] Add browser end-to-end tests against isolated backend fixtures.
- [ ] Add robust loading, retry, timeout, and error states.
- [ ] Prevent duplicate booking submissions at both client and server.
- [ ] Add form validation for passenger details and seat selection.
- [ ] Improve route refresh and session-expiration handling.
- [ ] Verify keyboard and screen-reader accessibility.

## Maintainability

- [ ] Centralize API clients and base URL configuration.
- [ ] Define shared request/response types or schemas.
- [ ] Add a documented staging environment.
- [ ] Add release notes and versioned deployment procedure.
- [ ] Monitor frontend errors without collecting sensitive passenger data.

## Scope boundaries

The frontend repository does not contain the flight inventory, booking database, payment provider backend, or deployment infrastructure. Work on those systems requires coordinated changes in their respective repositories and services.
