/* ══════════════════════════════════════════════════════════════════════════
   LO Radar marketing site — central config
   ──────────────────────────────────────────────────────────────────────────
   One source of truth. Update brand, calendar, app URL here.
   ══════════════════════════════════════════════════════════════════════════ */

// ─── Brand (placeholder — Danny is researching final name) ──────────────
export const BRAND_NAME = "LO Radar";
export const PARENT_COMPANY = "TechStack Consulting LLC";
export const SITE_URL = "https://loradar.com";

// ─── BOOKING — primary CTA destination (GHL calendar) ───────────────────
// All venture sites share a single TechStack Strategy Call calendar. The
// product & UTM params tag every booking with its origin so we can see
// which brand drove the meeting inside GHL contacts.
export const BOOKING_URL =
  import.meta.env.PUBLIC_BOOKING_URL ||
  "https://link.techstackllc.info/widget/booking/8RjvinXFqOoRV4NMxyEA?product=LO%20Radar&utm_source=loradar.com&utm_medium=web&utm_campaign=book-demo";

// ─── CONTACT ─────────────────────────────────────────────────────────────
export const CONTACT_EMAIL = "hello@techstackllc.info";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

// ─── APP — where signed-in LOs go ───────────────────────────────────────
// Initially shared with the service-business apps. Eventually may move to
// app.loradar.com on its own subdomain.
export const APP_URL = "https://app.loradar.com";

// ─── PARENT MARKETING SITE ──────────────────────────────────────────────
// For the small "we're part of TechStack" footer link.
export const PARENT_SITE = "https://retentioniq.io";
