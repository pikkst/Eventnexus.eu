# Eventnexus Contact And Lead-Capture Flow

This document defines the first version of the contact and project-intake flow.

## Flow Goal

The contact flow should convert interested visitors into qualified project leads.

It should not behave like a generic contact form. It should help a visitor explain their idea in a structured way while giving Eventnexus enough information to understand project type, scope, timeline, budget, and technical needs.

## Primary CTA

Start a project request

## Secondary CTA

Ask a question

## Flow Type

Recommended first version:

- multi-step project request form
- clear progress indicator
- mix of dropdowns, checkboxes, radio groups, short text inputs, and one larger free-form description
- optional simple contact-only path for users who are not ready to describe a full project

## Step 1 - Contact Identity

Purpose: identify who is submitting the request and how to reply.

Fields:

- full name
- email address
- phone or preferred contact channel, optional
- company or organization name, optional
- country or region, optional

Validation:

- full name required
- email required
- email format must be valid

## Step 2 - Project Type

Purpose: quickly classify what the visitor wants to build.

Field type: dropdown or selectable cards.

Options:

- company website
- landing page
- SaaS platform
- customer portal
- booking or request platform
- internal business tool
- admin dashboard
- e-commerce or payment-enabled service
- AI-assisted workflow tool
- automation or integration
- not sure yet
- other

Additional field:

- short project title

Validation:

- project type required
- project title required

## Step 3 - Idea Description

Purpose: let the visitor explain the idea in their own words.

Fields:

- what do you want to build?
- who will use it?
- what problem should it solve?
- what should happen after a user uses it?

Recommended UI:

- one larger free-form text area for the main idea
- optional smaller fields for target users and problem/outcome

Validation:

- main idea description required
- minimum useful length, such as 80 characters

## Step 4 - Required Features

Purpose: identify likely scope and product complexity.

Field type: checkbox group.

Options:

- public pages
- user accounts
- login and registration
- user roles or permissions
- admin dashboard
- customer dashboard
- booking or scheduling
- request or quote forms
- file uploads
- payments or subscriptions
- email notifications
- CRM or lead workflow
- analytics or reporting
- map or location features
- AI-assisted features
- third-party integrations
- multilingual support
- not sure yet

Additional field:

- important features not listed

## Step 5 - Technical Needs

Purpose: learn whether the project needs frontend only, backend, payments, data, deployment, or integrations.

Field type: checkbox group.

Options:

- frontend design and development
- backend development
- database setup
- authentication
- payment integration
- admin system
- API integration
- automation
- deployment and hosting
- domain setup
- maintenance after launch
- technical planning only
- not sure yet

## Step 6 - Timeline And Budget

Purpose: qualify urgency and project fit without forcing exact estimates too early.

Timeline options:

- as soon as possible
- within 2-4 weeks
- within 1-2 months
- within 3-6 months
- flexible timeline
- just exploring

Budget range options:

- under 500 EUR
- 500-1,500 EUR
- 1,500-3,000 EUR
- 3,000-7,500 EUR
- 7,500-15,000 EUR
- 15,000+ EUR
- not sure yet

Project status options:

- idea only
- rough plan exists
- design or specification exists
- existing website or app needs improvement
- existing product needs new features
- urgent business need

Validation:

- timeline required
- budget range required
- project status required

## Step 7 - Integrations And Existing Assets

Purpose: understand what must be connected or reused.

Fields:

- existing domain, optional
- existing website or app URL, optional
- existing GitHub repository, optional
- existing brand assets, optional
- services that need to be integrated

Integration options:

- Stripe or payment provider
- Supabase
- CRM
- email provider
- calendar
- maps
- analytics
- AI API
- internal company system
- other
- not sure yet

## Step 8 - Review And Submit

Purpose: allow the visitor to confirm the request before sending it.

Display summary:

- contact details
- project type
- short title
- idea description
- selected features
- technical needs
- timeline
- budget range
- project status
- integrations

Required confirmation:

- "I understand this request is for project discovery and does not create a binding quote."

Submit button:

- Send project request

Success message:

Thanks. Your project request has been received. Eventnexus will review the idea and follow up with the next step.

## Contact-Only Path

Some visitors may only want to ask a simple question.

Recommended fields:

- full name
- email
- message

CTA:

Send message

This path should be secondary to the structured project request.

## Lead Quality Scoring

The first backend version can store a simple lead score later.

Useful scoring signals:

- clear project description
- selected project type
- selected features
- budget range
- timeline urgency
- payment needs
- backend needs
- existing assets or domain
- company name provided

Initial lead statuses:

- new
- reviewed
- needs clarification
- qualified
- not a fit
- archived

## Suggested Supabase Table Shape

This is a planning draft only. Final schema should be created during the backend task.

Potential table: `project_leads`

Fields:

- `id`
- `created_at`
- `status`
- `full_name`
- `email`
- `phone_or_channel`
- `company_name`
- `region`
- `project_type`
- `project_title`
- `idea_description`
- `target_users`
- `problem_to_solve`
- `desired_outcome`
- `required_features`
- `technical_needs`
- `timeline`
- `budget_range`
- `project_status`
- `existing_domain`
- `existing_url`
- `existing_repo`
- `integrations`
- `extra_notes`
- `lead_score`

Security notes:

- do not expose private lead data publicly
- validate all submitted fields server-side
- use spam protection before production
- store only information needed to evaluate the project
- do not ask for passwords, tokens, private API keys, or payment card details in this form

## UI Behavior

- Keep each step short.
- Show progress, such as "Step 2 of 8".
- Allow back navigation.
- Save state locally during the form session when possible.
- Use clear labels and helper text.
- Make "not sure yet" available where clients may not know technical answers.
- Do not shame users for not knowing technical terms.
- Keep final submission reassuring and professional.

## Final Website Copy For Intake Section

### Heading

Tell us what you want to build.

### Copy

Start with a structured project request. Choose the type of solution, select the features you may need, share your timeline and budget range, and describe the idea in your own words.

You do not need a technical specification. The form helps turn your idea into the first version of a buildable project brief.

### CTA

Start a project request
