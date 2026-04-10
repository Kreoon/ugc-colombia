#!/usr/bin/env node
// Generador de imágenes brandeadas con Gemini 2.5 Flash Image ("nano banana")
// Uso:
//   node generate.mjs casos          -> genera todos los prompts en prompts/casos.mjs
//   node generate.mjs casos caso-skincare  -> solo uno
//
// Requiere GEMINI_API_KEY en ../../web/.env.local (o variable de entorno)

import { GoogleGenAI } from "@google/genai";
import { config as loadEnv } from "dotenv";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const WEB_ENV = join(REPO_ROOT, "web", ".env.local");
const OUTPUT_BASE = join(REPO_ROOT, "web", "public", "brand");

loadEnv({ path: WEB_ENV });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ Falta GEMINI_API_KEY en web/.env.local");
  process.exit(1);
}

const MODEL = "gemini-2.5-flash-image";

const ai = new GoogleGenAI({ apiKey: API_KEY });

async function generateOne({ id, filename, prompt, aspectRatio }, outDir) {
  console.log(`\n🎨 [${id}] Generando con ${MODEL}...`);
  console.log(`   Aspect: ${aspectRatio}`);

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
    console.error(`   ❌ Sin imagen en la respuesta para ${id}`);
    console.error(JSON.stringify(response, null, 2).slice(0, 800));
    return false;
  }

  const buffer = Buffer.from(imagePart.inlineData.data, "base64");
  const outPath = join(outDir, filename);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, buffer);
  console.log(`   ✅ ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
  return true;
}

async function runBatch(name, onlyId) {
  const mod = await import(`./prompts/${name}.mjs`);
  const list = Object.values(mod).find((v) => Array.isArray(v));
  if (!list) throw new Error(`prompts/${name}.mjs no exporta un array`);

  const targets = onlyId ? list.filter((p) => p.id === onlyId) : list;
  if (targets.length === 0) {
    console.error(`No hay prompts que coincidan con "${onlyId}"`);
    process.exit(1);
  }

  const outDir = join(OUTPUT_BASE, name);
  console.log(`📦 Batch "${name}" — ${targets.length} imagen(es) → ${outDir}`);
  let ok = 0;
  for (const t of targets) {
    try {
      if (await generateOne(t, outDir)) ok++;
    } catch (err) {
      console.error(`   ❌ Error en ${t.id}:`, err?.message ?? err);
    }
  }
  console.log(`\n✅ ${ok}/${targets.length} generadas en ${outDir}`);
}

const [, , batchName, onlyId] = process.argv;
if (!batchName) {
  console.log("Uso: node generate.mjs <batch> [id]\nBatches: casos");
  process.exit(0);
}

runBatch(batchName, onlyId).catch((e) => {
  console.error("❌ Fatal:", e);
  process.exit(1);
});
