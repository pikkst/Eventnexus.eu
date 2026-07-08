# Eventnexus Workflow

This workflow defines how humans and AI agents should work on the Eventnexus project.

## Core Rule

Do not build randomly. Every change must connect to a known task, a project goal, or a documented decision.

## Standard Work Cycle

1. Read `README.md`, `info.txt`, `task.md`, `workflow.md`, `agents.md`, and `project-memory.md`.
2. Identify the current phase and the smallest useful next task.
3. Inspect existing files before editing.
4. Make focused changes.
5. Update documentation when decisions change.
6. Run relevant checks when code exists.
7. Summarize what changed and what remains.

## Branching

- `main` is the stable branch.
- Feature work should use short descriptive branches once active development starts.
- Documentation foundation work may be committed directly before the first public app exists.

Recommended branch names:

- `docs/project-foundation`
- `feat/website-shell`
- `feat/contact-flow`
- `infra/cloudflare-deploy`
- `infra/supabase-leads`

## Commit Rules

Use clear commit messages:

- `docs: add project foundation`
- `feat: add homepage shell`
- `infra: configure cloudflare deployment`
- `fix: correct mobile navigation`

Avoid vague messages like:

- `update`
- `changes`
- `fix stuff`

## Documentation Rules

- `task.md` tracks work.
- `workflow.md` tracks how work should happen.
- `agents.md` tracks who does what.
- `project-memory.md` tracks stable decisions and long-term context.
- Do not store secrets in documentation.
- Supabase project IDs and public project metadata are allowed.
- API keys, tokens, passwords, private service credentials, and secret URLs are not allowed.

## Design Workflow

Before implementing UI:

1. Define the target user.
2. Define the business action the page should support.
3. Create a quiet, professional interface suitable for a service company.
4. Prioritize clarity, trust, and conversion.

The Eventnexus website should feel modern, capable, and direct. It should not feel like a generic template or a decorative landing page with no substance.

## Engineering Workflow

Before adding code:

1. Inspect the existing project structure.
2. Prefer simple architecture until complexity is justified.
3. Keep frontend, backend, and deployment concerns clearly separated.
4. Use proven libraries for common problems.
5. Add tests and checks as the project grows.

## Deployment Workflow

Planned route:

1. GitHub repository stores source code.
2. Cloudflare connects to GitHub.
3. Cloudflare builds and deploys previews and production.
4. `eventnexus.eu` DNS is moved only when the new production deployment is ready.
5. Supabase is connected only when the application has a concrete backend need.

## Review Checklist

Before considering a task done:

- Does the change match the current task?
- Did the agent inspect existing files first?
- Are secrets excluded?
- Is documentation updated if a decision changed?
- Are checks run where possible?
- Is the next step clear?
