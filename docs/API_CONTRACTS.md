# Flight Booking Frontend API Contracts

## Scope

This document records endpoint paths and request responsibilities used by the current frontend service modules. It is not a complete backend API specification. The companion backend remains authoritative for exact schemas, validation, and response bodies.

## Service origins

The inspected source uses these local development origins:

- Flight search: `http://localhost:3000`
- Itinerary and booking: `http://localhost:4000`

These values are hard-coded in the inspected service modules. Production deployment requires a coordinated configuration change to point to deployed services.

## Flight search

| Property | Value |
|---|---|
| Method | GET |
| Path | `/api/v1/flightinstance/` |
| Query parameters | `trips`, `tripDate` |
| Purpose | Retrieve flight instances for a route and date |

The frontend resolves city names to airport codes and builds the route query. The backend must validate airport codes and dates and return current inventory.

## Itinerary creation

| Property | Value |
|---|---|
| Method | POST |
| Path | `/api/v1/itinerary` |
| Service module | `ItinenaryAPI.js` |
| Purpose | Create an itinerary for a selected flight and journey |

The helper sends flight, route, date, time, passenger count, price, and identifier information. The backend must validate and persist the itinerary using authenticated user context.

## Itinerary retrieval

| Property | Value |
|---|---|
| Method | GET |
| Path | `/api/v1/itinerary/:id` |
| Purpose | Retrieve an itinerary |

The backend must confirm that the authenticated user is allowed to access the requested itinerary.

## Passenger update

| Property | Value |
|---|---|
| Method | PATCH |
| Path | `/api/v1/itinerary/:id` |
| Purpose | Attach or update passenger information |

The backend must validate passenger fields, enforce ownership, and protect personal data.

## Booking creation

| Property | Value |
|---|---|
| Method | POST |
| Path | `/api/v1/bookings/` |
| Service module | `bookingAPI.js` |
| Purpose | Create a booking from a selected flight and itinerary |

The helper sends flight instance, user, total cost, seat count, itinerary ID, and booking ID. The backend must recalculate price, verify availability, authenticate the user, and prevent duplicate side effects.

## Booking retrieval

| Property | Value |
|---|---|
| Method | GET |
| Path | `/api/v1/bookings/:id` |
| Purpose | Retrieve booking state |

The backend must verify booking ownership and return authoritative state.

## Trust and validation requirements

Never treat client-provided user ID, flight instance ID, flight price, total cost, passenger count, itinerary ID, booking ID, or payment status as trusted. The backend must validate every value against server-side records and authenticated identity.

## Error handling expectations

The frontend should distinguish network failures, validation failures, authentication failures, unavailable inventory, payment failures, and unexpected server errors. Do not expose raw stack traces or sensitive backend details.

## Contract change process

1. Update backend contract and tests.
2. Update frontend service helper.
3. Update page-level loading and error behavior.
4. Document request and response compatibility.
5. Test against the companion backend.
6. Update this document and the root README.
