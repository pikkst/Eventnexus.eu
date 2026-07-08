# Eventnexus Agent Rules

This document defines how AI agents should work on Eventnexus.

## Shared Mission

Build Eventnexus into a trustworthy company website and service-platform foundation for modern AI-assisted web, backend, payment, automation, and deployment solutions.

## Global Agent Rules

- Always read the project memory before making decisions.
- Never overwrite user work without inspecting it first.
- Never introduce secrets into git.
- Prefer small, complete changes over large unclear rewrites.
- Keep the project commercially focused.
- Update `task.md` when task status changes.
- Update `project-memory.md` when a stable decision is made.
- Ask for clarification only when a wrong assumption would create real risk.

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
