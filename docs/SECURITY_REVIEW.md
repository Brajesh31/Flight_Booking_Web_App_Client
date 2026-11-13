# Security Review and Trust Boundaries

## Scope

This is a source-level review of the frontend repository. It is not a penetration test and does not assess the companion backend, Clerk tenant configuration, cloud infrastructure, or payment provider account. Findings below describe behavior visible in the checked-in client code and require server-side review before production use.

## High-priority findings

### 1. Payment flow is explicitly a dummy payment flow

**Evidence:** `src/redux/Slices/paymentSlice.js` exports `makeDummyPayment` and posts to `/api/v1/bookings/payment`.

**Risk:** The UI's payment success state is driven by the response from this client request. The repository does not contain a real payment provider integration or payment webhook verification. A UI success state must not be treated as proof of settlement.

**Required action:** Keep this flow in a clearly labeled sandbox/demo environment. Before real payments, integrate a payment provider on the server, calculate amounts server-side, verify signed provider webhooks, persist payment state, and make confirmation read authoritative booking/payment status.

### 2. Static idempotency key is reused

**Evidence:** The payment request sends the literal header `x-idempotency-key: 12323565354`.

**Risk:** A constant key reused across requests does not provide per-payment idempotency. Depending on backend behavior, legitimate attempts may collide or retries may be misclassified.

**Required action:** Generate or obtain a unique idempotency key for each logical payment attempt and persist/reuse it only for retries of that same attempt. The backend must enforce idempotency.

### 3. Backend origins are hard-coded to localhost

**Evidence:** `SearchFlightsAPI.js`, `ItinenaryAPI.js`, `bookingAPI.js`, and `paymentSlice.js` use localhost origins on ports 3000 and 4000.

**Risk:** A production browser will send requests to the end user's own machine, not to the deployed backend. The application has no checked-in environment-based API origin strategy.

**Required action:** Introduce validated environment configuration for public API base URLs, separate development and production values, and use HTTPS in production. Never place private backend credentials in Vite variables.

### 4. Client controls booking and payment data

**Evidence:** The browser sends user ID, flight ID, passenger count, price/total cost, itinerary ID, and generated booking ID in service requests.

**Risk:** Browser payloads are user-controlled. Client-side validation and generated hashes do not establish identity, inventory, price, ownership, or payment authenticity.

**Required action:** The backend must derive identity from a verified session, reload the selected flight and price, validate inventory and passenger count, enforce itinerary ownership, and create bookings transactionally. Never trust a client-calculated total.

### 5. Sensitive data and debug output

**Evidence:** Service and payment code logs request objects, booking identifiers, and provider error objects to the browser console.

**Risk:** Passenger or booking details may appear in shared devices, browser logs, support screenshots, or remote debugging tools.

**Required action:** Remove or redact production console logging. Do not log passenger details, authentication tokens, payment data, or full provider error objects.

## Additional risks and limitations

- Clerk route guards protect frontend rendering only. Backend endpoints must independently authenticate and authorize every request.
- The confirmation route renders a success component. Ensure that component displays only server-confirmed booking state, not a client-side assumption.
- The checkout handler calls `FillItinerary` without awaiting it before retrieving the itinerary and creating a booking. This can create a race where passenger updates have not completed.
- The payment page fetch effect depends on `userId`, while the request also depends on `bookingId`. Missing or changing booking IDs should be handled explicitly.
- The seat map uses a hard-coded occupied-seat list and local selection state. It is not authoritative inventory and cannot prevent two users from selecting the same seat.
- The UI exposes payment method names and logos, but these are presentation choices, not payment provider integrations.
- Browser-generated SHA-256 identifiers are predictable from their inputs and timestamps and must not be treated as secrets or authorization tokens.
- The current client has no visible automated component or end-to-end tests.

## Remediation order

| Priority | Action |
|---|---|
| Critical before real payments | Replace dummy payment flow with server-side provider integration and webhook verification |
| High | Move API origins to environment configuration |
| High | Enforce server-side identity, ownership, price, inventory, and passenger validation |
| High | Replace constant idempotency key with per-attempt idempotency |
| High | Make passenger update and booking creation ordering explicit and reliable |
| Medium | Remove or redact sensitive console logging |
| Medium | Replace hard-coded seat availability with authoritative backend inventory |
| Medium | Verify confirmation from backend booking/payment state |
| Medium | Add automated integration and end-to-end coverage |

## Verification rule

Do not mark an item fixed because the frontend UI looks correct. Require backend tests, provider sandbox verification, and authorization tests for the relevant data boundary.
