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
- Current state: not configured yet; wait until Astro scaffold and local build exist

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
- Use GitHub as the source of truth for code.
- Use Cloudflare for deployment when the application scaffold is ready.
- Connect Supabase only when a real backend feature is defined.

## Open Decisions

- Contact form backend route
- Lead storage schema
- Email notification provider
- Analytics provider

## Quality Bar

The project should feel like a capable company building serious systems, not a generic AI landing page. Content, design, and engineering choices should support trust, clarity, and practical delivery.
