/* ══════════════════════════════════════════════════════════════════════════
   LO Radar · Manual sitemap.xml endpoint
   Belt-and-suspenders companion to @astrojs/sitemap (which generates
   sitemap-index.xml + sitemap-0.xml). This route makes /sitemap.xml work
   for crawlers that hit the legacy URL directly.
   ══════════════════════════════════════════════════════════════════════════ */
export const prerender = true;

const SITE = "https://loradar.com";

const STATIC_PAGES = [
  { path: "/",         priority: "1.0", changefreq: "weekly"  },
  { path: "/pricing",  priority: "0.9", changefreq: "weekly"  },
  { path: "/blog",     priority: "0.8", changefreq: "weekly"  },
  { path: "/vs",       priority: "0.7", changefreq: "monthly" },
  { path: "/glossary", priority: "0.7", changefreq: "monthly" },
  { path: "/press",    priority: "0.5", changefreq: "monthly" },
];

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"
  }[c]));
}

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = STATIC_PAGES
    .map((p) => `  <url>
    <loc>${escapeXml(SITE + p.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
