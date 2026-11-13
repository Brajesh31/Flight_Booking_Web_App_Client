# Troubleshooting

## Dependencies fail to install

Use the committed npm lockfile:

```bash
npm ci
```

Confirm the Node.js and npm versions are compatible with the versions declared by the project dependencies. Avoid mixing package managers or deleting the lockfile as a first troubleshooting step.

## Clerk publishable key error

The app reads `VITE_CLERK_PUBLISHABLE_KEY` in `src/main.jsx` and throws if it is missing. Create a local `.env` file and provide the publishable key for the correct Clerk application. Restart Vite after changing environment variables.

Only the publishable key belongs in the browser. Never use a Clerk secret key with the `VITE_` prefix.

## Flight search fails

The search service currently calls `http://localhost:3000/api/v1/flightinstance/`. Confirm the companion flight service is running on port 3000, the route is available, and the browser request has the expected `trips` and `tripDate` parameters.

Check the browser Network panel for connection refused, 404, 500, or CORS errors.

## Itinerary or booking calls fail

The itinerary and booking helpers currently call the service on port 4000. Confirm that the companion backend is running and exposes the paths documented in [API_CONTRACTS.md](API_CONTRACTS.md).

Compare the actual request payload and response with the backend contract. Do not assume the frontend service method name guarantees that the backend route exists.

## CORS errors

Configure the backend to allow the exact frontend origin. Do not use a permissive wildcard with credentialed requests. Check preflight OPTIONS responses and allowed headers.

## Search returns no flights

Verify the selected city exists in the frontend airport mapping, the mapped airport codes are correct, the date is accepted by the backend, and matching inventory exists. The current city mapping is limited to Mumbai, Pune, Bengaluru, Chennai, Kolkata, and Jaipur.

## Checkout does not proceed

Check that the itinerary ID is present in the query string, that the signed-in user state is populated, and that itinerary retrieval succeeds. Inspect the console and Network panel for failed requests.

The current checkout handler does not await the passenger itinerary update before it requests the itinerary and creates a booking. Treat stale passenger data as a possible implementation defect, not just a backend outage.

## Payment page redirects unexpectedly

The payment page fetches booking details using the `bookingId` query parameter. Confirm that the URL contains a valid booking ID and that the backend allows the current authenticated user to retrieve it.

## Confirmation page shows incorrect state

The frontend route itself is not proof of payment. Confirm the backend booking/payment record and provider test event. Do not resolve a false confirmation by changing only client-side Redux state.

## Direct route refresh returns 404

The application uses BrowserRouter. Configure the production static host or load balancer to serve `index.html` for application routes such as `/search`, `/checkout`, `/payment`, and `/confirmation`.

## Production API requests target localhost

The service modules currently hard-code localhost URLs. A production browser interprets localhost as the visitor's own machine. The API base URL configuration must be changed before production deployment.

## Useful diagnostics

- Browser Console: runtime exceptions and React errors.
- Browser Network panel: URL, method, request parameters, response status, and CORS.
- Vite terminal: development server and build output.
- Backend logs: request validation and server-side transaction errors, with personal data redacted.
