# Eventnexus Security Rules

This document defines security rules for secrets, environment variables, public configuration, and lead-capture data.

## Core Rule

Never commit real secrets to git.

Secrets include:

- API keys
- service-role keys
- database passwords
- database connection strings
- JWT secrets
- webhook secrets
- Resend API keys
- Turnstile secret keys
- Cloudflare API tokens
- private customer data
- exported lead data

## Public Vs Server-Only Configuration

Astro exposes only variables prefixed with `PUBLIC_` to client-side code. Treat every `PUBLIC_*` variable as visible to anyone who can inspect the website.

Allowed public variables:

- `PUBLIC_SITE_URL`
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`, only when Row Level Security is correct
- `TURNSTILE_SITE_KEY`, if Cloudflare Turnstile is added
- analytics IDs that are intentionally public

Server-only variables:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEAD_NOTIFICATION_EMAIL`
- `TURNSTILE_SECRET_KEY`
- Cloudflare API tokens
- deployment or provider secrets

Server-only variables must never be imported or rendered in browser code.

## Supabase Rules

Supabase is planned for structured project leads and contact messages.

Rules:

- Enable Row Level Security on exposed tables.
- Public visitors must not be able to read lead data.
- Public visitors must not be able to update or delete lead data.
- Public form submissions should go through an Astro API route or Cloudflare Pages Function.
- Server-side code validates the payload before inserting into Supabase.
- Use `SUPABASE_SERVICE_ROLE_KEY` only server-side.
- Do not expose service-role keys through `PUBLIC_*`, frontend bundles, logs, error pages, or client responses.
- Do not create production tables until RLS and insert rules are reviewed.

## Resend Email Rules

Resend will be used for lead/contact notification emails.

Rules:

- `RESEND_API_KEY` is server-only.
- Store Resend secrets in local `.env` for development and Cloudflare Pages environment variables for deployment.
- Do not send email before the sender domain/from address is configured.
- Store the lead in Supabase before attempting to send notification email.
- Email failure must not erase or block the stored lead.
- Do not include unnecessary sensitive lead data in logs.

## Cloudflare Rules

Cloudflare Pages will host the site.

Rules:

- Set production and preview environment variables in Cloudflare Pages, not in source code.
- Do not move `eventnexus.eu` DNS until the Pages deployment is verified.
- Do not expose Cloudflare API tokens in git or browser code.
- Use Cloudflare Turnstile for spam protection if the public form starts receiving spam.
- Keep preview and production environment variable values separate when they differ.

## Git Rules

Files that must not be committed:

- `.env`
- `.env.local`
- `.env.production`
- `.env.development`
- `.env.staging`
- database dumps
- exported leads
- customer uploads
- private credentials
- generated provider token files

Files that may be committed:

- `.env.example`, if it contains only names and empty placeholder values
- public project IDs already documented as non-secret metadata
- documentation describing secret placement without real values

Before committing, check:

- no real secret values were added
- no private customer/lead data was added
- no `.env` file is staged
- `.env.example` contains placeholders only

## Logging Rules

Do not log:

- service-role keys
- Resend API keys
- request authorization headers
- full lead payloads in production
- private customer notes
- database connection strings

Safe logs may include:

- request received
- validation failed with a non-sensitive reason
- lead inserted with an internal ID
- email notification attempted
- email notification failed without leaking payload or secrets

## Lead Data Rules

Lead data may contain business-sensitive information.

Rules:

- collect only useful information
- validate field length
- avoid asking for passwords, tokens, or payment card details
- do not expose lead data publicly
- admin access must be authenticated when an admin UI exists
- delete or archive data when it is no longer useful

## Public Content Rules

Public documentation and website copy may include:

- service descriptions
- public repo URLs
- public project names
- Supabase project ID if already used as public metadata
- Cloudflare build settings
- empty environment variable names

Public documentation and website copy must not include:

- API keys
- provider tokens
- private database URLs
- private client details
- unreviewed customer claims
- credentials copied from dashboards

## Incident Rule

If a secret is accidentally committed:

1. Treat it as compromised.
2. Rotate or revoke it in the provider dashboard.
3. Remove it from the codebase.
4. Commit the cleanup.
5. Review git history exposure before assuming the issue is solved.

Do not simply delete the current file and keep using the same secret.

## Current Decision Status

Security rules are defined for public configuration, server-only variables, Supabase lead data, Resend notifications, Cloudflare deployment, git hygiene, and logging.
