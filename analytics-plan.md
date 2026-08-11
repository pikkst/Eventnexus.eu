# Eventnexus Analytics Plan

## Why Analytics

Eventnexus needs basic audience and conversion data to improve content, validate assumptions, and support future decisions. The site is a professional company website, not a marketing experiment. Analytics should:

- confirm traffic comes from intended audiences
- show which pages or sections get attention
- measure whether visitors engage with the structured project request
- remain lightweight and privacy-first

## Recommended Approach

Use a lightweight, privacy-first analytics setup that does not rely on tracking cookies and respects GDPR expectations for a `.eu` company site.

## Provider Decision

Recommended primary provider: Cloudflare Web Analytics.

## Provider Criteria

- no cookie banners needed
- no personal data stored
- minimal script size
- easy integration with Cloudflare Pages
- acceptable data granularity: page views, referrers, countries, devices, and basic path data

## Implementation Rules

- load analytics through a single script tag in `Analytics.astro`, rendered from `BaseLayout.astro`
- `PrivacyConsent.astro` manages the consent banner and `localStorage` state; it does not inject the beacon script
- on first visit, show the consent banner; do not load analytics until the visitor clicks Accept
- on returning visits, read `analytics-consent` from `localStorage`; load analytics only when the value is `granted`
- provide a footer "Privacy settings" control that clears `analytics-consent` and reloads the page so the banner reappears
- dispatch a custom `analytics-consent-changed` event when consent changes, so `Analytics.astro` can react without duplicating script injection
- do not collect PII inside analytics events, page titles, or custom dimensions
- do not attach form field values, names, emails, or lead details to analytics events
- disable analytics in local development unless explicitly needed for debugging
- keep the analytics loader small and async
- guard against duplicate beacon injection by checking for an existing `script[data-cf-beacon]` before appending

## Measured Events

Initial events:

- page views on public pages
- outbound link clicks only when they are meaningful (e.g., proof examples)
- form start event on the structured project request form
- form completion or submission attempt from the frontend (no payload data, only a generic event)

Do not measure:

- contact form field contents
- lead personal data
- internal navigation micro-movements
- scroll depth or mouse tracking

## Privacy And Compliance Rules

- treat analytics as a public, server-agnostic data stream
- use only public analytics IDs that can be committed to source control
- do not inject lead or customer data into analytics
- do not build custom dashboards from analytics data that could re-identify users
- require affirmative consent before loading Cloudflare Web Analytics; store consent in `localStorage` under `analytics-consent` with values `granted` or `denied`
- render a consent banner on first visit; do not send any analytics request before the visitor clicks Accept
- provide a persistent privacy-settings control so visitors can revoke consent at any time
- if consent is withdrawn, stop loading analytics and remove the beacon script if present

## Environment Variables

- `PUBLIC_ANALYTICS_ID`: analytics provider measurement identifier
- `PUBLIC_ANALYTICS_ENABLED`: optional toggle to disable analytics in preview or debug builds

Both variables are browser-safe and can live in `.env.example` as placeholders.

## When To Revisit This Plan

Revisit the analytics setup when:

- the site has measurable traffic and needs more detailed conversion funnels
- privacy laws or client requirements change
- the chosen provider limits free-tier data retention or granularity
- Cloudflare Web Analytics proves insufficient for lead-conversion tracking

## Alternative Providers

- Plausible Analytics: paid, privacy-first, simple dashboard, no cookies.
- Fathom: paid, privacy-first, simple dashboard, no cookies.

Stick with Cloudflare Web Analytics for v1. Revisit Plausible or Fathom only if Cloudflare's data limits or retention rules conflict with future needs.

## Current Decision Status

Analytics plan is defined. Analytics provider decision is pending implementation in `BaseLayout.astro` after the current homepage and intake shell are stable.
