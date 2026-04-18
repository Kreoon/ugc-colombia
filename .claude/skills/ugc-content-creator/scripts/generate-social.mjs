#!/usr/bin/env node
// generate-social.mjs — wrapper para generar imagenes sociales con Nanobanana (Gemini 2.5 Flash Image).
// Reutiliza BRAND_BASE / BRAND_NEGATIVE / buildPrompt de scripts/image-gen/brand-system.mjs.
//
// Uso:
//   node .claude/skills/ugc-content-creator/scripts/generate-social.mjs \
//     --concept=hooks-reels-educativo \
//     --platform=ig-carousel \
//     --brief=drafts/20260416-hooks-reels-educativo-brief.json
//
// El brief JSON define cada imagen a generar (concept, composition, filename).
// Output: web/public/brand/social/YYYYMMDD-<concept>/<filename>.png
//
// Requiere GEMINI_API_KEY en web/.env.local (clave personal de cada miembro del equipo).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..", "..");
const IMAGE_GEN_DIR = join(REPO_ROOT, "scripts", "image-gen");
const BRAND_SYSTEM_PATH = join(IMAGE_GEN_DIR, "brand-system.mjs");
const WEB_ENV = join(REPO_ROOT, "web", ".env.local");
const OUTPUT_BASE = join(REPO_ROOT, "web", "public", "brand", "social");

// Resolvemos deps desde scripts/image-gen/node_modules (el wrapper vive en .claude/ y no tiene package.json propio).
const requireFromImageGen = createRequire(pathToFileURL(join(IMAGE_GEN_DIR, "package.json")).href);

async function importFromImageGen(packageName) {
  const absPath = requireFromImageGen.resolve(packageName);
  return import(pathToFileURL(absPath).href);
}

const { GoogleGenAI } = await importFromImageGen("@google/genai");
const { config: loadEnv } = await importFromImageGen("dotenv");

loadEnv({ path: WEB_ENV });

const MODEL = "gemini-2.5-flash-image";

const PLATFORM_DEFAULTS = {
  "ig-carousel":    { aspectRatio: "4:5",  expectedWidth: 1080, expectedHeight: 1350 },
  "ig-feed":        { aspectRatio: "4:5",  expectedWidth: 1080, expectedHeight: 1350 },
  "ig-square":      { aspectRatio: "1:1",  expectedWidth: 1080, expectedHeight: 1080 },
  "reel":           { aspectRatio: "9:16", expectedWidth: 1080, expectedHeight: 1920 },
  "story":          { aspectRatio: "9:16", expectedWidth: 1080, expectedHeight: 1920 },
  "tiktok":         { aspectRatio: "9:16", expectedWidth: 1080, expectedHeight: 1920 },
  "youtube-short":  { aspectRatio: "9:16", expectedWidth: 1080, expectedHeight: 1920 },
  "youtube-thumb":  { aspectRatio: "16:9", expectedWidth: 1280, expectedHeight: 720  },
  "linkedin":       { aspectRatio: "16:9", expectedWidth: 1200, expectedHeight: 628  },
  "linkedin-pdf":   { aspectRatio: "4:5",  expectedWidth: 1080, expectedHeight: 1350 },
  "whatsapp":       { aspectRatio: "1:1",  expectedWidth: 1080, expectedHeight: 1080 },
  "x-post":         { aspectRatio: "16:9", expectedWidth: 1600, expectedHeight: 900  },
  "newsletter":     { aspectRatio: "2:1",  expectedWidth: 1200, expectedHeight: 600  },
};

function parseArgs(argv) {
  const args = {};
  for (const raw of argv.slice(2)) {
    const m = raw.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
    else if (raw.startsWith("--")) args[raw.slice(2)] = true;
  }
  return args;
}

function yyyymmdd(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function importBrandSystem() {
  try {
    return await import(pathToFileURL(BRAND_SYSTEM_PATH).href);
  } catch (err) {
    console.error(`No pude importar brand-system.mjs desde ${BRAND_SYSTEM_PATH}`);
    console.error(`Causa: ${err?.message ?? err}`);
    process.exit(1);
  }
}

async function loadBrief(path) {
  const abs = resolve(path);
  try {
    const raw = await readFile(abs, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`No pude leer el brief en ${abs}`);
    console.error(`Causa: ${err?.message ?? err}`);
    process.exit(1);
  }
}

function validateBrief(brief, platform) {
  if (!brief || typeof brief !== "object") {
    throw new Error("brief debe ser un objeto JSON");
  }
  if (!Array.isArray(brief.images)) {
    throw new Error('brief.images debe ser un array con { id, filename, concept, composition?, extra? }');
  }
  if (!PLATFORM_DEFAULTS[platform]) {
    throw new Error(`plataforma desconocida: ${platform}. Validas: ${Object.keys(PLATFORM_DEFAULTS).join(", ")}`);
  }
  for (const img of brief.images) {
    if (!img.id || !img.filename || !img.concept) {
      throw new Error(`cada imagen requiere id, filename y concept. Problema en: ${JSON.stringify(img).slice(0, 120)}`);
    }
  }
}

async function generateOne({ id, filename, prompt, aspectRatio }, outDir, ai) {
  console.log(`\n[${id}] Generando con ${MODEL} (aspect ${aspectRatio})...`);
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio },
    },
  });

  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData?.data);
  if (!imagePart) {
    console.error(`  FALLO sin imagen en la respuesta para ${id}`);
    return { ok: false, id };
  }

  const buffer = Buffer.from(imagePart.inlineData.data, "base64");
  const outPath = join(outDir, filename);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, buffer);
  console.log(`  OK ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
  return { ok: true, id, path: outPath };
}

async function main() {
  const args = parseArgs(process.argv);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Falta GEMINI_API_KEY en web/.env.local. Cada miembro del equipo tiene su propia key personal (obtenerla en aistudio.google.com).");
    process.exit(1);
  }

  if (!args.concept || !args.platform || !args.brief) {
    console.error("Uso: --concept=<slug> --platform=<ig-carousel|reel|story|linkedin|youtube-thumb|whatsapp|...> --brief=<path.json>");
    console.error(`Plataformas validas: ${Object.keys(PLATFORM_DEFAULTS).join(", ")}`);
    process.exit(1);
  }

  const platform = args.platform;
  const concept = slugify(args.concept);
  const datePrefix = args.date || yyyymmdd();
  const brief = await loadBrief(args.brief);
  validateBrief(brief, platform);

  const brandSystem = await importBrandSystem();
  const { buildPrompt } = brandSystem;
  if (typeof buildPrompt !== "function") {
    console.error("brand-system.mjs no exporta buildPrompt(). Revisar scripts/image-gen/brand-system.mjs.");
    process.exit(1);
  }

  const defaults = PLATFORM_DEFAULTS[platform];
  const aspectRatio = brief.aspectRatio || defaults.aspectRatio;

  const outDir = join(OUTPUT_BASE, `${datePrefix}-${concept}`);
  console.log(`Batch social: ${brief.images.length} imagen(es) -> ${outDir}`);
  console.log(`Plataforma: ${platform} · Aspect: ${aspectRatio}`);

  const ai = new GoogleGenAI({ apiKey });
  const results = [];
  for (const img of brief.images) {
    const prompt = buildPrompt({
      concept: img.concept,
      composition: img.composition || "",
      extra: img.extra || "",
    });
    try {
      const res = await generateOne({ id: img.id, filename: img.filename, prompt, aspectRatio: img.aspectRatio || aspectRatio }, outDir, ai);
      results.push(res);
    } catch (err) {
      console.error(`  Error en ${img.id}: ${err?.message ?? err}`);
      results.push({ ok: false, id: img.id, error: err?.message ?? String(err) });
    }
  }

  const okCount = results.filter((r) => r.ok).length;
  console.log(`\n${okCount}/${results.length} generadas en ${outDir}`);

  if (okCount > 0) {
    console.log(`\nValidar dimensiones:`);
    console.log(`  node .claude/skills/ugc-content-creator/scripts/validate-spec.mjs --dir=${outDir} --platform=${platform}`);
  }

  const manifestPath = join(outDir, "manifest.json");
  await mkdir(outDir, { recursive: true });
  await writeFile(manifestPath, JSON.stringify({
    generated_at: new Date().toISOString(),
    concept,
    platform,
    aspectRatio,
    model: MODEL,
    brief_source: resolve(args.brief),
    results,
  }, null, 2));
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error("Fatal:", err?.message ?? err);
  process.exit(1);
});
