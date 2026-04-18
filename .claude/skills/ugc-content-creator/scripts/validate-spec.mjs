#!/usr/bin/env node
// validate-spec.mjs — valida dimensiones y existencia de PNGs generados.
// Lee el header PNG (primeros 24 bytes) para extraer width/height sin dependencias.
//
// Uso:
//   node .claude/skills/ugc-content-creator/scripts/validate-spec.mjs \
//     --dir=web/public/brand/social/20260416-hooks-reels \
//     --platform=ig-carousel
//
// Sale con codigo 0 si todo OK, codigo 1 si hay mismatch.

import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

// Spec por plataforma: aspect ratio objetivo + tamano minimo aceptable para publicar.
// Nanobanana (Gemini 2.5 Flash Image) entrega a resolucion nativa segun aspectRatio,
// no siempre en las dimensiones "ideales" de cada plataforma. Validamos aspect + minimo.
const PLATFORM_SPECS = {
  "ig-carousel":   { aspectRatio: 4/5,     minWidth: 600,  minHeight: 750  },
  "ig-feed":       { aspectRatio: 4/5,     minWidth: 600,  minHeight: 750  },
  "ig-square":     { aspectRatio: 1/1,     minWidth: 600,  minHeight: 600  },
  "reel":          { aspectRatio: 9/16,    minWidth: 720,  minHeight: 1280 },
  "story":         { aspectRatio: 9/16,    minWidth: 720,  minHeight: 1280 },
  "tiktok":        { aspectRatio: 9/16,    minWidth: 720,  minHeight: 1280 },
  "youtube-short": { aspectRatio: 9/16,    minWidth: 720,  minHeight: 1280 },
  "youtube-thumb": { aspectRatio: 16/9,    minWidth: 1280, minHeight: 720  },
  "linkedin":      { aspectRatio: 1200/628, minWidth: 896, minHeight: 468  },
  "linkedin-pdf":  { aspectRatio: 4/5,     minWidth: 600,  minHeight: 750  },
  "whatsapp":      { aspectRatio: 1/1,     minWidth: 600,  minHeight: 600  },
  "x-post":        { aspectRatio: 16/9,    minWidth: 1200, minHeight: 675  },
  "newsletter":    { aspectRatio: 2/1,     minWidth: 1000, minHeight: 500  },
};

// Gemini 2.5 Flash Image entrega aspect ratios "cercanos" al solicitado, no exactos.
// Para 4:5 (0.80) devuelve 896x1152 (0.778, delta 2.78%). Para 16:9 (1.778) devuelve
// tipicamente 1568x896 (1.750, delta 1.57%). Tolerancia 3% cubre su comportamiento real.
const ASPECT_TOLERANCE = 0.03;

function parseArgs(argv) {
  const args = {};
  for (const raw of argv.slice(2)) {
    const m = raw.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

async function readPngDimensions(path) {
  const buf = await readFile(path);
  if (buf.length < 24) {
    throw new Error("archivo demasiado pequeno para ser PNG");
  }
  const sig = buf.slice(0, 8);
  const expected = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!sig.equals(expected)) {
    throw new Error("no es un PNG valido (firma invalida)");
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.dir || !args.platform) {
    console.error("Uso: --dir=<path> --platform=<ig-carousel|reel|story|...>");
    console.error(`Plataformas validas: ${Object.keys(PLATFORM_SPECS).join(", ")}`);
    process.exit(1);
  }

  const spec = PLATFORM_SPECS[args.platform];
  if (!spec) {
    console.error(`Plataforma desconocida: ${args.platform}`);
    process.exit(1);
  }

  const dir = resolve(args.dir);
  let entries;
  try {
    entries = await readdir(dir);
  } catch (err) {
    console.error(`No pude leer el directorio: ${dir}`);
    console.error(`Causa: ${err?.message ?? err}`);
    process.exit(1);
  }

  const pngs = entries.filter((e) => e.toLowerCase().endsWith(".png"));
  if (pngs.length === 0) {
    console.error(`No hay PNGs en ${dir}`);
    process.exit(1);
  }

  console.log(`Validando ${pngs.length} imagen(es) en ${dir}`);
  console.log(`Spec: aspect ${spec.aspectRatio.toFixed(4)} (tolerancia ${(ASPECT_TOLERANCE * 100).toFixed(0)}%) · minimo ${spec.minWidth}x${spec.minHeight}\n`);

  let ok = 0;
  let failed = [];

  for (const name of pngs) {
    const path = join(dir, name);
    try {
      const { width, height } = await readPngDimensions(path);
      const actualAspect = width / height;
      const aspectDelta = Math.abs(actualAspect - spec.aspectRatio) / spec.aspectRatio;
      const aspectOk = aspectDelta <= ASPECT_TOLERANCE;
      const sizeOk = width >= spec.minWidth && height >= spec.minHeight;

      if (aspectOk && sizeOk) {
        console.log(`  OK   ${name} — ${width}x${height} (aspect ${actualAspect.toFixed(4)})`);
        ok++;
      } else {
        const reasons = [];
        if (!aspectOk) reasons.push(`aspect ${actualAspect.toFixed(4)} vs ${spec.aspectRatio.toFixed(4)} (delta ${(aspectDelta * 100).toFixed(2)}%)`);
        if (!sizeOk) reasons.push(`tamano ${width}x${height} < minimo ${spec.minWidth}x${spec.minHeight}`);
        console.log(`  FAIL ${name} — ${reasons.join(" · ")}`);
        failed.push({ name, width, height, reasons });
      }
    } catch (err) {
      console.log(`  ERROR ${name} — ${err?.message ?? err}`);
      failed.push({ name, error: err?.message ?? String(err) });
    }
  }

  console.log(`\nResultado: ${ok}/${pngs.length} validas`);
  if (failed.length > 0) {
    console.log(`\nFallas:`);
    for (const f of failed) {
      console.log(`  - ${f.name}: ${f.error || `${f.width}x${f.height}`}`);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal:", err?.message ?? err);
  process.exit(1);
});
