# Eventnexus Technical Architecture

This document tracks technical architecture decisions for the Eventnexus website and future platform.

## Frontend Framework Decision

Chosen framework: Astro with TypeScript.

## Why Astro

The first Eventnexus website is primarily a content-driven company website with a structured project-request flow. It needs to be fast, SEO-friendly, easy to deploy, and simple to maintain.

Astro is a strong fit because:

- it is designed for content-driven websites such as marketing sites, landing pages, portfolios, and e-commerce pages
- it keeps client-side JavaScript low by default
- it supports server-first rendering
- it supports TypeScript
- it can use interactive islands only where the project needs them
- it can use React components later for more complex interactive UI
- it has a documented Cloudflare Pages deployment path

## Initial Frontend Stack

- Framework: Astro
- Language: TypeScript
- Styling: Tailwind CSS with project-owned design tokens
- Package manager: npm unless the project later standardizes on another option
- Rendering mode: static-first
- Interactive components: Astro islands, with React only if the contact/intake flow becomes easier to maintain that way
- Deployment target: Cloudflare Pages connected to GitHub

## Styling And Design System Decision

Chosen approach: Tailwind CSS with CSS variables, project-owned design tokens, and small reusable Astro components.

The project should not start with a heavy prebuilt component framework. The first website needs a professional custom service-company interface, a strong project-request form, and clear content sections. Tailwind gives speed and consistency while still allowing Eventnexus to own its visual language.

Initial component direction:

- base layout components
- service and proof cards
- process-step components
- form-step components
- accessible inputs, selects, checkboxes, text areas, and buttons

Detailed design rules live in `design-system.md`.

## Cloudflare Deployment Target Decision

Chosen target: Cloudflare Pages with GitHub integration.

The first public Eventnexus website should deploy as a Cloudflare Pages project connected to the GitHub repository:

- Repository: `https://github.com/pikkst/Eventnexus.eu`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Framework preset: Astro, if available in the Cloudflare dashboard
- Deployment mode: Git-backed Pages deployments
- Preview deployments: enabled for future pull requests and non-production branches

## Why Cloudflare Pages

Cloudflare Pages is the right first deployment target because:

- it connects directly to GitHub
- it supports Astro
- it can build and deploy automatically on pushed commits
- it provides preview deployments for pull requests
- it is suitable for a fast static-first company website
- it can later support dynamic behavior through Pages Functions if needed
- it keeps the domain and hosting path aligned with the planned `eventnexus.eu` Cloudflare environment

## Deployment Timing

Do not create or connect the production Cloudflare Pages project until the Astro scaffold exists and `npm run build` succeeds locally.

Recommended sequence:

1. Create Astro scaffold.
2. Add Tailwind and project styles.
3. Implement first homepage shell.
4. Verify local build.
5. Create Cloudflare Pages project connected to GitHub.
6. Deploy to the generated `*.pages.dev` URL.
7. Verify the preview/production deployment.
8. Add `eventnexus.eu` as a custom domain only when the new deployment is ready to replace the old/down service.

## Domain Safety Rule

Do not move `eventnexus.eu` DNS to the new project until:

- Cloudflare Pages deployment is live on its temporary Pages URL
- homepage renders correctly
- contact/intake path is either working or intentionally disabled with a clear fallback
- SSL and redirects are understood
- the user confirms the domain migration

## Future Dynamic Needs

The first target is static-first Cloudflare Pages. If the contact flow later needs server-side submission handling before Supabase is connected, use:

- Astro API routes
- Cloudflare Pages Functions
- Supabase server-side insertion with protected environment variables

No secret values should be stored in git.

## Environment Variables Decision

Environment variable names are documented in `environment-variables.md` and mirrored as empty placeholders in `.env.example`.

Initial planned variables:

- `PUBLIC_SITE_URL`
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_PROJECT_ID`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEAD_NOTIFICATION_EMAIL`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `PUBLIC_ANALYTICS_ID`
- `PUBLIC_ANALYTICS_ENABLED`

Rules:

- `PUBLIC_*` variables may be exposed to browser code.
- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and Turnstile secret keys must stay server-side.
- real values belong in local `.env` files and Cloudflare Pages environment variables.
- `.env.example` contains only names and empty placeholders.

## Email Provider Decision

Chosen provider: Resend.

Resend should be used for future lead/contact notification emails after the intake endpoint exists.

Initial email environment variables:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEAD_NOTIFICATION_EMAIL`

Do not add email sending until the lead-capture backend exists and the sending domain/from address is configured.

## Security Rules Decision

Security rules are documented in `security-rules.md`.

Core architecture rules:

- Treat all `PUBLIC_*` variables as browser-visible.
- Keep Supabase service-role keys, Resend API keys, Turnstile secrets, Cloudflare tokens, and database credentials server-side only.
- Do not commit real secrets, private lead data, customer data, or provider credentials.
- Submit lead forms through server-side routes before writing to Supabase or sending Resend notifications.
- Enable Row Level Security before exposing Supabase tables through APIs.
- Store deployment secrets in Cloudflare Pages environment variables.

## Why Not Start With Next.js

Next.js is powerful, but the first Eventnexus public website does not need a full React application framework at the start. The first version is mostly marketing content, proof points, service pages, and a structured form.

Starting with Astro keeps the first build simpler and faster while leaving room to add interactive components and backend endpoints later.

## Why Not Plain Vite React

Vite React is a good application stack, but it would push the project toward a browser-app model before the website needs that complexity.

Eventnexus currently needs content, trust-building, SEO, lead capture, and deployment simplicity more than a full client-side application shell.

## Migration And Growth Path

Astro should be used for:

- homepage
- services page
- proof/work section
- structured intake flow shell
- content pages
- SEO metadata
- static build output

React can be added later for:

- multi-step form state
- dynamic intake UI
- admin-style previews
- complex widgets

Supabase can be added later for:

- lead capture
- lead status tracking
- admin data
- future customer portal features

## Supabase Usage Decision

Supabase should be used first for structured project leads, simple contact messages, and internal lead-review data.

Initial Supabase scope:

- `project_leads` table for multi-step intake submissions
- optional `contact_messages` table for simple contact-only messages
- lead statuses such as `new`, `reviewed`, `needs clarification`, `qualified`, `not a fit`, and `archived`
- future admin review fields such as notes, lead score, next action, and follow-up date

Supabase should not be used for a full customer portal in the first public website version. Customer accounts, authenticated dashboards, file storage, and project-status portals are future scope.

Security direction:

- enable Row Level Security for exposed tables
- do not allow public read access to lead data
- do not expose service-role keys to the browser
- submit public forms through server-side Astro API routes or Cloudflare Pages Functions
- store Supabase secrets only in deployment environment variables

Detailed Supabase planning lives in `supabase-usage.md`.

If the project later becomes a full authenticated SaaS dashboard, the team can either:

- keep the marketing site in Astro and add a separate app surface, or
- add React islands/app sections inside Astro where appropriate.

## Current Decision Status

Astro with TypeScript is the chosen frontend framework for the first public Eventnexus website.

Tailwind CSS with project-owned tokens and lean Astro components is the chosen styling approach.

Cloudflare Pages with GitHub integration is the chosen deployment target.

Supabase is the chosen first backend for lead capture, contact messages, and later admin review data.

Environment variable names are defined, with real values excluded from git.

Security rules are defined for secrets and public configuration.

Local development instructions are defined in `local-development.md`.
