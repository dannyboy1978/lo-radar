# LO Radar — standalone marketing site

A complete, deployable Astro project for the LO Radar brand. Built to live at `loradar.com` (or whatever final domain Danny picks) as a separate marketing surface from `retentioniq.io`. Same backend codebase, same Supabase, same TechStack LLC ownership — just a focused buyer destination for mortgage loan officers.

---

## What's in here

```
_loradar-extract/
├── astro.config.mjs          # site URL: loradar.com (change if you pick a different domain)
├── tailwind.config.mjs       # refi-only palette: ink + teal + gold (no retention-blue/revenue-orange)
├── package.json              # @astrojs/sitemap, @astrojs/tailwind, astro 5
├── Dockerfile                # multi-stage Node → nginx:alpine, ~25 MB
├── docker-compose.yml        # joins existing nginx-proxy `web` network
├── deploy.sh                 # one-command VPS deploy
├── .github/workflows/deploy.yml  # auto-deploy on push to main
├── .env.example              # LORADAR_DOMAIN env var
├── docker/nginx.conf         # apex + www routing, gzip, security headers
├── public/
│   ├── robots.txt            # permissive, AI-crawler-friendly
│   └── llms.txt              # AEO citation file (LO-Radar-only)
└── src/
    ├── config.js             # BRAND_NAME, BOOKING_URL, APP_URL — central config
    ├── styles/globals.css    # gold gradients, refi teal, font imports
    ├── layouts/Base.astro    # head + Organization + SoftwareApplication schema
    ├── components/
    │   ├── Header.astro      # refi-only nav (no Retention IQ / Revenue IQ links)
    │   └── Footer.astro      # refi-only footer with "Part of TechStack" link
    ├── data/competitors.js   # HomeBot, Total Expert, Sales Boomerang
    ├── pages/
    │   ├── index.astro       # homepage — adapted from /lo-radar.astro on retentioniq.io
    │   ├── pricing.astro     # 3 tiers: Performance / Flat / Enterprise
    │   ├── glossary.astro    # 15 mortgage-LO-relevant terms
    │   ├── blog/
    │   │   ├── index.astro
    │   │   └── [...slug].astro
    │   └── vs/
    │       ├── index.astro
    │       └── [slug].astro  # generates 3 comparison pages
    └── content/
        ├── config.ts         # blog content collection schema (categories tuned for mortgage)
        └── blog/
            ├── arm-reset-calendar-twelve-months-out.md
            └── mortgage-lo-anniversary-playbook.md
```

---

## What still needs to happen before launch

The scaffold is complete and deployable as-is. But to actually launch:

1. **Pick the final brand name.** Currently the code uses "LO Radar" as a placeholder. If you keep "LO Radar", great — no changes needed. If you pick something else (e.g., "BookFlow Mortgage", "OriginIQ", "The Refi Engine", whatever), do a global find-and-replace on `LO Radar` and `loradar.com` and `loradar` across all files.
2. **Buy the domain.** `loradar.com` is the assumed domain — check availability before the global find/replace.
3. **Add favicons + logo.** Drop `/public/loradar-logo.png`, `/public/favicon.svg`, `/public/favicon-32x32.png`, `/public/favicon-16x16.png`, `/public/apple-touch-icon.png`, `/public/og-default.png`. Use the gold gradient pattern from the existing TechStack assets.
4. **Migrate to its own folder + git repo.** See migration steps below.
5. **DNS + VPS deploy setup.** See deployment steps below.
6. **Update retentioniq.io** to remove LO Radar marketing content (replace with a one-line "Looking for refi tools? See loradar.com" link).

---

## Migration: extract from this folder to your standalone repo

Run from PowerShell on your Windows machine (`C:\users\danny\`):

```powershell
# 1. Create the new folder
New-Item -ItemType Directory -Path "C:\users\danny\loradar" -Force

# 2. Copy the scaffold from the current monorepo location
Copy-Item -Path "C:\users\danny\Retention_IQ\_loradar-extract\*" -Destination "C:\users\danny\loradar\" -Recurse -Force

# 3. Move into the new folder
cd C:\users\danny\loradar

# 4. Initialize git
git init
git add .
git commit -m "Initial LO Radar standalone scaffold"

# 5. Create the GitHub repo (requires gh CLI installed; if not, create at github.com/new then copy the URL)
gh repo create dannyboy1978/lo-radar --public --source=. --remote=origin --push

# OR manually:
#   git remote add origin https://github.com/dannyboy1978/lo-radar.git
#   git branch -M main
#   git push -u origin main
```

After this, you have a clean repo at `github.com/dannyboy1978/lo-radar` containing only the LO Radar marketing site.

---

## Deployment: stand up loradar.com on the same VPS

Same Hostinger VPS (`187.77.194.176`) hosts the existing `techstack-iq` and `techstack-marketing` containers. LO Radar joins as a third container on the same `web` network.

```bash
# 1. SSH into the VPS
ssh root@187.77.194.176

# 2. Clone the new repo
cd /root
git clone https://github.com/dannyboy1978/lo-radar.git loradar
cd loradar

# 3. Set up env
cp .env.example .env
# Edit .env if you picked a different domain

# 4. Configure GitHub Actions secrets
# Same VPS_HOST / VPS_USER / VPS_SSH_KEY secrets used for the existing repo
# Add them to the new repo at github.com/dannyboy1978/lo-radar/settings/secrets/actions

# 5. First deploy
bash deploy.sh

# 6. Verify
docker compose ps
curl -fsS http://127.0.0.1/ | head -20
```

---

## DNS — point loradar.com at the VPS

At your DNS provider (Hostinger, Cloudflare, wherever you bought loradar.com):

```
Type   Name   Value                  TTL
A      @      187.77.194.176         3600
CNAME  www    loradar.com             3600
```

Wait 5-10 minutes for DNS propagation. Then nginx-proxy + acme-companion will detect the new container and auto-provision a Let's Encrypt SSL cert. The site will be live at `https://loradar.com` within ~2 minutes of DNS resolving.

---

## Verification checklist (post-launch)

```bash
# Site loads
curl -I https://loradar.com

# Sitemaps render
curl https://loradar.com/sitemap-index.xml | head -20
curl https://loradar.com/sitemap.xml | head -20

# Robots
curl https://loradar.com/robots.txt

# Apex + www both work
curl -I https://www.loradar.com    # should 301 to loradar.com
curl -I https://loradar.com         # should 200

# IndexNow key file
curl https://loradar.com/[indexnow-key].txt   # set up after launch
```

---

## What to update on retentioniq.io after launch

Remove or downplay the LO Radar content from the service-business-focused site:

1. **Header nav** — remove the "LO Radar" link from the Platform dropdown
2. **Homepage** — remove the third engine card (LO Radar) from the platform teaser
3. **/products page** — remove the LO Radar engine section
4. **Footer** — remove LO Radar from Product list
5. **Add a small redirect** at `retentioniq.io/lo-radar` → `https://loradar.com` (301)
6. **Add a small footer link** on retentioniq.io: "Mortgage loan officer? See loradar.com"

---

## Naming decisions Danny is researching

If you keep "LO Radar" — the existing scaffold is ready as-is.

If you pick something else, run global find-and-replace on these strings (in order):
- `LO Radar` → new name
- `lo-radar` → new-name-slug
- `loradar.com` → new domain
- `loradar` → new project shortname
- `LORadar` → new CamelCase name (if any)

The placeholder text appears in:
- `astro.config.mjs` (site URL)
- `src/config.js` (BRAND_NAME, SITE_URL)
- All `<title>` and `<description>` tags in pages
- Header logo text + Footer brand mention
- All schema.org JSON-LD blocks
- llms.txt
- robots.txt sitemap URLs
- Dockerfile + nginx.conf comments
- This README

---

## Time + effort estimate

| Step | Time |
|---|---|
| Scaffold copy + git init + push | 5 min |
| Buy domain + DNS records | 10 min |
| Add favicons / logo / og-image | 30 min (depends on design assets) |
| First deploy on VPS | 10 min |
| Wait for SSL cert + DNS propagation | 10 min |
| Update retentioniq.io to reduce LO Radar content | 30 min |
| Submit loradar.com to Google Search Console + Bing | 15 min |
| **Total** | **~2 hours** |

After that: the new site builds authority independently. Same playbooks (G2, podcasts, LinkedIn, etc.) apply but to mortgage-LO-specific channels.

_Live at loradar.com._
