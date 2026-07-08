# Eventnexus Design System Direction

This document defines the first styling and design system approach for Eventnexus.

## Styling Decision

Chosen approach: Tailwind CSS with project-owned design tokens and small reusable Astro components.

The project should not start with a heavy prebuilt component framework. Eventnexus needs a custom, professional service-company interface, and the first version should stay lean, clear, and easy to control.

## Why Tailwind CSS

Tailwind CSS is a good fit for the first Eventnexus website because:

- it works well with Astro
- it is fast for building consistent layouts
- it keeps styling close to markup during early product iteration
- it supports responsive design and state styles without creating many custom CSS files
- it can be paired with CSS variables for a project-specific visual language
- it avoids locking the project into a large component library too early

## Astro Styling Model

Astro supports component-scoped styles, global styles, and external CSS libraries. Eventnexus should use this mix:

- global CSS for tokens, base typography, reset-level project styles, and Tailwind import
- Tailwind utilities for layout, spacing, responsive behavior, and common UI states
- scoped Astro styles only for component-specific exceptions
- CSS variables for brand colors, surfaces, borders, focus states, and shadows

## Initial Design Principles

The Eventnexus interface should feel:

- professional
- modern
- trustworthy
- calm
- technical but approachable
- focused on clarity and conversion

It should avoid:

- generic AI hype visuals
- decorative gradient-orb backgrounds
- one-color purple/blue SaaS sameness
- oversized empty marketing sections
- nested card-heavy layouts
- unclear buttons or vague CTAs

## Visual Direction

Recommended visual direction:

- light-first interface
- strong typography hierarchy
- restrained dark sections for contrast only where useful
- practical layouts with clear section rhythm
- visible product/work proof where assets are available
- form-first conversion path
- content density appropriate for a service company

## Color Strategy

Use a balanced palette instead of a one-note theme.

Recommended token groups:

- neutral surfaces: white, near-white, soft gray
- text: near-black, slate-gray, muted gray
- primary action: deep teal or blue-green
- secondary accent: cool blue
- proof/highlight accent: amber or lime used sparingly
- borders: soft neutral gray
- focus ring: accessible blue or teal

Avoid letting the site become dominated by:

- purple gradients
- dark navy/slate-only styling
- beige/tan/brown themes
- single-hue blue SaaS styling

## Typography

Use system fonts for the first version unless a clear brand reason appears later.

Recommended stack:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Rules:

- no negative letter spacing
- do not scale font sizes directly with viewport width
- use hero-scale type only in the actual hero
- keep form labels and service-card text compact and readable
- prioritize line length and readability over visual drama

## Layout Rules

- Use full-width page sections with constrained inner content.
- Do not place page sections inside decorative cards.
- Use cards only for repeated service items, proof items, form steps, and modal-like surfaces.
- Keep card border radius at 8px or less unless a later brand system says otherwise.
- Avoid cards inside cards.
- Use stable dimensions for repeated UI elements such as service cards, step indicators, form controls, and buttons.
- Ensure text never overlaps or overflows its container on mobile or desktop.

## Component Strategy

Start with small project-owned components:

- `Button`
- `Section`
- `Container`
- `ServiceCard`
- `ProofCard`
- `ProcessStep`
- `FormStep`
- `Input`
- `Select`
- `CheckboxGroup`
- `Textarea`
- `ProgressIndicator`

Do not introduce a large UI kit unless the project starts needing complex accessible widgets that justify it.

## Icon Strategy

Use a familiar icon library when the implementation begins.

Preferred direction:

- lucide icons for buttons, service cards, process steps, and UI controls
- icons should clarify action or category
- icons should not replace necessary labels in critical navigation or forms
- unfamiliar icons should have accessible labels or tooltips

## Form Design Direction

The project-intake flow is a primary business surface.

Form UI should:

- use segmented steps
- show progress
- keep each step visually focused
- support dropdowns, checkboxes, radio groups, and text areas
- provide "not sure yet" choices where appropriate
- make technical questions feel approachable
- clearly distinguish primary submit actions from secondary navigation

## Tailwind Implementation Notes

When the Astro scaffold is created:

- install Tailwind using the current Astro/Tailwind Vite plugin approach
- create `src/styles/global.css`
- import Tailwind in global CSS
- define theme tokens with CSS variables
- keep custom CSS limited and intentional
- document reusable component variants once components exist

## Current Decision Status

Tailwind CSS with project-owned tokens and lean Astro components is the chosen styling and design system approach for the first Eventnexus website.
