# Eventnexus Task Plan

This document tracks the project from a near-zero starting point into a deployable company website and future service platform.

## Task Writing Standard

All tasks in this document should be written as specific, outcome-focused tickets rather than broad activity notes. Every task should include:

- Description
- User Story
- Acceptance Criteria
- Definition of Done
- EST, RT, and QA fields

This structure should be used for every new task going forward so that each item is clear, testable, and implementation-ready.

## Phase 0 - Foundation

- [x] Capture initial project context in `info.txt`.
- [x] Create a structured task plan.
- [x] Create an agent workflow document.
- [x] Create an agent rules document.
- [x] Create stable project memory.
- [x] Initialize local git repository.
- [x] Create GitHub repository.
- [x] Push the foundation files to GitHub.

## Phase 1 - Product Definition

- [x] Define the exact purpose of the first public website.
- [x] Define the primary audience:
  - individuals with platform or SaaS ideas
  - solo founders and early-stage project creators
  - small, medium, and large companies
  - service companies
  - teams needing custom platforms, portals, automations, or internal tools
- [x] Define core services:
  - idea discovery and project structuring
  - company websites and landing pages
  - SaaS-style platforms, portals, and service platforms
  - frontend and backend development
  - databases, authentication, and admin dashboards
  - payment integrations and checkout flows
  - integrations, automations, and AI-assisted workflows
  - deployment, domain setup, launch, maintenance, and future improvements
- [x] Define proof points, including `rootwise.site`.
- [x] Draft homepage copy.
- [x] Draft service-page copy.
- [x] Draft contact/lead-capture flow.

## Phase 2 - Technical Architecture

- [x] Choose frontend framework.
- [x] Choose styling/design system approach.
- [x] Define Cloudflare deployment target.
- [x] Define Supabase usage:
  - contact forms
  - leads
  - admin data
  - future customer portal
- [x] Define environment variables.
- [x] Define security rules for secrets and public configuration.
- [x] Create local development setup instructions.

## Phase 3 - Website Build

- [x] Create first application scaffold.
- [x] Fix global.css not working.
- [x] Implement homepage.
- [x] Implement legal/footer basics.
- [x] Implement responsive layout.
- [x] Implement services section.
- [x] Implement proof/work section.
- [x] Implement contact flow.
- [x] Add analytics plan if needed.
- [x] Add Google Analytics (GA4) with Measurement ID G-S8SSSCPTG9.
- [x] Verify mobile and desktop layouts.

## Phase 4 - Backend And Integrations

- [x] Connect Supabase when a concrete data need exists.
- [x] Add lead capture table and policies.
- [x] Add server-side validation for form submissions.
- [x] Add email notification workflow if needed.
- [x] Fix project request submission 500 error.
- [ ] Add payment-provider planning for future service products.

## Phase 4A - Admin Operations Foundation

### ADM-002: Create admin auth tables and Supabase Auth configuration

### Task Description

Set up the database tables and Supabase Auth settings required for admin authentication before any admin routes or UI are built.

## User Story

> As an admin user, I want to sign in with a secure account so that only authorized team members can access the admin workspace.

## Acceptance Criteria

- Supabase Auth email/password and magic link are enabled for the Eventnexus project.
- A `profiles` table exists with auth user ID and role column.
- An optional `admin_users` table exists for Phase 4A admin membership if profiles alone is insufficient.
- Initial admin user is created in the Supabase Auth users table with role `admin`.
- RLS is enabled on `profiles` so users can read their own role and admins can read all user roles.

## Definition of Done

- Supabase Auth settings are updated.
- Migration SQL for `profiles` (and `admin_users` if needed) is committed.
- At least one admin user exists with role `admin`.
- RLS policies for `profiles` are defined and documented.

**EST:** 3 SP

**RT:**
**QA:**

- [x] Task ID: ADM-002

> Completed in `infra/supabase-admin-auth`. Migration SQL for `profiles` and optional `admin_users` committed. RLS policies defined in `supabase/profiles-schema.sql`. Manual Supabase dashboard steps (enable email/magic link auth, create initial admin user) documented in `supabase/admin-auth-setup.md`.

---

### ADM-003: Implement server-side admin auth helpers and middleware

### Task Description

Add server-side auth helpers and Astro middleware to protect `/admin/*` routes using Supabase Auth session validation and admin role checks.

## User Story

> As an admin user, I want the application to enforce protected access to `/admin/*` so that unauthenticated or unauthorized users cannot reach the admin workspace.

## Acceptance Criteria

- A server-side auth helper validates Supabase Auth sessions and reads the admin role.
- Astro middleware protects all `/admin/*` routes.
- Unauthenticated requests redirect to `/admin/login`.
- Authenticated non-admin requests return 403 Forbidden.
- No client-side code exposes tokens, redirect logic, or lead data.

## Definition of Done

- `src/middleware.ts` protects `/admin/*`.
- `src/lib/auth/session.ts` exports a server-side admin session helper.
- `src/pages/admin/login.astro` exists as a placeholder or working sign-in page.
- `src/pages/api/admin/auth/login.ts`, `logout.ts`, and `me.ts` are implemented.
- Secrets remain server-side only.

**EST:** 5 SP

**RT:**
**QA:**

- [ ] Task ID: ADM-003

---

### ADM-004: Build admin project board list page

### Task Description

Implement the admin project board view with server-side data fetching, filters, and row navigation to project detail pages.

## User Story

> As an admin user, I want to view all project requests on a board so that I can review status, timeline, and budget at a glance.

## Acceptance Criteria

- The project board renders a table on desktop and stacked cards on mobile.
- Filters exist for status, project type, timeline, budget range, and date range.
- Each project row or card shows title, lead name, project type, status, timeline, budget range, and created/updated dates.
- Clicking a project opens `/admin/projects/[id]`.
- Data is fetched server-side through an admin-protected API route.

## Definition of Done

- `src/pages/admin/index.astro` renders the project board.
- `src/pages/api/admin/projects.ts` returns filtered project data.
- Board component uses server-side data only.
- Board loads without client-side auth logic.
- Mobile layout is readable and accessible.

**EST:** 3 SP

**RT:**
**QA:**

- [ ] Task ID: ADM-004

---

### ADM-005: Build admin project detail view with status management

### Task Description

Implement the project detail page showing lead data, internal notes, status tracker, and allowed status transitions.

## User Story

> As an admin user, I want to open a project detail page so that I can review full lead information and update the project lifecycle status.

## Acceptance Criteria

- The detail page shows lead contact info, project info, scope, timeline, budget, existing assets, internal notes, status, and communication history.
- Admin can edit internal notes, lead score, next action, follow-up date, assigned admin, and project value estimate.
- Admin can transition the project status using allowed transitions only.
- Invalid transitions return a clear error without changing data.
- Every transition records admin user ID and timestamp.

## Definition of Done

- `src/pages/admin/projects/[id].astro` renders the detail view.
- `src/pages/api/admin/projects/[id].ts` handles project detail fetch and update.
- `src/pages/api/admin/projects/[id]/status.ts` validates and applies status transitions.
- Status transition rules from `admin-operations.md` are enforced server-side.
- Audit transition events are recorded.

**EST:** 5 SP

**RT:**
**QA:**

- [ ] Task ID: ADM-005

---

### ADM-006: Implement admin client messaging API and UI shell

### Task Description

Implement the messaging API and a minimal admin messaging UI for sending templated and custom client messages.

## User Story

> As an admin user, I want to send and review client communication messages so that I can keep clients informed without leaving the admin workspace.

## Acceptance Criteria

- Admin can select a message template or write a custom message in the project detail view.
- Messages are stored server-side before sending.
- Emails are sent via Resend to the lead email address.
- Message history is visible in the project detail view.
- Failed email sends do not delete the stored message.

## Definition of Done

- `src/pages/api/admin/projects/[id]/messages.ts` stores and sends messages.
- Message type templates exist for acknowledgment, clarification request, proposal sent, status update, and delivery notification.
- Resend errors are logged without blocking message storage.
- Project detail view lists message history and includes a send-message form.
- Lead email address is not exposed in client responses.

**EST:** 5 SP

**RT:**
**QA:**

- [ ] Task ID: ADM-006

---

### ADM-007: Apply Supabase schema and RLS policies for admin tables

### Task Description

Create the `projects` and `project_messages` tables and apply RLS policies so that only authenticated admin access is allowed server-side.

## User Story

> As an admin user, I want secure admin data storage so that project data and messages remain private and only accessible through protected server-side routes.

## Acceptance Criteria

- `projects` table exists with lifecycle status, admin notes, lead score, next action, follow-up date, assigned admin, and project value estimate.
- `project_messages` table exists with sender type, sender email, message type, subject, body, and email delivery fields.
- RLS denies public SELECT/INSERT/UPDATE/DELETE on both tables.
- Server-side API routes use `SUPABASE_SERVICE_ROLE_KEY` for admin access.
- Admin reads and writes are allowed only after role verification.

## Definition of Done

- Migration SQL for `projects` and `project_messages` is committed.
- RLS policies are documented in `supabase/leads-schema.sql` or a new `supabase/admin-schema.sql`.
- API routes use server-side Supabase client with service role key.
- RLS policies are verified in the Supabase dashboard.

**EST:** 3 SP

**RT:**
**QA:**

- [ ] Task ID: ADM-007

---

### ADM-008: Add smoke tests for admin access and status transitions

### Task Description

Add automated smoke tests covering admin login protection, invalid status transitions, and basic admin project flows.

## User Story

> As an admin user, I want reliable admin workspace behavior so that access control and status workflow errors are caught before they affect delivery.

## Acceptance Criteria

- A test verifies that unauthenticated requests to `/admin/*` redirect to `/admin/login`.
- A test verifies that authenticated non-admin requests to `/admin/*` return 403.
- A test verifies that invalid status transitions return 400 and do not change project status.
- A test verifies that allowed status transitions update status and record metadata.

## Definition of Done

- Playwright tests exist for protected admin access and status transition rules.
- Tests can run with `npm test`.
- Tests do not depend on real secrets.

**EST:** 3 SP

**RT:**
**QA:**

- [ ] Task ID: ADM-008

---

## Phase 5 - Deployment

- [x] Connect GitHub repository to Cloudflare.
- [x] Configure Cloudflare build settings.
- [x] Configure environment variables in Cloudflare.
- [x] Deploy preview environment.
- [x] Verify production build.
- [x] Move `eventnexus.eu` DNS when ready.
- [x] Verify SSL, redirects, and canonical domain.
- [x] Add sitemap.txt for Google Search Console.
- [x] Add robots.txt for AI search crawlers.

## Phase 6 - Quality And Maintenance

- [x] Add linting and formatting.
- [x] Add smoke tests for critical pages.
- [x] Add accessibility checks.
- [x] Add content review checklist.
- [x] Add release checklist.
- [ ] Keep `project-memory.md` updated with decisions.

## Phase 7 - Internationalization

- [x] Add i18n translation infrastructure (src/i18n/)
- [x] Translate all page content to English, Russian, German, Finnish, Estonian
- [x] Translate all form fields, buttons, and UI labels
- [x] Add language switcher component to navigation
- [x] Update pages for locale-aware routing
- [x] Verify translations across all pages
- [x] Update docs for i18n decisions

## Immediate Next Steps

1. Initialize git locally.
2. Create the GitHub repository.
3. Push this documentation foundation.
4. Decide first app stack and deployment target.
5. Build the first public version of the Eventnexus website.
6. Add multi-language support (EN, RU, DE, FI, ET).
7. Start the admin operations foundation task (ADM-001) with authentication, dashboard concepts, and a future client/freelancer workflow plan.
