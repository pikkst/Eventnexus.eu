# Eventnexus Admin Operations Foundation

This document defines the planning scope for Phase 4A admin operations, covering secure authentication, project board layout, project lifecycle states, client communication flow, future freelancer marketplace safeguards, and the technical approach for implementation.

## Admin Workspace Scope

### What Is Included In Phase 4A

- Secure admin authentication using Supabase Auth with email/password or magic link
- Protected admin route group inside the Astro application
- Project board view with status, timeline, and budget indicators
- Project detail view showing lead data, internal notes, and communication history
- Project lifecycle status management with allowed transitions
- Internal client communication messaging (admin to lead email or in-app notes)
- Role model: admin role for internal team members

### What Is Excluded From Phase 4A

- Public client login or customer portal
- Freelancer accounts, bidding, or marketplace features
- Payment processing or invoices
- Real-time notifications or websockets
- Public project visibility outside the admin workspace
- Client self-service project updates

These remain future phases and are addressed in the Freelancer Marketplace Safeguards section below.

## Authentication And Role Model

### Authentication Approach

Use Supabase Auth for admin authentication.

Recommended admin auth flow:

1. Admin navigates to `/admin`.
2. If no valid session exists, redirect to `/admin/login`.
3. Admin enters email and password.
4. Server-side Astro API route calls Supabase Auth to sign in.
5. On success, set an HTTP-only session cookie on the Eventnexus domain.
6. On subsequent requests, server-side middleware validates the session using Supabase Auth.
7. If the session is valid and the user has the admin role, allow access to `/admin/*`.
8. If the session is invalid, redirect to `/admin/login`.

Session cookie rules:

- use HTTP-only cookies so JavaScript cannot read the token
- use `SameSite=Lax` or `Strict` where compatible with the deployment target
- set `secure` to true in production
- use a short lived access token and refresh token pattern provided by Supabase Auth
- never store the access token in localStorage or sessionStorage on the client

### Admin Identity

Admin identity is managed through Supabase Auth.

Recommended auth configuration:

- enable email/password sign-in for admin users
- enable magic link as a backup for admin access
- disable public sign-ups if the Supabase project allows it, so only invited users can create accounts
- treat the first admin as a manually created user in the Supabase dashboard

### Role Model

Supabase Auth stores the user. Application-level roles are stored in a `profiles` or `admin_users` table.

Recommended role model for Phase 4A:

- `admin` - full access to the admin workspace, project board, project details, and internal messaging
- `super_admin` (future) - access to user management and sensitive configuration
- `client` (future) - access to a client-facing portal
- `freelancer` (future) - access to marketplace features

For Phase 4A, only `admin` is implemented.

Role verification flow:

1. After Supabase Auth validates the session, read the `profiles` table for `role`.
2. If the role is `admin`, allow access.
3. If the role is missing or not `admin`, return 403.
4. The `profiles` table should have RLS enabled so users can read only their own role and admins can read all user roles.

### Protected Admin Routes

Astro middleware should protect all `/admin/*` routes.

Middleware behavior:

- for paths starting with `/admin`, check for a valid Supabase Auth session
- if no session exists, redirect to `/admin/login`
- if session exists but user role is not `admin`, return 403 Forbidden page
- do not expose admin data or redirect logic in client-side code

Server-side guard pattern:

- all `/admin/api/*` routes should also validate the admin session server-side before responding
- never trust client-side role flags alone

## Project Board Layout

### Board Purpose

The project board is the admin's primary workspace for reviewing incoming project requests and tracking delivery progress.

The board should answer:

- which projects are new
- which are in progress
- which are awaiting client input
- which are blocked
- which are completed or archived

### Board Layout

Recommended desktop layout:

- header with project board title and filter controls
- sidebar or top bar with status filter chips
- table with columns: project title, lead name, project type, status, timeline, budget range, created date, last updated date
- row click opens the project detail view for that lead
- mobile layout: stacked cards instead of a wide table

Recommended filters:

- status: all, new, reviewed, in progress, awaiting response, completed, archived
- project type
- timeline range
- budget range
- date range
- lead score

### Project Detail View

The project detail view should show all fields from the lead submission plus admin-managed fields.

Sections:

- lead contact info: name, email, phone/channel, company, region
- project info: type, title, description, target users, problem, desired outcome
- scope: required features, technical needs, integrations
- timeline and budget
- existing assets: domain, url, repo, brand assets
- internal notes: editable text area for admin observations
- status tracker: current lifecycle status with allowed transitions
- communication history: list of messages sent to or received from the client
- send message form: quick template or free-text message

## Core Project Lifecycle States

### Status Definitions

Status labels should map to the actual project delivery lifecycle, not just lead review stages.

Recommended lifecycle states:

- `new` - lead just submitted, not yet reviewed
- `reviewed` - admin has seen the lead and decided to proceed
- `accepted` - project is accepted and work is starting
- `in_progress` - active development or delivery is underway
- `awaiting_client_input` - waiting for the client to answer questions or approve concepts
- `delivered` - work is complete and submitted to the client
- `completed` - client has accepted delivery and any final items
- `blocked` - work cannot proceed due to an unresolved issue
- `on_hold` - project is paused by mutual agreement
- `archived` - project is closed and moved out of active workflow
- `rejected` - project is not being pursued

### Status Transition Rules

Transitions should be explicit to prevent invalid state changes.

Allowed transitions:

- `new` -> `reviewed`
- `new` -> `rejected`
- `reviewed` -> `accepted`
- `reviewed` -> `rejected`
- `reviewed` -> `new`
- `accepted` -> `in_progress`
- `in_progress` -> `awaiting_client_input`
- `in_progress` -> `delivered`
- `in_progress` -> `blocked`
- `in_progress` -> `on_hold`
- `awaiting_client_input` -> `in_progress`
- `awaiting_client_input` -> `blocked`
- `blocked` -> `in_progress`
- `blocked` -> `on_hold`
- `on_hold` -> `in_progress`
- `on_hold` -> `archived`
- `delivered` -> `completed`
- `delivered` -> `in_progress`
- `completed` -> `archived`
- `rejected` -> `archived`
- any active status -> `archived` (admin override)

Transition rules:

- every transition should record the admin user ID and timestamp
- transitions to terminal states (`archived`, `rejected`) should require a confirmation step
- transitions from `delivered` back to `in_progress` should require a note explaining why
- the system should display an error if an invalid transition is attempted

### Project Metadata

Admin-managed fields for each project:

- `status` - current lifecycle state
- `admin_notes` - free-form internal notes
- `lead_score` - numeric score for prioritization
- `next_action` - text description of the next admin task
- `follow_up_date` - optional date for follow-up
- `assigned_admin_id` - which admin owns this project
- `project_value_estimate` - optional internal estimate

## Client Communication Flow

### Communication Purpose

The admin workspace needs a way to communicate with clients about their project without exposing the full admin workspace.

Recommended first version: email-based communication triggered from the admin workspace.

### First Communication Flow

1. Admin opens a project detail page.
2. Admin selects a quick template or writes a free-text message.
3. Admin previews the message and clicks send.
4. Server-side Astro API route stores the message in a `project_messages` or `communications` table.
5. Server-side route sends an email via Resend to the lead email address.
6. Response is recorded as tied to the project.
7. Admin can view the message history in the project detail view.

### Allowed Message Types

Templates for common communication:

- `acknowledgment` - we received your request and will review it
- `clarification_request` - we need more information before we can proceed
- `proposal_sent` - we sent a proposal or estimate
- `status_update` - brief update on current progress
- `delivery_notification` - we delivered the work for your review
- `custom` - free-text message from admin

### Communication Rules

- all outbound messages are stored server-side before sending
- inbound replies from the lead are stored when they arrive, but realtime is not required for Phase 4A
- the system should not expose lead email addresses to unauthorized users
- messages should not be exposed publicly
- keep Resend failure handling aligned with the existing lead notification approach: log the failure but do not erase the stored message

### Security For Messaging

- client email addresses are stored server-side and never exposed in client responses
- message content is considered sensitive and is not logged in full in production
- the messaging API requires admin authentication

## Future Freelancer Marketplace Safeguards

### Why Marketplaces Need Safeguards

A freelancer marketplace introduces money movement, third-party contributors, and client-bidding behavior. These require explicit guard rails before real transactions are allowed.

### Planned Safeguards

- milestone-based work: every project is divided into visible milestones before work begins
- client approval checkpoints: each milestone requires explicit client approval before the next milestone unlocks
- evidence of delivery: milestone completion requires artifact submission (demo, delivery file, or link)
- escrow-style release logic: payments are held until delivery is approved or a dispute is resolved
- dispute workflow: both client and freelancer can raise a dispute; an admin resolves it
- audit log: every status change, approval, and payment event is recorded with admin ID and timestamp
- client limits: new clients may have lower spending limits or require pre-approval
- freelancer vetting: freelancer onboarding includes verification before they can accept paid work
- chargeback handling: the system records external payment events and retains evidence

### Milestone Structure

Recommended milestone states:

- `pending` - milestone is defined but work has not started
- `in_progress` - freelancer is actively working
- `submitted` - freelancer submits delivery for review
- `approved` - client or admin approves delivery
- `rejected` - client or admin rejects delivery with feedback
- `paid` - payment is released to the freelancer
- `disputed` - the milestone is in dispute

Milestone rules:

- project cannot move to `paid` without an `approved` milestone
- only one active `in_progress` milestone per project unless explicitly allowed
- rejected milestones allow resubmission
- dispute resolution is an admin action with recorded reasoning

### Payment Release Logic

- payment is released only after an `approved` milestone
- release action records the admin ID, timestamp, amount, and milestone ID
- refunds or reversals require admin action and are logged
- payment status should be queryable for accounting and dispute review

### Marketplace Roadmap

Phase 4A defines the safeguards but does not implement the marketplace. Future phases should:

1. design the freelancer onboarding and vetment flow
2. implement milestone creation and management
3. integrate a payment provider with escrow-like behavior
4. build the dispute resolution workflow
5. add client and freelancer dashboards

## Technical Approach

### Admin Auth Implementation

Use Supabase Auth with email/password or magic link.

Recommended files:

- `src/middleware.ts` - checks admin session for `/admin/*` routes
- `src/lib/auth/session.ts` - server-side Supabase Auth helper for reading and refreshing sessions
- `src/pages/admin/login.astro` - admin sign-in page
- `src/pages/admin/index.astro` - project board
- `src/pages/admin/projects/[id].astro` - project detail view
- `src/pages/api/admin/auth/login.ts` - sign-in API route
- `src/pages/api/admin/auth/logout.ts` - sign-out API route
- `src/pages/api/admin/auth/me.ts` - get current admin session

Session cookie strategy:

- set HTTP-only cookie on successful admin login
- validate cookie in middleware on every `/admin/*` request
- use Supabase Auth refresh token rotation
- clear cookie on logout

### Project Data Model

Supabase tables needed for Phase 4A:

`projects` - derived from existing `project_leads` with added admin-managed fields:

- `id`
- `created_at`
- `updated_at`
- `lead_id` - reference to original lead
- `status` - lifecycle state
- `admin_notes`
- `lead_score`
- `next_action`
- `follow_up_date`
- `assigned_admin_id`
- `project_value_estimate`

`project_messages` - stores communication history:

- `id`
- `created_at`
- `project_id`
- `sender_type` - `admin` or `client`
- `sender_email` - salted for privacy on the client side
- `message_type` - template name or `custom`
- `subject`
- `body`
- `sent_via_email` - boolean
- `email_sent_at`
- `email_error`

Row Level Security rules:

- `projects` table:
  - public/anonymous: no access
  - authenticated admin: read and update via server-side role check
  - service role: full access for migrations and automation
- `project_messages` table:
  - public/anonymous: no access
  - authenticated admin: read and create
  - service role: full access

Server-side access pattern:

- API routes use `SUPABASE_SERVICE_ROLE_KEY` server-side to bypass RLS
- middleware validates admin role before allowing any admin route access
- frontend components request data through server-side `fetch` or Astro server load functions, never directly from the browser

### Status Transition API

Server-side endpoint for status changes: `POST /api/admin/projects/[id]/status`

Payload:

- `new_status` - one of the allowed lifecycle states
- `note` - optional reason for the transition

Server-side validation:

- validate that the transition is allowed
- validate that the user has admin role
- record the transition in an audit log table or the `updated_at` chain
- update `projects.status`
- return the updated project object or 400/403 if invalid

### Messaging API

Server-side endpoint for sending messages: `POST /api/admin/projects/[id]/messages`

Payload:

- `message_type` - template name or `custom`
- `subject`
- `body`

Server-side workflow:

1. validate admin session
2. store message in `project_messages` with `sent_via_email = false`
3. call Resend to send the email to the lead email address
4. if email succeeds, update `sent_via_email = true` and `email_sent_at`
5. if email fails, log the error and leave `sent_via_email = false`; do not delete the stored message
6. return the created message object

Consider adding:

- `timeline` event for each message so the project detail view shows history
- `project_status` updates can optionally trigger email notifications later

### Admin API Routes Summary

| Method | Path                                | Purpose                                          |
| ------ | ----------------------------------- | ------------------------------------------------ |
| GET    | `/api/admin/auth/me`                | Validate current admin session                   |
| POST   | `/api/admin/auth/login`             | Admin sign-in                                    |
| POST   | `/api/admin/auth/logout`            | Admin sign-out                                   |
| GET    | `/api/admin/projects`               | List projects with filters                       |
| GET    | `/api/admin/projects/[id]`          | Get single project detail                        |
| PATCH  | `/api/admin/projects/[id]`          | Update project fields (notes, score, assignment) |
| POST   | `/api/admin/projects/[id]/status`   | Transition project status                        |
| POST   | `/api/admin/projects/[id]/messages` | Send client message                              |

### Implementation Plan

First admin-dashboard milestone scope:

1. Create Supabase Auth admin users table with role field.
2. Add server-side auth helpers for sessions and role checks.
3. Add Astro middleware to protect `/admin/*` routes.
4. Implement admin login page and API routes.
5. Implement project board list page with server-side data fetching.
6. Implement project detail view with edit and status transition capability.
7. Implement messaging API and UI shell.
8. Add basic audit logging for status changes.
9. Verify RLS policies on the `projects` and `project_messages` tables.
10. Add smoke tests for protected access and invalid transitions.

### PR Scope

Recommended PR name: `feat/admin-dashboard-planning`

This PR should include:

- `admin-operations.md`
- `src/middleware.ts` (if auth scaffolding already exists, update it; otherwise create it)
- `src/lib/auth/` with session helpers
- `src/pages/admin/` with login, board, and detail views
- `src/pages/api/admin/` with auth and project API routes
- Supabase migration SQL for `projects`, `project_messages`, `profiles`, and `admin_users` tables
- updated `task.md` reflecting ADM-001 work
- updated `project-memory.md` with stable admin decisions

## Current Decision Status

- Admin workspace scope is defined.
- Authentication and role model are defined.
- Project lifecycle states and transition rules are defined.
- Client communication flow is defined.
- Freelancer marketplace safeguards, milestone structure, and payment-release logic are documented.
- Technical approach for admin auth, project data model, and secure messaging is documented.
- Implementation plan and PR scope are prepared.
