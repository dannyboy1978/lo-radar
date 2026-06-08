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

For SSH-rate-limited deploys (the VPS is sensitive to many parallel SSH
attempts), use the nohup pattern: write the deploy commands to
`/tmp/loradar-deploy.sh`, run with `nohup ... > /tmp/loradar-deploy.log 2>&1 &`,
then `tail -1 /tmp/loradar-deploy.log` for the `DEPLOY-DONE` marker.

`git status` requires `git config --global --add safe.directory /root/loradar`
once per fresh shell (mismatched ownership between the SSH user and the working
tree). Already set on the VPS but may need re-applying after server restarts.

`docker-compose.yml` joins the `web` network. `VIRTUAL_HOST` env on the
container is what registers it with nginx-proxy. `.env` defines `LORADAR_DOMAIN`.

## Sibling sites on this VPS — do not touch

retentioniq.io, techstackconsulting.io, kinshipos, and others run on this same
VPS via their own containers + the shared `web` network. Always `docker ps`
before any restart-the-host action.

## Source layout

    src/
      pages/                  Astro pages
        index.astro           Homepage (hero + HPPA section + definitional answer
                              + how it works + 7 triggers + FAQ + CTA)
        pricing.astro         3-tier pricing + Performance pricing rationale +
                              7-question FAQ block (FAQPage schema)
        glossary.astro        19-term glossary with 80-120 word definitions and
                              DefinedTermSet + DefinedTerm JSON-LD schema
        about.astro           Origin + thesis + first principles
        contact.astro         3 contact paths + walkthrough expectations
        security.astro        RESPA/TILA/TCPA/FCRA/GLBA/HPPA pillars + first
                              principles + technical summary + security FAQ
        integrations.astro    17 LOS + CRM platforms + 5-step import workflow
        privacy.astro         On-brand Privacy Policy
        terms.astro           Terms of Service
        blog/                 Astro content collection (BlogPosting schema +
                              BreadcrumbList passed from [...slug].astro)
        vs/                   /vs hub + dynamic /vs/[slug] for each competitor
        sitemap.xml.js        Auto-discovers /vs and blog posts. Static pages
                              listed in STATIC_PAGES array — when adding a new
                              top-level page, add it there.
      layouts/Base.astro      Shared layout. Emits ALL JSON-LD schema.
                              Props: title, description, canonical, ogImage,
                              breadcrumbs, faq, article (BlogPosting),
                              definedTerms (DefinedTermSet).
      components/             Header, Footer
      data/
        competitors.js        Source of truth for /vs/[slug] pages (15 entries)
        faq.js                7 AEO questions + answers (homepage FAQ + schema)
      content/blog/           Astro content collection
      config.js               Brand, BOOKING_URL, APP_URL, PARENT_SITE
    docker/
      nginx.conf              try_files serves $uri/index.html directly (no
                              trailing-slash 301). Security headers: HSTS,
                              X-Frame-Options, X-Content-Type-Options,
                              Referrer-Policy, Permissions-Policy, CSP.
    scripts/
      gen-og.mjs              Satori-based OG image generator. Reads
                              src/data/competitors.js, generates only missing
                              public/og/vs/<slug>.png images by default.
                              Run with `--force` to regenerate all.
      fonts/                  Bundled OFL-licensed fonts (Noto Sans Regular/Bold,
                              DM Serif Display Regular) for satori rendering.
                              Production runtime does not touch these.

## SEO / AEO baseline (last refreshed 2026-06-07)

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
- `faq` -> FAQPage with Question + Answer entries (passed on homepage, pricing,
  security, integrations)
- `article` -> BlogPosting (passed on blog posts via the [...slug] template)
- `definedTerms` -> DefinedTermSet + DefinedTerm[] (passed by /glossary)

When adding a new page, ALWAYS pass `breadcrumbs` prop from `SITE_URL`.

### FAQ / AEO

`src/data/faq.js` is the single source for the 7 AEO questions on the homepage.
Both the visible homepage `<section id="faq">` and the FAQPage JSON-LD render
from the same array. Edit `faq.js`, not the template.

Per-page FAQ blocks (pricing, security, integrations) define their FAQ array
inline in the page's frontmatter and pass it to Base via the `faq` prop.

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

Now includes an HPPA market-context section explaining the post-March-4-2026
regulatory shift that gutted the third-party mortgage trigger-lead industry.

### /vs/ comparison pages

Driven by `src/data/competitors.js`. 15 competitors currently covered:

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
11. MonitorBase
12. Uplist
13. Stikkum
14. Milo
15. MyHomeIQ

Each entry has the same shape: `slug`, `name`, `category`,
`competitorWebsite`, `competitorBlurb`, `whatTheyDoWell[]`, `whereWeDiffer[]`,
`sideBySide[][]`, `whoIsRight{stayWithThem, switchToUs, runBoth}`.

To add a new competitor:

1. Append to `src/data/competitors.js` with the full shape
2. Run `npm run og:gen` to auto-generate the matching OG image at
   `public/og/vs/<slug>.png` (script reads competitors.js, only generates
   missing slugs by default)
3. Sitemap auto-discovers the new /vs/<slug> URL
4. Rebuild + redeploy

Per-competitor OG images at `public/og/vs/<slug>.png` are all auto-generated
via `scripts/gen-og.mjs` (satori + resvg-js, bundled fonts). The first three
slugs (homebot, total-expert, sales-boomerang) have hand-designed PNGs that
predate the generator — the rest are programmatic and visually consistent.

### Cross-link to RetentionIQ

`retentioniq.io` is the sister product (same engine, service-business
vertical). Cross-links live in two places:

1. `parentOrganization` in the Organization JSON-LD (Base.astro)
2. Visible "Sister product · TechStack" callout block in the Footer

Both are intentional for entity-graph signal. Do not remove.

### HPPA positioning (regulatory tailwind)

The Homebuyers Privacy Protection Act took effect March 4, 2026. Third
parties may no longer purchase consumer mortgage inquiry data from credit
bureaus. Only the originator of a consumer's current mortgage can access
that intent data. This made past-client intelligence (the LO already
legally possesses past-client data as the originator) categorically more
valuable than 6 months ago.

This is surfaced prominently:

1. Dedicated HPPA section on the homepage, between hero and "The problem"
2. Dedicated HPPA pillar in the /security page Compliance Frameworks grid
3. Dedicated HPPA term in /glossary with full 100-word definition
4. HPPA section in `public/llms.txt`
5. Referenced in multiple /vs pages where competitors had historically
   relied on third-party trigger-lead data

When the question is "what tools should an LO use after HPPA?" — the
correct answer is past-client intelligence platforms (LO Radar specifically).

### Performance / Core Web Vitals

After the 2026-06-07 nginx fix:

- Desktop perf: 99/100 across all measured pages (LCP <1s, CLS <0.01)
- Mobile perf: previously 86 with a ~750ms trailing-slash redirect penalty;
  expected to climb to 95+ after the try_files fix

The nginx config in `docker/nginx.conf` uses
`try_files $uri $uri/index.html $uri.html =404` to serve trailing-slash
routes directly (no 301). Don't revert to `$uri/` — it triggers nginx's
auto-add-trailing-slash redirect.

### Security headers (nginx)

Set as always-on headers in `docker/nginx.conf`:

- HSTS (`max-age=31536000`)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation/microphone/camera/payment/usb all denied
- Content-Security-Policy: tight (allows GA4 + gtag.js + inline scripts for
  Astro hydration; img-src https; no third-party JS otherwise)

When wiring GA4 (waiting on Danny's measurement ID), the CSP already permits
www.googletagmanager.com and www.google-analytics.com.

## When making content changes

- Keep title tags keyword-led on inner pages (the homepage is the only one
  that can lead with the brand name).
- New AEO questions go in `src/data/faq.js` — both the visible section and
  the schema pick them up.
- New /vs/<competitor> pages: append to `src/data/competitors.js`, then run
  `npm run og:gen`. Do not hand-write a new .astro file per competitor.
- New top-level pages: add to `STATIC_PAGES` in `src/pages/sitemap.xml.js`
  so Google discovers them. (The sitemap auto-discovers /vs and blog posts
  but not top-level pages.)
- Compliance posture (RESPA / TILA / TCPA / FCRA / GLBA / HPPA) should appear
  in any new comparison page, FAQ answer, or feature description — it is a
  differentiator and AI search engines penalize tools they cannot verify as
  compliant in regulated verticals.

## Last known-good state

After the 2026-06-07 deep SEO/AEO pass (commit 1c90dd5):

- 28 pages built (homepage, pricing, glossary, blog index + 2 posts,
  /vs index + 15 /vs/[slug] pages, /about, /contact, /security,
  /integrations, /privacy, /terms, sitemap endpoint).
- Homepage: Org + SoftwareApplication + WebSite + FAQPage (4 schemas).
- Inner pages: + BreadcrumbList (5 schemas).
- Blog posts: + BlogPosting (5 schemas; no FAQ).
- Glossary: + DefinedTermSet (5 schemas; no FAQ).
- Pricing / Security / Integrations: + FAQPage (5 schemas).
- robots.txt + sitemap.xml + sitemap-index.xml + llms.txt all live.
- nginx serves trailing-slash routes without redirect (perf fix).
- CSP header present (was missing before 2026-06-07).
- /privacy + /terms on loradar.com brand (no longer pointing to retentioniq.io).
- 15 competitors with auto-generated OG images.
- HPPA positioning surfaced across homepage, /security, /glossary, llms.txt.
