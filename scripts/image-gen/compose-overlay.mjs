#!/usr/bin/env node
// compose-overlay.mjs — Typography compositor image-aware para UGC Colombia.
//
// v2 2026-04-17: lee layout-plan.json (si existe) emitido por ugc-layout-architect
// y aplica: drop-shadow, glow amber, scrim gradient, autosize, posicionamiento
// dinámico del logo según clearspace del manual de marca.
//
// Pipeline:
//   1. Lee <dir>/manifest.json + <dir>/overlay-copy.json
//   2. Si existe <dir>/layout-plan.json: aplica decisiones image-aware por slide.
//      Si NO existe: fallback a defaults (retrocompatible con v1).
//   3. Por cada slide: renderiza SVG (scrim + text con filter shadow/glow), compone con Sharp
//   4. Añade logo oficial según layout.logo (clearspace 24px mínimo · brand/logo-specs.md)
//   5. Escribe slide-XX-final.png manteniendo el base en raw/
//
// Uso:
//   node scripts/image-gen/compose-overlay.mjs --dir=web/public/brand/social/<folder>

import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const FONTS_DIR = join(__dirname, "fonts");

const BRAND = {
  black: "#000000",
  grayDark: "#3D3D3C",
  grayLight: "#BDBCBC",
  yellow: "#F9B334",
  cream: "#F5F5F0",
  white: "#FFFFFF",
};

const LOGO_VARIANTS = {
  color: join(REPO_ROOT, "web/public/brand/logos/v2/logo-horizontal-color.png"),
  monoGray: join(REPO_ROOT, "web/public/brand/logos/v2/logo-horizontal-mono-gray.png"),
  white: join(REPO_ROOT, "web/public/brand/logos/v2/logo-horizontal-white-on-transparent.png"),
};

// Clearspace mínimo del logo según brand/logo-specs.md (24px en 1080 de ancho).
const LOGO_CLEARSPACE_RATIO = 24 / 1080;

function parseArgs(argv) {
  const args = {};
  for (const raw of argv.slice(2)) {
    const m = raw.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
    else if (raw.startsWith("--")) args[raw.slice(2)] = true;
  }
  return args;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Autosize del headline: si el texto es corto pincha +20%, si es largo reduce hasta -25%.
 * Recibe número de palabras y ancho disponible (px) para el headline.
 */
function autosizeHeadline(words, availableWidth, basePx) {
  if (words <= 3) return basePx * 1.18;
  if (words <= 5) return basePx * 1.05;
  if (words <= 7) return basePx * 1.0;
  if (words <= 9) return basePx * 0.9;
  if (words <= 12) return basePx * 0.82;
  return basePx * 0.72;
}

function wrapLines(text, maxCharsPerLine) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const w of words) {
    if (!current) { current = w; continue; }
    if ((current + " " + w).length <= maxCharsPerLine) current += " " + w;
    else { lines.push(current); current = w; }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Calcula el ancho de caracteres por línea aproximado a partir de size y safeAreaWidth.
 */
function charsPerLineForSize(safeAreaWidthPx, fontSize) {
  // Approximation: Anton condensed ~0.45em per char; Inter ~0.55em.
  return Math.max(8, Math.floor(safeAreaWidthPx / (fontSize * 0.48)));
}

function buildShadowFilter(shadow) {
  if (!shadow) return { def: "", ref: "" };
  const id = "dropshadow";
  const def = `
    <filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${shadow.blur / 2}"/>
      <feOffset dx="0" dy="${shadow.offsetY || 2}" result="offsetblur"/>
      <feFlood flood-color="${shadow.color || "#000000"}" flood-opacity="${shadow.opacity ?? 0.65}"/>
      <feComposite in2="offsetblur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>`;
  return { def, ref: `filter="url(#${id})"` };
}

function buildGlowFilter(glow) {
  if (!glow) return { def: "", ref: "" };
  const id = "textglow";
  const def = `
    <filter id="${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${glow.blur / 2}"/>
      <feFlood flood-color="${glow.color || BRAND.yellow}" flood-opacity="${glow.opacity ?? 0.4}"/>
      <feComposite in2="SourceAlpha" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>`;
  return { def, ref: `filter="url(#${id})"` };
}

function buildScrimRect({ width, height, scrim }) {
  if (!scrim) return "";
  const scrimHeight = Math.round(height * (scrim.height ?? 0.4));
  const pos = scrim.position ?? "bottom";
  const gradient = scrim.gradient ?? "transparent-to-dark";

  const gradId = "scrimgrad";
  let stops;
  if (gradient === "transparent-to-dark") {
    stops = `<stop offset="0%" stop-color="#000000" stop-opacity="0"/>
             <stop offset="100%" stop-color="#000000" stop-opacity="0.72"/>`;
  } else if (gradient === "dark-to-transparent") {
    stops = `<stop offset="0%" stop-color="#000000" stop-opacity="0.72"/>
             <stop offset="100%" stop-color="#000000" stop-opacity="0"/>`;
  } else {
    stops = `<stop offset="0%" stop-color="#000000" stop-opacity="0.55"/>
             <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>`;
  }

  let y;
  if (pos === "top") y = 0;
  else if (pos === "full") y = 0;
  else y = height - scrimHeight;
  const h = pos === "full" ? height : scrimHeight;

  // Direction del gradient depende de si el scrim está arriba o abajo.
  const x1 = "0%", x2 = "0%";
  let y1 = "0%", y2 = "100%";
  if (pos === "top") { y1 = "0%"; y2 = "100%"; }
  else if (pos === "bottom") { y1 = "0%"; y2 = "100%"; }

  return `
    <defs>
      <linearGradient id="${gradId}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
        ${stops}
      </linearGradient>
    </defs>
    <rect x="0" y="${y}" width="${width}" height="${h}" fill="url(#${gradId})"/>
  `;
}

/**
 * Construye el SVG completo con scrim + texto con filtros de sombra/glow.
 */
function buildOverlaySvg({ width, height, overlay, layout }) {
  const {
    headline = "",
    body = "",
    eyebrow = "",
    signature = "",
    position: positionCopy = "bottom",
    colorScheme = "dark",
  } = overlay;

  // Layout override prevalece sobre overlay/copy.
  const position = layout?.recommendedPosition || positionCopy;
  const textPrimary = layout?.textColor || (colorScheme === "dark" ? BRAND.white : BRAND.black);
  const textSecondary = colorScheme === "dark" ? BRAND.grayLight : BRAND.grayDark;
  const accent = BRAND.yellow;
  const sizes = layout?.sizes || { headline: 1.0, body: 1.0, eyebrow: 1.0, signature: 1.0 };

  // Padding y tamaños base.
  const SIDE_PAD = Math.round(width * 0.07);
  const safeWidth = width - SIDE_PAD * 2;
  const words = (headline || "").split(/\s+/).filter(Boolean).length;

  const HEADLINE_BASE = Math.round(width * 0.09);
  const HEADLINE_SIZE = Math.round(autosizeHeadline(words, safeWidth, HEADLINE_BASE) * (sizes.headline ?? 1));
  const BODY_SIZE = Math.round(width * 0.028 * (sizes.body ?? 1));
  const EYEBROW_SIZE = Math.round(width * 0.022 * (sizes.eyebrow ?? 1));
  const SIG_SIZE = Math.round(width * 0.019 * (sizes.signature ?? 1));
  const LINE_HEIGHT_HEAD = HEADLINE_SIZE * 1.02;
  const LINE_HEIGHT_BODY = BODY_SIZE * 1.4;

  const headlineLines = headline ? wrapLines(headline.toUpperCase(), charsPerLineForSize(safeWidth, HEADLINE_SIZE)) : [];
  const bodyLines = body ? wrapLines(body, charsPerLineForSize(safeWidth, BODY_SIZE) + 2) : [];

  const totalHeadH = headlineLines.length * LINE_HEIGHT_HEAD;
  const totalBodyH = bodyLines.length * LINE_HEIGHT_BODY;
  const GAP = Math.round(width * 0.03);
  const blockH = (eyebrow ? EYEBROW_SIZE + GAP * 0.5 : 0) + totalHeadH + (body ? GAP * 0.8 + totalBodyH : 0);

  let yStart;
  if (position === "top") yStart = Math.round(height * 0.08);
  else if (position === "center") yStart = Math.round(height / 2 - blockH / 2);
  else if (position === "split") yStart = Math.round(height * 0.08);
  else yStart = Math.round(height - blockH - Math.round(height * 0.11));

  // Filters.
  const shadow = buildShadowFilter(layout?.textShadow);
  const glow = buildGlowFilter(layout?.textGlow);

  // Scrim.
  const scrimSvg = buildScrimRect({ width, height, scrim: layout?.scrim });

  const parts = [];
  let y = yStart;

  if (eyebrow) {
    parts.push(`<text x="${SIDE_PAD}" y="${y + EYEBROW_SIZE}" font-family="Inter" font-weight="600" font-size="${EYEBROW_SIZE}" fill="${accent}" letter-spacing="${EYEBROW_SIZE * 0.12}" ${shadow.ref}>${escapeXml(eyebrow.toUpperCase())}</text>`);
    y += EYEBROW_SIZE + GAP * 0.5;
  }

  for (const line of headlineLines) {
    y += HEADLINE_SIZE * 0.92;
    parts.push(`<text x="${SIDE_PAD}" y="${y}" font-family="Anton" font-weight="400" font-size="${HEADLINE_SIZE}" fill="${textPrimary}" letter-spacing="-1" ${glow.ref || shadow.ref}>${escapeXml(line)}</text>`);
    y += LINE_HEIGHT_HEAD - HEADLINE_SIZE * 0.92;
  }

  if (body) {
    y += GAP * 0.6;
    for (const line of bodyLines) {
      y += BODY_SIZE;
      parts.push(`<text x="${SIDE_PAD}" y="${y}" font-family="Inter" font-weight="400" font-size="${BODY_SIZE}" fill="${textSecondary}" ${shadow.ref}>${escapeXml(line)}</text>`);
      y += LINE_HEIGHT_BODY - BODY_SIZE;
    }
  }

  if (signature) {
    const sigY = height - Math.round(height * 0.04);
    parts.push(`<text x="${SIDE_PAD}" y="${sigY}" font-family="Inter" font-weight="500" font-size="${SIG_SIZE}" fill="${accent}" letter-spacing="${SIG_SIZE * 0.08}" ${shadow.ref}>${escapeXml(signature.toUpperCase())}</text>`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      ${shadow.def}
      ${glow.def}
    </defs>
    ${scrimSvg}
    ${parts.join("\n    ")}
  </svg>`;
}

async function renderSvgToPng(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      fontDirs: [FONTS_DIR],
      loadSystemFonts: false,
      defaultFontFamily: "Inter",
    },
    background: "rgba(0,0,0,0)",
  });
  const rendered = resvg.render();
  return Buffer.from(rendered.asPng());
}

function pickLogoVariant(layout, overlay) {
  const variant = layout?.logo?.variant || overlay?.logoVariant;
  if (variant && LOGO_VARIANTS[variant]) return LOGO_VARIANTS[variant];

  const scheme = (overlay?.colorScheme || "dark").toLowerCase();
  const bgHint = (overlay?.backgroundHint || "").toLowerCase();
  if (scheme === "light" || bgHint.includes("cream") || bgHint.includes("f5f5f0")) return LOGO_VARIANTS.color;
  if (bgHint.includes("gray") || bgHint.includes("bdbcbc")) return LOGO_VARIANTS.monoGray;
  return LOGO_VARIANTS.white;
}

async function applyLogo(baseBuffer, overlay, layout, canvasWidth, canvasHeight) {
  const show = layout?.logo?.show ?? overlay?.showLogo;
  if (!show) return baseBuffer;
  const logoPath = pickLogoVariant(layout, overlay);
  if (!existsSync(logoPath)) {
    console.warn(`  ⚠ Logo no encontrado: ${logoPath}`);
    return baseBuffer;
  }

  const sizeMult = layout?.logo?.size || 1.0;
  const logoTargetWidth = Math.round(canvasWidth * 0.22 * sizeMult);
  const logoResized = await sharp(logoPath)
    .resize({ width: logoTargetWidth })
    .toBuffer();
  const meta = await sharp(logoResized).metadata();

  const pos = layout?.logo?.position || overlay?.logoPosition || "bottom-right";
  const clearspace = Math.round(canvasWidth * LOGO_CLEARSPACE_RATIO * 2); // 1x clearspace según specs
  const pad = Math.max(clearspace, Math.round(canvasWidth * 0.05));

  let left, top;
  if (pos === "bottom-right") { left = canvasWidth - meta.width - pad; top = canvasHeight - meta.height - pad; }
  else if (pos === "bottom-left") { left = pad; top = canvasHeight - meta.height - pad; }
  else if (pos === "top-right") { left = canvasWidth - meta.width - pad; top = pad; }
  else if (pos === "top-left") { left = pad; top = pad; }
  else if (pos === "center") { left = Math.round((canvasWidth - meta.width) / 2); top = Math.round((canvasHeight - meta.height) / 2); }
  else { left = canvasWidth - meta.width - pad; top = canvasHeight - meta.height - pad; }

  return sharp(baseBuffer)
    .composite([{ input: logoResized, left, top, blend: "over" }])
    .toBuffer();
}

async function composeSlide(baseImagePath, overlay, layout, outPath) {
  const baseImg = sharp(baseImagePath);
  const meta = await baseImg.metadata();
  const width = meta.width;
  const height = meta.height;

  const hasCopy = overlay?.headline || overlay?.body || overlay?.eyebrow || overlay?.signature;
  let composed = await baseImg.toBuffer();

  if (hasCopy) {
    const svg = buildOverlaySvg({ width, height, overlay, layout });
    const overlayPng = await renderSvgToPng(svg, width);
    composed = await sharp(composed)
      .composite([{ input: overlayPng, top: 0, left: 0, blend: "over" }])
      .toBuffer();
  }

  composed = await applyLogo(composed, overlay, layout, width, height);

  await writeFile(outPath, composed);
  return { ok: true, path: outPath, width, height };
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.dir) {
    console.error("Uso: --dir=<web/public/brand/social/YYYYMMDD-slug>");
    process.exit(1);
  }

  const dir = resolve(args.dir);
  const manifestPath = join(dir, "manifest.json");
  const overlayPath = join(dir, "overlay-copy.json");
  const layoutPath = join(dir, "layout-plan.json");
  const rawDir = join(dir, "raw");

  if (!existsSync(manifestPath)) { console.error(`No existe ${manifestPath}`); process.exit(1); }
  if (!existsSync(overlayPath)) { console.error(`No existe ${overlayPath}. Genera overlay-copy.json primero (agente ugc-copy-overlay).`); process.exit(1); }

  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const overlayData = JSON.parse(await readFile(overlayPath, "utf8"));

  let layoutData = null;
  if (existsSync(layoutPath)) {
    layoutData = JSON.parse(await readFile(layoutPath, "utf8"));
    console.log(`✓ Usando layout-plan.json (image-aware mode)`);
  } else {
    console.log(`⚠ Sin layout-plan.json — usando defaults (legacy mode). Invoca ugc-layout-architect para layout óptimo.`);
  }

  await mkdir(rawDir, { recursive: true });
  console.log(`Composing overlays for ${dir}`);
  console.log(`Slides: ${manifest.results.length}`);

  const slideOverlays = overlayData.slides || {};
  const slideLayouts = layoutData?.slides || {};
  const results = [];

  for (const r of manifest.results) {
    if (!r.ok) continue;
    const basePath = r.path;
    const fname = basename(basePath);
    const rawPath = join(rawDir, fname);
    const finalName = fname.replace(/\.png$/i, "-final.png");
    const outPath = join(dir, finalName);

    if (!existsSync(rawPath)) {
      await copyFile(basePath, rawPath);
    }

    const overlay = slideOverlays[r.id] || {};
    const layout = slideLayouts[r.id] || null;

    try {
      const res = await composeSlide(basePath, overlay, layout, outPath);
      const layoutFlag = layout ? "🎨" : "  ";
      console.log(`  ✓ ${layoutFlag} ${finalName} (${res.width}×${res.height})`);
      results.push({ id: r.id, ok: true, path: outPath, layoutApplied: !!layout });
    } catch (err) {
      console.error(`  ✗ ${r.id}: ${err?.message ?? err}`);
      results.push({ id: r.id, ok: false, error: err?.message ?? String(err) });
    }
  }

  const okCount = results.filter((r) => r.ok).length;
  const withLayout = results.filter((r) => r.layoutApplied).length;
  console.log(`\n${okCount}/${results.length} slides compuestos · ${withLayout} con layout-plan image-aware.`);

  const reportPath = join(dir, "compose-report.json");
  await writeFile(reportPath, JSON.stringify({
    composed_at: new Date().toISOString(),
    dir,
    used_layout_plan: !!layoutData,
    slides: results,
  }, null, 2));
  console.log(`Report: ${reportPath}`);
}

main().catch((err) => {
  console.error("Fatal:", err?.message ?? err);
  process.exit(1);
});
