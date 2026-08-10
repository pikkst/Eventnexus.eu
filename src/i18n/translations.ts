export type TranslationKeys = {
  nav: {
    services: string;
    process: string;
    work: string;
    startProject: string;
    toggleNav: string;
  };
  common: {
    stepOf: (step: number, total: number) => string;
    back: string;
    next: string;
    submit: string;
    sendMessage: string;
    required: string;
    optional: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    consentText: string;
    consentError: string;
    emailError: string;
    messageMinLength: string;
    somethingWrong: string;
    submissionFailed: string;
    contactMinLength: string;
    contactRequired: string;
  };
  ui: {
    includes: string;
    bestFor: string;
    viewAllWork: string;
    portfolioCandidates: string;
    whatThisMeans: string;
    viewOnGitHub: string;
    visitSite: string;
  };
  home: {
    hero: {
      headline: string;
      supporting1: string;
      supporting2: string;
      primaryCta: string;
      secondaryCta: string;
      trustLine: string;
    };
    problem: {
      eyebrow: string;
      headline: string;
      description: string;
    };
    services: {
      eyebrow: string;
      headline: string;
      description: string;
      cards: Array<{
        title: string;
        description: string;
      }>;
    };
    process: {
      eyebrow: string;
      headline: string;
      steps: Array<{
        title: string;
        description: string;
      }>;
    };
    proof: {
      eyebrow: string;
      headline: string;
      description: string;
      items: Array<{
        title: string;
        description: string;
        category: string;
        href: string;
      }>;
    };
    intakeCta: {
      heading: string;
      body: string;
      primaryCta: string;
    };
  };
  services: {
    hero: {
      headline: string;
      description1: string;
      description2: string;
      primaryCta: string;
      secondaryCta: string;
    };
    promise: {
      eyebrow: string;
      headline: string;
      description: string;
    };
    serviceCards: Array<{
      title: string;
      description: string;
      includes: string[];
      bestFor: string;
    }>;
    projectTypes: string[];
    turnkey: {
      eyebrow: string;
      headline: string;
      description1: string;
      description2: string;
      suitableLabel: string;
    };
    howToStart: {
      eyebrow: string;
      headline: string;
      description1: string;
      description2: string;
      cta: string;
    };
    intakeCta: {
      heading: string;
      body: string;
      primaryCta: string;
    };
  };
  work: {
    hero: {
      title: string;
      description1: string;
      description2: string;
    };
    categories: Array<{
      title: string;
      items: Array<{
        title: string;
        description: string;
        category: string;
        href: string;
      }>;
    }>;
    categoriesTitle: string;
    nextSectionTitle: string;
    nextSectionDescription1: string;
    nextSectionDescription2: string;
    cta: string;
  };
  contact: {
    hero: {
      headline: string;
      description1: string;
      description2: string;
    };
    options: {
      projectTypes: Array<{ id: string; label: string }>;
      featureOptions: Array<{ id: string; label: string }>;
      technicalNeeds: Array<{ id: string; label: string }>;
      timelineOptions: Array<{ id: string; label: string }>;
      budgetOptions: Array<{ id: string; label: string }>;
      statusOptions: Array<{ id: string; label: string }>;
      integrationOptions: Array<{ id: string; label: string }>;
    };
    form: {
      title: string;
      stepIndicator: string;
      contactOnly: {
        label: string;
        description: string;
      };
    };
    step1: {
      legend: string;
      description: string;
      fullName: string;
      fullNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      region: string;
      regionPlaceholder: string;
    };
    step2: {
      legend: string;
      description: string;
      projectType: string;
      projectTypePlaceholder: string;
      projectTitle: string;
      projectTitlePlaceholder: string;
    };
    step3: {
      legend: string;
      description: string;
      whatBuild: string;
      whatBuildPlaceholder: string;
      whoWillUse: string;
      whoWillUsePlaceholder: string;
      problemSolve: string;
      problemSolvePlaceholder: string;
      desiredOutcome: string;
      desiredOutcomePlaceholder: string;
      minLengthHint: string;
    };
    step4: {
      legend: string;
      description: string;
      importantFeatures: string;
      importantFeaturesPlaceholder: string;
    };
    step5: {
      legend: string;
      description: string;
    };
    step6: {
      legend: string;
      description: string;
      timeline: string;
      timelinePlaceholder: string;
      budget: string;
      budgetPlaceholder: string;
      status: string;
      statusPlaceholder: string;
    };
    step7: {
      legend: string;
      description: string;
      existingDomain: string;
      existingDomainPlaceholder: string;
      existingUrl: string;
      existingUrlPlaceholder: string;
      existingRepo: string;
      existingRepoPlaceholder: string;
      existingBrandAssets: string;
      existingBrandAssetsPlaceholder: string;
      servicesIntegrate: string;
    };
    step8: {
      legend: string;
      description: string;
      confirmDetails: string;
      contactLabel: string;
      projectLabel: string;
      ideaLabel: string;
      needsLabel: string;
      integrationsLabel: string;
    };
    review: {
      fullName: string;
      email: string;
      phone: string;
      company: string;
      region: string;
      projectType: string;
      title: string;
      idea: string;
      targetUsers: string;
      problem: string;
      outcome: string;
      features: string;
      technicalNeeds: string;
      timeline: string;
      budget: string;
      projectStatus: string;
      domain: string;
      url: string;
      repo: string;
      brandAssets: string;
      integrations: string;
    };
    contactOnly: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      backToProject: string;
    };
    buttons: {
      askQuestion: string;
      sendProjectRequest: string;
      sendMessage: string;
    };
  };
  privacy: {
    title: string;
    controller: string;
    controllerName: string;
    controllerReg: string;
    controllerAddress: string;
    controllerEmail: string;
    purposesTitle: string;
    purposes: string;
    legalBasesTitle: string;
    legalBases: string;
    processorsTitle: string;
    processors: string;
    transfersTitle: string;
    transfers: string;
    retentionTitle: string;
    retention: string;
    rightsTitle: string;
    rights: string;
    contactTitle: string;
    contact: string;
    lastUpdated: string;
    analyticsText: string;
    accept: string;
    decline: string;
  };
};

export type Language = 'en' | 'ru' | 'de' | 'fi' | 'et';

export const languages: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'fi', label: 'Finnish', native: 'Suomi' },
  { code: 'et', label: 'Estonian', native: 'Eesti' },
];

export const defaultLanguage: Language = 'en';

export const translations: Record<Language, TranslationKeys> = {
  en: {
    nav: {
      services: 'Services',
      process: 'Process',
      work: 'Work',
      startProject: 'Start a Project',
      toggleNav: 'Toggle navigation',
    },
    common: {
      stepOf: (step, total) => `Step ${step} of ${total}`,
      back: 'Back',
      next: 'Next',
      submit: 'Send project request',
      sendMessage: 'Send message',
      required: 'Required',
      optional: 'Optional',
      successTitle: 'Request received',
      successMessage:
        'Thanks. Your project request has been received. Eventnexus will review the idea and follow up with the next step.',
      errorTitle: 'Please fix the following errors:',
      consentText:
        'I understand this request is for project discovery and does not create a binding quote.',
      consentError: 'Please confirm this consent before sending the request.',
      emailError: 'Please enter a valid email address.',
      messageMinLength: 'Message must be at least 10 characters.',
      somethingWrong: 'Something went wrong. Please try again.',
      submissionFailed: 'Submission failed',
      contactMinLength: 'Please fill in your name, a valid email, and a message.',
      contactRequired: 'Please fill in your name, a valid email, and a message.',
    },
    ui: {
      includes: 'Includes',
      bestFor: 'Best For',
      viewAllWork: 'View all work',
      portfolioCandidates: 'Portfolio candidates',
      whatThisMeans: 'What this means',
      viewOnGitHub: 'View on GitHub',
      visitSite: 'Visit site',
    },
    home: {
      hero: {
        headline: 'Eventnexus builds your idea into a working web platform.',
        supporting1:
          'From first concept to launch, Eventnexus creates turnkey digital solutions: websites, SaaS-style platforms, customer portals, backend systems, payment flows, automations, and deployment.',
        supporting2:
          'Bring the idea. Eventnexus helps structure it, design it, build it, and prepare it for real users.',
        primaryCta: 'Start a project request',
        secondaryCta: 'View services',
        trustLine:
          'Full-stack delivery for individuals, founders, service businesses, and companies that need practical digital products without managing a full technical team.',
      },
      problem: {
        eyebrow: 'Problem',
        headline: 'Good ideas often get stuck before they become real products.',
        description:
          'Turning an idea into a working platform can quickly become complicated. Frontend, backend, database, user accounts, admin tools, payments, integrations, hosting, and a clear launch path. Eventnexus brings those pieces together into one structured delivery process.',
      },
      services: {
        eyebrow: 'Services',
        headline: 'From idea to turnkey solution.',
        description:
          'Eventnexus helps shape, build, and launch web-based products starting from a rough idea or clearer technical plan.',
        cards: [
          {
            title: 'Idea Structuring',
            description:
              'Turn an early idea into a clear, buildable project plan with features and priorities.',
          },
          {
            title: 'Websites',
            description:
              'Professional company and landing pages that explain the offer clearly and convert visitors.',
          },
          {
            title: 'Platforms',
            description:
              'SaaS-style apps, customer portals, dashboards, and internal tools.',
          },
          {
            title: 'Frontend',
            description:
              'Clean, usable interfaces with responsive layout, forms, and product flows.',
          },
          {
            title: 'Backend',
            description:
              'Data, accounts, admin logic, APIs, and business rules behind the product.',
          },
          {
            title: 'Payments',
            description:
              'Checkout, payment flows, subscriptions, and paid access logic.',
          },
          {
            title: 'AI Workflows',
            description:
              'Use AI to accelerate planning, development, and useful product features where they genuinely help.',
          },
          {
            title: 'Launch',
            description:
              'Deploy, connect domains, verify production, and support future improvements.',
          },
        ],
      },
      process: {
        eyebrow: 'Process',
        headline: 'A structured path from request to launch.',
        steps: [
          {
            title: 'Submit your idea',
            description:
              'Start with a guided project form describing the type of solution, features, timeline, and budget.',
          },
          {
            title: 'Shape the scope',
            description:
              'Eventnexus reviews the request and turns the idea into a practical build plan.',
          },
          {
            title: 'Build the product',
            description:
              'The frontend, backend, database, payments, and admin tools are built as needed.',
          },
          {
            title: 'Launch and improve',
            description:
              'The product is deployed, connected to the right domain, and improved through iterations.',
          },
        ],
      },
      proof: {
        eyebrow: 'Experience',
        headline: 'Built on real product and AI workflow experience.',
        description:
          'Eventnexus is shaped by hands-on experience with TypeScript-based web platforms, AI-assisted tools, automation concepts, data products, and service-platform experiments.',
        items: [
          {
            title: 'Rootwise',
            description:
              'Eventnexus is shaped by hands-on experience with TypeScript-based web platforms, AI-assisted tools, automation concepts, data products, and service-platform experiments.',
            category: 'Web Platform',
            href: 'https://rootwise.site',
          },
          {
            title: 'LeadScout Pro AI',
            description:
              'AI-assisted lead generation and business-development tooling.',
            category: 'AI Tool',
            href: 'https://github.com/pikkst/LeadScout-Pro-AI',
          },
          {
            title: 'AetherForecast AI',
            description:
              'Data-focused AI experimentation with dashboards, forecasting, and decision tools.',
            category: 'Data AI',
            href: 'https://github.com/pikkst/AetherForecast-AI',
          },
        ],
      },
      intakeCta: {
        heading: 'Have an idea for a platform, portal, tool, or website?',
        body:
          'You do not need a finished specification. Start with what you know: the idea, who it is for, what it should do, and what outcome you want. The structured request form helps turn that into the first version of a buildable project plan.',
        primaryCta: 'Start your project request',
      },
    },
    services: {
      hero: {
        headline: 'Complete web-platform development from idea to launch.',
        description1:
          'Eventnexus helps individuals, founders, teams, and companies turn ideas into working digital products. The service can cover the full path: project structuring, UX planning, frontend, backend, databases, authentication, payments, integrations, deployment, and future improvements.',
        description2:
          'You can come with a rough idea, a business process, or a clear platform concept. Eventnexus helps shape it into a practical build plan and then turns that plan into a usable product.',
        primaryCta: 'Start a project request',
        secondaryCta: 'See delivery process',
      },
       promise: {
         eyebrow: 'Services',
         headline: 'One partner for the full build.',
         description:
           'Many digital projects become difficult because the work is split across too many disconnected parts. Eventnexus brings those pieces into one structured service. The goal is to reduce confusion for the client and create a clear route from idea to working solution.',
       },
       serviceCards: [
         {
           title: 'Idea Discovery And Project Structuring',
           description:
             'Turn early ideas into clear project requirements. Useful when the client knows what they want to achieve but does not yet know exactly what should be built.',
           includes: [
             'idea review',
             'target user definition',
             'feature mapping',
             'user-flow planning',
             'MVP scope',
             'technical direction',
             'project priorities',
             'delivery phases',
           ],
           bestFor:
             'Clients who have an idea, process, or business need but need help turning it into a buildable plan.',
         },
         {
           title: 'Company Websites And Landing Pages',
           description:
             'Professional websites for companies, products, services, and campaigns. These pages should explain the offer clearly, build trust, and guide visitors toward action.',
           includes: [
             'company website structure',
             'homepage and service pages',
             'landing pages',
             'conversion-focused copy structure',
             'responsive UI',
             'contact or project request flows',
             'deployment-ready frontend',
           ],
           bestFor:
             'Businesses that need a credible online presence, a clear service offer, or a stronger lead-generation page.',
         },
         {
           title: 'SaaS-Style Platforms And Web Applications',
           description:
             'Custom web platforms for business ideas, customer services, internal workflows, dashboards, and online products.',
           includes: [
             'user-facing application interfaces',
             'dashboards',
             'customer portals',
             'booking or request systems',
             'admin panels',
             'role-based access',
             'data workflows',
             'scalable feature planning',
           ],
           bestFor:
             'Founders, individuals, service businesses, and companies that want to launch or digitize a platform-based idea.',
         },
         {
           title: 'Frontend Development',
           description:
             'Frontend work covers the visible part of the product: layouts, pages, components, flows, forms, dashboards, and responsive user experience.',
           includes: [
             'responsive web interfaces',
             'component-based UI',
             'forms and multi-step flows',
             'dashboards and tables',
             'product pages',
             'frontend state and interaction logic',
             'accessibility basics',
           ],
           bestFor:
             'Projects that need a clean, usable, professional interface for real users.',
         },
         {
           title: 'Backend Development',
           description:
             'Backend work powers the product behind the interface. It handles data, users, business logic, server-side validation, integrations, and internal systems.',
           includes: [
             'database planning',
             'API and server-side logic',
             'authentication and user accounts',
             'roles and permissions',
             'admin functionality',
             'lead and form handling',
             'business rules',
             'secure environment configuration',
           ],
           bestFor:
             'Platforms that need more than static pages: accounts, saved data, dashboards, admin workflows, or custom logic.',
         },
         {
           title: 'Payments And Checkout',
           description:
             'Eventnexus can add payment flows when the product needs to sell services, subscriptions, bookings, digital access, or platform features.',
           includes: [
             'payment-provider integration',
             'checkout flow planning',
             'subscription or one-time payment logic',
             'payment success and failure states',
             'customer access rules after payment',
             'basic payment data flow planning',
           ],
           bestFor:
             'SaaS products, paid service platforms, booking systems, membership products, and digital service businesses.',
         },
         {
           title: 'Integrations And Automations',
           description:
             'Many useful platforms need to connect with other services. Eventnexus can plan and build integrations that reduce manual work and connect business processes.',
           includes: [
             'third-party API integrations',
             'CRM or lead workflows',
             'email notifications',
             'data sync concepts',
             'internal automation flows',
             'admin alerts',
             'AI-assisted workflow support where useful',
           ],
           bestFor:
             'Businesses that want to automate repetitive tasks, connect tools, or make a digital product part of a larger operating process.',
         },
         {
           title: 'AI-Assisted Product And Workflow Development',
           description:
             'Eventnexus uses modern AI tools to increase speed, structure, and capability during planning and development. AI can also become part of the final product when it creates real value.',
           includes: [
             'AI-assisted planning',
             'faster prototyping',
             'content and workflow support',
             'AI-assisted admin tools',
             'data interpretation concepts',
             'automation ideas',
             'product features that use AI where appropriate',
           ],
           bestFor:
             'Clients who want modern, faster development and practical AI features without vague hype or unnecessary complexity.',
         },
         {
           title: 'Deployment, Launch, And Maintenance',
           description:
             'A product is not finished when the code exists. It needs to be deployed, connected to the right domain, checked, and improved after real use begins.',
           includes: [
             'production deployment',
             'domain setup planning',
             'hosting configuration',
             'environment variables',
             'launch checks',
             'bug fixes',
             'iteration planning',
             'future feature development',
           ],
           bestFor:
             'Clients who want the product launched and maintained instead of receiving unfinished technical files.',
         },
       ],
       projectTypes: [
         'SaaS platforms',
         'customer portals',
         'service booking platforms',
         'company websites',
         'lead-generation websites',
         'internal business tools',
         'admin dashboards',
         'payment-enabled service platforms',
         'AI-assisted workflow tools',
         'automation systems',
         'data and reporting dashboards',
       ],
       turnkey: {
        eyebrow: 'Delivery Model',
        headline: 'What "turnkey" means at Eventnexus.',
        description1:
          'Turnkey means the client does not need to separately coordinate every technical discipline. Eventnexus can help define the project, build the core product, connect the needed services, prepare deployment, and support the next version.',
        description2:
          'The exact scope depends on the project. A simple company website may only need frontend, copy structure, a contact flow, and deployment. A platform may need accounts, database design, payments, admin tools, integrations, and a longer delivery plan.',
        suitableLabel: 'Suitable project types include:',
      },
      howToStart: {
        eyebrow: 'Next Step',
        headline: 'Start with a structured project request.',
        description1:
          'You do not need a complete technical specification. The request form is designed to collect the important details step by step: project type, target users, required features, payment needs, integrations, timeline, budget range, and your free-form idea description.',
        description2:
          'After the request is submitted, Eventnexus can review the idea and shape the next step.',
        cta: 'Start a project request',
      },
      intakeCta: {
        heading: 'Have an idea for a platform, portal, tool, or website?',
        body:
          'You do not need a finished specification. Start with what you know: the idea, who it is for, what it should do, and what outcome you want. The structured request form helps turn that into the first version of a buildable project plan.',
        primaryCta: 'Start your project request',
      },
    },
    work: {
      hero: {
        title: 'Proof and work',
        description1:
          'Eventnexus is shaped by hands-on experience with TypeScript-based web platforms, AI-assisted tools, automation concepts, data products, and service-platform experiments.',
        description2:
          'The following portfolio candidates demonstrate the kinds of products and workflows Eventnexus can help build.',
      },
      categoriesTitle: 'Portfolio candidates',
      categories: [
        {
          title: 'Web Platforms And SaaS-Style Products',
          items: [
            {
              title: 'Rootwise',
              description:
                'TypeScript-based web-platform product demonstrating modern frontend architecture and product-oriented thinking.',
              category: 'Web Platform',
              href: 'https://rootwise.site',
            },
          ],
        },
        {
          title: 'AI-Assisted Business Tools',
          items: [
            {
              title: 'LeadScout Pro AI',
              description:
                'AI-assisted lead generation and business-development tooling.',
              category: 'AI Tool',
              href: 'https://github.com/pikkst/LeadScout-Pro-AI',
            },
            {
              title: 'OmniAgent',
              description:
                'AI marketing workflow tooling supporting automation, campaign workflows, and business-process acceleration.',
              category: 'AI Tool',
              href: 'https://github.com/pikkst/OmniAgent',
            },
          ],
        },
        {
          title: 'Data And Dashboard Experiments',
          items: [
            {
              title: 'AetherForecast AI',
              description:
                'Data-focused AI product experimentation with dashboards, forecasting, and AI-enhanced decision tools.',
              category: 'Data AI',
              href: 'https://github.com/pikkst/AetherForecast-AI',
            },
          ],
        },
        {
          title: 'Media And Content Workflow Tools',
          items: [
            {
              title: 'Studio',
              description:
                'AI media or studio workflow tooling for custom creative tools, content workflows, and AI-assisted interfaces.',
              category: 'Media Tool',
              href: 'https://github.com/pikkst/Studio',
            },
          ],
        },
        {
          title: 'Earlier Platform Concepts',
          items: [
            {
              title: 'EventNexus',
              description:
                'Earlier EventNexus product work supporting the company story.',
              category: 'Platform Concept',
              href: 'https://github.com/pikkst/EventNexus',
            },
            {
              title: 'EventNexus Live Map',
              description:
                'Location or map-based EventNexus product exploration with event, map, and mobile-adjacent platform experience.',
              category: 'Map Platform',
              href: 'https://github.com/pikkst/EventNexus_Live_Map',
            },
          ],
        },
      ],
      nextSectionTitle: 'What this means for your project',
      nextSectionDescription1:
        'These projects reflect real exploration of web platforms, AI-assisted business tools, data products, marketing automation, and event-related concepts. They inform how Eventnexus approaches planning, architecture, and delivery.',
      nextSectionDescription2:
        'Eventnexus combines frontend, backend, automation, and deployment thinking into one delivery process. Each new project benefits from that accumulated experience.',
      cta: 'Start a project request',
    },
    contact: {
      hero: {
        headline: 'Tell us what you want to build.',
        description1:
          'Start with a structured project request. Choose the type of solution, select the features you may need, share your timeline and budget range, and describe the idea in your own words.',
        description2:
          'You do not need a technical specification. The form helps turn your idea into the first version of a buildable project brief.',
      },
       options: {
         projectTypes: [
           { id: 'company_website', label: 'company website' },
           { id: 'landing_page', label: 'landing page' },
           { id: 'saas_platform', label: 'SaaS platform' },
           { id: 'customer_portal', label: 'customer portal' },
           { id: 'booking_request_platform', label: 'booking or request platform' },
           { id: 'internal_business_tool', label: 'internal business tool' },
           { id: 'admin_dashboard', label: 'admin dashboard' },
           { id: 'ecommerce_payment_service', label: 'e-commerce or payment-enabled service' },
           { id: 'ai_workflow_tool', label: 'AI-assisted workflow tool' },
           { id: 'automation_integration', label: 'automation or integration' },
           { id: 'not_sure_yet', label: 'not sure yet' },
           { id: 'other', label: 'other' },
         ],
         featureOptions: [
           { id: 'public_pages', label: 'public pages' },
           { id: 'user_accounts', label: 'user accounts' },
           { id: 'login_registration', label: 'login and registration' },
           { id: 'user_roles_permissions', label: 'user roles or permissions' },
           { id: 'admin_dashboard', label: 'admin dashboard' },
           { id: 'customer_dashboard', label: 'customer dashboard' },
           { id: 'booking_scheduling', label: 'booking or scheduling' },
           { id: 'request_quote_forms', label: 'request or quote forms' },
           { id: 'file_uploads', label: 'file uploads' },
           { id: 'payments_subscriptions', label: 'payments or subscriptions' },
           { id: 'email_notifications', label: 'email notifications' },
           { id: 'crm_lead_workflow', label: 'CRM or lead workflow' },
           { id: 'analytics_reporting', label: 'analytics or reporting' },
           { id: 'map_location_features', label: 'map or location features' },
           { id: 'ai_features', label: 'AI-assisted features' },
           { id: 'third_party_integrations', label: 'third-party integrations' },
           { id: 'multilingual_support', label: 'multilingual support' },
           { id: 'not_sure_yet', label: 'not sure yet' },
         ],
         technicalNeeds: [
           { id: 'frontend', label: 'frontend design and development' },
           { id: 'backend', label: 'backend development' },
           { id: 'database', label: 'database setup' },
           { id: 'authentication', label: 'authentication' },
           { id: 'payment_integration', label: 'payment integration' },
           { id: 'admin_system', label: 'admin system' },
           { id: 'api_integration', label: 'API integration' },
           { id: 'automation', label: 'automation' },
           { id: 'deployment_hosting', label: 'deployment and hosting' },
           { id: 'domain_setup', label: 'domain setup' },
           { id: 'maintenance', label: 'maintenance after launch' },
           { id: 'technical_planning', label: 'technical planning only' },
           { id: 'not_sure_yet', label: 'not sure yet' },
         ],
         timelineOptions: [
           { id: 'asap', label: 'as soon as possible' },
           { id: '2_4_weeks', label: 'within 2-4 weeks' },
           { id: '1_2_months', label: 'within 1-2 months' },
           { id: '3_6_months', label: 'within 3-6 months' },
           { id: 'flexible', label: 'flexible timeline' },
           { id: 'exploring', label: 'just exploring' },
         ],
         budgetOptions: [
           { id: 'under_500', label: 'under 500 EUR' },
           { id: '500_1500', label: '500-1,500 EUR' },
           { id: '1500_3000', label: '1,500-3,000 EUR' },
           { id: '3000_7500', label: '3,000-7,500 EUR' },
           { id: '7500_15000', label: '7,500-15,000 EUR' },
           { id: '15000_plus', label: '15,000+ EUR' },
           { id: 'not_sure_yet', label: 'not sure yet' },
         ],
         statusOptions: [
           { id: 'idea_only', label: 'idea only' },
           { id: 'rough_plan', label: 'rough plan exists' },
           { id: 'design_spec', label: 'design or specification exists' },
           { id: 'existing_improvement', label: 'existing website or app needs improvement' },
           { id: 'existing_new_features', label: 'existing product needs new features' },
           { id: 'urgent', label: 'urgent business need' },
         ],
         integrationOptions: [
           { id: 'stripe_payment', label: 'Stripe or payment provider' },
           { id: 'supabase', label: 'Supabase' },
           { id: 'crm', label: 'CRM' },
           { id: 'email_provider', label: 'email provider' },
           { id: 'calendar', label: 'calendar' },
           { id: 'maps', label: 'maps' },
           { id: 'analytics', label: 'analytics' },
           { id: 'ai_api', label: 'AI API' },
           { id: 'internal_system', label: 'internal company system' },
           { id: 'other', label: 'other' },
           { id: 'not_sure_yet', label: 'not sure yet' },
         ],
       },
      form: {
        title: 'Project request',
        stepIndicator: 'Step {step} of {total}',
        contactOnly: {
          label: 'Contact only',
          description: 'Not ready for a full project request? Send a quick message instead.',
        },
      },
      step1: {
        legend: 'Contact Identity',
        description: 'How can Eventnexus reach you?',
        fullName: 'Full name',
        fullNamePlaceholder: 'Your full name',
        email: 'Email address',
        emailPlaceholder: 'you@example.com',
        phone: 'Phone or preferred contact channel',
        phonePlaceholder: '+372 5555 5555',
        company: 'Company or organization name',
        companyPlaceholder: 'Acme OÜ',
        region: 'Country or region',
        regionPlaceholder: 'Estonia',
      },
      step2: {
        legend: 'Project Type',
        description: 'What do you want to build?',
        projectType: 'Project type',
        projectTypePlaceholder: 'Select a project type',
        projectTitle: 'Short project title',
        projectTitlePlaceholder: 'Internal booking tool for support team',
      },
      step3: {
        legend: 'Idea Description',
        description: 'Describe the idea in your own words.',
        whatBuild: 'What do you want to build?',
        whatBuildPlaceholder:
          'Describe the idea, the main goal, and what success looks like after launch.',
        whoWillUse: 'Who will use it?',
        whoWillUsePlaceholder: 'Small-business owners, support agents, end customers',
        problemSolve: 'What problem should it solve?',
        problemSolvePlaceholder: 'Current manual process, missing tool, or unmet business need.',
        desiredOutcome: 'What should happen after a user uses it?',
        desiredOutcomePlaceholder: 'Booking completed, lead captured, report exported, approval sent.',
        minLengthHint:
          'Please include at least a few sentences so Eventnexus can understand the scope.',
      },
      step4: {
        legend: 'Required Features',
        description: 'Select the features you expect to need.',
        importantFeatures: 'Important features not listed',
        importantFeaturesPlaceholder: 'Add anything else that is important for the project.',
      },
      step5: {
        legend: 'Technical Needs',
        description: 'What kinds of technical work does this project need?',
      },
      step6: {
        legend: 'Timeline And Budget',
        description: 'Help Eventnexus understand urgency and project fit.',
        timeline: 'Preferred timeline',
        timelinePlaceholder: 'Select a timeline',
        budget: 'Budget range',
        budgetPlaceholder: 'Select a budget range',
        status: 'Current project status',
        statusPlaceholder: 'Select a status',
      },
      step7: {
        legend: 'Integrations And Existing Assets',
        description: 'What must be connected or reused?',
        existingDomain: 'Existing domain',
        existingDomainPlaceholder: 'example.com',
        existingUrl: 'Existing website or app URL',
        existingUrlPlaceholder: 'https://',
        existingRepo: 'Existing GitHub repository',
        existingRepoPlaceholder: 'https://github.com/owner/repo',
        existingBrandAssets: 'Existing brand assets',
        existingBrandAssetsPlaceholder: 'Logo, style guide, asset links',
        servicesIntegrate: 'Services that need to be integrated',
      },
      step8: {
        legend: 'Review And Submit',
        description: 'Confirm the details before sending the request.',
        confirmDetails: 'Confirm the details before sending the request.',
        contactLabel: 'Contact',
        projectLabel: 'Project',
        ideaLabel: 'Idea',
        needsLabel: 'Needs And Timeline',
        integrationsLabel: 'Integrations And Assets',
      },
      review: {
        fullName: 'Full name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        region: 'Region',
        projectType: 'Project type',
        title: 'Title',
        idea: 'Idea',
        targetUsers: 'Target users',
        problem: 'Problem',
        outcome: 'Outcome',
        features: 'Features',
        technicalNeeds: 'Technical needs',
        timeline: 'Timeline',
        budget: 'Budget',
        projectStatus: 'Project status',
        domain: 'Domain',
        url: 'URL',
        repo: 'Repo',
        brandAssets: 'Brand assets',
        integrations: 'Integrations',
      },
      contactOnly: {
        name: 'Full name',
        namePlaceholder: 'Your full name',
        email: 'Email',
        emailPlaceholder: 'you@example.com',
        message: 'Message',
        messagePlaceholder: 'What do you want to ask?',
        backToProject: 'Back to project request',
      },
      buttons: {
        askQuestion: 'Ask a question instead',
        sendProjectRequest: 'Send project request',
        sendMessage: 'Send message',
      },
    },
    privacy: {
      title: 'Privacy Notice',
      controller: 'Data Controller',
      controllerName: 'EventNexus OÜ',
      controllerReg: 'Registration number 17431557',
      controllerAddress: 'Põltsamaa, Estonia',
      controllerEmail: 'admin@eventnexus.eu',
      purposesTitle: 'Purposes',
      purposes: 'We process personal data to handle project requests, respond to contact messages, operate this website, and send notification emails.',
      legalBasesTitle: 'Legal Bases',
      legalBases: 'Processing is based on your consent, contractual necessity, or our legitimate interest in operating this website and evaluating project requests.',
      processorsTitle: 'Processors',
      processors: 'We use Supabase (EU) for lead storage, Resend for email delivery, and Cloudflare for hosting and privacy-first analytics.',
      transfersTitle: 'Transfers',
      transfers: 'Data may be transferred to processors in the EU and the US under appropriate safeguards, including standard contractual clauses.',
      retentionTitle: 'Retention',
      retention: 'Project leads are retained for up to 3 years or until you request deletion. Application logs are retained for up to 1 year. Resend email events are retained for up to 1 year.',
      rightsTitle: 'Your Rights',
      rights: 'You have the right to access, correct, delete, or restrict processing of your data, and to object to or withdraw consent at any time.',
      contactTitle: 'Contact',
      contact: 'Contact the data controller at admin@eventnexus.eu for privacy requests.',
      lastUpdated: 'Last updated: August 2026',
      analyticsText: 'This site uses privacy-first analytics to understand usage.',
      accept: 'Accept',
      decline: 'Decline',
    },
  },
  ru: {
    nav: {
      services: 'Услуги',
      process: 'Процесс',
      work: 'Работы',
      startProject: 'Начать проект',
      toggleNav: 'Открыть меню',
    },
    common: {
      stepOf: (step, total) => `Шаг ${step} из ${total}`,
      back: 'Назад',
      next: 'Далее',
      submit: 'Отправить запрос',
      sendMessage: 'Отправить сообщение',
      required: 'Обязательно',
      optional: 'Необязательно',
      successTitle: 'Запрос получен',
      successMessage:
        'Спасибо. Ваш запрос проекта получен. Eventnexus рассмотрит идею и свяжется с вами для следующего шага.',
      errorTitle: 'Исправьте следующие ошибки:',
      consentText:
        'Я понимаю, что этот запрос предназначен для изучения проекта и не является обязывающей оценкой.',
      consentError: 'Пожалуйста, подтвердите согласие перед отправкой запроса.',
      emailError: 'Пожалуйста, введите действующий email адрес.',
      messageMinLength: 'Сообщение должно содержать не менее 10 символов.',
      somethingWrong: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
      submissionFailed: 'Ошибка отправки',
    },
    ui: {
      includes: 'Включает',
      bestFor: 'Для кого',
      viewAllWork: 'Все работы',
      portfolioCandidates: 'Кандидаты в портфолио',
      whatThisMeans: 'Что это значит для вашего проекта',
      viewOnGitHub: 'Посмотреть на GitHub',
      visitSite: 'Перейти на сайт',
    },
    home: {
      hero: {
        headline: 'Eventnexus превращает вашу идею в работающую веб-платформу.',
        supporting1:
          'От первой концепции до запуска Eventnexus создаёт готовые цифровые решения: сайты, SaaS-платформы, клиентские порталы, бэкенд-системы, платёжные потоки, автоматизацию и деплой.',
        supporting2:
          'Предоставьте идею. Eventnexus поможет структурировать её, спроектировать, разработать и подготовить к реальным пользователям.',
        primaryCta: 'Начать запрос проекта',
        secondaryCta: 'Смотреть услуги',
        trustLine:
          'Полный цикл разработки для частных лиц, основателей, сервисных компаний и организаций, которым нужны практичные цифровые продукты без управления полноценной технической командой.',
      },
      problem: {
        eyebrow: 'Проблема',
        headline: 'Хорошие идеи часто застревают до того, как становятся реальными продуктами.',
        description:
          'Превращение идеи в работающую платформу может быстро усложниться. Фронтенд, бэкенд, база данных, учётные записи, админ-панели, платежи, интеграции, хостинг и понятный путь запуска. Eventnexus объединяет все эти части в один структурированный процесс.',
      },
      services: {
        eyebrow: 'Услуги',
        headline: 'От идеи до готового решения.',
        description:
          'Eventnexus помогает формировать, создавать и запускать веб-продукты, начиная с rough идеи или более чёткого технического плана.',
      },
      process: {
        eyebrow: 'Процесс',
        headline: 'Структурированный путь от запроса до запуска.',
        steps: [
          {
            title: 'Отправьте идею',
            description: 'Начните с пошаговой формы, где описываются тип решения, функции, сроки и бюджет.',
          },
          {
            title: 'Сформируйте объём',
            description: 'Eventnexus анализирует запрос и превращает идею в практичный план разработки.',
          },
          {
            title: 'Постройте продукт',
            description: 'Фронтенд, бэкенд, база данных, платежи и админ-инструменты создаются по мере необходимости.',
          },
          {
            title: 'Запустите и улучшайте',
            description: 'Продукт разворачивается, подключается к нужному домену и улучшается по итерациям.',
          },
        ],
      },
      proof: {
        eyebrow: 'Опыт',
        headline: 'Основано на реальном продуктовом и AI опыте.',
        description:
          'Eventnexus формируется практическим опытом работы с веб-платформами на TypeScript, AI-инструментами, концепциями автоматизации, данными и экспериментами с сервисными платформами.',
      },
      intakeCta: {
        heading: 'Есть идея платформы, портала, инструмента или сайта?',
        body:
          'Вам не нужна готовая спецификация. Начните с того, что знаете: идея, для кого она, что должна делать и какой результат вы хотите получить. Структурированная форма запроса поможет превратить это в первую версию реализуемого плана проекта.',
        primaryCta: 'Начать запрос проекта',
      },
    },
    services: {
      hero: {
        headline: 'Полная разработка веб-платформы от идеи до запуска.',
        description1:
          'Eventnexus помогает частным лицам, основателям, командам и компаниям превращать идеи в работающие цифровые продукты. Услуга может охватывать весь путь: структурирование проекта, UX-планирование, фронтенд, бэкенд, базы данных, аутентификация, платежи, интеграции, деплой и будущие улучшения.',
        description2:
          'Вы можете прийти с rough идеей, бизнес-процессом или чёткой концепцией платформы. Eventnexus поможет превратить это в практичный план сборки, а затем в готовый продукт.',
        primaryCta: 'Начать запрос проекта',
        secondaryCta: 'Смотреть процесс',
      },
      promise: {
        eyebrow: 'Услуги',
        headline: 'Один партнёр для полной сборки.',
        description:
          'Многие цифровые проекты становятся сложными, потому что работа разделена на слишком много несвязанных частей. Eventnexus объединяет эти части в один структурированный сервис. Цель — уменьшить путаницу у клиента и создать понятный путь от идеи к работающему решению.',
      },
      turnkey: {
        eyebrow: 'Модель поставки',
        headline: 'Что означает "под ключ" в Eventnexus.',
        description1:
          '"Под ключ" означает, что клиенту не нужно отдельно координировать каждую техническую дисциплину. Eventnexus может помочь определить проект, собрать основной продукт, подключить необходимые сервисы, подготовить деплой и поддержать следующую версию.',
        description2:
          'Точный объём зависит от проекта. Простой корпоративный сайт может нуждаться только во фронтенде, структуре текста, контактном потоке и деплое. Платформа может нуждаться в учётных записях, проектировании базы данных, платежах, админ-инструментах, интеграциях и более длительном плане доставки.',
        suitableLabel: 'Подходящие типы проектов:',
      },
      howToStart: {
        eyebrow: 'Следующий шаг',
        headline: 'Начните со структурированного запроса проекта.',
        description1:
          'Вам не нужна полная техническая спецификация. Форма запроса предназначена для сбора важных деталей шаг за шагом: тип проекта, целевые пользователи, необходимые функции, платёжные потребности, интеграции, сроки, бюджет и ваше свободное описание идеи.',
        description2:
          'После отправки запроса Eventnexus может рассмотреть идею и сформировать следующий шаг.',
        cta: 'Начать запрос проекта',
      },
      intakeCta: {
        heading: 'Есть идея платформы, портала, инструмента или сайта?',
        body:
          'Вам не нужна готовая спецификация. Начните с того, что знаете: идея, для кого она, что должна делать и какой результат вы хотите получить. Структурированная форма запроса поможет превратить это в первую версию реализуемого плана проекта.',
        primaryCta: 'Начать запрос проекта',
      },
    },
    work: {
      hero: {
        title: 'Работы и опыт',
        description1:
          'Eventnexus формируется практическим опытом работы с веб-платформами на TypeScript, AI-инструментами, концепциями автоматизации, данными и экспериментами с сервисными платформами.',
        description2:
          'Следующие кандидаты в портфолио демонстрируют типы продуктов и рабочих процессов, в создании которых Eventnexus может помочь.',
      },
      categoriesTitle: 'Кандидаты в портфолио',
      nextSectionTitle: 'Что это значит для вашего проекта',
      nextSectionDescription1:
        'Эти проекты отражают реальное исследование веб-платформ, AI-инструментов для бизнеса, продуктов данных, маркетинговой автоматизации и концепций, связанных с событиями. Они определяют, как Eventnexus подходит к планированию, архитектуре и поставке.',
      nextSectionDescription2:
        'Eventnexus объединяет фронтенд, бэкенд, автоматизацию и идеи деплоя в один процесс поставки. Каждый новый проект выигрывает от этого накопленного опыта.',
      cta: 'Начать запрос проекта',
    },
    contact: {
      hero: {
        headline: 'Расскажите, что вы хотите построить.',
        description1:
          'Начните со структурированного запроса проекта. Выберите тип решения, необходимые функции, сроки и бюджет, и опишите идею своими словами.',
        description2:
          'Вам не нужна техническая спецификация. Форма поможет превратить вашу идею в первую версию реализуемого проектного брифа.',
      },
      options: {
        projectTypes: [
          { id: 'company_website', label: 'Корпоративный сайт' },
          { id: 'landing_page', label: 'Лендинг' },
          { id: 'saas_platform', label: 'SaaS-платформа' },
          { id: 'customer_portal', label: 'Клиентский портал' },
          { id: 'booking_request_platform', label: 'Платформа бронирования или заявок' },
          { id: 'internal_business_tool', label: 'Внутренний бизнес-инструмент' },
          { id: 'admin_dashboard', label: 'Админ-панель' },
          { id: 'ecommerce_payment_service', label: 'E-commerce или платёжный сервис' },
          { id: 'ai_workflow_tool', label: 'AI-ассистируемый инструмент рабочего процесса' },
          { id: 'automation_integration', label: 'Автоматизация или интеграция' },
          { id: 'not_sure_yet', label: 'Пока не уверен' },
          { id: 'other', label: 'Другое' },
        ],
        featureOptions: [
          { id: 'public_pages', label: 'Публичные страницы' },
          { id: 'user_accounts', label: 'Аккаунты пользователей' },
          { id: 'login_registration', label: 'Вход и регистрация' },
          { id: 'user_roles_permissions', label: 'Роли или разрешения пользователей' },
          { id: 'admin_dashboard', label: 'Админ-панель' },
          { id: 'customer_dashboard', label: 'Панель клиента' },
          { id: 'booking_scheduling', label: 'Бронирование или расписание' },
          { id: 'request_quote_forms', label: 'Формы заявок или коммерческих предложений' },
          { id: 'file_uploads', label: 'Загрузка файлов' },
          { id: 'payments_subscriptions', label: 'Платежи или подписки' },
          { id: 'email_notifications', label: 'Email уведомления' },
          { id: 'crm_lead_workflow', label: 'CRM или воркфлоу лидов' },
          { id: 'analytics_reporting', label: 'Аналитика или отчётность' },
          { id: 'map_location_features', label: 'Карты или функции геолокации' },
          { id: 'ai_features', label: 'AI-помощь' },
          { id: 'third_party_integrations', label: 'Сторонние интеграции' },
          { id: 'multilingual_support', label: 'Мультиязычная поддержка' },
          { id: 'not_sure_yet', label: 'Пока не уверен' },
        ],
        technicalNeeds: [
          { id: 'frontend', label: 'Дизайн и разработка фронтенда' },
          { id: 'backend', label: 'Разработка бэкенда' },
          { id: 'database', label: 'Настройка базы данных' },
          { id: 'authentication', label: 'Аутентификация' },
          { id: 'payment_integration', label: 'Платёжная интеграция' },
          { id: 'admin_system', label: 'Админ-система' },
          { id: 'api_integration', label: 'API-интеграция' },
          { id: 'automation', label: 'Автоматизация' },
          { id: 'deployment_hosting', label: 'Развёртывание и хостинг' },
          { id: 'domain_setup', label: 'Настройка домена' },
          { id: 'maintenance', label: 'Поддержка после запуска' },
          { id: 'technical_planning', label: 'Только техническое планирование' },
          { id: 'not_sure_yet', label: 'Пока не уверен' },
        ],
        timelineOptions: [
          { id: 'asap', label: 'Как можно скорее' },
          { id: '2_4_weeks', label: 'В течение 2-4 недель' },
          { id: '1_2_months', label: 'В течение 1-2 месяцев' },
          { id: '3_6_months', label: 'В течение 3-6 месяцев' },
          { id: 'flexible', label: 'Гибкий срок' },
          { id: 'exploring', label: 'Просто изучаю варианты' },
        ],
        budgetOptions: [
          { id: 'under_500', label: 'до 500 EUR' },
          { id: '500_1500', label: '500-1 500 EUR' },
          { id: '1500_3000', label: '1 500-3 000 EUR' },
          { id: '3000_7500', label: '3 000-7 500 EUR' },
          { id: '7500_15000', label: '7 500-15 000 EUR' },
          { id: '15000_plus', label: 'более 15 000 EUR' },
          { id: 'not_sure_yet', label: 'Пока не уверен' },
        ],
        statusOptions: [
          { id: 'idea_only', label: 'Только идея' },
          { id: 'rough_plan', label: 'Есть приблизительный план' },
          { id: 'design_spec', label: 'Есть дизайн или спецификация' },
          { id: 'existing_improvement', label: 'Существующий сайт или приложение нуждается в улучшении' },
          { id: 'existing_new_features', label: 'Существующий продукт нуждается в новых функциях' },
          { id: 'urgent', label: 'Срочная бизнес-потребность' },
        ],
        integrationOptions: [
          { id: 'stripe_payment', label: 'Stripe или платёжный провайдер' },
          { id: 'supabase', label: 'Supabase' },
          { id: 'crm', label: 'CRM' },
          { id: 'email_provider', label: 'Почтовый провайдер' },
          { id: 'calendar', label: 'Календарь' },
          { id: 'maps', label: 'Карты' },
          { id: 'analytics', label: 'Аналитика' },
          { id: 'ai_api', label: 'AI API' },
          { id: 'internal_system', label: 'Внутренняя система компании' },
          { id: 'other', label: 'Другое' },
          { id: 'not_sure_yet', label: 'Пока не уверен' },
        ],
      },
      form: {
        title: 'Запрос проекта',
        stepIndicator: 'Шаг {step} из {total}',
        contactOnly: {
          label: 'Только контакт',
          description: 'Не готовы к полному запросу проекта? Отправьте быстрое сообщение.',
        },
      },
      step1: {
        legend: 'Контактные данные',
        description: 'Как Eventnexus может связаться с вами?',
        fullName: 'Полное имя',
        fullNamePlaceholder: 'Ваше полное имя',
        email: 'Email адрес',
        emailPlaceholder: 'you@example.com',
        phone: 'Телефон или предпочтительный канал связи',
        phonePlaceholder: '+372 5555 5555',
        company: 'Название компании или организации',
        companyPlaceholder: 'Acme OÜ',
        region: 'Страна или регион',
        regionPlaceholder: 'Эстония',
      },
      step2: {
        legend: 'Тип проекта',
        description: 'Что вы хотите построить?',
        projectType: 'Тип проекта',
        projectTypePlaceholder: 'Выберите тип проекта',
        projectTitle: 'Краткое название проекта',
        projectTitlePlaceholder: 'Внутренний инструмент бронирования для службы поддержки',
      },
      step3: {
        legend: 'Описание идеи',
        description: 'Опишите идею своими словами.',
        whatBuild: 'Что вы хотите построить?',
        whatBuildPlaceholder:
          'Опишите идею, основную цель и то, как будет выглядеть успех после запуска.',
        whoWillUse: 'Кто будет использовать?',
        whoWillUsePlaceholder: 'Владельцы малого бизнеса, агенты поддержки, конечные клиенты',
        problemSolve: 'Какую проблему это должно решить?',
        problemSolvePlaceholder: 'Текущий ручной процесс, отсутствие инструмента или неудовлетворённая бизнес-потребность.',
        desiredOutcome: 'Что должно произойти после использования?',
        desiredOutcomePlaceholder: 'Бронирование завершено, лид захвачен, отчёт экспортирован, согласие отправлено.',
        minLengthHint:
          'Пожалуйста, включите хотя бы несколько предложений, чтобы Eventnexus мог понять объём.',
      },
      step4: {
        legend: 'Необходимые функции',
        description: 'Выберите функции, которые, как вы ожидаете, понадобятся.',
        importantFeatures: 'Важные функции, не указанные в списке',
        importantFeaturesPlaceholder: 'Добавьте всё, что важно для проекта.',
      },
      step5: {
        legend: 'Технические потребности',
        description: 'Какие виды технической работы нужны для этого проекта?',
      },
      step6: {
        legend: 'Сроки и бюджет',
        description: 'Помогите Eventnexus понять срочность и соответствие проекту.',
        timeline: 'Предпочтительные сроки',
        timelinePlaceholder: 'Выберите сроки',
        budget: 'Бюджетный диапазон',
        budgetPlaceholder: 'Выберите бюджет',
        status: 'Текущий статус проекта',
        statusPlaceholder: 'Выберите статус',
      },
      step7: {
        legend: 'Интеграции и существующие активы',
        description: 'Что нужно подключить или повторно использовать?',
        existingDomain: 'Существующий домен',
        existingDomainPlaceholder: 'example.com',
        existingUrl: 'Существующий сайт или URL приложения',
        existingUrlPlaceholder: 'https://',
        existingRepo: 'Существующий GitHub репозиторий',
        existingRepoPlaceholder: 'https://github.com/owner/repo',
        existingBrandAssets: 'Существующие бренд-активы',
        existingBrandAssetsPlaceholder: 'Логотип, гайдлайн, ссылки на активы',
        servicesIntegrate: 'Сервисы, которые нужно интегрировать',
      },
      step8: {
        legend: 'Просмотр и отправка',
        description: 'Подтвердите детали перед отправкой запроса.',
        confirmDetails: 'Подтвердите детали перед отправкой запроса.',
        contactLabel: 'Контакт',
        projectLabel: 'Проект',
        ideaLabel: 'Идея',
        needsLabel: 'Потребности и сроки',
        integrationsLabel: 'Интеграции и активы',
      },
      review: {
        fullName: 'Полное имя',
        email: 'Email',
        phone: 'Телефон',
        company: 'Компания',
        region: 'Регион',
        projectType: 'Тип проекта',
        title: 'Название',
        idea: 'Идея',
        targetUsers: 'Целевые пользователи',
        problem: 'Проблема',
        outcome: 'Результат',
        features: 'Функции',
        technicalNeeds: 'Технические потребности',
        timeline: 'Сроки',
        budget: 'Бюджет',
        projectStatus: 'Статус проекта',
        domain: 'Домен',
        url: 'URL',
        repo: 'Репозиторий',
        brandAssets: 'Бренд-активы',
        integrations: 'Интеграции',
      },
      contactOnly: {
        name: 'Полное имя',
        namePlaceholder: 'Ваше полное имя',
        email: 'Email',
        emailPlaceholder: 'you@example.com',
        message: 'Сообщение',
        messagePlaceholder: 'Что вы хотите спросить?',
        backToProject: 'Вернуться к запросу проекта',
      },
      buttons: {
        askQuestion: 'Задать вопрос вместо этого',
        sendProjectRequest: 'Отправить запрос проекта',
        sendMessage: 'Отправить сообщение',
      },
    },
    privacy: {
      title: 'Уведомление о конфиденциальности',
      controller: 'Контролёр данных',
      controllerName: 'EventNexus OÜ',
      controllerReg: 'Регистрационный номер 17431557',
      controllerAddress: 'Пылтсамаа, Эстония',
      controllerEmail: 'admin@eventnexus.eu',
      purposesTitle: 'Цели',
      purposes: 'Мы обрабатываем персональные данные для обработки запросов проектов, ответов на сообщения, работы этого сайта и отправки уведомлений по email.',
      legalBasesTitle: 'Правовые основы',
      legalBases: 'Обработка основана на вашем согласии, договорной необходимости или нашем законном интересе в работе этого сайта и оценке запросов проектов.',
      processorsTitle: 'Процессоры',
      processors: 'Мы используем Supabase (ЕС) для хранения лидов, Resend для доставки email и Cloudflare для хостинга и приватной аналитики.',
      transfersTitle: 'Передачи',
      transfers: 'Данные могут передаваться процессорам в ЕС и США при надлежащих гарантиях, включая стандартные договорные условия.',
      retentionTitle: 'Хранение',
      retention: 'Запросы проектов хранятся до 3 лет или до вашего запроса на удаление. Журналы приложения хранятся до 1 года. События email хранятся до 1 года.',
      rightsTitle: 'Ваши права',
      rights: 'Вы имеете право на доступ, исправление, удаление или ограничение обработки ваших данных, а также на возражение или отзыв согласия в любое время.',
      contactTitle: 'Контакт',
      contact: 'Свяжитесь с контролёром данных по адресу admin@eventnexus.eu для запросов, связанных с конфиденциальностью.',
      lastUpdated: 'Последнее обновление: август 2026',
      analyticsText: 'Этот сайт использует приватную аналитику для понимания использования.',
      accept: 'Принять',
      decline: 'Отклонить',
    },
  },
  de: {
    nav: {
      services: 'Leistungen',
      process: 'Prozess',
      work: 'Arbeiten',
      startProject: 'Projekt starten',
      toggleNav: 'Navigation umschalten',
    },
    common: {
      stepOf: (step, total) => `Schritt ${step} von ${total}`,
      back: 'Zurück',
      next: 'Weiter',
      submit: 'Projektanfrage senden',
      sendMessage: 'Nachricht senden',
      required: 'Pflichtfeld',
      optional: 'Optional',
      successTitle: 'Anfrage erhalten',
      successMessage:
        'Danke. Ihre Projektanfrage wurde erhalten. Eventnexus wird die Idee prüfen und sich mit dem nächsten Schritt melden.',
      errorTitle: 'Bitte beheben Sie die folgenden Fehler:',
      consentText:
        'Ich verstehe, dass diese Anfrage der Projekterkundung dient und kein verbindliches Angebot darstellt.',
      consentError: 'Bitte bestätigen Sie dieses Einverständnis vor dem Absenden.',
      emailError: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      messageMinLength: 'Die Nachricht muss mindestens 10 Zeichen enthalten.',
      somethingWrong: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
      submissionFailed: 'Übermittlung fehlgeschlagen',
    },
    ui: {
      includes: 'Beinhaltet',
      bestFor: 'Am besten für',
      viewAllWork: 'Alle Arbeiten anzeigen',
      portfolioCandidates: 'Portfolio-Kandidaten',
      whatThisMeans: 'Was das für Ihr Projekt bedeutet',
      viewOnGitHub: 'Auf GitHub ansehen',
      visitSite: 'Seite besuchen',
    },
    home: {
      hero: {
        headline: 'Eventnexus baut Ihre Idee in eine funktionierende Webplattform.',
        supporting1:
          'Vom ersten Konzept bis zum Start erstellt Eventnexus schlüsselfertige digitale Lösungen: Websites, SaaS-Plattformen, Kundenportale, Backend-Systeme, Zahlungsflüsse, Automatisierungen und Deployment.',
        supporting2:
          'Liefern Sie die Idee. Eventnexus hilft, sie zu strukturieren, zu gestalten, zu entwickeln und für echte Nutzer vorzubereiten.',
        primaryCta: 'Projektanfrage starten',
        secondaryCta: 'Leistungen ansehen',
        trustLine:
          'Full-Stack-Lieferung für Einzelpersonen, Gründer, Dienstleistungsunternehmen und Unternehmen, die praktische digitale Produkte ohne Verwaltung eines vollständigen technischen Teams benötigen.',
      },
      problem: {
        eyebrow: 'Problem',
        headline: 'Gute Ideen bleiben oft stecken, bevor sie zu echten Produkten werden.',
        description:
          'Die Umsetzung einer Idee in eine funktionierende Plattform kann schnell kompliziert werden. Frontend, Backend, Datenbank, Benutzerkonten, Admin-Tools, Zahlungen, Integrationen, Hosting und ein klarer Startpfad. Eventnexus bringt diese Teile in einem strukturierten Lieferprozess zusammen.',
      },
      services: {
        eyebrow: 'Leistungen',
        headline: 'Von der Idee zur schlüsselfertigen Lösung.',
        description:
          'Eventnexus hilft bei der Gestaltung, Erstellung und dem Start webbasierter Produkte, ausgehend von einer groben Idee oder einem klareren technischen Plan.',
      },
      process: {
        eyebrow: 'Prozess',
        headline: 'Ein strukturierter Weg von der Anfrage bis zum Start.',
        steps: [
          {
            title: 'Senden Sie Ihre Idee',
            description: 'Beginnen Sie mit einem geführten Projektformular, das Lösungsart, Funktionen, Zeitplan und Budget beschreibt.',
          },
          {
            title: 'Formen Sie den Umfang',
            description: 'Eventnexus prüft die Anfrage und verwandelt die Idee in einen praktischen Bauplan.',
          },
          {
            title: 'Bauen Sie das Produkt',
            description: 'Frontend, Backend, Datenbank, Zahlungen und Admin-Tools werden nach Bedarf erstellt.',
          },
          {
            title: 'Starten und verbessern',
            description: 'Das Produkt wird bereitgestellt, an die richtige Domain angeschlossen und iterativ verbessert.',
          },
        ],
      },
      proof: {
        eyebrow: 'Erfahrung',
        headline: 'Basierend auf echter Produkt- und KI-Workflow-Erfahrung.',
        description:
          'Eventnexus wird durch praktische Erfahrung mit TypeScript-basierten Webplattformen, KI-gestützten Tools, Automatisierungskonzepten, Datenprodukten und Service-Plattform-Experimenten geformt.',
      },
      intakeCta: {
        heading: 'Haben Sie eine Idee für eine Plattform, ein Portal, ein Tool oder eine Website?',
        body:
          'Sie brauchen keine fertige Spezifikation. Fangen Sie mit dem an, was Sie wissen: die Idee, für wen sie ist, was sie tun soll und welches Ergebnis Sie wollen. Das strukturierte Anfrageformular hilft, daraus die erste Version eines realisierbaren Projektplans zu machen.',
        primaryCta: 'Projektanfrage starten',
      },
    },
    services: {
      hero: {
        headline: 'Vollständige Web-Plattformentwicklung von der Idee bis zum Start.',
        description1:
          'Eventnexus hilft Einzelpersonen, Gründern, Teams und Unternehmen, Ideen in funktionierende digitale Produkte zu verwandeln. Die Dienstleistung kann den gesamten Weg abdecken: Projektstrukturierung, UX-Planung, Frontend, Backend, Datenbanken, Authentifizierung, Zahlungen, Integrationen, Deployment und zukünftige Verbesserungen.',
        description2:
          'Sie können mit einer groben Idee, einem Geschäftsprozess oder einem klaren Plattformkonzept kommen. Eventnexus hilft, daraus einen praktischen Bauplan zu machen und diesen Plan dann in ein nutzbares Produkt zu verwandeln.',
        primaryCta: 'Projektanfrage starten',
        secondaryCta: 'Lieferprozess ansehen',
      },
      promise: {
        eyebrow: 'Leistungen',
        headline: 'Ein Partner für den gesamten Build.',
        description:
          'Viele digitale Projekte werden schwierig, weil die Arbeit auf zu viele unverbundene Teile verteilt ist. Eventnexus bringt diese Teile in einen strukturierten Service. Das Ziel ist, Verwirrung für den Kunden zu reduzieren und einen klaren Weg von der Idee zur funktionierenden Lösung zu schaffen.',
      },
      turnkey: {
        eyebrow: 'Liefermodell',
        headline: 'Was "schlüsselfertig" bei Eventnexus bedeutet.',
        description1:
          'Schlüsselfertig bedeutet, dass der Kunde nicht jede technische Disziplin separat koordinieren muss. Eventnexus kann helfen, das Projekt zu definieren, das Kernprodukt zu bauen, die benötigten Dienste zu verbinden, den Start vorzubereiten und die nächste Version zu unterstützen.',
        description2:
          'Der genaue Umfang hängt vom Projekt ab. Eine einfache Unternehmenswebsite benötigt möglicherweise nur Frontend, Textstruktur, einen Kontaktfluss und Deployment. Eine Plattform benötigt möglicherweise Konten, Datenbankdesign, Zahlungen, Admin-Tools, Integrationen und einen längeren Lieferplan.',
        suitableLabel: 'Geeignete Projekttypen:',
      },
      howToStart: {
        eyebrow: 'Nächster Schritt',
        headline: 'Beginnen Sie mit einer strukturierten Projektanfrage.',
        description1:
          'Sie brauchen keine vollständige technische Spezifikation. Das Anfrageformular ist darauf ausgelegt, die wichtigen Details Schritt für Schritt zu sammeln: Projekttyp, Zielbenutzer, erforderliche Funktionen, Zahlungsbedarf, Integrationen, Zeitplan, Budgetbereich und Ihre freiformierte Ideenbeschreibung.',
        description2:
          'Nach Einreichung der Anfrage kann Eventnexus die Idee prüfen und den nächsten Schritt gestalten.',
        cta: 'Projektanfrage starten',
      },
      intakeCta: {
        heading: 'Haben Sie eine Idee für eine Plattform, ein Portal, ein Tool oder eine Website?',
        body:
          'Sie brauchen keine fertige Spezifikation. Fangen Sie mit dem an, was Sie wissen: die Idee, für wen sie ist, was sie tun soll und welches Ergebnis Sie wollen. Das strukturierte Anfrageformular hilft, daraus die erste Version eines realisierbaren Projektplans zu machen.',
        primaryCta: 'Projektanfrage starten',
      },
    },
    work: {
      hero: {
        title: 'Arbeiten und Erfahrung',
        description1:
          'Eventnexus wird durch praktische Erfahrung mit TypeScript-basierten Webplattformen, KI-gestützten Tools, Automatisierungskonzepten, Datenprodukten und Service-Plattform-Experimenten geformt.',
        description2:
          'Die folgenden Portfoliokandidaten zeigen die Arten von Produkten und Workflows, bei deren Erstellung Eventnexus helfen kann.',
      },
      categoriesTitle: 'Portfoliokandidaten',
      nextSectionTitle: 'Was das für Ihr Projekt bedeutet',
      nextSectionDescription1:
        'Diese Projekte spiegeln die reale Erforschung von Webplattformen, KI-gestützten Business-Tools, Datenprodukten, Marketingautomatisierung und ereignisbezogenen Konzepten wider. Sie beeinflussen, wie Eventnexus Planung, Architektur und Lieferung angeht.',
      nextSectionDescription2:
        'Eventnexus kombiniert Frontend, Backend, Automatisierung und Deployment-Denken in einen Lieferprozess. Jedes neue Projekt profitiert von dieser gesammelten Erfahrung.',
      cta: 'Projektanfrage starten',
    },
    contact: {
      hero: {
        headline: 'Sagen Sie uns, was Sie bauen möchten.',
        description1:
          'Beginnen Sie mit einer strukturierten Projektanfrage. Wählen Sie die Art der Lösung, die Funktionen, die Sie benötigen, teilen Sie Ihren Zeitplan und Budgetbereich mit und beschreiben Sie die Idee in Ihren eigenen Worten.',
        description2:
          'Sie brauchen keine technische Spezifikation. Das Formular hilft, Ihre Idee in die erste Version eines realisierbaren Projektbriefs zu verwandeln.',
      },
      options: {
        projectTypes: [
          { id: 'company_website', label: 'Unternehmenswebsite' },
          { id: 'landing_page', label: 'Landingpage' },
          { id: 'saas_platform', label: 'SaaS-Plattform' },
          { id: 'customer_portal', label: 'Kundenportal' },
          { id: 'booking_request_platform', label: 'Buchungs- oder Anfrageplattform' },
          { id: 'internal_business_tool', label: 'Internes Geschäfts-Tool' },
          { id: 'admin_dashboard', label: 'Admin-Dashboard' },
          { id: 'ecommerce_payment_service', label: 'E-Commerce- oder Zahlungsservice' },
          { id: 'ai_workflow_tool', label: 'AI-gestütztes Workflow-Tool' },
          { id: 'automation_integration', label: 'Automatisierung oder Integration' },
          { id: 'not_sure_yet', label: 'Noch nicht sicher' },
          { id: 'other', label: 'Andere' },
        ],
        featureOptions: [
          { id: 'public_pages', label: 'Öffentliche Seiten' },
          { id: 'user_accounts', label: 'Benutzerkonten' },
          { id: 'login_registration', label: 'Anmeldung und Registrierung' },
          { id: 'user_roles_permissions', label: 'Benutzerrollen oder -berechtigungen' },
          { id: 'admin_dashboard', label: 'Admin-Dashboard' },
          { id: 'customer_dashboard', label: 'Kunden-Dashboard' },
          { id: 'booking_scheduling', label: 'Buchung oder Zeitplanung' },
          { id: 'request_quote_forms', label: 'Angebots- oder Anfrageformulare' },
          { id: 'file_uploads', label: 'Datei-Uploads' },
          { id: 'payments_subscriptions', label: 'Zahlungen oder Abonnements' },
          { id: 'email_notifications', label: 'E-Mail-Benachrichtigungen' },
          { id: 'crm_lead_workflow', label: 'CRM- oder Lead-Workflow' },
          { id: 'analytics_reporting', label: 'Analytik oder Berichte' },
          { id: 'map_location_features', label: 'Kartierung oder Standortfunktionen' },
          { id: 'ai_features', label: 'AI-gestützte Funktionen' },
          { id: 'third_party_integrations', label: 'Drittanbieter-Integrationen' },
          { id: 'multilingual_support', label: 'Mehrsprachige Unterstützung' },
          { id: 'not_sure_yet', label: 'Noch nicht sicher' },
        ],
        technicalNeeds: [
          { id: 'frontend', label: 'Frontend-Design und Entwicklung' },
          { id: 'backend', label: 'Backend-Entwicklung' },
          { id: 'database', label: 'Datenbank-Setup' },
          { id: 'authentication', label: 'Authentifizierung' },
          { id: 'payment_integration', label: 'Zahlungs-Integration' },
          { id: 'admin_system', label: 'Admin-System' },
          { id: 'api_integration', label: 'API-Integration' },
          { id: 'automation', label: 'Automatisierung' },
          { id: 'deployment_hosting', label: 'Deployment und Hosting' },
          { id: 'domain_setup', label: 'Domain-Setup' },
          { id: 'maintenance', label: 'Wartung nach dem Launch' },
          { id: 'technical_planning', label: 'Nur technische Planung' },
          { id: 'not_sure_yet', label: 'Noch nicht sicher' },
        ],
        timelineOptions: [
          { id: 'asap', label: 'So schnell wie möglich' },
          { id: '2_4_weeks', label: 'Innerhalb von 2-4 Wochen' },
          { id: '1_2_months', label: 'Innerhalb von 1-2 Monaten' },
          { id: '3_6_months', label: 'Innerhalb von 3-6 Monaten' },
          { id: 'flexible', label: 'Flexibler Zeitplan' },
          { id: 'exploring', label: 'Erkunde gerade erst Optionen' },
        ],
        budgetOptions: [
          { id: 'under_500', label: 'unter 500 EUR' },
          { id: '500_1500', label: '500-1.500 EUR' },
          { id: '1500_3000', label: '1.500-3.000 EUR' },
          { id: '3000_7500', label: '3.000-7.500 EUR' },
          { id: '7500_15000', label: '7.500-15.000 EUR' },
          { id: '15000_plus', label: '15.000+ EUR' },
          { id: 'not_sure_yet', label: 'Noch nicht sicher' },
        ],
        statusOptions: [
          { id: 'idea_only', label: 'Nur Idee' },
          { id: 'rough_plan', label: 'Grober Plan existiert' },
          { id: 'design_spec', label: 'Design oder Spezifikation existiert' },
          { id: 'existing_improvement', label: 'Vorhandene Website oder App muss verbessert werden' },
          { id: 'existing_new_features', label: 'Vorhandenes Produkt braucht neue Funktionen' },
          { id: 'urgent', label: 'Dringender Geschäftbedarf' },
        ],
        integrationOptions: [
          { id: 'stripe_payment', label: 'Stripe oder Zahlungsanbieter' },
          { id: 'supabase', label: 'Supabase' },
          { id: 'crm', label: 'CRM' },
          { id: 'email_provider', label: 'E-Mail-Anbieter' },
          { id: 'calendar', label: 'Kalender' },
          { id: 'maps', label: 'Karten' },
          { id: 'analytics', label: 'Analytik' },
          { id: 'ai_api', label: 'AI API' },
          { id: 'internal_system', label: 'Internes Unternehmenssystem' },
          { id: 'other', label: 'Andere' },
          { id: 'not_sure_yet', label: 'Noch nicht sicher' },
        ],
      },
      form: {
        title: 'Projektanfrage',
        stepIndicator: 'Schritt {step} von {total}',
        contactOnly: {
          label: 'Nur Kontakt',
          description: 'Noch nicht bereit für eine vollständige Projektanfrage? Senden Sie eine kurze Nachricht.',
        },
      },
      step1: {
        legend: 'Kontaktidentität',
        description: 'Wie kann Eventnexus Sie erreichen?',
        fullName: 'Vollständiger Name',
        fullNamePlaceholder: 'Ihr vollständiger Name',
        email: 'E-Mail-Adresse',
        emailPlaceholder: 'you@example.com',
        phone: 'Telefon oder bevorzugter Kontaktkanal',
        phonePlaceholder: '+372 5555 5555',
        company: 'Firmen- oder Organisationsname',
        companyPlaceholder: 'Acme OÜ',
        region: 'Land oder Region',
        regionPlaceholder: 'Estland',
      },
      step2: {
        legend: 'Projekttyp',
        description: 'Was möchten Sie bauen?',
        projectType: 'Projekttyp',
        projectTypePlaceholder: 'Wählen Sie einen Projekttyp',
        projectTitle: 'Kurzer Projekttitel',
        projectTitlePlaceholder: 'Internes Buchungstool für das Support-Team',
      },
      step3: {
        legend: 'Ideenbeschreibung',
        description: 'Beschreiben Sie die Idee in Ihren eigenen Worten.',
        whatBuild: 'Was möchten Sie bauen?',
        whatBuildPlaceholder:
          'Beschreiben Sie die Idee, das Hauptziel und wie Erfolg nach dem Start aussieht.',
        whoWillUse: 'Wer wird es nutzen?',
        whoWillUsePlaceholder: 'Kleinunternehmer, Support-Mitarbeiter, Endkunden',
        problemSolve: 'Welches Problem soll es lösen?',
        problemSolvePlaceholder: 'Aktueller manueller Prozess, fehlendes Tool oder unerfüllter Geschäftsbedarf.',
        desiredOutcome: 'Was soll nach der Nutzung passieren?',
        desiredOutcomePlaceholder: 'Buchung abgeschlossen, Lead erfasst, Bericht exportiert, Genehmigung gesendet.',
        minLengthHint:
          'Bitte fügen Sie mindestens einige Sätze hinzu, damit Eventnexus den Umfang verstehen kann.',
      },
      step4: {
        legend: 'Erforderliche Funktionen',
        description: 'Wählen Sie die Funktionen aus, die Sie voraussichtlich benötigen.',
        importantFeatures: 'Wichtige Funktionen, nicht aufgelistet',
        importantFeaturesPlaceholder: 'Fügen Sie alles hinzu, was für das Projekt wichtig ist.',
      },
      step5: {
        legend: 'Technische Anforderungen',
        description: 'Welche Arten von technischer Arbeit benötigt dieses Projekt?',
      },
      step6: {
        legend: 'Zeitplan und Budget',
        description: 'Helfen Sie Eventnexus, Dringlichkeit und Projekteignung zu verstehen.',
        timeline: 'Bevorzugter Zeitplan',
        timelinePlaceholder: 'Wählen Sie einen Zeitplan',
        budget: 'Budgetbereich',
        budgetPlaceholder: 'Wählen Sie einen Budgetbereich',
        status: 'Aktueller Projektstatus',
        statusPlaceholder: 'Wählen Sie einen Status',
      },
      step7: {
        legend: 'Integrationen und vorhandene Assets',
        description: 'Was muss verbunden oder wiederverwendet werden?',
        existingDomain: 'Vorhandene Domain',
        existingDomainPlaceholder: 'example.com',
        existingUrl: 'Vorhandene Website oder App-URL',
        existingUrlPlaceholder: 'https://',
        existingRepo: 'Vorhandenes GitHub-Repository',
        existingRepoPlaceholder: 'https://github.com/owner/repo',
        existingBrandAssets: 'Vorhandene Marken-Assets',
        existingBrandAssetsPlaceholder: 'Logo, Styleguide, Asset-Links',
        servicesIntegrate: 'Dienste, die integriert werden müssen',
      },
      step8: {
        legend: 'Überprüfen und senden',
        description: 'Bestätigen Sie die Details vor dem Senden der Anfrage.',
        confirmDetails: 'Bestätigen Sie die Details vor dem Senden der Anfrage.',
        contactLabel: 'Kontakt',
        projectLabel: 'Projekt',
        ideaLabel: 'Idee',
        needsLabel: 'Anforderungen und Zeitplan',
        integrationsLabel: 'Integrationen und Assets',
      },
      review: {
        fullName: 'Vollständiger Name',
        email: 'E-Mail',
        phone: 'Telefon',
        company: 'Firma',
        region: 'Region',
        projectType: 'Projekttyp',
        title: 'Titel',
        idea: 'Idee',
        targetUsers: 'Zielbenutzer',
        problem: 'Problem',
        outcome: 'Ergebnis',
        features: 'Funktionen',
        technicalNeeds: 'Technische Anforderungen',
        timeline: 'Zeitplan',
        budget: 'Budget',
        projectStatus: 'Projektstatus',
        domain: 'Domain',
        url: 'URL',
        repo: 'Repo',
        brandAssets: 'Marken-Assets',
        integrations: 'Integrationen',
      },
      contactOnly: {
        name: 'Vollständiger Name',
        namePlaceholder: 'Ihr vollständiger Name',
        email: 'E-Mail',
        emailPlaceholder: 'you@example.com',
        message: 'Nachricht',
        messagePlaceholder: 'Was möchten Sie fragen?',
        backToProject: 'Zurück zur Projektanfrage',
      },
      buttons: {
        askQuestion: 'Stattdessen eine Frage stellen',
        sendProjectRequest: 'Projektanfrage senden',
        sendMessage: 'Nachricht senden',
      },
    },
    privacy: {
      title: 'Datenschutzhinweis',
      controller: 'Verantwortlicher',
      controllerName: 'EventNexus OÜ',
      controllerReg: 'Registrierungsnummer 17431557',
      controllerAddress: 'Põltsamaa, Estland',
      controllerEmail: 'admin@eventnexus.eu',
      purposesTitle: 'Zwecke',
      purposes: 'Wir verarbeiten personenbezogene Daten zur Bearbeitung von Projektanfragen, zur Beantwortung von Kontaktnachrichten, zum Betrieb dieser Website und zum Versand von Benachrichtigungs-E-Mails.',
      legalBasesTitle: 'Rechtsgrundlagen',
      legalBases: 'Die Verarbeitung basiert auf Ihrer Einwilligung, vertraglicher Notwendigkeit oder unserem berechtigten Interesse am Betrieb dieser Website und der Bewertung von Projektanfragen.',
      processorsTitle: 'Verarbeiter',
      processors: 'Wir nutzen Supabase (EU) zur Speicherung von Leads, Resend für den E-Mail-Versand und Cloudflare für Hosting und datenschutzfreundliche Analysen.',
      transfersTitle: 'Übermittlungen',
      transfers: 'Daten können an Verarbeiter in der EU und den USA unter angemessenen Garantien, einschliesslich Standardvertragsklauseln, übermittelt werden.',
      retentionTitle: 'Aufbewahrung',
      retention: 'Projektleads werden bis zu 3 Jahre lang oder bis zu Ihrer Löschanfrage aufbewahrt. Anwendungsprotokolle werden bis zu 1 Jahr lang aufbewahrt. Resend-E-Mail-Ereignisse werden bis zu 1 Jahr lang aufbewahrt.',
      rightsTitle: 'Ihre Rechte',
      rights: 'Sie haben das Recht auf Zugriff, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer Daten sowie das Recht, der Verarbeitung zu widersprechen oder Ihre Einwilligung jederzeit zu widerrufen.',
      contactTitle: 'Kontakt',
      contact: 'Wenden Sie sich an den Verantwortlichen unter admin@eventnexus.eu für datenschutzbezogene Anfragen.',
      lastUpdated: 'Zuletzt aktualisiert: August 2026',
      analyticsText: 'Diese Website verwendet datenschutzfreundliche Analysen, um die Nutzung zu verstehen.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen',
    },
  },
  fi: {
    nav: {
      services: 'Palvelut',
      process: 'Prosessi',
      work: 'Työt',
      startProject: 'Aloita projekti',
      toggleNav: 'Avaa valikko',
    },
    common: {
      stepOf: (step, total) => `Vaihe ${step} / ${total}`,
      back: 'Takaisin',
      next: 'Seuraava',
      submit: 'Lähetä projektipyyntö',
      sendMessage: 'Lähetä viesti',
      required: 'Pakollinen',
      optional: 'Valinnainen',
      successTitle: 'Pyyntö vastaanotettu',
      successMessage:
        'Kiitos. Projektipyyntösi on vastaanotettu. Eventnexus tarkistaa idean ja otaa yhteyttä seuraavaan vaiheeseen.',
      errorTitle: 'Korjaa seuraavat virheet:',
      consentText:
        'Ymmärrän, että tämä pyyntö on tarkoitettu projektiselvitykseen eikä ole sitova hintatarjous.',
      consentError: 'Vahvista suostumus ennen lähetystä.',
      emailError: 'Syötä kelvollinen sähköpostiosoite.',
      messageMinLength: 'Viestissä on oltava vähintään 10 merkkiä.',
      somethingWrong: 'Jokin meni pieleen. Yritä uudelleen.',
      submissionFailed: 'Lähetys epäonnistui',
    },
    ui: {
      includes: 'Sisältää',
      bestFor: 'Parhaiten sopii',
      viewAllWork: 'Näytä kaikki työt',
      portfolioCandidates: 'Portfolio-ehdokkaat',
      whatThisMeans: 'Mitä tämä tarkoittaa projektillesi',
      viewOnGitHub: 'Katso GitHubissa',
      visitSite: 'Vieraile sivustolla',
    },
    home: {
      hero: {
        headline: 'Eventnexus rakentaa ideasi toimivaksi verkkoportaaliin.',
        supporting1:
          'Ensimmäisestä konseptista käynnistykseen Eventnexus luo valmiita digitaalisia ratkaisuja: sivustoja, SaaS-tyylisiä alustoja, asiakasportaaleja, taustajärjestelmiä, maksuvirtoja, automatisointia ja käyttöönottoa.',
        supporting2:
          'Anna idea. Eventnexus auttaa rakentamaan sen, suunnittelemaan, kehittämään ja valmistelemaan todellisia käyttäjiä varten.',
        primaryCta: 'Aloita projektipyyntö',
        secondaryCta: 'Katso palvelut',
        trustLine:
          'Kokonaisvaltainen toimitus yksityishenkilöille, perustajille, palveluyrityksille ja yrityksille, jotka tarvitsevat käytännöllisiä digitaalisia tuotteita ilman kokonaisen teknisen tiimin hallintaa.',
      },
      problem: {
        eyebrow: 'Ongelma',
        headline: 'Hyvät ideat juuttuvat usein ennen kuin ne muuttuvat todellisiksi tuotteiksi.',
        description:
          'Idean muuttaminen toimivaksi alustaksi voi nopeasti mutkistua. Frontend, backend, tietokanta, käyttäjätilit, hallintatyökalut, maksut, integraatiot, hosting ja selkeä käynnistyspolku. Eventnexus yhdistää nämä osat yhteen jäsenneltyun toimitustapahtumaan.',
      },
      services: {
        eyebrow: 'Palvelut',
        headline: 'Ideaista valmiiseen ratkaisuun.',
        description:
          'Eventnexus auttaa muotoilemaan, rakentamaan ja käynnistämään verkkopohjaisia tuotteita alkaen karkeasta ideasta tai selvemmästä teknisestä suunnitelmasta.',
      },
      process: {
        eyebrow: 'Prosessi',
        headline: 'Jäsennelty polku pyynnöstä käynnistykseen.',
        steps: [
          {
            title: 'Lähetä ideasi',
            description: 'Aloita opastetulla projektilomakkeella, jossa kuvataan ratkaisun tyyppi, ominaisuudet, aikataulu ja budjetti.',
          },
          {
            title: 'Muotoile laajuus',
            description: 'Eventnexus arvioi pyynnön ja muuttaa idean käytännölliseksi rakennussuunnitelmaksi.',
          },
          {
            title: 'Rakenna tuote',
            description: 'Frontend, backend, tietokanta, maksut ja hallintatyökalut rakennetaan tarpeen mukaan.',
          },
          {
            title: 'Käynnistä ja paranna',
            description: 'Tuote otetaan käyttöön, yhdistetään oikeaan domainiin ja parannetaan iteratiivisesti.',
          },
        ],
      },
      proof: {
        eyebrow: 'Kokemus',
        headline: 'Perustuu todelliseen tuote- ja työnkulkukokemukseen.',
        description:
          'Eventnexus on muodostunut käytännön kokemuksesta TypeScript-pohjaisten verkkoportaalien, AI-työkalujen, automaatiokonseptien, datatuotteiden ja palvelualustakokeilujen kanssa.',
      },
      intakeCta: {
        heading: 'Onko sinulla idea alustasta, portaalista, työkalusta tai sivustosta?',
        body:
          'Tarvitset valmiita määrityksiä. Aloita tiedostamasi asioilla: idea, kenelle se on, mitä sen pitäisi tehdä ja mikä tulos on tavoitteena. Jäsennelty pyyntölomake auttaa muuttamaan tämän ensimmäiseksi versioksi toteutettavasta projektisuunnitelmasta.',
        primaryCta: 'Aloita projektipyyntö',
      },
    },
    services: {
      hero: {
        headline: 'Täydellinen verkkoportaalin kehitys ideasta käynnistykseen.',
        description1:
          'Eventnexus auttaa yksityishenkilöitä, perustajia, tiimejä ja yrityksiä muuttamaan ideoita toimiviksi digitaalisiksi tuotteiksi. Palvelu voi kattaa koko tien: projektin rakentaminen, UX-suunnittelu, frontend, backend, tietokannat, autentikointi, maksut, integraatiot, käyttöönotto ja tulevat parannukset.',
        description2:
          'Voit tulla karkealla idealla, liiketoimintaprosessilla tai selkeällä alustakonseptilla. Eventnexus auttaa muotoilemaan sen käytännölliseksi rakennussuunnitelmaksi ja sitten muuttamaan suunnitelman käyttökelpoiseksi tuotteeksi.',
        primaryCta: 'Aloita projektipyyntö',
        secondaryCta: 'Katso toimitustapa',
      },
      promise: {
        eyebrow: 'Palvelut',
        headline: 'Yksi kumppani koko rakennukseen.',
        description:
          'Monista digitaalisista projekteista tulee vaikeita, koska työ on jaettu liian moneen irtonaiseen osaan. Eventnexus yhdistää nämä osat yhteen jäsenneltyyn palveluun. Tavoitteena on vähentää asiakkaan sekaannusta ja luoda selkeä reitti ideasta toimivaan ratkaisuun.',
      },
      turnkey: {
        eyebrow: 'Toimitustapa',
        headline: 'Mitä "avaimet käteen" tarkoittaa Eventnexuksessa.',
        description1:
          '"Avaimet käteen" tarkoittaa, että asiakkaan ei tarvitse erikseen koordinoida jokaista teknistä disciplinea. Eventnexus voi auttaa määrittelemään projektin, rakentamaan ydin tuotteen, yhdistämään tarvittavat palvelut, valmistelemaan käyttöönottoa ja tukemaan seuraavaa versiota.',
        description2:
          'Tarkka laajuus riippuu projektista. Yksinkertainen yrityssivusto saattaa tarvita vain frontend, tekstirakenteen, yhteysvirtauksen ja käyttöönoton. Alusta saattaa tarvita tilejä, tietokantasuunnittelua, maksuja, hallintatyökaluja, integraatioita ja pidemmän toimitussuunnitelman.',
        suitableLabel: 'Sopivia projektityyppejä:',
      },
      howToStart: {
        eyebrow: 'Seuraava vaihe',
        headline: 'Aloita jäsennellyllä projektipyynnöllä.',
        description1:
          'Tarvitset täydellistä teknistä määritystä. Pyyntölomake on suunniteltu keräämään tärkeät tiedot askel askeleelta: projektityyppi, kohdekäyttäjät, vaaditut ominaisuudet, maksutarpeet, integraatiot, aikataulu, budjetin alue ja vapaa kuvauksesi ideasta.',
        description2:
          'Pyynnön lähettämisen jälkeen Eventnexus voi tarkistaa idean ja muotoilla seuraavan vaiheen.',
        cta: 'Aloita projektipyyntö',
      },
      intakeCta: {
        heading: 'Onko sinulla idea alustasta, portaalista, työkalusta tai sivustosta?',
        body:
          'Tarvitset valmiita määrityksiä. Aloita tiedostamasi asioilla: idea, kenelle se on, mitä sen pitäisi tehdä ja mikä tulos on tavoitteena. Jäsennelty pyyntölomake auttaa muuttamaan tämän ensimmäiseksi versioksi toteutettavasta projektisuunnitelmasta.',
        primaryCta: 'Aloita projektipyyntö',
      },
    },
    work: {
      hero: {
        title: 'Työt ja kokemus',
        description1:
          'Eventnexus on muodostunut käytännön kokemuksesta TypeScript-pohjaisten verkkoportaalien, AI-työkalujen, automaatiokonseptien, datatuotteiden ja palvelualustakokeilujen kanssa.',
        description2:
          'Seuraavat salkkuehdokkaat osoittavat, millaisia tuotteita ja työnkulkuja Eventnexus voi auttaa rakentamaan.',
      },
      categoriesTitle: 'Salkkukandidaatit',
      nextSectionTitle: 'Mitä tämä tarkoittaa projektillesi',
      nextSectionDescription1:
        'Nämä projektit heijastavat todellista tutkimusta verkkoportaista, AI-työkaluista liiketoiminnalle, datatuotteista, markkinointiautomaatiosta ja tapahtumaan liittyvistä konsepteista. Ne ohjaavat, miten Eventnexus lähestyy suunnittelua, arkkitehtuuria ja toimitusta.',
      nextSectionDescription2:
        'Eventnexus yhdistää frontendin, backendin, automatisointi- ja käyttöönottoajattelun yhteen toimitustapahtumaan. Jokainen uusi projekti hyötyy tästä kertyneestä kokemuksesta.',
      cta: 'Aloita projektipyyntö',
    },
    contact: {
      hero: {
        headline: 'Kerro, mitä haluat rakentaa.',
        description1:
          'Aloita jäsennellyllä projektipyynnöllä. Valitse ratkaisun tyyppi, tarvitsemasi ominaisuudet, aikataulu ja budjettialue, ja kuvaile idea omilla sanoillasi.',
        description2:
          'Tarvitset teknistä määritystä. Lomake auttaa muuttamaan ideasi ensimmäiseksi versioksi toteutettavasta projektiselvityksestä.',
      },
      options: {
        projectTypes: [
          { id: 'company_website', label: 'Yrityssivusto' },
          { id: 'landing_page', label: 'Landasivu' },
          { id: 'saas_platform', label: 'SaaS-alusta' },
          { id: 'customer_portal', label: 'Asiakasportaali' },
          { id: 'booking_request_platform', label: 'Varaus- tai pyyntöalusta' },
          { id: 'internal_business_tool', label: 'Sisäinen liiketoimintatyökalu' },
          { id: 'admin_dashboard', label: 'Admin-paneeli' },
          { id: 'ecommerce_payment_service', label: 'Sija- tai maksutarve omaava palvelu' },
          { id: 'ai_workflow_tool', label: 'Tekoälyavusteinen työkalu' },
          { id: 'automation_integration', label: 'Automaatio tai integraatio' },
          { id: 'not_sure_yet', label: 'Ei vielä varma' },
          { id: 'other', label: 'Muuta' },
        ],
        featureOptions: [
          { id: 'public_pages', label: 'Julkaisemattomat sivut' },
          { id: 'user_accounts', label: 'Käyttäjätilejä' },
          { id: 'login_registration', label: 'Kirjautuminen ja rekisteröityminen' },
          { id: 'user_roles_permissions', label: 'Käyttäjäroolit tai -oikeudet' },
          { id: 'admin_dashboard', label: 'Admin-paneeli' },
          { id: 'customer_dashboard', label: 'Asiakaspaneeli' },
          { id: 'booking_scheduling', label: 'Varaus tai ajoitus' },
          { id: 'request_quote_forms', label: 'Tarjous-, tai pyyntölomakkeet' },
          { id: 'file_uploads', label: 'Tiedostojen lataus' },
          { id: 'payments_subscriptions', label: 'Maksut tai tilaukset' },
          { id: 'email_notifications', label: 'Sähköposti-ilmoitukset' },
          { id: 'crm_lead_workflow', label: 'CRM- tai liidutie' },
          { id: 'analytics_reporting', label: 'Analytiikka tai raportit' },
          { id: 'map_location_features', label: ' Kartta- tai sijainti-ominaisuudet' },
          { id: 'ai_features', label: 'Tekoälyominaisuudet' },
          { id: 'third_party_integrations', label: 'Kolmannen osapuolen integraatiot' },
          { id: 'multilingual_support', label: 'Monikielinen tuki' },
          { id: 'not_sure_yet', label: 'Ei vielä varma' },
        ],
        technicalNeeds: [
          { id: 'frontend', label: 'Frontendin muotoilu ja kehitys' },
          { id: 'backend', label: 'Backend-kehitys' },
          { id: 'database', label: 'Tietokannan asennus' },
          { id: 'authentication', label: 'Todennus' },
          { id: 'payment_integration', label: 'Maksuintegraatio' },
          { id: 'admin_system', label: 'Hallintajärjestelmä' },
          { id: 'api_integration', label: 'API-integraatio' },
          { id: 'automation', label: 'Automaatio' },
          { id: 'deployment_hosting', label: 'Käyttöönotto ja isäntäpalvelin' },
          { id: 'domain_setup', label: 'Verkkotunnuksen asetus' },
          { id: 'maintenance', label: 'Ylläpito lanseerauksen jälkeen' },
          { id: 'technical_planning', label: 'Vain tekninen suunnittelu' },
          { id: 'not_sure_yet', label: 'Ei vielä varma' },
        ],
        timelineOptions: [
          { id: 'asap', label: 'Mahdollisimman nopeasti' },
          { id: '2_4_weeks', label: '2–4 viikon sisällä' },
          { id: '1_2_months', label: '1–2 kuukauden sisällä' },
          { id: '3_6_months', label: '3–6 kuukauden sisällä' },
          { id: 'flexible', label: 'Joustava aikataulu' },
          { id: 'exploring', label: 'Tutkin kääntäjänä vaihtoehdot' },
        ],
        budgetOptions: [
          { id: 'under_500', label: 'alle 500 €' },
          { id: '500_1500', label: '500–1 500 €' },
          { id: '1500_3000', label: '1 500–3 000 €' },
          { id: '3000_7500', label: '3 000–7 500 €' },
          { id: '7500_15000', label: '7 500–15 000 €' },
          { id: '15000_plus', label: 'yli 15 000 €' },
          { id: 'not_sure_yet', label: 'Ei vielä varma' },
        ],
        statusOptions: [
          { id: 'idea_only', label: 'Vain-ideainen' },
          { id: 'rough_plan', label: 'Rough-suunnitelma on olemassa' },
          { id: 'design_spec', label: 'Muotoilu tai määrittely on olemassa' },
          { id: 'existing_improvement', label: 'Olemassa oleva sivusto tai sovellus tänne parannettavaksi' },
          { id: 'existing_new_features', label: 'Olemassa olev tuote tarvitsee uusia ominaisuuksia' },
          { id: 'urgent', label: ' kiireellinen liiketoiminta tarpe' },
        ],
        integrationOptions: [
          { id: 'stripe_payment', label: 'Stripe tai maksutarve' },
          { id: 'supabase', label: 'Supabase' },
          { id: 'crm', label: 'CRM' },
          { id: 'email_provider', label: 'Sähköpostitarve' },
          { id: 'calendar', label: 'Kalenteri' },
          { id: 'maps', label: 'kartat' },
          { id: 'analytics', label: 'analytiikka' },
          { id: 'ai_api', label: 'Tekoäly-API' },
          { id: 'internal_system', label: 'Yrityksen sisäinen järjestelmä' },
          { id: 'other', label: 'muuta' },
          { id: 'not_sure_yet', label: 'Ei vielä varma' },
        ],
      },
      form: {
        title: 'Projektipyyntö',
        stepIndicator: 'Vaihe {step} / {total}',
        contactOnly: {
          label: 'Vain yhteystiedot',
          description: 'Etkö ole valmis täydelliseen projektipyyntöön? Lähetä pikaviesti.',
        },
      },
      step1: {
        legend: 'Yhteystiedot',
        description: 'Miten Eventnexus voi tavoittaa sinut?',
        fullName: 'Koko nimi',
        fullNamePlaceholder: 'Koko nimesi',
        email: 'Sähköpostiosoite',
        emailPlaceholder: 'you@example.com',
        phone: 'Puhelin tai haluamasi yhteydenottotapa',
        phonePlaceholder: '+372 5555 5555',
        company: 'Yrityksen tai organisaation nimi',
        companyPlaceholder: 'Acme OÜ',
        region: 'Maa tai alue',
        regionPlaceholder: 'Viro',
      },
      step2: {
        legend: 'Projektin tyyppi',
        description: 'Mitä haluat rakentaa?',
        projectType: 'Projektin tyyppi',
        projectTypePlaceholder: 'Valitse projektin tyyppi',
        projectTitle: 'Lyhyt projektin otsikko',
        projectTitlePlaceholder: 'Sisäinen varausväline tukitiimille',
      },
      step3: {
        legend: 'Ideankuvaus',
        description: 'Kuvaile idea omilla sanoillasi.',
        whatBuild: 'Mitä haluat rakentaa?',
        whatBuildPlaceholder:
          'Kuvaile idea, päätavoite ja miltä menestys käynnistyksen jälkeen näyttää.',
        whoWillUse: 'Kuka sitä käyttää?',
        whoWillUsePlaceholder: 'Pienyrittäjät, tukiedustajat, loppuasiakkaat',
        problemSolve: 'Mitä ongelmaa sen pitäisi ratkaista?',
        problemSolvePlaceholder: 'Nykyinen manuaalinen prosessi, puuttuva työkalu tai täyttymätön liiketoimintatarve.',
        desiredOutcome: 'Mitä pitäisi tapahtua käytön jälkeen?',
        desiredOutcomePlaceholder: 'Varaus valmis, lead kiinni, raportti viety, hyväksyntä lähetetty.',
        minLengthHint:
          'Lisää vähintään muutama lause, jotta Eventnexus ymmärtää laajuuden.',
      },
      step4: {
        legend: 'Vaaditut ominaisuudet',
        description: 'Valitse ominaisuudet, joita odotat tarvitsevasi.',
        importantFeatures: 'Tärkeät ominaisuudet, joita ei ole lueteltu',
        importantFeaturesPlaceholder: 'Lisää kaikki, mikä on tärkeää projektille.',
      },
      step5: {
        legend: 'Tekniset tarpeet',
        description: 'Minkä tyyppistä teknistä työtä tämä projekti tarvitsee?',
      },
      step6: {
        legend: 'Aikataulu ja budjetti',
        description: 'Auta Eventnexusta ymmärtämään kiireellisyys ja projektin sopivuus.',
        timeline: 'Haluttu aikataulu',
        timelinePlaceholder: 'Valitse aikataulu',
        budget: 'Budjetin alue',
        budgetPlaceholder: 'Valitse budjetti',
        status: 'Nykyinen projektin tila',
        statusPlaceholder: 'Valitse tila',
      },
      step7: {
        legend: 'Integraatiot ja olemassa olevat resurssit',
        description: 'Mikä on yhdistettävä tai käytettävä uudelleen?',
        existingDomain: 'Olemassa oleva domain',
        existingDomainPlaceholder: 'example.com',
        existingUrl: 'Olemassa oleva verkkosivusto tai sovelluksen URL',
        existingUrlPlaceholder: 'https://',
        existingRepo: 'Olemassa oleva GitHub-varasto',
        existingRepoPlaceholder: 'https://github.com/owner/repo',
        existingBrandAssets: 'Olemassa olevat brändiaineistot',
        existingBrandAssetsPlaceholder: 'Logo, tyyliohje, aineistolinkit',
        servicesIntegrate: 'Palvelut, jotka on integroitava',
      },
      step8: {
        legend: 'Tarkista ja lähetä',
        description: 'Vahvista tiedot ennen pyynnön lähettämistä.',
        confirmDetails: 'Vahvista tiedot ennen pyynnön lähettämistä.',
        contactLabel: 'Yhteystiedot',
        projectLabel: 'Projekti',
        ideaLabel: 'Idea',
        needsLabel: 'Tarpeet ja aikataulu',
        integrationsLabel: 'Integraatiot ja resurssit',
      },
      review: {
        fullName: 'Koko nimi',
        email: 'Sähköposti',
        phone: 'Puhelin',
        company: 'Yritys',
        region: 'Alue',
        projectType: 'Projektin tyyppi',
        title: 'Otsikko',
        idea: 'Idea',
        targetUsers: 'Kohdekäyttäjät',
        problem: 'Ongelma',
        outcome: 'Tulos',
        features: 'Ominaisuudet',
        technicalNeeds: 'Tekniset tarpeet',
        timeline: 'Aikataulu',
        budget: 'Budjetti',
        projectStatus: 'Projektin tila',
        domain: 'Domain',
        url: 'URL',
        repo: 'Varasto',
        brandAssets: 'Brändiaineistot',
        integrations: 'Integraatiot',
      },
      contactOnly: {
        name: 'Koko nimi',
        namePlaceholder: 'Koko nimesi',
        email: 'Sähköposti',
        emailPlaceholder: 'you@example.com',
        message: 'Viesti',
        messagePlaceholder: 'Mitä haluat kysyä?',
        backToProject: 'Takaisin projektipyyntöön',
      },
      buttons: {
        askQuestion: 'Kysy sen sijaan kysymys',
        sendProjectRequest: 'Lähetä projektipyyntö',
        sendMessage: 'Lähetä viesti',
      },
    },
    privacy: {
      title: 'Tietosuojailmoitus',
      controller: 'Rekisterinpitäjä',
      controllerName: 'EventNexus OÜ',
      controllerReg: 'Rekisteröintinumero 17431557',
      controllerAddress: 'Põltsamaa, Viro',
      controllerEmail: 'admin@eventnexus.eu',
      purposesTitle: 'Tarkoitukset',
      purposes: 'Käsittelemme henkilötietoja projektipyyntöjen käsittelyyn, yhteydenottoviestien vastaamiseen, tämän sivuston toimintaan ja ilmoitusviestien lähettämiseen.',
      legalBasesTitle: 'Oikeusperusteet',
      legalBases: 'Käsittely perustuu suostumukseesi, sopimusvälttämättömyyteen tai oikeutettuun etuumme tämän sivuston toiminnassa ja projektipyyntöjen arvioinnissa.',
      processorsTitle: 'Käsittelijät',
      processors: 'Käytämme Supabasea (EU) liidien tallentamiseen, Resendiä sähköpostin lähettämiseen ja Cloudflarea isäntäpalveluun ja yksityisyyteen suuntautuneeseen analytiikkaan.',
      transfersTitle: 'Siirrot',
      transfers: 'Tietoja saatetaan siirtää käsittelijöille EU:ssa ja Yhdysvalloissa asianmukaisilla suojatoimilla, mukaan lukien standardiset sopimusehdot.',
      retentionTitle: 'Säilytys',
      retention: 'Projektipyynnöt säilytetään enintään 3 vuotta tai kunnes pyydät poistoa. Sovelluksen lokit säilytetään enintään 1 vuosi. Resend-sähköpostitapahtumat säilytetään enintään 1 vuosi.',
      rightsTitle: 'Oikeutesi',
      rights: 'Sinulla on oikeus saada, korjata, poistaa tai rajoittaa tietojesi käsittelyä sekä vastustaa käsittelyä tai peruuttaa suostumuksesi milloin tahansa.',
      contactTitle: 'Yhteystiedot',
      contact: 'Ota yhteyttä rekisterinpitäjään osoitteessa admin@eventnexus.eu tietosuojapyyntöjä varten.',
      lastUpdated: 'Viimeksi päivitetty: elokuu 2026',
      analyticsText: 'Tämä sivusto käyttää yksityisyyteen suuntautunutta analytiikkaa käytön ymmärtämiseksi.',
      accept: 'Hyväksy',
      decline: 'Hylkää',
    },
  },
  et: {
    nav: {
      services: 'Teenused',
      process: 'Protsess',
      work: 'Tööd',
      startProject: 'Alusta projekt',
      toggleNav: 'Ava menüü',
    },
    common: {
      stepOf: (step, total) => `Samm ${step} / ${total}`,
      back: 'Tagasi',
      next: 'Järgmine',
      submit: 'Saada projekti taotlus',
      sendMessage: 'Saada sõnum',
      required: 'Kohustuslik',
      optional: 'Valikuline',
      successTitle: 'Taotlus vastu võetud',
      successMessage:
        'Aitäh. Teie projekti taotlus on vastu võetud. Eventnexus vaatab idead üle ja võtab järgmise sammuga ühendust.',
      errorTitle: 'Palun parandage järgmisi vigu:',
      consentText:
        'Ma mõistan, et see taotlus on ette nähtud projekti tutvustamiseks ega ole siduv hinnapakkumine.',
      consentError: 'Palun kinnitage nõusolek enne taotluse saatmist.',
      emailError: 'Palun sisestage kehtiv e-posti aadress.',
      messageMinLength: 'Sõnum peab olema vähemalt 10 tähemärki.',
      somethingWrong: 'Midagi läks valesti. Palun proovige uuesti.',
      submissionFailed: 'Saatmine ebaõnnestus',
    },
    ui: {
      includes: 'Sisaldab',
      bestFor: 'Parim',
      viewAllWork: 'Vaata kõiki töid',
      portfolioCandidates: 'Portfoolio kandidaadid',
      whatThisMeans: 'Mida see tähendab teie projekti jaoks',
      viewOnGitHub: 'Vaata GitHubis',
      visitSite: 'Külastage veebisaiti',
    },
    home: {
      hero: {
        headline: 'Eventnexus ehitab teie idee töötavaks veebiplatvormiks.',
        supporting1:
          'Esimesest kontseptsioonist käivitamiseni loob Eventnexus kasutusvalmis digitaalseid lahendusi: veebisaite, SaaS-stiilis platvorme, kliendiportaale, tagakõrgsüsteeme, maksevooge, automatiseerimist ja juurutamist.',
        supporting2:
          'Esitage idee. Eventnexus aitab seda struktureerida, disainida, ehitada ja ette valmistada tegelikele kasutajatele.',
        primaryCta: 'Alusta projekti taotlus',
        secondaryCta: 'Vaata teenuseid',
        trustLine:
          'Täispaketne arendus füüsilistele isikutele, asutajatele, teenusettevõtetele ettevõtetele, kes vajavad praktilisi digitaalseid tooteid ilma täieliku tehnilise meeskonna haldamiseta.',
      },
      problem: {
        eyebrow: 'Probleem',
        headline: 'Hea idee jääb sageli kinni enne kui saab reaalseks tooteks.',
        description:
          'Idee teisendamine töötavaks platvormiks võib kiiresti keerukaks muutuda. Esikülg, tagakülg, andmebaas, kasutajakontod, admin tööriistad, maksed, integreerimised, hosting ja selge käivitamise tee. Eventnexus ühendab need osad ühe struktureeritud tarne protsessiks.',
      },
      services: {
        eyebrow: 'Teenused',
        headline: 'Ideest valmis lahenduseni.',
        description:
          'Eventnexus aitab kujundada, ehitada ja käivitada veebipõhiseid tooteid alustades kõrge tasemel ideest või selgemast tehnilisest planeerimisest.',
      },
      process: {
        eyebrow: 'Protsess',
        headline: 'Struktureeritud tee taotlusest käivitamiseni.',
        steps: [
          {
            title: 'Saada oma idee',
            description: 'Alusta juhendatud projekti taotlusvormiga, kus kirjeldad lahenduse tüüpi, funktsioone, ajakava ja eelarvet.',
          },
          {
            title: 'Määra ulatus',
            description: 'Eventnexus vaatab taotluse läbi ja muudab idee praktiliseks ehitusplaaniks.',
          },
          {
            title: 'Ehita toode',
            description: 'Esikülg, tagakülg, andmebaas, maksed ja admin tööriistad luuakse vastavalt vajadusele.',
          },
          {
            title: 'Käivita ja paranda',
            description: 'Toode võetakse kasutusele, ühendatakse õige domeeniga ja parendatakse iteratiivselt.',
          },
        ],
      },
      proof: {
        eyebrow: 'Kogemus',
        headline: 'Ehitatud reaalse toote ja AI töövoo kogemusele.',
        description:
          'Eventnexus on kujunenud TypeScript-põhiste veebiplatvormide, AI-vahendite, automatiseerimiskontseptsioonide, andmetoodete ja teenuseplatvormi katsete praktilisel kogemusel.',
      },
      intakeCta: {
        heading: 'On teil idee platvormi, portaali, tööriista või veebisaidi jaoks?',
        body:
          'Teil pole vaja valmis spetsifikatsiooni. Alustage teadmistehooga: idee, kellele see on, mida peaks tegema ja millise tulemuse soovite. Struktureeritud taotlusvorm aitab sellest teha esimese versiooni teostatava projekti plaani.',
        primaryCta: 'Alusta projekti taotlus',
      },
    },
    services: {
      hero: {
        headline: 'Täielik veebiplatvormi arendus ideest käivitamiseni.',
        description1:
          'Eventnexus aitab füüsilistel isikutel, asutajatel, meeskondadel ja ettevõtetel ideid töötavateks digitaalseteks toodeks muuta. Teenus võib hõlmata kogu teed: projekti struktureerimine, UX-i planeerimine, esikülg, tagakülg, andmebaasid, autentimine, maksed, integreerimised, juurutamine ja tulevased parandused.',
        description2:
          'Te võite tulla kõrge tasemel ideega, äriprotsessiga või selge platvormi kontseptsiooniga. Eventnexus aitab sellest praktilise ehitusplaani teha ja seejärel plaani kasutatava tooteks muuta.',
        primaryCta: 'Alusta projekti taotlus',
        secondaryCta: 'Vaata tarne protsessi',
      },
      promise: {
        eyebrow: 'Teenused',
        headline: 'Üks partner terve ehituse jaoks.',
        description:
          'Paljud digitaalsed projektid muutuvad keerukaks, sest töö on jaotatud liiga mitmeks haaramatuks osaks. Eventnexus ühendab need osad üheks struktureerituks teenuseks. Eesmärk on vähendada kliendi segadust ja luua selge tee ideelt töötavale lahendusele.',
      },
      turnkey: {
        eyebrow: 'Tarnemudel',
        headline: 'Mida "võtmed käes" tähendab Eventnexuses.',
        description1:
          '"Võtmed käes" tähendab, et klient ei pea eraldi koordineerima iga tehnilist distsipliini. Eventnexus võib aidata projekti määratlemisel, tuumtoote ehitamisel, vajalike teenuste ühendamisel, juurutamise ettevalmistamisel ja järgmise versiooni toel.',
        description2:
          'Täpne ulatus sõltub projektist. Lihtne ettevõtte veebisait võib vaja ainult esikülge, tekstirakendust, kontaktvoogu ja juurutamist. Platvorm võib vaja kontosid, andmebaasi projekteerimist, makseid, admin tööriistu, integreerimisi ja pikemat tarnet.',
        suitableLabel: 'Sobivad projektitüübid:',
      },
      howToStart: {
        eyebrow: 'Järgmine samm',
        headline: 'Alustage struktureeritud projekti taotlusega.',
        description1:
          'Teil pole vaja täielikku tehnilist spetsifikatsiooni. Taotlusvorm on kavandatud oluliste andmete kogumiseks samm-sammult: projektitüüp, sihtkasutajad, nõutud funktsioonid, makse vajadused, integreerimised, ajakava, eelarve vahemik ja teie vaba idee kirjeldus.',
        description2:
          'Pärast taotluse esitamist võib Eventnexus ideed vaadata ja järgmise sammu kujundada.',
        cta: 'Alusta projekti taotlus',
      },
      intakeCta: {
        heading: 'On teil idee platvormi, portaali, tööriista või veebisaidi jaoks?',
        body:
          'Teil pole vaja valmis spetsifikatsiooni. Alustage teadmistehooga: idee, kellele see on, mida peaks tegema ja millise tulemuse soovite. Struktureeritud taotlusvorm aitab sellest teha esimese versiooni teostatava projekti plaani.',
        primaryCta: 'Alusta projekti taotlus',
      },
    },
    work: {
      hero: {
        title: 'Tööd ja kogemus',
        description1:
          'Eventnexus on kujunenud TypeScript-põhiste veebiplatvormide, AI-vahendite, automatiseerimiskontseptsioonide, andmetoodete ja teenuseplatvormi katsete praktilisel kogemusel.',
        description2:
          'Järgmised portfoolio kandidaadid näitavad, milliseid tooteid ja töövooge Eventnexus võib aidata ehitada.',
      },
      categoriesTitle: 'Portfoolio kandidaadid',
      nextSectionTitle: 'Mida see tähendab teie projekti jaoks',
      nextSectionDescription1:
        'Need projektid peegeldavad veebiplatvormide, AI-vahendite äritegevuseks, andmetoodete, turundusautomatiseerimise ja sündmustega seotud kontseptsioonide tegelikku uurimist. Need määravad, kuidas Eventnexus läheneb planeerimisele, arhitektuurile ja tarnele.',
      nextSectionDescription2:
        'Eventnexus ühendab esikülje, tagakülje, automatiseerimise ja juurutamismõtlemise üheks tarne protsessiks. Iga uus projekt kasvab sellest kogunenud kogemusest.',
      cta: 'Alusta projekti taotlus',
    },
    contact: {
      hero: {
        headline: 'Öelge meile, mida soovite ehitada.',
        description1:
          'Alustage struktureeritud projekti taotlusega. Valige lahenduse tüüp, vajalikud funktsioonid, ajakava ja eelarve vahemik, ja kirjeldage idee oma sõnadega.',
        description2:
          'Teil pole vaja tehnilist spetsifikatsiooni. Vorm aitab teie ideed muuta esimeseks versiooniks teostatava projekti lühiülevaateks.',
      },
      options: {
        projectTypes: [
          { id: 'company_website', label: 'Ettevõtte veebisait' },
          { id: 'landing_page', label: 'Lennukirja leht' },
          { id: 'saas_platform', label: 'SaaS platvorm' },
          { id: 'customer_portal', label: 'Kliendiportaal' },
          { id: 'booking_request_platform', label: 'Broneerimis- või pä ringplaatvorm' },
          { id: 'internal_business_tool', label: 'Sisemine äririist' },
          { id: 'admin_dashboard', label: 'Halduspaneel' },
          { id: 'ecommerce_payment_service', label: 'E-kaubandus- või makse teenus' },
          { id: 'ai_workflow_tool', label: 'AI-assisteeritud tööriist' },
          { id: 'automation_integration', label: 'Automatiseerimine või integreerimine' },
          { id: 'not_sure_yet', label: 'Veel mitte kindel' },
          { id: 'other', label: 'Muud' },
        ],
        featureOptions: [
          { id: 'public_pages', label: 'Avalikud lehed' },
          { id: 'user_accounts', label: 'Kasutajakontod' },
          { id: 'login_registration', label: 'Logi sisse ja registreeru' },
          { id: 'user_roles_permissions', label: 'Kasutaja rollid või õigused' },
          { id: 'admin_dashboard', label: 'Halduspaneel' },
          { id: 'customer_dashboard', label: 'Kliendipaneel' },
          { id: 'booking_scheduling', label: 'Broneerimine või kohadamine' },
          { id: 'request_quote_forms', label: 'Pä ring- või pakkumislomased' },
          { id: 'file_uploads', label: 'Failide üleslaadimine' },
          { id: 'payments_subscriptions', label: 'Maksed või tellimused' },
          { id: 'email_notifications', label: 'E-posti teavitused' },
          { id: 'crm_lead_workflow', label: 'CRM- või müadid töövoo' },
          { id: 'analytics_reporting', label: 'Analüütil või aruanded' },
          { id: 'map_location_features', label: 'Kaardid või asukoha funktsioonid' },
          { id: 'ai_features', label: 'AI-assisteeritud funktsioonid' },
          { id: 'third_party_integrations', label: 'Kolmanda osapoole integreerimised' },
          { id: 'multilingual_support', label: 'Mitmekeelne toetus' },
          { id: 'not_sure_yet', label: 'Veel mitte kindel' },
        ],
        technicalNeeds: [
          { id: 'frontend', label: 'Frontendi kujundus ja arendus' },
          { id: 'backend', label: 'Backendi arendus' },
          { id: 'database', label: 'Andmebaasi seadistamine' },
          { id: 'authentication', label: 'Autentimine' },
          { id: 'payment_integration', label: 'Makse integreerimine' },
          { id: 'admin_system', label: 'Haldussüsteem' },
          { id: 'api_integration', label: 'API integreerimine' },
          { id: 'automation', label: 'Automatiseerimine' },
          { id: 'deployment_hosting', label: 'Juurutus ja hostimine' },
          { id: 'domain_setup', label: 'Domeeni seadistamine' },
          { id: 'maintenance', label: 'Haldus käivitumise järel' },
          { id: 'technical_planning', label: 'Vaid tehniline planeerimine' },
          { id: 'not_sure_yet', label: 'Veel mitte kindel' },
        ],
        timelineOptions: [
          { id: 'asap', label: 'Võimalikult kiiren' },
          { id: '2_4_weeks', label: '2–4 nädala jooksul' },
          { id: '1_2_months', label: '1–2 kuu jooksul' },
          { id: '3_6_months', label: '3–6 kuu jooksul' },
          { id: 'flexible', label: 'Kitsendamata kohorti' },
          { id: 'exploring', label: 'Sirvimas võimalusi' },
        ],
        budgetOptions: [
          { id: 'under_500', label: 'alla 500 EUR' },
          { id: '500_1500', label: '500–1 500 EUR' },
          { id: '1500_3000', label: '1 500–3 000 EUR' },
          { id: '3000_7500', label: '3 000–7 500 EUR' },
          { id: '7500_15000', label: '7 500–15 000 EUR' },
          { id: '15000_plus', label: '15 000+ EUR' },
          { id: 'not_sure_yet', label: 'Veel mitte kindel' },
        ],
        statusOptions: [
          { id: 'idea_only', label: 'Vaid kinnis' },
          { id: 'rough_plan', label: 'Kitsendamata kavad on olemas' },
          { id: 'design_spec', label: 'Kujundus või spetsifikatsioon on olemas' },
          { id: 'existing_improvement', label: 'Olemasolev veebisait või rakendus vajab parandamist' },
          { id: 'existing_new_features', label: 'Olemasolev toode vajab uusi funktsioone' },
          { id: 'urgent', label: 'Kiireline kliibivajadus' },
        ],
        integrationOptions: [
          { id: 'stripe_payment', label: 'Stripe või makse pakkumine' },
          { id: 'supabase', label: 'Supabase' },
          { id: 'crm', label: 'CRM' },
          { id: 'email_provider', label: 'E-posti pakkur' },
          { id: 'calendar', label: 'Kalender' },
          { id: 'maps', label: 'Kaardid' },
          { id: 'analytics', label: 'Analüütil' },
          { id: 'ai_api', label: 'AI API' },
          { id: 'internal_system', label: 'Sisemine ettevõtte süsteem' },
          { id: 'other', label: 'Muud' },
          { id: 'not_sure_yet', label: 'Veel mitte kindel' },
        ],
      },
      form: {
        title: 'Projekti taotlus',
        stepIndicator: 'Samm {step} / {total}',
        contactOnly: {
          label: 'Ainult kontakt',
          description: 'Pole veel valmis täieliku projekti taotluseks? Saada kiir sõnum.',
        },
      },
      step1: {
        legend: 'Kontaktandmed',
        description: 'Kuidas Eventnexus saab teiega ühendust võtta?',
        fullName: 'Täielik nimi',
        fullNamePlaceholder: 'Teie täielik nimi',
        email: 'E-posti aadress',
        emailPlaceholder: 'you@example.com',
        phone: 'Telefon või eelistatud kontaktkanal',
        phonePlaceholder: '+372 5555 5555',
        company: 'Ettevõtte või organisatsiooni nimi',
        companyPlaceholder: 'Acme OÜ',
        region: 'Riik või piirkond',
        regionPlaceholder: 'Eesti',
      },
      step2: {
        legend: 'Projekti tüüp',
        description: 'Mida soovite ehitada?',
        projectType: 'Projekti tüüp',
        projectTypePlaceholder: 'Valige projekti tüüp',
        projectTitle: 'Lühike projekti pealkiri',
        projectTitlePlaceholder: 'Sisene broneerimise tööriist tugi meeskonna jaoks',
      },
      step3: {
        legend: 'Idee kirjeldus',
        description: 'Kirjeldage idee oma sõnadega.',
        whatBuild: 'Mida soovite ehitada?',
        whatBuildPlaceholder:
          'Kirjeldage idee, põhieesmärk ja miltä menestus käynnistyksen järel näyttub.',
        whoWillUse: 'Kes seda kasutab?',
        whoWillUsePlaceholder: 'Väikeettevõtjad, tugiagendid, lõppkliendid',
        problemSolve: 'Millist probleemi peaks see lahendama?',
        problemSolvePlaceholder: 'Praegune manuaalne protsess, puuduv tööriist või täitmata äri vajadus.',
        desiredOutcome: 'M peaks juhtuma pärast kasutamist?',
        desiredOutcomePlaceholder: 'Broneering teostatud, lead kinni, aruanne eksporditud, heakskiit saadetud.',
        minLengthHint:
          'Palun lisage vähemalt mitu lauset, et Eventnexus saaks ulatuse mõista.',
      },
      step4: {
        legend: 'Nõutud funktsioonid',
        description: 'Valige funktsioonid, mida eeldatavalt vajate.',
        importantFeatures: 'Tähtsad funktsioonid, mis pole loetletud',
        importantFeaturesPlaceholder: 'Lisage kõik, mis on projektile tähtis.',
      },
      step5: {
        legend: 'Tehnilised vajadused',
        description: 'Missugust liiki tehnilist tööd see projekt vajab?',
      },
      step6: {
        legend: 'Ajakava ja eelarve',
        description: 'Aidake Eventnexusul mõista äkilisust ja projekti sobivust.',
        timeline: 'Eelistatud ajakava',
        timelinePlaceholder: 'Valige ajakava',
        budget: 'Eelarve vahemik',
        budgetPlaceholder: 'Valige eelarve',
        status: 'Praegune projekti staatus',
        statusPlaceholder: 'Valige staatus',
      },
      step7: {
        legend: 'Integratsioonid ja olemasolevad vara',
        description: 'Mida tuleb ühendada või taaskasutada?',
        existingDomain: 'Olemasolev domeen',
        existingDomainPlaceholder: 'example.com',
        existingUrl: 'Olemasolev veebisait või rakenduse URL',
        existingUrlPlaceholder: 'https://',
        existingRepo: 'Olemasolev GitHub hoidla',
        existingRepoPlaceholder: 'https://github.com/owner/repo',
        existingBrandAssets: 'Olemasolevad brändi varad',
        existingBrandAssetsPlaceholder: 'Logo, stiili juhend, vara lingid',
        servicesIntegrate: 'Teenused, mis tuleb integreerida',
      },
      step8: {
        legend: 'Ülevaade ja saatmine',
        description: 'Kinnitage andmed enne taotluse saatmist.',
        confirmDetails: 'Kinnitage andmed enne taotluse saatmist.',
        contactLabel: 'Kontakt',
        projectLabel: 'Projekt',
        ideaLabel: 'Idee',
        needsLabel: 'Vajadused ja ajakava',
        integrationsLabel: 'Integratsioonid ja vara',
      },
      review: {
        fullName: 'Täielik nimi',
        email: 'E-post',
        phone: 'Telefon',
        company: 'Ettevõte',
        region: 'Piirkond',
        projectType: 'Projekti tüüp',
        title: 'Pealkiri',
        idea: 'Idee',
        targetUsers: 'Sihtkasutajad',
        problem: 'Probleem',
        outcome: 'Tulemus',
        features: 'Funktsioonid',
        technicalNeeds: 'Tehnilised vajadused',
        timeline: 'Ajakava',
        budget: 'Eelarve',
        projectStatus: 'Projekti staatus',
        domain: 'Domeen',
        url: 'URL',
        repo: 'Hoidla',
        brandAssets: 'Brändi varad',
        integrations: 'Integratsioonid',
      },
      contactOnly: {
        name: 'Täielik nimi',
        namePlaceholder: 'Teie täielik nimi',
        email: 'E-post',
        emailPlaceholder: 'you@example.com',
        message: 'Sõnum',
        messagePlaceholder: 'Mida soovite küsida?',
        backToProject: 'Tagasi projekti taotlusele',
      },
      buttons: {
        askQuestion: 'Küsi selle asemel küsimus',
        sendProjectRequest: 'Saada projekti taotlus',
        sendMessage: 'Saada sõnum',
      },
    },
    privacy: {
      title: 'Privaatsusteatis',
      controller: 'Andmete vastutav töötleja',
      controllerName: 'EventNexus OÜ',
      controllerReg: 'Registreerimisnumber 17431557',
      controllerAddress: 'Põltsamaa, Eesti',
      controllerEmail: 'admin@eventnexus.eu',
      purposesTitle: 'Eesmärgid',
      purposes: 'Me töötleme isikuandmeid projektitaotluste käsitlemiseks, kontaktide sõnumitele vastamiseks, selle veebisaidi toimimiseks ja teavituste saatmiseks.',
      legalBasesTitle: 'Õiguslikud alused',
      legalBases: 'Töötlemise aluseks on teie nõusolek, lepinguline vajadus või meie õigustatud huvi selle veebisaidi toimimise ja projektitaotluste hindamise kohta.',
      processorsTitle: 'Töötlejad',
      processors: 'Me kasutame Supabase\'i (EL) liidide salvestamiseks, Resend\'i e-posti saatmiseks ja Cloudflare\'i majutamiseks ja privaatsusele suunatud analüütika jaoks.',
      transfersTitle: 'Edastused',
      transfers: 'Andmeid võidakse edastada töötlejatele ELis ja USA-s kooskõlas asjakohaste garantiidega, sealhulgas standardsete lepingutingimustega.',
      retentionTitle: 'Säilitus',
      retention: 'Projektitaotlusi säilitatakse kuni 3 aastat või kuni teie kustutamistaotluse esitamiseni. Rakenduse logid säilitatakse kuni 1 aasta. Resend e-posti sündmused säilitatakse kuni 1 aasta.',
      rightsTitle: 'Teie õigused',
      rights: 'Teil on õigus saada, parandada, kustutada või piirata omaandmete töötlemist ning vastu vaielda või igal ajal nõusolek tagasi võtta.',
      contactTitle: 'Kontakt',
      contact: 'Võtke ühendust andmete vastutava töötlejaga aadressil admin@eventnexus.eu privaatsuspäringute jaoks.',
      lastUpdated: 'Viimati uuendatud: august 2026',
      analyticsText: 'See sait kasutab privaatsusele suunatud analüütikat kasutuse mõistmiseks.',
      accept: 'Nõustu',
      decline: 'Keeldu',
    },
  },
};
