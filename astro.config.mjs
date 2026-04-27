import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// CHANGE ME after Danny finalizes the brand name + buys the domain
const SITE = "https://loradar.com";

export default defineConfig({
  site: SITE,
  integrations: [tailwind(), sitemap()],
  build: { format: "directory" },
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
});
