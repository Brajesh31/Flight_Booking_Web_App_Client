# Flight Booking Frontend Deployment Guide

## Deployment model

This repository is a Vite-powered React frontend. The production build creates static assets in `dist/`. Earlier repository deployment notes describe Google Cloud Storage as the static origin, with Cloud CDN and an HTTPS Load Balancer in front. The infrastructure itself is provisioned outside this repository.

## Pre-deployment requirements

- Node.js compatible with the declared Vite version.
- npm and the committed package lock file.
- Production Clerk publishable key and configured Clerk application domain.
- Deployed flight-search backend.
- Deployed itinerary and booking backend.
- HTTPS API origins and backend CORS allowlist.
- Static hosting configured for a single-page application.

## Build

```bash
npm ci
npm run lint
npm run build
```

The output directory is `dist/`. Review the generated assets before publishing.

## Environment and source configuration

The Clerk frontend key is public by design but must match the intended environment. Inspect the current Clerk initialization to identify the exact variable name expected by the code.

The inspected service modules currently use localhost API origins. Production deployment requires the frontend service configuration to point to deployed API domains. Uploading the current build unchanged will not make localhost API calls reach production services.

Never include Clerk secret keys, payment secrets, database credentials, or backend private tokens in the frontend bundle.

## Static hosting and SPA routing

Upload the contents of `dist/` to the static origin. Configure the hosting layer to serve `index.html` for application routes that do not correspond to physical files.

Verify direct navigation and refresh for:

- `/`
- `/search`
- `/checkout`
- `/payment`
- `/confirmation`

Without a fallback rule, client-side routes may work when navigating from the homepage but return 404 on direct refresh.

## CDN and HTTPS

For a Google Cloud Storage, Cloud CDN, and HTTPS Load Balancer deployment:

1. Configure the storage bucket as the static origin.
2. Configure the URL map and backend bucket.
3. Enable HTTPS with a valid certificate.
4. Set cache behavior appropriate for hashed build assets.
5. Avoid long caching for the HTML entry point unless invalidation is handled correctly.
6. Verify API requests are not incorrectly cached as static content.

## Backend coordination

Deploy the two backend services independently and ensure their routes match the frontend service modules. Configure backend CORS for the exact production frontend origin.

Test flight search, itinerary creation, passenger updates, booking creation, and booking retrieval using non-production data.

## Release verification

- [ ] Production build completed.
- [ ] Correct Clerk publishable key is configured.
- [ ] No secret credentials appear in generated assets.
- [ ] Production API origins are configured.
- [ ] Backend services are reachable over HTTPS.
- [ ] CORS allows only intended origins.
- [ ] SPA fallback works for all registered routes.
- [ ] Sign-in and sign-out work.
- [ ] Flight search returns expected results.
- [ ] Booking and payment flows are verified end-to-end in a test environment.
- [ ] Confirmation is based on authoritative backend state.

## Rollback

Keep the previous static build available until the new release is verified. If the new frontend breaks navigation or API compatibility, restore the previous static assets and coordinate any backend rollback separately. A frontend rollback does not reverse a payment or booking transaction.

## Operational limitations

This repository does not define cloud infrastructure, backend deployment, database backups, payment webhooks, or flight inventory operations. Those require separate ownership and release procedures.
