# Eventnexus Supabase Usage

This document defines how Supabase should be used in the first Eventnexus website and future platform.

## Known Supabase Project

- Project name: `Eventnexus.eu`
- Project ID: `yzsoczlghgcqitevamfo`
- Region: `eu-north-1` / North EU, Stockholm

No Supabase secrets, passwords, service-role keys, JWT secrets, or database connection strings should be stored in this repository.

## Usage Decision

Supabase should be used first for lead capture and project-request data.

The first public Eventnexus website needs a structured project-intake form. Supabase is the right backend target for storing those submissions, reviewing lead status, and later supporting admin workflows.

## Phase 1 Supabase Scope

The first Supabase-backed feature should be:

- storing structured project requests
- storing simple contact-only messages
- tracking lead review status
- supporting basic admin review data
- preparing for future lead scoring

The first version should not immediately build:

- full customer accounts
- a public customer portal
- paid dashboard access
- complex CRM features
- realtime collaboration
- file storage for client assets

Those can come later after the public site and lead-capture path are working.

## Planned Data Areas

### Project Leads

Primary table concept: `project_leads`

Purpose:

- store multi-step project request submissions
- capture project type, idea, features, budget, timeline, and technical needs
- support lead review and qualification

Planned fields are drafted in `contact-lead-flow.md`.

### Contact Messages

Possible table concept: `contact_messages`

Purpose:

- store simple messages from visitors who are not ready for the full project request form

Recommended fields:

- `id`
- `created_at`
- `status`
- `full_name`
- `email`
- `message`
- `source_page`

### Admin Review Data

Admin review may initially be handled directly in Supabase dashboard.

Later, if needed, build an internal admin view for:

- lead status
- notes
- qualification score
- next action
- follow-up date
- project category

## Security Rules

Supabase Row Level Security must be enabled for public-schema tables that are exposed through APIs.

For lead-capture tables:

- public visitors may submit leads only through a controlled server-side endpoint
- public visitors must not be able to read lead data
- public visitors must not be able to update or delete lead data
- admin review must require authenticated/admin access
- service-role keys must remain server-side only

Recommended first implementation:

1. Website form submits to an Astro API route or Cloudflare Pages Function.
2. Server-side handler validates the payload.
3. Server-side handler inserts into Supabase using protected environment variables.
4. Browser never receives the service-role key.
5. RLS remains enabled on lead tables.

## Environment Variables

Potential future variables:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Rules:

- `PUBLIC_*` variables may be exposed to browser code when safe.
- `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to browser code.
- secrets belong in Cloudflare environment variables, not git.
- `.env` files must stay ignored.

For the first lead-capture implementation, prefer server-side insertion so sensitive write access stays off the client.

## Validation And Spam Protection

Before production launch, the intake endpoint should include:

- required field validation
- email format validation
- maximum field lengths
- server-side sanitization or safe storage handling
- basic rate limiting or bot protection
- optional Cloudflare Turnstile if spam becomes likely

## Email Notifications

Use Resend for future lead/contact notification emails.

Planned behavior after lead capture exists:

- store the project lead or contact message in Supabase first
- send a notification email through Resend after successful storage
- do not let email failure delete or block the stored lead
- log or track notification failure for later review

Required future environment variables:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEAD_NOTIFICATION_EMAIL`

## Future Customer Portal

A future Eventnexus customer portal may use Supabase for:

- customer authentication
- project records
- project status updates
- files or links
- invoices or payment references
- messages or follow-up notes

This is not part of the first public website scope.

## Migration Timing

Do not create production tables until:

- the Astro scaffold exists
- the intake flow UI is implemented or clearly specified
- final field names are confirmed
- security policy is reviewed
- environment variable strategy is documented

## Schema

The lead-capture table is defined in `supabase/leads-schema.sql`.

Apply it to the production Supabase project by:

1. Opening the Supabase dashboard for project `yzsoczlghgcqitevamfo`.
2. Going to **SQL Editor**.
3. Pasting the contents of `supabase/leads-schema.sql`.
4. Running the query.
5. Verifying that RLS is enabled on `public.project_leads` and the admin UI reflects the policy restrictions.

Current table: `project_leads`

Key fields:
- `id`, `created_at`, `updated_at` — `updated_at` is maintained by a trigger on row modifications
- `status`, `lead_score`
- Contact fields: `full_name`, `email`, `phone_or_channel`, `company_name`, `region`
- Project fields: `project_type`, `project_title`, `idea_description`, `target_users`, `problem_to_solve`, `desired_outcome`
- Arrays: `required_features`, `technical_needs`, `integrations`
- Qualification: `timeline`, `budget_range`, `project_status`
- Assets: `existing_domain`, `existing_url`, `existing_repo`, `existing_brand_assets`
- Notes: `extra_notes`

Admin access:
- Public/anonymous users can insert leads only.
- No SELECT, UPDATE, or DELETE is allowed for roles that respect RLS.
- Admin reads/writes are performed server-side with `SUPABASE_SERVICE_ROLE_KEY`, which bypasses RLS.

A `contact_messages` table remains planned and is not part of the first migration.

## Current Decision Status

Supabase will be used first for structured project leads, simple contact messages, and later admin review data. Customer portal features remain future scope.

The `project_leads` table schema and RLS policies are defined in `supabase/leads-schema.sql` and are ready to be applied to the Supabase dashboard.
