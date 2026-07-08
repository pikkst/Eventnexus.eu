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
- Deployment target: Cloudflare Pages, to be defined in the next architecture task

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

If the project later becomes a full authenticated SaaS dashboard, the team can either:

- keep the marketing site in Astro and add a separate app surface, or
- add React islands/app sections inside Astro where appropriate.

## Current Decision Status

Astro with TypeScript is the chosen frontend framework for the first public Eventnexus website.

Tailwind CSS with project-owned tokens and lean Astro components is the chosen styling approach.
