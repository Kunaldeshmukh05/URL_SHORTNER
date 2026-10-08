# URL Shortener

A full-stack URL shortener. Paste a long link, get a short one, and visit the short link to be redirected to the original.

**Stack:** React (Vite), Node.js, Express, MongoDB Atlas, Mongoose, ES Modules.

## Features

- Shorten any `http` or `https` URL into a 7-character code
- Mappings persisted in MongoDB
- `GET /:shortCode` redirects to the original URL
- Click counter and last-accessed time per link
- Optional link expiry (model supports it, returns `410 Gone` once expired)
- Recent links list in the UI with copy and click refresh

## Getting started

### Prerequisites

- Node.js 18 or newer
- A MongoDB Atlas cluster and its connection string

### Server

```bash
cd server
npm install
npm install nanoid express-rate-limit cors helmet
```

Add these to `server/.env` next to your existing port and MongoDB settings:

```
BASE_URL=http://localhost:5000
CLIENT_ORIGIN=http://localhost:5173
```

Database name: `url_shortner`. Run the server with your usual start script.

### Client

```bash
cd client
npm install
```

Create `client/.env`:

```
VITE_API_BASE_URL=http://localhost:5000
```

```bash
npm run dev
```

The app is served at `http://localhost:5173`.

## API

All JSON responses use `{ "success": true, "data": ... }` on success and `{ "success": false, "message": "...", "code": "..." }` on failure.

| Method | Path | Description | Success |
| --- | --- | --- | --- |
| `POST` | `/api/urls` | Create a short URL. Body: `{ "originalUrl": "https://..." }` | `201` |
| `GET` | `/api/urls/:shortCode` | Link metadata (does not count a click) | `200` |
| `GET` | `/:shortCode` | Redirect to the original URL | `302` |
| `GET` | `/health` | Health check | `200` |

Error codes: `INVALID_BODY` (400), `INVALID_JSON` (400), `INVALID_URL`, `UNSUPPORTED_PROTOCOL`, `SELF_REFERENCE`, `URL_TOO_LONG`, `VALIDATION_ERROR` (422), `NOT_FOUND` (404), `LINK_EXPIRED` (410), `BODY_TOO_LARGE` (413), `RATE_LIMITED` (429), `CODE_GENERATION_FAILED` and `INTERNAL_ERROR` (500).

### Example

```bash
curl -X POST http://localhost:5000/api/urls \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://example.com/some/long/path?x=1"}'
```

## Design decisions

- **Random 7-character base62 codes** (about 3.5 trillion combinations) instead of a counter. No shared counter to coordinate, and codes are not guessable in sequence.
- **Unique index on `shortCode` plus retry.** Uniqueness is enforced by the database, not by a check-then-insert that would race. On a duplicate-key error the service generates a new code, up to 5 attempts.
- **`302` redirect, not `301`.** Browsers cache `301` permanently, which would skip the server and stop click counting.
- **Atomic click counting.** Each redirect is one `findOneAndUpdate` with `$inc`, so concurrent visits cannot lose counts, and it does not touch `updatedAt`.
- **Validation.** Only `http` and `https` are accepted (blocks `javascript:` and similar), URLs are length-limited, and links pointing back at this service are rejected to prevent redirect loops. The Mongoose schema repeats these rules as a second line of defense.
- **No deduplication.** Shortening the same URL twice produces two codes, so each link keeps its own click count.
- **Rate limiting** on link creation only (30 per 15 minutes per IP). Redirects are not throttled.
- **Layered backend:** routes, thin controllers, a service layer for logic, one central error handler.

## Testing manually (Postman)

1. `POST /api/urls` with a valid URL returns `201`.
2. `GET /<shortCode>` returns `302` (turn off "Automatically follow redirects" to see the `Location` header).
3. `GET /api/urls/<shortCode>` shows `clicks` increased.
4. Unknown code returns `404`; missing body returns `400`; `example.com` (no protocol) and `javascript:alert(1)` return `422`.

## Known limitations and future work

- Click tracking is one write per redirect. At high traffic, buffer increments or move events to a separate collection.
- No caching in front of the redirect lookup. A Redis cache keyed by `shortCode` would remove most reads.
- No accounts, custom aliases, or per-click analytics (referrer, device).
- No automated tests yet. The service layer (code collision retry, expiry handling) is the best place to start.