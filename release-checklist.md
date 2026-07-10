# Release Checklist

Use this checklist before shipping a release and when verifying deployment health.

## Pre-Release

- [ ] Run `npm run build` and confirm it completes without errors.
- [ ] Run `npm run lint` and fix any reported issues.
- [ ] Run `npm run typecheck` and confirm no TypeScript errors.
- [ ] Run `npm test` and confirm all tests pass.
- [ ] Run accessibility checks if available and confirm no critical violations.
- [ ] Review `git diff` against `main` for unintended changes.
- [ ] Confirm no secrets in code, `.env.example`, or documentation.
- [ ] Confirm `.env` is ignored and not staged.
- [ ] Review homepage and service copy for placeholder text or unfinished sections.
- [ ] Verify all internal links resolve and do not lead to 404 pages.
- [ ] Confirm responsive layouts on mobile and desktop viewports.
- [ ] Confirm forms show validation errors inline or with clear messaging.
- [ ] Check `task.md` task statuses reflect completed work.
- [ ] Check `project-memory.md` for any new stable decisions that need logging.

## Pre-Deployment

- [ ] Confirm Cloudflare Pages environment variables are set for preview and production.
- [ ] Confirm production variables do not mirror developer secrets.
- [ ] Confirm Cloudflare Pages build command is `npm run build`.
- [ ] Confirm Cloudflare Pages output directory is `dist`.
- [ ] Confirm Cloudflare Pages framework preset is Astro if configured.
- [ ] Confirm preview deployment passes build and loads.
- [ ] Confirm no service-role keys or server-only vars are exposed to the browser.
- [ ] Confirm analytics script is present and async when enabled.

## Post-Deployment

- [ ] Verify production URL loads successfully.
- [ ] Verify SSL certificate is valid for the production domain.
- [ ] Verify canonical redirects and HTTPS behavior.
- [ ] Verify contact form submission returns expected success or error state.
- [ ] Verify leading endpoints (`/`, `/services`, `/work`, `/contact`) load.
- [ ] Confirm no 404s on primary navigation paths.
- [ ] Review Cloudflare Pages deployment logs for build warnings.
