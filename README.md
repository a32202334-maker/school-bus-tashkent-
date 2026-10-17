# SchoolBus Tashkent

A multilingual pilot website for families coordinating shared school journeys in Tashkent. It includes public information pages, Agent-Native email/password authentication, and a PostgreSQL-backed first draft of ride offers and seat requests. The Telegram bot is linked as an external entry point; no website-to-Telegram account linking or live message integration is implemented.

## Run locally

```bash
corepack enable
pnpm install
pnpm dev
```

Local development uses the Agent-Native PGlite database by default. Authentication is enabled. On a loopback development preview, the framework may offer its local development account flow; normal email/password registration and sign-in are also available. Avoid enabling `AUTH_DISABLED=true` when testing privacy or authorization, because it treats all requests as one shared user.

## Database

Application tables are defined in `drizzle/schema.ts` and migrations in `drizzle/migrations/`.

```bash
pnpm db:generate
pnpm db:migrate
```

The current schema stores ride offers and ride requests only. It stores broad pickup-area text, never a precise address. Searches show only coordinator-approved future offers and omit owner email addresses. Seat requests reserve capacity while pending; the action locks the offer row and checks remaining capacity before insertion. Offers begin pending review. This schema is a pilot foundation, not a complete trip, schedule, school, vehicle, verification, incident, or notification model.

For a persistent deployment, configure `DATABASE_URL` with PostgreSQL and apply migrations before serving traffic. Use a managed database backup and recovery process. Do not use a shared production database for test runs.

## Authentication and access

The framework auth plugin handles sessions and password storage. Configure a stable `BETTER_AUTH_SECRET` for production and an appropriate outbound email provider if the deployment uses email verification or recovery messages. Keep secrets in the deployment environment, never in source control. `AUTH_DISABLED` must remain unset or `false` in production.

Parent routes (`/dashboard`, `/rides/*`, `/settings`) require a session. Coordinator actions and the review queue require the non-default `coordinator` app role (`schoolbus-tashkent`). The role is not automatically granted. Before the pilot, configure and verify an organization-admin role assignment procedure; this app currently does not include a dedicated coordinator-role management screen or default administrator account.

## Available routes

Public: `/`, `/how-it-works`, `/safety`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms`, `/login`, `/register`.

Authenticated: `/dashboard`, `/rides/find`, `/rides/offer`, `/rides/my-rides`, `/settings`, `/coordinator` (coordinator-role actions only).

The contact form validates and prepares a message locally. It does not send a message to the project team; the visitor must open Telegram and send it themselves. All Telegram links point to `https://t.me/schoolbus_tashkent_bot`.

## Verification

```bash
pnpm typecheck
pnpm agent-native:doctor
pnpm test
```

The current parent workflows use actions in `actions/`, so the UI and Agent-Native runtime share their inputs and server-side checks. Do not test authorization by disabling auth. The coordinator queue must be checked with a user assigned the coordinator role and a regular parent account.

## Important limitations before a real pilot

- No production profile, school catalogue, recurring schedule, vehicle, child consent, identity/driver verification, trip handover, attendance, incident, or feedback records exist yet.
- Search is a database filter by school text, approximate-area text, and date; it does not calculate distance or optimize routes.
- A parent request and driver acceptance are persisted, but the application has no separate confirmed-trip lifecycle, arrival/handover check-in, trip completion, cancellation notifications, or emergency response channel.
- Ride offers are coordinator-reviewed, but review is not identity or vehicle verification. Do not represent users or rides as verified.
- Telegram authentication linking, notifications, webhook handling, delivery retries, and bot API integration are not implemented.
- The coordinator role is enforced by an Agent-Native app-role authorization guard, but a safe, tested role-provisioning workflow still needs to be established.
- The privacy and participation pages are drafts. Retention/deletion operations, legal review, consent withdrawal, support ownership, and applicable Uzbekistan requirements must be resolved before using real family or child data.
- No synthetic ride listings, project metrics, school partnerships, or verification claims are seeded or displayed as real results.
