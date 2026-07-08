# Eventnexus Local Development Setup

This document explains how to work on Eventnexus locally.

The project currently contains planning, architecture, and copy documents. The application scaffold will be added in the next phase.

## Prerequisites

Install:

- Git
- Node.js LTS
- npm
- GitHub CLI, optional but useful
- VS Code or another editor

Recommended checks:

```powershell
git --version
node --version
npm --version
gh --version
```

## Repository

Repository:

```text
https://github.com/pikkst/Eventnexus.eu
```

Clone:

```powershell
git clone https://github.com/pikkst/Eventnexus.eu.git
cd Eventnexus.eu
```

If already cloned, update:

```powershell
git status
git pull
```

## Current Documentation Workflow

Before application code exists:

1. Read `README.md`.
2. Read `task.md`.
3. Read `project-memory.md`.
4. Read the relevant planning document for the task.
5. Make focused documentation changes.
6. Check `git diff`.
7. Commit with a clear message.
8. Push to `main` when the change is approved or intentionally completed.

## Environment Files

Use `.env.example` as the template.

Create a local `.env` only when actual local environment values are needed:

```powershell
Copy-Item .env.example .env
```

Rules:

- do not commit `.env`
- do not put real secrets in `.env.example`
- store real deployment values in Cloudflare Pages environment variables
- follow `security-rules.md`

## Planned App Stack

When the application scaffold is created, use:

- Astro
- TypeScript
- Tailwind CSS
- npm
- Cloudflare Pages deployment
- Supabase later for lead capture
- Resend later for lead/contact email notifications

## Planned App Commands

After the Astro scaffold exists, expected commands should be:

```powershell
npm install
npm run dev
npm run build
npm run preview
```

Expected local development URL:

```text
http://localhost:4321
```

Expected production build output:

```text
dist
```

## Planned Scaffold Steps

The next implementation phase should:

1. Create an Astro app in this repository.
2. Add TypeScript configuration.
3. Add Tailwind CSS using the current Astro/Tailwind setup.
4. Add global styles and project design tokens.
5. Create base layout components.
6. Create the first homepage shell using `homepage-copy.md`.
7. Verify `npm run build`.
8. Push the scaffold before connecting Cloudflare Pages.

## Local Development Safety

Before running or adding backend integrations:

- confirm `.env` is ignored
- confirm no real secrets are staged
- keep Supabase service-role keys server-side only
- keep Resend API keys server-side only
- do not connect production DNS during local development
- do not create production database tables before schema and RLS are reviewed

## Git Workflow

Check status:

```powershell
git status --short
```

Review changes:

```powershell
git diff
```

Commit:

```powershell
git add <files>
git commit -m "type: short description"
```

Push:

```powershell
git push
```

Preferred commit prefixes:

- `docs:`
- `feat:`
- `fix:`
- `infra:`
- `style:`
- `test:`

## Troubleshooting

If dependencies fail to install:

- verify Node.js LTS is installed
- delete `node_modules` only when intentionally resetting dependencies
- check `package-lock.json` once it exists
- retry `npm install`

If GitHub push fails:

```powershell
gh auth status
```

If environment values are missing:

- compare `.env` with `.env.example`
- confirm Cloudflare Pages variables are configured for deployment
- do not paste secrets into documentation or chat logs

## Current Decision Status

Local development instructions are defined for the current documentation phase and the upcoming Astro/Tailwind application scaffold.
