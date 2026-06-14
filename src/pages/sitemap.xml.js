/* ══════════════════════════════════════════════════════════════════════════
   LO Radar · Manual sitemap.xml endpoint
   ──────────────────────────────────────────────────────────────────────────
   Auto-discovers /vs/[slug] pages from src/data/competitors.js and blog
   posts from the `blog` content collection so new pages are announced to
   Google as soon as they're added — no manual sitemap edits required.
   ══════════════════════════════════════════════════════════════════════════ */
import { getCollection } from "astro:content";
import { COMPETITORS } from "../data/competitors.js";

export const prerender = true;

const SITE = "https://loradar.com";

const STATIC_PAGES = [
  { path: "/",                                       priority: "1.0", changefreq: "weekly"  },
  { path: "/pricing",                                priority: "0.9", changefreq: "weekly"  },
  { path: "/enterprise",                             priority: "0.9", changefreq: "monthly" },
  { path: "/blog",                                   priority: "0.8", changefreq: "weekly"  },
  { path: "/vs",                                     priority: "0.7", changefreq: "monthly" },
  { path: "/integrations",                           priority: "0.7", changefreq: "monthly" },
  { path: "/security",                               priority: "0.7", changefreq: "monthly" },
  { path: "/security/credit-signal-methodology",     priority: "0.7", changefreq: "monthly" },
  { path: "/security/employer-authorization",        priority: "0.7", changefreq: "monthly" },
  { path: "/security/consent-management",            priority: "0.7", changefreq: "monthly" },
  { path: "/security/state-disclosures",             priority: "0.7", changefreq: "monthly" },
  { path: "/security/respa-opinion",                 priority: "0.6", changefreq: "monthly" },
  { path: "/about",                                  priority: "0.6", changefreq: "monthly" },
  { path: "/contact",                                priority: "0.6", changefreq: "monthly" },
  { path: "/glossary",                               priority: "0.6", changefreq: "monthly" },
  { path: "/privacy",                                priority: "0.3", changefreq: "yearly"  },
  { path: "/terms",                                  priority: "0.3", changefreq: "yearly"  },
];

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"
  }[c]));
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);

  const entries = [];

  // ─── static pages ──────────────────────────────────────────────────────
  for (const p of STATIC_PAGES) {
    entries.push(urlEntry(SITE + p.path, today, p.changefreq, p.priority));
  }

  // ─── /vs/<slug> pages ──────────────────────────────────────────────────
  // Each comparison page is high-intent (someone typing "X vs Y" is far
  // down the funnel). Priority 0.8.
  for (const c of COMPETITORS) {
    entries.push(urlEntry(`${SITE}/vs/${c.slug}`, today, "monthly", "0.8"));
  }

  // ─── blog posts ────────────────────────────────────────────────────────
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  for (const post of posts) {
    const lastmod = (post.data.updatedDate ?? post.data.pubDate)
      .toISOString()
      .slice(0, 10);
    entries.push(urlEntry(`${SITE}/blog/${post.slug}/`, lastmod, "monthly", "0.6"));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
