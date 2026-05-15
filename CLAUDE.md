# CLAUDE.md — LO Radar marketing site

Future-Claude context for the loradar.com marketing site. Read this before
making changes.

## Deployment

Host: Hostinger VPS (`srv1379370.hstgr.cloud`, `187.77.194.176`).
Routing: `nginx-proxy` + `nginx-proxy-acme` on the external `web` Docker network.

This repo lives at `/root/loradar/` on the VPS. Containers:

- `loradar-marketing` (image `loradar-marketing:latest`) — serves apex
  `loradar.com,www.loradar.com`. Built from THIS source. Astro v5 -> static -> nginx:alpine.
- `lo-radar-app` (image `techstack-iq:latest`) — serves `app.loradar.com` AND
  `app.retentioniq.io`. Shares a codebase with the RetentionIQ app variant.
  NOT built from this repo.

Deploy pattern:

    cd /root/loradar
    docker compose up -d --build
    docker logs loradar-marketing --tail 50
    curl -sI https://loradar.com | head -5

`docker-compose.yml` joins the `web` network. `VIRTUAL_HOST` env on the
container is what registers it with nginx-proxy. `.env` defines `LORADAR_DOMAIN`.

## Sibling sites on this VPS — do not touch

retentioniq.io, techstackconsulting.io, kinshipos, and others run on this same
VPS via their own containers + the shared `web` network. Always `docker ps`
before any restart-the-host action.

## Source layout

    src/
      pages/              Astro pages (index, pricing, glossary, blog/*, vs/*)
      layouts/Base.astro  Shared layout. Emits ALL JSON-LD schema.
      components/         Header, Footer
      data/
        competitors.js    Source of truth for /vs/[slug] pages
        faq.js            7 AEO questions + answers (homepage FAQ section + FAQPage schema)
      content/blog/       Astro content collection
      config.js           Brand, BOOKING_URL, APP_URL, PARENT_SITE (retentioniq.io)

## SEO / AEO baseline (last refreshed 2026-05-15)

### Title tag pattern (keyword-led hybrid)

- Homepage: "LO Radar — Past-Client Intelligence Software for Mortgage Loan Officers"
- Inner pages: "<page topic with keyword> | LO Radar" or "<keyword> — LO Radar | <category>"

Lead with the commercial keyword phrase ("Mortgage Loan Officer Software",
"Past-Client Intelligence", "Mortgage Loan Officer Blog", "Mortgage Loan
Officer Glossary"). The product name can come at the end. We are competing
for category-keyword searches AND brand-comparison searches.

### JSON-LD schema set (in Base.astro)

Always emitted: Organization, SoftwareApplication, WebSite.
Conditional via props:

- `breadcrumbs` -> BreadcrumbList (passed on every non-home page)
- `faq` -> FAQPage with Question + Answer entries (passed on homepage)

When adding a new page, ALWAYS pass `breadcrumbs` prop from `SITE_URL`.

### FAQ / AEO

`src/data/faq.js` is the single source for the 7 AEO questions. Both the
visible homepage `<section id="faq">` and the FAQPage JSON-LD render from
the same array. Edit `faq.js`, not the template.

### Definitional answer block

Homepage has an above-the-fold "What LO Radar is" section directly under the
hero. This is intentional for AEO (Perplexity / ChatGPT / Claude search will
quote this paragraph). Keep the first sentence keyword-dense:
"LO Radar is past-client intelligence software built specifically for
individual mortgage loan officers..."

### AI bot / crawler allow-list

`public/robots.txt` explicitly allows GPTBot, ChatGPT-User, OAI-SearchBot,
ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, CCBot. Plus standard
search bots. Do NOT remove these — they are intentional.

### llms.txt

`public/llms.txt` is the canonical LO Radar summary written for LLM
ingestion. Update it when product positioning, pricing, or core capabilities
change. Treat it like a public README for AI search engines.

### /vs/ comparison pages

Driven by `src/data/competitors.js`. 10 competitors currently covered:

1. HomeBot
2. Total Expert
3. Sales Boomerang
4. Aidium (formerly Whiteboard)
5. Surefire CRM (ICE / formerly Black Knight / originally Top of Mind)
6. Bonzo
7. BNTouch
8. Shape CRM
9. Velocify (ICE)
10. MMI (Mortgage Market Intelligence)

Each entry has the same shape: `slug`, `name`, `category`,
`competitorWebsite`, `competitorBlurb`, `whatTheyDoWell[]`, `whereWeDiffer[]`,
`sideBySide[][]`, `whoIsRight{stayWithThem, switchToUs, runBoth}`.

To add a new competitor: append to the array, rebuild. The page generates
automatically via `src/pages/vs/[slug].astro`.

Per-competitor OG images live in `public/og/vs/<slug>.png`. The first three
slugs (homebot, total-expert, sales-boomerang) have hand-designed OG images;
the rest fall back to `/og-default.png` until designed. The whitelist is in
`src/pages/vs/[slug].astro` (SLUGS_WITH_OG set) — update when adding OG art.

### Cross-link to RetentionIQ

`retentioniq.io` is the sister product (same engine, service-business
vertical). Cross-links live in two places:

1. `parentOrganization` in the Organization JSON-LD (Base.astro)
2. Visible "Sister product · TechStack" callout block in the Footer

Both are intentional for entity-graph signal. Do not remove.

## When making content changes

- Keep title tags keyword-led on inner pages (the homepage is the only one
  that can lead with the brand name).
- New AEO questions go in `src/data/faq.js` — both the visible section and
  the schema pick them up.
- New /vs/<competitor> pages: append to `src/data/competitors.js`. Do not
  hand-write a new .astro file per competitor.
- Compliance posture (RESPA / TILA / TCPA) should appear in any new comparison
  page, FAQ answer, or feature description — it is a differentiator and
  AI search engines penalize tools they cannot verify as compliant in
  regulated verticals.

## Last known-good state

After the 2026-05-15 SEO/AEO pass:

- 17 pages built (homepage, pricing, glossary, blog index + 2 posts,
  /vs index + 10 /vs/[slug] pages, plus a sitemap endpoint).
- 4 JSON-LD blocks on homepage (Org, SoftwareApp, WebSite, FAQPage).
- 4 JSON-LD blocks on inner pages (Org, SoftwareApp, WebSite, BreadcrumbList).
- robots.txt + sitemap.xml + sitemap-index.xml + llms.txt all live.
