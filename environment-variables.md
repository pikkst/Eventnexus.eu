# Eventnexus Environment Variables

This document defines the environment variables planned for Eventnexus.

Do not store real secrets in this repository.

## Variable Naming Rules

- `PUBLIC_*` variables may be exposed to browser code.
- Non-public variables must only be used server-side.
- Secret values belong in local `.env` files and Cloudflare environment variables.
- `.env` and `.env.*` files must stay ignored by git.
- `.env.example` may be committed because it contains names and empty placeholder values only.
- Detailed secret-handling rules live in `security-rules.md`.

## Public Variables

### `PUBLIC_SITE_URL`

Purpose:

- canonical public site URL
- SEO metadata
- absolute links

Example:

- local: `http://localhost:4321`
- production: `https://eventnexus.eu`

Browser exposure:

- safe

### `PUBLIC_SUPABASE_URL`

Purpose:

- Supabase project API URL when browser-safe Supabase features are added

Browser exposure:

- safe when used with the public anon key and correct Row Level Security

Current status:

- planned, not required until Supabase integration begins

### `PUBLIC_SUPABASE_ANON_KEY`

Purpose:

- public Supabase anon key for browser-safe Supabase client usage

Browser exposure:

- allowed only when Row Level Security policies are correct

Current status:

- planned, not required for the first static scaffold

## Server-Only Variables

### `SUPABASE_SERVICE_ROLE_KEY`

Purpose:

- server-side insertion into lead-capture tables
- admin-only backend operations

Browser exposure:

- never

Rules:

- never commit this value
- never expose through client-side code
- store in Cloudflare environment variables for production
- store only in local `.env` for development

### `SUPABASE_PROJECT_ID`

Purpose:

- project identification for tooling, logs, and documentation

Value:

- `yzsoczlghgcqitevamfo`

Browser exposure:

- safe, but not necessarily needed in browser code

### `RESEND_API_KEY`

Purpose:

- Resend API authentication for transactional email notifications

Browser exposure:

- never

Current status:

- planned for lead/contact notifications

### `RESEND_FROM_EMAIL`

Purpose:

- sender address for automated lead and contact notifications sent through Resend

Browser exposure:

- server-only

Current status:

- planned

### `LEAD_NOTIFICATION_EMAIL`

Purpose:

- destination address for new lead and contact notifications

Browser exposure:

- do not expose unless intentionally displayed as a public contact address

Current status:

- planned

## Optional Future Variables

### `TURNSTILE_SITE_KEY`

Purpose:

- Cloudflare Turnstile public site key for spam protection

Browser exposure:

- safe

### `TURNSTILE_SECRET_KEY`

Purpose:

- server-side Turnstile verification

Browser exposure:

- never

### `PUBLIC_ANALYTICS_ID`

Purpose:

- analytics provider measurement identifier

Browser exposure:

- safe, treated as a public identifier

Current status:

- planned, Cloudflare Web Analytics recommended for v1

### `PUBLIC_ANALYTICS_ENABLED`

Purpose:

- enable or disable analytics in specific environments

Browser exposure:

- safe

Current status:

- optional, can be omitted if analytics are always enabled

## Environment Placement

### Local Development

Use:

- `.env`

Do not commit:

- `.env`
- `.env.local`
- `.env.production`
- any file containing real secret values

### Cloudflare Pages

Set production and preview values in Cloudflare Pages environment variables.

Required later for Supabase lead capture:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional later:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEAD_NOTIFICATION_EMAIL`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `PUBLIC_ANALYTICS_ID`
- `PUBLIC_ANALYTICS_ENABLED`

## Current Decision Status

Environment variable names are defined for the first website, Supabase lead capture, Resend email notifications, and optional spam protection. Real values are not stored in git.
