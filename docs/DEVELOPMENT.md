# Flight Booking Frontend Development Guide

## 1. Development environment

The frontend uses React 19, Vite 6, React Router 7, and npm. Use a Node.js version compatible with the Vite version declared in package.json.

Clone and install:

```bash
git clone https://github.com/Brajesh31/Flight_Booking_Web_App_Client.git
cd Flight_Booking_Web_App_Client
npm ci
```

Start the development server:

```bash
npm run dev
```

The terminal prints the local Vite URL. Keep the terminal running while developing.

## 2. Environment and credentials

The app uses Clerk for authentication. Inspect the Clerk initialization in the source to determine the exact public environment variable expected by the current version. Vite client variables must use the `VITE_` prefix.

Only public client credentials belong in the browser bundle. Never expose Clerk secret keys, database credentials, payment provider secrets, or backend service credentials through Vite environment variables.

The currently inspected API helpers use fixed local addresses:

- Flight search: `http://localhost:3000`
- Itinerary and booking: `http://localhost:4000`

The backend services must be started separately. The frontend repository does not contain those services.

## 3. Main commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite development mode |
| `npm run build` | Generate optimized static output |
| `npm run preview` | Serve the built output locally |
| `npm run lint` | Run ESLint |

Recommended verification:

```bash
npm run lint
npm run build
npm run preview
```

## 4. Development workflow

1. Identify the page, component, state slice, or service that owns the behavior.
2. Read the existing implementation before changing it.
3. Keep network communication in `src/services`.
4. Keep route definitions and authentication composition in `src/App.jsx`.
5. Use existing shared components and context patterns where appropriate.
6. Add loading, empty, success, and failure states.
7. Verify the browser console and network panel.
8. Run lint and production build.
9. Update the relevant documentation.

## 5. Testing the user journey

A complete end-to-end test requires the companion backend services and a configured Clerk application.

Suggested manual test:

- Open the landing page.
- Search for a route and date.
- Confirm the search request reaches the flight service on port 3000.
- Select a flight.
- Confirm itinerary creation reaches the service on port 4000.
- Enter passenger information.
- Confirm the itinerary update request succeeds.
- Sign in through Clerk.
- Continue to payment and verify that the backend handles the transaction.
- Confirm the final booking state is retrieved from the backend.
- Refresh the confirmation route and verify the expected behavior.

Do not use production payment credentials for development testing.

## 6. Service contract expectations

The frontend currently expects the flight search API to accept `trips` and `tripDate` query parameters. It expects itinerary and booking endpoints under `/api/v1`.

When changing a service call, document:

- HTTP method and path.
- Required query parameters or request body.
- Authentication requirements.
- Response shape.
- Error response behavior.
- Whether the operation can safely be retried.

The frontend and backend must agree on these contracts. A frontend-only change cannot fix a backend route mismatch.

## 7. State management guidance

Use local state for ephemeral form input and UI toggles. Use Redux for shared booking journey state that multiple pages need. Avoid duplicating the same booking record in unrelated slices.

Treat search results as temporary. Flights can become unavailable and prices can change. The server must revalidate availability and pricing at checkout and payment time.

## 8. UI and accessibility expectations

- Use semantic HTML elements.
- Ensure form fields have labels.
- Keep keyboard navigation functional.
- Provide visible focus states.
- Use accessible names for icon-only controls.
- Announce important asynchronous results and errors.
- Avoid communicating booking success through color alone.
- Ensure loading states do not allow duplicate payment or booking submissions.

## 9. Debugging

Use the browser developer tools:

- **Console:** React errors, failed imports, and runtime exceptions.
- **Network:** request URLs, methods, payloads, status codes, CORS errors, and response bodies.
- **Application:** Clerk/session state and browser storage.
- **Performance:** large assets and rendering bottlenecks.

Do not paste session cookies, access tokens, or personal passenger data into public bug reports.

## 10. Pull request checklist

- [ ] The change is limited to its intended page, component, state, or service.
- [ ] Existing route behavior remains intact.
- [ ] Authentication behavior is preserved.
- [ ] Loading and error states are covered.
- [ ] Backend contracts remain consistent.
- [ ] Sensitive credentials are not added.
- [ ] Lint passes.
- [ ] Production build passes.
- [ ] Documentation is updated.
- [ ] Manual verification steps are recorded.

## 11. Known limitations

The current API service modules use localhost URLs. A production deployment requires a backend URL configuration strategy. The frontend also relies on external backend behavior for flight inventory, itinerary persistence, booking creation, and payment confirmation. These concerns cannot be verified by the Vite build alone.
