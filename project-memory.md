# Eventnexus Project Memory

This file stores stable context and decisions for future agents.

## Project Identity

- Project name: Eventnexus.eu
- Primary domain: `https://eventnexus.eu`
- Business purpose: company website and future service-platform hub
- Core offer: turnkey digital solutions using modern AI-assisted workflows
- Services include: websites, service platforms, frontend, backend, payments, automation, deployment, and maintenance
- Example previous work: `rootwise.site`

## External Services

### Supabase

- Project name: `Eventnexus.eu`
- Project ID: `yzsoczlghgcqitevamfo`
- Region: `eu-north-1` / North EU, Stockholm
- Current intended use: structured project leads, simple contact messages, admin review data, and future customer portal features
- First implementation rule: use server-side insertion through Astro API routes or Cloudflare Pages Functions; do not expose service-role keys to the browser
- Connection status: connected via `@supabase/supabase-js` in server-side Astro API routes
- Secrets: not stored in this repository

### Domain

- Domain: `eventnexus.eu`
- Ownership: owned by the project creator
- Current state: currently connected to another service that is down
- DNS migration rule: do not move production DNS until the new deployment is verified

### GitHub

- Repository: `https://github.com/pikkst/Eventnexus.eu`
- Purpose: source control and Cloudflare deployment connection

### Cloudflare

- Intended use: Cloudflare Pages hosting and deployment through GitHub
- Deployment target decision: Cloudflare Pages connected to the GitHub repository
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Current state: Astro Cloudflare adapter configured with `@astrojs/cloudflare` for on-demand API routes; Pages project connection pending

### Analytics

- Analytics provider decision: use Cloudflare Web Analytics for v1 (privacy-first, no cookies).
- Beacon token: configured via `PUBLIC_ANALYTICS_ID`
- Script: `https://static.cloudflareinsights.com/beacon.min.js` injected only after user consent.
- Consent: managed client-side with `localStorage` key `analytics-consent` (`granted` or `denied`); no request is sent before affirmative consent.
- Data collected: page views, referrers, countries, devices, and basic path data only; never lead or form field data.
- Implementation rule: `Analytics.astro` is the single source of truth for beacon injection; it checks `localStorage`, guards against duplicate `script[data-cf-beacon]` elements, and listens for `analytics-consent-changed` events. `PrivacyConsent.astro` renders the banner and manages `localStorage` only; it does not inject analytics.
- Consent revocation: footer "Privacy settings" button clears `analytics-consent` and reloads the page so the banner reappears.
- Environment variables: `PUBLIC_ANALYTICS_ID` (beacon token), `PUBLIC_ANALYTICS_ENABLED` (optional toggle, defaults to `true`).
- Data rules: collect only page views, referrers, countries, devices, and basic path data; never attach lead or form field data.
- Retention: analytics data follows Cloudflare's retention policy; lead retention is up to 3 years or until deletion request; application logs up to 1 year; Resend webhook events up to 1 year.
- Cleanup: `scripts/cleanup-webhook-events.ts` and `scripts/cleanup-leads.ts` run server-side deletion via `SUPABASE_SERVICE_ROLE_KEY`; npm scripts `npm run cleanup:webhook-events` and `npm run cleanup:leads` are available. Cloudflare runtime logs follow Cloudflare's own retention and are not directly cleanupable via repository scripts.

### SEO And Crawlers

- Primary domain: `https://eventnexus.eu`
- Sitemap: `public/sitemap.txt` contains plain-text URLs for all canonical locale pages.
- robots.txt: `public/robots.txt` allows all standard and AI search crawlers; disallows `/api/` and webhook paths.
- Files are static and copied as-is by Astro; no build step needed.

### Resend

- Intended use: lead/contact notification emails
- Environment variables: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LEAD_NOTIFICATION_EMAIL`, `RESEND_WEBHOOK_SECRET`
- Current state: configured; `src/lib/resend/server.ts` sends notification emails after successful Supabase lead insertion; email failures are logged and do not block successful lead storage
- Webhook endpoint: `POST /api/webhooks/resend` verifies Resend HMAC signature and logs email event type
- Sender email: `admin@eventnexus.eu`
- Secrets: not stored in this repository

## Current Decisions

- Start with documentation and workflow foundation before application code.
- Keep the first website professional, direct, and service-focused.
- The first public website exists to present Eventnexus as an affordable turnkey web-platform builder and convert visitors into qualified project leads through a structured idea-intake form.
- The primary audience is broad: individuals, founders, small businesses, medium-sized companies, large organizations, service companies, and teams that need custom platforms or digital workflows.
- Core services cover the full path from idea to turnkey launch: discovery, planning, UX, frontend, backend, databases, authentication, admin dashboards, payments, integrations, automations, AI-assisted workflows, deployment, domain setup, maintenance, and future improvements.
- Initial proof points include `rootwise.site`, `rootwise`, `rootwisePRO`, `LeadScout-Pro-AI`, `AetherForecast-AI`, `Studio`, `OmniAgent`, `EventNexus`, and `EventNexus_Live_Map`; public claims should stay careful until each example is reviewed.
- First homepage copy direction: lead with "Eventnexus builds your idea into a working web platform" and guide visitors toward a structured project request.
- First services page copy direction: explain turnkey delivery in detail, with service categories for discovery, websites, platforms, frontend, backend, payments, integrations, AI-assisted workflows, deployment, launch, and maintenance.
- First lead-capture direction: use a multi-step structured project request form that qualifies contact identity, project type, idea description, features, technical needs, timeline, budget, integrations, and submission consent.
- Frontend framework decision: use Astro with TypeScript for the first public website, static-first, with React islands only if the intake flow needs richer interactivity.
- Styling/design system decision: use Tailwind CSS with project-owned CSS variable tokens and lean Astro components; avoid heavy prebuilt UI frameworks for the first version.
- Cloudflare deployment target decision: use Cloudflare Pages connected to GitHub, production branch `main`, build command `npm run build`, output directory `dist`; do not move `eventnexus.eu` DNS until the Pages deployment is verified.
- Supabase usage decision: use Supabase first for `project_leads`, optional `contact_messages`, lead statuses, and later admin review data; full customer portal features remain future scope.
- Environment variable names are defined in `environment-variables.md` and `.env.example`; real values must stay in local `.env` files or Cloudflare Pages environment variables, never in git.
- Email provider decision: use Resend for future lead/contact notification emails.
- Security rule decision: only `PUBLIC_*` variables may be treated as browser-visible; service-role keys, Resend keys, Turnstile secrets, Cloudflare tokens, lead data, and customer data must stay server-side/private and out of git.
- Local development setup is documented in `local-development.md`; current repo is documentation-first and the next phase creates the Astro/Tailwind scaffold.
- Use GitHub as the source of truth for code.
- Use Cloudflare for deployment when the application scaffold is ready.
- Connect Supabase only when a real backend feature is defined.
- Lead submissions flow through `src/pages/api/submit-lead.ts`, which validates payloads, enforces abuse protection (Turnstile verification, rate limiting, request size guard, field allowlists, honeypot, minimum completion time, duplicate suppression), and inserts into Supabase using `SUPABASE_SERVICE_ROLE_KEY` server-side.
- Add `src/lib/supabase/server.ts` for server-only Supabase client creation.
- Cloudflare adapter `@astrojs/cloudflare` is configured to support on-demand API routes during static build.
- Tailwind configuration must live at repo root as `tailwind.config.mjs` with `content` paths and project token colors.
- `@astrojs/tailwind` integration must use explicit `configFile: './tailwind.config.mjs'` and `applyBaseStyles: false`; `@tailwind` directives belong in `src/styles/global.css`, which is imported by `BaseLayout.astro`.
- Do not place duplicate `@tailwind` directives in both `global.css` and inline `<style is:global>` blocks; that breaks PostCSS processing.
- Internationalization decision: support English (en), Russian (ru), German (de), Finnish (fi), and Estonian (et) for all public-facing content, form fields, buttons, and navigation labels. Translation data lives in `src/i18n/translations.ts` as a `Record<Language, TranslationKeys>`; `src/i18n/index.ts` exports `getTranslations(locale)`, `languages`, and `defaultLanguage`. Language switcher component is `src/components/LanguageSwitcher.astro`. Locale-aware routing uses dynamic `src/pages/[locale]/` pages with a root `src/pages/index.astro` redirect based on detected language. Default language is English. Non-English locales currently fall back to English via `deepMerge` for missing keys.
- Admin workspace decision: create a secure internal workspace first with authenticated admin access, a project board, project detail pages, and a simple status workflow before opening any client-facing portal features. Admin dashboard planning is documented in `admin-operations.md`.
- Admin auth approach: use Supabase Auth with email/password or magic link; protect `/admin/*` with Astro middleware; set HTTP-only session cookies; verify admin role server-side before allowing access; disable public sign-ups for the admin workspace.
- Admin role model: `admin` role for Phase 4A; roles are stored in a `profiles` table with RLS enabled; server-side code validates role before any admin route access.
- Admin protected routes: all `/admin/*` paths are protected by middleware and API route guards; no secret or lead data is exposed in client-side code.
- Project board layout: desktop uses a table with project title, lead name, project type, status, timeline, budget range, created and updated dates; mobile uses stacked cards; filters by status, project type, timeline, budget, and date range.
- Project lifecycle states: `new`, `reviewed`, `accepted`, `in_progress`, `awaiting_client_input`, `delivered`, `completed`, `blocked`, `on_hold`, `archived`, `rejected`; explicit transition rules govern valid state changes; every transition records admin user and timestamp.
- Client communication flow: email-based communication triggered from the admin workspace; messages stored server-side in `project_messages` table before sending; Resend used for delivery; standard templates defined for acknowledgment, clarification request, proposal sent, status update, and delivery notification.
- Messaging security: lead email addresses are never exposed in client responses; message content is not logged in full in production; messaging API requires admin authentication.
- Freelancer marketplace safeguards: milestone-based work with client approval checkpoints, evidence of delivery, escrow-style payment release, dispute workflow, audit log, client limits, and freelancer vetting; marketplace is not implemented in Phase 4A but safeguards are documented for future phases.

## Admin Auth Decisions

- Admin auth uses Supabase Auth with email/password and magic link; email sign-ups are disabled so only manually created or invited users can access admin accounts
- Admin role storage: primary source of truth is the `profiles` table with `id` (UUID FK to `auth.users(id)` ON DELETE CASCADE), `role`, `created_at`, `updated_at`; optional `admin_users` table also exists but is not required for Phase 4A
- Initial admin user must be created manually in the Supabase dashboard and linked to a `profiles` row with `role = 'admin'`
- RLS policies for `profiles`: users can read their own profile; admins can read/update all profiles; the `profiles_update_own` policy was removed to prevent privilege escalation; user profile updates go through a SECURITY DEFINER function (`profiles_update`) that only allows `full_name` and `email` changes; role changes go through `profiles_set_role` which requires admin privileges; a BEFORE UPDATE trigger prevents non-admin users from changing the `role` column via direct UPDATE; admin policies use `public.is_admin()` SECURITY DEFINER function instead of recursive `EXISTS (SELECT 1 FROM public.profiles ...)` subqueries to avoid infinite RLS recursion
- Migration SQL for `profiles` lives in `supabase/migrations/202508120001_create_profiles.sql`; optional `admin_users` migration lives in `supabase/migrations/202508120002_create_admin_users.sql`; database tests live in `supabase/tests/test_01_anon_cannot_read_profiles.sql` through `test_12_auth_cannot_delete_leads.sql`
- Supabase CLI project structure is initialized with `supabase init`; local database managed via `supabase db reset`; remote project linked with `supabase link --project-ref yzsoczlghgcqitevamfo`; migrations deployed with `supabase db push`; old manual schema files (`supabase/*-schema.sql`) were replaced by versioned migrations under `supabase/migrations/`
- CI verifies migrations and RLS tests from a clean database using `supabase db reset` and `supabase db query --file`
- Production changes are applied through documented migration commands, not copy-paste SQL; previously applied migrations are never edited in place; fixes use new forward migrations
- Server-side code must use `SUPABASE_SERVICE_ROLE_KEY` for admin data operations that bypass RLS; never expose service-role keys to the browser
- A follow-up migration `supabase/migrations/202508120005_fix_admin_rls.sql` revokes unnecessary `anon` grants from `profiles` and `admin_users`, and replaces recursive `admin_users` RLS policies with `public.is_admin()` checks
- Admin auth session helper lives at `src/lib/auth/session.ts`; it verifies Supabase Auth access tokens from HTTP-only cookies, refreshes expired tokens using refresh-token cookies, and checks the `profiles.role` via service-role client before granting admin access
- Astro middleware at `src/middleware.ts` protects all `/admin/*` routes; it redirects unauthenticated requests to `/admin/login`, allows authenticated admins through, and refreshes session cookies when tokens are near expiry
- Admin login page is `src/pages/admin/login.astro` (server-rendered, not prerendered); it posts credentials to `/api/admin/auth/login` and sets HTTP-only `sb-access-token` and `sb-refresh-token` cookies on success
- Admin API routes: `POST /api/admin/auth/login` validates credentials and admin role, `POST /api/admin/auth/logout` clears session cookies, `GET /api/admin/auth/me` returns the current admin session or `authenticated: false`
- Initial admin seed documentation lives at `supabase/seed-admin.md`; a placeholder seed SQL file exists at `supabase/seed-admin.sql` but must be edited with a real `auth.users(id)` UUID before running
- Cookie options: `path=/`, `httpOnly=true`, `secure=true`, `sameSite=lax`; access-token max-age matches Supabase session expiry, refresh-token max-age is 30 days

## Open Decisions

- `project_leads` schema and RLS policies are defined in `supabase/migrations/202508120003_create_project_leads.sql`; direct anon and authenticated INSERT policies have been removed to block bypass of server-side validation; all writes go through `/api/submit-lead` with Turnstile verification, rate limiting, request size guard, field allowlists, honeypot, minimum completion time, duplicate suppression, and structured server-side logging; SELECT/UPDATE/DELETE remain deny-all for anon and authenticated roles; database tests in `supabase/tests/test_08_anon_cannot_read_leads.sql` through `test_12_auth_cannot_delete_leads.sql` cover all roles and operations
- Admin auth tables and Supabase Auth configuration are implemented in the repository; live Supabase email/password and magic-link Auth settings, public sign-up policy, and at least one real admin user linked to a `profiles` row with `role = 'admin'` still require external verification.
- Admin operations foundation planning is complete and documented in `admin-operations.md`; ready for implementation.
- Admin dashboard MVP direction: create a secure internal workspace first with authenticated admin access, a project board, project detail pages, and a simple status workflow before opening any client-facing portal features.
- Planned admin capabilities for v1: secure sign-in, project list and filtering, status tracking, internal notes, direct messaging to clients, and explicit handoff states for active work.
- Future platform direction: add a client portal so real clients can log in, view their project progress, and send direct messages to the admin team; later extend into a freelancer marketplace where clients can publish projects, freelancers can bid or accept work, and payments are released only after delivery is approved.
- Freelancer marketplace design rule: the system must include clear milestones, approval checkpoints, evidence of delivery, and dispute-safe payment logic before any real money movement is introduced.

## Quality Bar

The project should feel like a capable company building serious systems, not a generic AI landing page. Content, design, and engineering choices should support trust, clarity, and practical delivery.

## CI And Testing

- GitHub Actions workflow runs on pull requests and pushes to `main`
- Workflow jobs: format check, lint, type check (`astro check`), build, Supabase migration verification (fresh local database with `supabase db reset` and RLS tests), and Playwright E2E tests
- Playwright tests run against production-like built output via `playwright.build.config.ts` using `serve`
- Playwright config includes both `chromium` (desktop) and `chromium-mobile` projects
- Tests cover mobile navigation, anti-bot protections, invalid input, rate limiting, oversized requests, webhook signature validation, expiry, and duplicate delivery
- Analytics tests run separately via `playwright.analytics.config.ts` against pre-built analytics-enabled/disabled outputs
