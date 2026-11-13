# Release Checklist

## Frontend validation

- [ ] `npm ci` succeeds from the committed lockfile.
- [ ] `npm run lint` succeeds.
- [ ] `npm run build` succeeds.
- [ ] Production preview starts and renders expected routes.
- [ ] Direct route refresh works for every registered route.
- [ ] Mobile, tablet, and desktop layouts are reviewed.
- [ ] Keyboard navigation and form labels are checked.

## Environment and security

- [ ] Correct Clerk publishable key is configured for the target environment.
- [ ] No Clerk secret or payment secret is bundled in client assets.
- [ ] API origins point to deployed HTTPS services, not localhost.
- [ ] Backend CORS allowlist contains only intended frontend origins.
- [ ] Sensitive console logging is removed or redacted.
- [ ] Protected backend endpoints validate identity and ownership.

## Booking and payment

- [ ] Flight inventory and price are revalidated by the backend.
- [ ] Passenger details are validated server-side.
- [ ] Passenger update completes before booking creation.
- [ ] Duplicate booking requests are idempotent.
- [ ] Payment provider is configured in test mode before production enablement.
- [ ] Payment webhook signatures are verified server-side.
- [ ] Confirmation is based on authoritative backend state.
- [ ] Static seat availability is not treated as live inventory.

## Backend coordination

- [ ] Flight search service is deployed and reachable.
- [ ] Itinerary and booking service is deployed and reachable.
- [ ] API contracts match the frontend service calls.
- [ ] Backend logs redact personal and payment data.
- [ ] Rollback ownership is clear for frontend and backend deployments.

## Release hygiene

- [ ] README and relevant docs match shipped behavior.
- [ ] CHANGELOG.md is updated.
- [ ] No secrets, passenger data, or local environment files are committed.
- [ ] CI is green for the release commit.
- [ ] Known limitations are communicated accurately.
