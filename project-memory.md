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

- Analytics provider decision: use Cloudflare Web Analytics for v1.
- Rationale: free, privacy-first, no cookies, integrates with Cloudflare Pages, and fits the `.eu` GDPR context.
- Alternative providers if needed later: Plausible or Fathom.
- Implementation rule: single script tag in `BaseLayout.astro`, async, no PII in events.
- Environment variables: `PUBLIC_ANALYTICS_ID` and optional `PUBLIC_ANALYTICS_ENABLED`.
- Data rules: collect only page views, referrers, countries, devices, and generic form start/submission events; never attach lead or form field data.

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
- Lead submissions flow through `src/pages/api/submit-lead.ts`, which validates payloads and inserts into Supabase using `SUPABASE_SERVICE_ROLE_KEY` server-side.
- Add `src/lib/supabase/server.ts` for server-only Supabase client creation.
- Cloudflare adapter `@astrojs/cloudflare` is configured to support on-demand API routes during static build.
- Tailwind configuration must live at repo root as `tailwind.config.mjs` with `content` paths and project token colors.
- `@astrojs/tailwind` integration must use explicit `configFile: './tailwind.config.mjs'` and `applyBaseStyles: false`; `@tailwind` directives belong in `src/styles/global.css`, which is imported by `BaseLayout.astro`.
- Do not place duplicate `@tailwind` directives in both `global.css` and inline `<style is:global>` blocks; that breaks PostCSS processing.
- Internationalization decision: support English (en), Russian (ru), German (de), Finnish (fi), and Estonian (et) for all public-facing content, form fields, buttons, and navigation labels. Translation data lives in `src/i18n/translations.ts` as a `Record<Language, TranslationKeys>`; `src/i18n/index.ts` exports `getTranslations(locale)`, `languages`, and `defaultLanguage`. Language switcher component is `src/components/LanguageSwitcher.astro`. Locale-aware routing uses dynamic `src/pages/[locale]/` pages with a root `src/pages/index.astro` redirect based on detected language. Default language is English. Non-English locales currently fall back to English via `deepMerge` for missing keys.

## Open Decisions

- `project_leads` schema and RLS policies are defined in `supabase/leads-schema.sql`; pending application to the Supabase dashboard.

## Quality Bar

The project should feel like a capable company building serious systems, not a generic AI landing page. Content, design, and engineering choices should support trust, clarity, and practical delivery.
