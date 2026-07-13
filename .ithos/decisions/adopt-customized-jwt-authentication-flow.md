---
id: DEC-20260713232944-adopt-customized-jwt-authentication-flow
type: decisions
status: draft
created: 2026-07-13
updated: 2026-07-13
tags: ["auth", "security", "api"]
related: ["DEC-20260713213433-use-prisma-over-typeorm"]
---

# Adopt customized JWT authentication flow

## Context

Our backend API requires a secure, stateless, and scalable authentication
mechanism. Since we previously decided to use Prisma for database storage and
indexing (DEC-20260713213433-use-prisma-over-typeorm), the authentication system
must integrate cleanly with our Prisma models to verify user roles, query
session data when needed, and maintain database consistency.

## Alternatives Considered

- **Third-Party Auth Providers (e.g., Auth0, Clerk, Firebase Auth)** — Managed
  services with high reliability. However, they introduce external API
  latencies, runtime dependency on external providers, and cost.
- **Session-Based Cookie Authentication** — State is stored on the
  server/database. It is easy to revoke but harder to scale and introduces
  database lookups on every single API request.
- **Customized JWT Authentication** — Self-contained, stateless, and fully
  managed within our backend service. Allows us to leverage our Prisma schema
  directly for user queries without external dependencies.

## Decision

Adopt a **customized JWT authentication flow** for the backend API, utilizing
Prisma-based user validation.

## Why

This approach provides:

- **Stateless Verification**: API servers can verify the token signature locally
  without querying the database for every single request, improving response
  times.
- **Direct Prisma Integration**: The user ID and roles embedded inside the JWT
  payload map directly to Prisma's generated TypeScript interfaces, ensuring
  compile-time safety.
- **Control and Customization**: We maintain full ownership of token lifecycle,
  token payloads, signing algorithms, and local keys without third-party vendor
  lock-in.

## Trade-offs

**Pros:**

- High performance due to stateless token verification.
- Direct alignment with the Prisma monorepo schema.
- No external service dependency or cost.

**Cons:**

- Token revocation is more complex (requires short-lived tokens and/or a
  blacklist mechanism).
- Client-side token storage security must be carefully managed.
