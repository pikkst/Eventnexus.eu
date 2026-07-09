# Eventnexus Agent Rules

This document defines how AI agents should work on Eventnexus.

## Shared Mission

Build Eventnexus into a trustworthy company website and service-platform foundation for modern AI-assisted web, backend, payment, automation, and deployment solutions.

## Current Project State

The project is currently moving from documentation and architecture into Phase 3 website build.

Completed:

- project foundation
- product definition
- homepage copy
- services page copy
- lead-capture flow planning
- technical architecture
- environment variable plan
- security rules
- local development setup

Current next build task:

- create the first Astro + TypeScript + Tailwind application scaffold

## Required Reading Order For Agents

Before making changes, every agent must read these files in this order:

1. `README.md` - project overview and document index
2. `task.md` - current phase and task status
3. `project-memory.md` - stable project facts and decisions
4. `workflow.md` - how work should be done
5. `agents.md` - agent rules and role responsibilities
6. `security-rules.md` - secret and public configuration rules
7. `local-development.md` - local setup and command expectations

Then read the task-specific source files:

- Product and audience: `product-definition.md`
- Homepage implementation: `homepage-copy.md`
- Services page implementation: `service-page-copy.md`
- Proof/work section: `proof-points.md`
- Contact/intake flow: `contact-lead-flow.md`
- Technical stack: `technical-architecture.md`
- Styling and UI rules: `design-system.md`
- Supabase planning: `supabase-usage.md`
- Environment variables: `environment-variables.md` and `.env.example`
- Original raw notes: `info.txt`

Do not rely on memory alone. Read the relevant files before editing.

## Project File Map

- `README.md` - high-level overview and index
- `task.md` - task checklist and phase status
- `project-memory.md` - long-lived decisions and facts
- `workflow.md` - process, commit, deployment, and review workflow
- `agents.md` - this operating manual
- `info.txt` - original raw user notes and service context
- `product-definition.md` - first public website purpose, audience, offer, proof direction
- `homepage-copy.md` - homepage copy blocks
- `service-page-copy.md` - services page copy blocks
- `contact-lead-flow.md` - structured project request form plan
- `proof-points.md` - portfolio/proof candidates
- `technical-architecture.md` - Astro, Tailwind, Cloudflare, Supabase, env decisions
- `design-system.md` - visual and component rules
- `supabase-usage.md` - lead capture and future backend scope
- `environment-variables.md` - env variable names and placement
- `.env.example` - empty placeholder env template only
- `security-rules.md` - secrets, public config, RLS, logging, lead data rules
- `local-development.md` - local setup instructions and planned commands

## Global Agent Rules

- Always read the project memory before making decisions.
- Never overwrite user work without inspecting it first.
- Never introduce secrets into git.
- Every new task means a new branch.
- Every new task must end with a pull request.
- Do not do new task work directly on `main` unless the user explicitly approves an exception.
- Prefer small, complete changes over large unclear rewrites.
- Keep the project commercially focused.
- Update `task.md` when task status changes.
- Update `project-memory.md` when a stable decision is made.
- Ask for clarification only when a wrong assumption would create real risk.
- Keep implementation aligned with the existing task order unless the user explicitly changes priority.
- Do not create production database tables, deploy production services, or move DNS without explicit confirmation.
- Do not add a heavy dependency or framework without documenting why.
- Run relevant checks before marking implementation tasks complete.

## KiloCode Build Instructions

KiloCode should start Phase 3 with `Create first application scaffold`.

Use:

- Astro
- TypeScript
- Tailwind CSS
- npm
- Cloudflare Pages-compatible static-first output

Initial scaffold expectations:

- keep the existing documentation files at the repository root
- add app source under normal Astro structure, such as `src/`
- add `package.json`, Astro config, TypeScript config, Tailwind setup, and required lockfile
- keep build output as `dist`
- add scripts for `dev`, `build`, and `preview`
- do not connect Supabase yet unless the current task explicitly requires it
- do not add real environment values
- keep `.env.example` as placeholders only

First implementation sequence:

1. Create Astro + TypeScript scaffold.
2. Add Tailwind CSS.
3. Add global styles and design tokens from `design-system.md`.
4. Create base layout and reusable components.
5. Implement homepage shell using `homepage-copy.md`.
6. Add services section/page content from `service-page-copy.md`.
7. Add proof/work section based on `proof-points.md`.
8. Add contact/intake UI shell from `contact-lead-flow.md`.
9. Keep backend submission disabled or mocked until Supabase schema and server-side route task begins.
10. Run `npm run build`.
11. Update `task.md` and relevant docs.

## Build Quality Rules

The public website should:

- feel professional, modern, and trustworthy
- prioritize clarity and conversion
- guide visitors toward the structured project request
- avoid generic AI hype
- avoid decorative gradient-orb/bokeh backgrounds
- avoid nested card-heavy layouts
- use responsive layouts that work on mobile and desktop
- avoid text overflow and overlapping UI
- keep sections useful and content-rich
- use icons where helpful, preferably lucide icons when implementation begins

Follow `design-system.md` for detailed visual rules.

## Environment And Secret Rules

Agents must follow `security-rules.md`.

Never commit:

- `.env`
- real Supabase keys
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- Cloudflare API tokens
- Turnstile secret keys
- database connection strings
- private lead/customer data

Only `.env.example` may be committed, and it must contain placeholders only.

`PUBLIC_*` variables are browser-visible. Do not put secrets in `PUBLIC_*`.

## Backend Rules

Supabase is planned, but not part of the first scaffold unless the user explicitly requests backend implementation.

When backend work begins:

- use server-side Astro API routes or Cloudflare Pages Functions for lead submissions
- validate payloads server-side
- insert leads into Supabase server-side
- keep service-role keys server-side only
- enable and review Row Level Security before exposing tables
- use Resend only after the lead is safely stored

## Deployment Rules

Cloudflare Pages is the chosen target.

Do not create or modify remote Cloudflare production configuration unless the task explicitly asks for deployment work.

Deployment settings:

- production branch: `main`
- build command: `npm run build`
- output directory: `dist`
- framework preset: Astro if available

Do not move `eventnexus.eu` DNS until:

- the Pages deployment is verified on a temporary URL
- the user confirms the domain migration
- SSL and redirect behavior are understood

## Git Rules For Agents

Before editing:

- run or inspect `git status`
- make sure the current branch is appropriate for the task
- create a new branch for every new task
- identify existing user changes
- do not revert unrelated user work

Before finishing:

- run relevant checks
- review `git diff`
- update `task.md` if task status changed
- update `project-memory.md` for stable decisions
- commit with a clear message when instructed or when the workflow expects persistence
- push the task branch
- open a pull request for the task
- do not merge into `main` unless the user explicitly asks for merge

Push rule:

- All branch work, including documentation status updates, must be committed before `git push`.
- Do not update `task.md` after pushing; update it before the push so it is included in the PR.

Recommended commit messages:

- `docs: update agent workflow`
- `feat: scaffold astro app`
- `feat: implement homepage shell`
- `feat: add intake flow shell`
- `infra: configure cloudflare pages`
- `fix: correct responsive layout`

Recommended branch examples:

- `docs/update-agent-rules`
- `feat/scaffold-astro-app`
- `feat/homepage-shell`
- `feat/contact-flow-shell`
- `infra/cloudflare-pages-setup`

## Agent Roles

### Product Strategist

Responsible for:

- defining the audience
- shaping the service offer
- writing positioning
- turning rough ideas into structured requirements
- keeping the website focused on business value

Output examples:

- service definitions
- homepage messaging
- conversion goals
- offer structure

### UX And Visual Designer

Responsible for:

- information architecture
- page layout
- responsive behavior
- visual trust and readability
- interaction patterns

Rules:

- Build the actual useful experience first.
- Avoid generic decorative sections.
- Keep the design professional, clear, and service-oriented.
- Ensure mobile and desktop layouts both work well.

### Frontend Engineer

Responsible for:

- application scaffold
- components
- routing
- responsive UI
- accessibility basics
- frontend quality checks

Rules:

- Follow the chosen stack and existing project patterns.
- Keep components focused.
- Avoid unnecessary dependencies.
- Make the first version easy to deploy.
- Read `technical-architecture.md`, `design-system.md`, `homepage-copy.md`, `service-page-copy.md`, and `contact-lead-flow.md` before building UI.
- Use Astro + TypeScript + Tailwind as the first implementation stack.
- Keep Supabase and Resend integration out of the browser.

### Backend Engineer

Responsible for:

- Supabase integration
- data model
- server-side validation
- contact and lead flows
- future payment workflows

Rules:

- Do not add backend complexity before it is needed.
- Use row-level security and least privilege when Supabase tables are added.
- Keep secret keys server-side only.
- Document schema decisions.
- Read `supabase-usage.md`, `contact-lead-flow.md`, `environment-variables.md`, and `security-rules.md` before backend work.
- Do not create production tables without schema and RLS review.
- Use Resend for email notifications after lead storage succeeds.

### DevOps And Deployment Agent

Responsible for:

- GitHub setup
- Cloudflare deployment
- environment variables
- domain and DNS planning
- build verification

Rules:

- Do not move production DNS until a replacement deployment is verified.
- Keep preview and production configuration clear.
- Document every external service connection.
- Never expose tokens or service credentials.
- Read `technical-architecture.md`, `environment-variables.md`, `security-rules.md`, and `local-development.md` before deployment work.
- Use Cloudflare Pages with GitHub integration.

### QA And Review Agent

Responsible for:

- checking task completion
- reviewing content consistency
- testing layouts
- validating forms
- catching regressions

Rules:

- Focus on user-visible issues first.
- Verify critical paths before polish.
- Report findings with exact file references when code exists.
- Check mobile and desktop behavior.
- Check that public pages do not expose secrets or private lead data.

## Handoff Protocol

Every agent handoff should include:

- what was changed
- why it was changed
- what was checked
- known risks
- recommended next step

## Memory Protocol

Use `project-memory.md` for long-lived facts only:

- project identity
- technical decisions
- deployment decisions
- service architecture decisions
- domain and environment facts

Do not put temporary notes, raw brainstorms, secrets, or unresolved speculation into project memory.

## Task Completion Protocol

When a task is complete:

1. Confirm the task branch contains only work for that task.
2. Update the matching checkbox in `task.md`.
3. Update `project-memory.md` only if a stable decision changed.
4. Update or create the relevant task document.
5. Run checks appropriate to the task.
6. Push the task branch.
7. Open a pull request.
8. Summarize changed files, checks, risks, PR link, and next task.

Do not mark a task complete only because files were edited. Mark it complete when the intended outcome is actually usable.
