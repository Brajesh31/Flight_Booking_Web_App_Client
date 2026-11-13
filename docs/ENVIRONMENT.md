# Environment and Configuration

## Current environment variable

The React entry point reads one Vite variable:

| Variable | Required | Consumer | Purpose |
|---|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | `src/main.jsx` | Clerk frontend publishable key |

The application throws during startup if this variable is absent.

## Local setup

Create a local `.env` file in the repository root:

```dotenv
VITE_CLERK_PUBLISHABLE_KEY=pk_test_replace_with_your_clerk_publishable_key
```

Use the publishable key for the correct Clerk development instance. Restart the Vite server after changing environment variables.

## Vite exposure rule

Every variable prefixed with `VITE_` can be embedded in the client bundle and read by browser users. Only public configuration belongs there.

Never define these as Vite client variables:

- Clerk secret keys.
- Payment provider secret keys.
- Database connection strings.
- Backend private API tokens.
- Signing secrets or webhook secrets.

## Backend API origins

The current service modules do not read environment variables for API origins. They contain fixed development URLs:

- Flight search: `http://localhost:3000`
- Itinerary and booking: `http://localhost:4000`

This is a production deployment blocker until the service origins are made configurable and set to the deployed HTTPS API hosts. This document records the current implementation; it does not claim those origins are already configurable.

## Environment files

- Keep `.env` and other local environment files out of version control.
- Share variable names and safe placeholder values only.
- Rotate any credential that has been committed or exposed.
- Use separate Clerk and backend environments for development, staging, and production.
- Review the generated `dist/` output to ensure no private values were bundled.
