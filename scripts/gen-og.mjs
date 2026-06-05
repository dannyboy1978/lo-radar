#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   gen-og.mjs · Generate /og/vs/<slug>.png OG images for every competitor
   in src/data/competitors.js. Matches the visual style of the original
   hand-designed images (dark ink + gold/teal radial glow + serif title).

   Usage:
     node scripts/gen-og.mjs              # generate any missing PNGs
     node scripts/gen-og.mjs --force      # regenerate ALL (overwrite)

   Adds nothing to the production runtime — fonts + satori are dev-only.
   ══════════════════════════════════════════════════════════════════════════ */
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const repoRoot   = path.resolve(__dirname, "..");

const fontDir   = path.join(__dirname, "fonts");
const notoReg   = fs.readFileSync(path.join(fontDir, "NotoSans-Regular.ttf"));
const notoBold  = fs.readFileSync(path.join(fontDir, "NotoSans-Bold.ttf"));
const dmSerif   = fs.readFileSync(path.join(fontDir, "DMSerifDisplay-Regular.ttf"));

const { COMPETITORS } = await import(
  "file://" + path.join(repoRoot, "src/data/competitors.js").replace(/\\/g, "/")
);

const outDir = path.join(repoRoot, "public/og/vs");
fs.mkdirSync(outDir, { recursive: true });

const force = process.argv.includes("--force");

const template = (name) => ({
  type: "div",
  props: {
    style: {
      width: 1200,
      height: 630,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "80px 90px",
      backgroundColor: "#0a0d15",
      backgroundImage:
        "radial-gradient(circle at 95% 5%, rgba(201,169,106,0.35), transparent 55%), " +
        "radial-gradient(circle at 5% 95%, rgba(20,184,166,0.22), transparent 55%), " +
        "radial-gradient(circle at 75% 60%, rgba(20,184,166,0.12), transparent 60%)",
      color: "#ffffff",
      fontFamily: "NotoSans",
    },
    children: [
      {
        type: "div",
        props: {
          style: { display: "flex", flexDirection: "column", gap: 14 },
          children: [
            { type: "div", props: { style: { width: 64, height: 3, backgroundColor: "#c9a96a" } } },
            {
              type: "div",
              props: {
                style: {
                  color: "#c9a96a",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 6,
                  textTransform: "uppercase",
                },
                children: "Comparison",
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            fontFamily: "DMSerifDisplay",
            fontSize: name.length > 14 ? 84 : 104,
            fontWeight: 400,
            lineHeight: 1.05,
            color: "#ffffff",
            letterSpacing: -1,
          },
          children: `LO Radar vs ${name}`,
        },
      },
      {
        type: "div",
        props: {
          style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" },
          children: [
            {
              type: "div",
              props: {
                style: { fontFamily: "DMSerifDisplay", fontSize: 42, fontWeight: 400, color: "#c9a96a" },
                children: "LO Radar",
              },
            },
            {
              type: "div",
              props: {
                style: { color: "#ffffff", fontSize: 26, fontWeight: 400, opacity: 0.85 },
                children: "loradar.com",
              },
            },
          ],
        },
      },
    ],
  },
});

const fonts = [
  { name: "NotoSans",       data: notoReg,  weight: 400, style: "normal" },
  { name: "NotoSans",       data: notoBold, weight: 700, style: "normal" },
  { name: "DMSerifDisplay", data: dmSerif,  weight: 400, style: "normal" },
];

let wrote = 0, skipped = 0;
for (const c of COMPETITORS) {
  const out = path.join(outDir, `${c.slug}.png`);
  if (!force && fs.existsSync(out)) { skipped++; continue; }
  const svg = await satori(template(c.name), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg).render().asPng();
  fs.writeFileSync(out, png);
  console.log(`wrote public/og/vs/${c.slug}.png (${(png.length / 1024).toFixed(0)} KB)`);
  wrote++;
}

console.log(`\n${wrote} generated, ${skipped} skipped (already exist). Use --force to regenerate all.`);
