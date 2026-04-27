/* ══════════════════════════════════════════════════════════════════════════
   LO Radar · competitor data for /vs/[slug] comparison pages
   ══════════════════════════════════════════════════════════════════════════ */

export const COMPETITORS = [
  {
    slug: "homebot",
    name: "HomeBot",
    category: "Mortgage equity intelligence",
    competitorWebsite: "https://www.homebot.ai",
    competitorBlurb: "HomeBot mails homeowners a monthly report on their property value, equity position, and refinance opportunities. Branded by the loan officer who originated the loan. Strong, well-known product in the LO world for keeping past clients warm at minimal effort.",
    whatTheyDoWell: [
      "Automated monthly equity reports look genuinely useful to homeowners",
      "Loan officer's brand stays in front of past clients passively",
      "Low effort to deploy — set it up, it runs",
      "Real-estate-agent co-marketing features",
    ],
    whereWeDiffer: [
      {
        title: "Passive presence vs active intelligence",
        body: "HomeBot keeps your name in your past clients' inbox. LO Radar tells you which past client to call today — sorted by projected annual savings if they refinance now. HomeBot is the email; LO Radar is the action list.",
      },
      {
        title: "Pipeline NPV — your book priced as an asset",
        body: "HomeBot reports each client's equity. LO Radar aggregates your entire career book and prices it as a single asset (Pipeline NPV) — a number that moves daily and shows you exactly where your highest-value opportunities sit.",
      },
      {
        title: "Drift Radar, ARM resets, anniversary triggers",
        body: "HomeBot is rate-and-equity-driven. LO Radar adds the workflow layer: ARM reset calendar (12-month pre-reset cadence), purchase-anniversary triggers (year 1, 3, 5, 7, 10), HELOC opportunity flags, second-home signal detection, credit-improvement windows.",
      },
      {
        title: "Voice-trained outreach drafts",
        body: "HomeBot ships an emailed report. LO Radar drafts the follow-up message — in your voice — that turns the rate signal into a conversation.",
      },
    ],
    sideBySide: [
      ["Monthly homeowner equity report",         "✓",        "—"],
      ["Branded LO landing page",                 "✓",        "—"],
      ["Real-estate-agent co-marketing",          "✓",        "—"],
      ["Pipeline NPV (book valuation)",           "—",        "✓"],
      ["Per-borrower drift / churn",              "—",        "✓ (Drift Radar)"],
      ["Rate-Drop Radar (sorted by savings)",     "Aggregate","Per-borrower with refinance math"],
      ["ARM Reset Calendar (12-mo cadence)",      "—",        "✓"],
      ["Anniversary triggers (year 1/3/5/7/10)",  "—",        "✓"],
      ["HELOC + Cash-out + Second-home signals",  "Limited",  "✓"],
      ["Voice-trained outreach drafts",           "—",        "✓"],
      ["Compliance-aware drafts (RESPA/TILA)",    "—",        "✓"],
      ["Pricing model",                           "Per-LO subscription", "Performance: base + per-closed-deal, capped"],
    ],
    whoIsRight: {
      stayWithThem: "If your strategy is passive brand-presence and you don't want a workflow to manage, HomeBot does that job well.",
      switchToUs: "If you want a daily action list of past clients to actually call — with rate math, ARM timing, and the draft message ready — LO Radar is built for that.",
      runBoth: "Yes. HomeBot keeps you visible in inboxes monthly; LO Radar tells you which of those inbox openers to convert into a phone call this week.",
    },
  },
  {
    slug: "total-expert",
    name: "Total Expert",
    category: "Marketing automation for mortgage + financial services",
    competitorWebsite: "https://www.totalexpert.com",
    competitorBlurb: "Total Expert is an enterprise-grade marketing operating system for mortgage lenders and banks — drip campaigns, content libraries, compliant communications, journeys, real-estate-agent co-marketing. Used widely at large lender shops and bank mortgage divisions.",
    whatTheyDoWell: [
      "Enterprise-grade compliance and content controls",
      "Deep integration with major LOS systems (Encompass, especially)",
      "Pre-built journeys and content libraries",
      "Real-estate-agent and corporate co-marketing flows",
      "Strong fit for large lender shops with marketing teams",
    ],
    whereWeDiffer: [
      {
        title: "Built for the individual LO, not the enterprise",
        body: "Total Expert is sold to and configured by enterprise marketing teams. LO Radar is built for the individual loan officer working their own past-client book. If you don't have a marketing department behind you, LO Radar is set up and running in days, not quarters.",
      },
      {
        title: "Pipeline NPV vs activity reports",
        body: "Total Expert reports campaigns sent and journeys completed. LO Radar tells you what your book of past clients is worth today as an asset — Pipeline NPV — and how much that number moved this week.",
      },
      {
        title: "Per-borrower intelligence, not segment-based journeys",
        body: "Total Expert sends segment-based journeys. LO Radar scores each borrower individually on drift, rate-drop opportunity, ARM proximity, anniversary windows, and HELOC fit — then surfaces a daily action list per LO.",
      },
      {
        title: "Voice-trained drafts vs corporate templates",
        body: "Total Expert's templates pass corporate compliance review and end up sounding like every other lender's templates. LO Radar learns your specific voice and renders every draft in your tone — while still flagging anything that triggers RESPA / TILA / TCPA concerns.",
      },
    ],
    sideBySide: [
      ["Drip campaigns / journeys",               "✓ (deep)",       "✓ (per-borrower triggered)"],
      ["Compliance review controls",              "✓ (enterprise)", "✓ (RESPA/TILA/TCPA aware)"],
      ["LOS integration depth",                   "Encompass++",    "Multi-LOS via CSV + APIs"],
      ["Pipeline NPV (book valuation)",           "—",              "✓"],
      ["Per-borrower drift score",                "—",              "✓ (Drift Radar)"],
      ["Rate-Drop Radar",                         "Aggregate",      "Per-borrower, sorted by savings"],
      ["ARM Reset Calendar",                      "Manual segments","Auto, 12-mo cadence"],
      ["Anniversary triggers",                    "✓",              "✓ (year 1/3/5/7/10 specific)"],
      ["Voice-trained drafts (your tone)",        "—",              "✓"],
      ["Designed for individual LO",              "Marketing team", "Individual LO"],
      ["Time to live",                            "Months",         "Days"],
      ["Pricing model",                           "Enterprise contract", "Performance: $399 base + $85/closed deal"],
    ],
    whoIsRight: {
      stayWithThem: "If you're at a top-20 lender with a real marketing team and need enterprise compliance + LOS depth, Total Expert is the category leader.",
      switchToUs: "If you're an individual LO or a small branch and need per-borrower intelligence with no implementation overhead, LO Radar delivers the action list Total Expert is built to ladder up to.",
      runBoth: "Some enterprise LOs use Total Expert for the corporate journeys and add LO Radar as their individual book-of-business intelligence layer.",
    },
  },
  {
    slug: "sales-boomerang",
    name: "Sales Boomerang",
    category: "Borrower intelligence alerts",
    competitorWebsite: "https://www.salesboomerang.com",
    competitorBlurb: "Sales Boomerang monitors past borrowers for rate-drop, equity, credit, and life-event triggers and alerts the loan officer when a new opportunity appears. A long-standing product in the LO retention space.",
    whatTheyDoWell: [
      "Rate-drop and equity alerts running across the borrower base",
      "Credit-event monitoring integrations",
      "Life-event detection (life insurance, RESPA-safe inputs)",
      "Established integrations with major LOS platforms",
    ],
    whereWeDiffer: [
      {
        title: "Alerts vs action list",
        body: "Sales Boomerang sends you alerts. LO Radar gives you a ranked, daily action list — top 3 calls today with rate math done and the draft message ready. Less noise, more clarity.",
      },
      {
        title: "Pipeline NPV — the asset view",
        body: "Sales Boomerang's value is in the alerts. LO Radar adds a parent metric: the present value of your entire career book as a single moving number. Helps LOs think about their book like a portfolio manager, not a pipeline manager.",
      },
      {
        title: "Voice Training",
        body: "Sales Boomerang surfaces opportunities. LO Radar surfaces opportunities AND drafts the follow-up message in your tone, three flavors deep, with compliance flags.",
      },
    ],
    sideBySide: [
      ["Rate-drop alerts",         "✓",  "✓ (with refinance math + draft)"],
      ["Credit alerts",            "✓",  "✓"],
      ["Equity alerts",            "✓",  "✓"],
      ["Life-event signals",       "✓",  "Adjacent (Second-Home + Cash-Out)"],
      ["ARM Reset Calendar",       "Limited","✓ (12-mo cadence)"],
      ["Pipeline NPV",             "—",  "✓"],
      ["Per-borrower drift score", "—",  "✓"],
      ["Voice-trained drafts",     "—",  "✓"],
      ["Time to set up",           "Days","Days"],
    ],
    whoIsRight: {
      stayWithThem: "If alerts are what you want and your workflow is to act on them ad-hoc, Sales Boomerang fills that role well.",
      switchToUs: "If you want the alerts plus the workflow plus the Pipeline NPV view plus the drafts in your voice — LO Radar is the more complete intelligence layer.",
      runBoth: "Workable but redundant — you'll get the same alert from both. Most LOs pick one.",
    },
  },
];
