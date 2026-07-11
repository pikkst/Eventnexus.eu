# Eventnexus Task Plan

This document tracks the project from a near-zero starting point into a deployable company website and future service platform.

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

- [ ] Task ID: ADM-001
- [ ] Create the admin dashboard planning branch: `feat/admin-dashboard-planning`
- [ ] Define the MVP admin workspace scope: secure login, protected admin area, project board, project detail view, and internal status workflow
- [ ] Define the initial role model for admin users and future client users
- [ ] Define the project lifecycle states and internal handoff model for project tracking
- [ ] Define the first client communication flow: project updates, direct messages, and admin response workflow
- [ ] Define the future freelancer marketplace concept and the safeguards needed for client-freelancer trust, milestone payments, and delivery confirmation
- [ ] Document the initial technical architecture for admin auth, project data model, and secure messaging
- [ ] Prepare the implementation plan and PR scope for the first admin-dashboard milestone

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
