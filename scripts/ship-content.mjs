#!/usr/bin/env node
// ship-content.mjs — Orquestador end-to-end del pipeline UGC Colombia.
//
// Pipeline (etapas numeradas):
//   0. Validar brief JSON
//   1. Generar PNGs base (Nanobanana via generate-social.mjs)
//   2. Visual QA (sub-agente ugc-visual-qa) → qa-report.json
//      Si hay fails → imprimir instrucciones para regenerar esos IDs. Pausa.
//   3. Copy overlay (sub-agente ugc-copy-overlay) → overlay-copy.json
//   4. Compose overlay (compose-overlay.mjs) → slide-XX-final.png
//   5. Caption (sub-agente ugc-caption-writer) → caption.md
//   6. Calendar (sub-agente ugc-calendar-publisher) → content/calendar/...
//
// Los sub-agentes se invocan mediante instrucciones claras que imprime el orquestador.
// Claude Code (el que corre este script) los dispara con la tool Agent.
//
// Uso:
//   node scripts/ship-content.mjs --brief=drafts/YYYYMMDD-slug-brief.json
//   node scripts/ship-content.mjs --brief=... --skip-generate  (si ya están los PNGs)
//   node scripts/ship-content.mjs --brief=... --from=3          (empieza desde etapa 3)
//
// Este script NO invoca directamente a Claude. Asume que el usuario lo ejecuta
// desde una sesión de Claude Code que puede delegar a sub-agentes. Cada etapa
// que requiere IA imprime un bloque claro que Claude Code intercepta.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUTPUT_BASE = join(REPO_ROOT, "web", "public", "brand", "social");

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

function runNode(script, args) {
  return new Promise((ok, ko) => {
    const child = spawn(process.execPath, [script, ...args], {
      stdio: "inherit",
      cwd: REPO_ROOT,
    });
    child.on("exit", (code) => {
      if (code === 0) ok();
      else ko(new Error(`${basename(script)} exited with code ${code}`));
    });
  });
}

function printStageHeader(n, title) {
  const bar = "━".repeat(60);
  console.log(`\n${bar}`);
  console.log(`ETAPA ${n} · ${title}`);
  console.log(bar);
}

function printAgentInvocation({ agent, input, output }) {
  console.log(`\n┌─ SUB-AGENTE REQUERIDO ─────────────────────────────`);
  console.log(`│ Agent: ${agent}`);
  console.log(`│ Input: ${input}`);
  console.log(`│ Output esperado: ${output}`);
  console.log(`└────────────────────────────────────────────────────\n`);
  console.log(`⏸  PAUSA — Claude Code debe invocar el sub-agente y luego reanudar.\n`);
  console.log(`Para reanudar desde la siguiente etapa:`);
  console.log(`   node scripts/ship-content.mjs --brief=${process.argv[2]?.split("=")[1]} --from=${CURRENT_STAGE + 1} --dir=${OUT_DIR}\n`);
}

let CURRENT_STAGE = 0;
let OUT_DIR = "";

async function main() {
  const args = parseArgs(process.argv);
  const from = parseInt(args.from || "0", 10);

  if (!args.brief) {
    console.error("Uso: --brief=drafts/YYYYMMDD-slug-brief.json [--from=N] [--skip-generate] [--dir=...]");
    process.exit(1);
  }

  const briefPath = resolve(args.brief);
  if (!existsSync(briefPath)) {
    console.error(`Brief no existe: ${briefPath}`);
    process.exit(1);
  }
  const brief = JSON.parse(await readFile(briefPath, "utf8"));

  const concept = brief.concept;
  const platform = brief.platform;
  const datePrefix = args.date || yyyymmdd();
  OUT_DIR = args.dir ? resolve(args.dir) : join(OUTPUT_BASE, `${datePrefix}-${concept}`);

  console.log(`\n🚀 UGC Colombia · Content Pipeline`);
  console.log(`Brief:    ${briefPath}`);
  console.log(`Concept:  ${concept}`);
  console.log(`Platform: ${platform}`);
  console.log(`Firma:    ${brief.firma || "(no especificada)"}`);
  console.log(`Pilar:    ${brief.pillar || "(no especificado)"}`);
  console.log(`Output:   ${OUT_DIR}`);
  console.log(`From:     etapa ${from}\n`);

  // ── ETAPA 1: Generación de PNGs base ──────────────────────────────
  if (from <= 1 && !args["skip-generate"]) {
    CURRENT_STAGE = 1;
    printStageHeader(1, "Generación de PNGs base (Nanobanana)");
    await runNode(
      join(REPO_ROOT, ".claude/skills/ugc-content-creator/scripts/generate-social.mjs"),
      [`--concept=${concept}`, `--platform=${platform}`, `--brief=${briefPath}`, `--date=${datePrefix}`]
    );
    console.log(`✓ PNGs generados en ${OUT_DIR}`);
  } else {
    console.log(`⏭  Etapa 1 saltada (from=${from} o --skip-generate).`);
  }

  // ── ETAPA 2: Visual QA ────────────────────────────────────────────
  if (from <= 2) {
    CURRENT_STAGE = 2;
    printStageHeader(2, "Visual QA (sub-agente ugc-visual-qa)");
    printAgentInvocation({
      agent: "ugc-visual-qa",
      input: `dir=${OUT_DIR}  brief=${briefPath}`,
      output: `${OUT_DIR}/qa-report.json`,
    });
    console.log(`Instrucción para Claude Code:`);
    console.log(`  Invoca el sub-agente 'ugc-visual-qa' con estas instrucciones:`);
    console.log(`    "Valida los PNGs en ${OUT_DIR} contra el brief ${briefPath}.`);
    console.log(`     Escribe qa-report.json siguiendo el formato del agente.`);
    console.log(`     Luego, si passed == total, reanuda con --from=3."`);
    return; // espera a que Claude Code dispare al agente y reinvoque el script
  }

  // Si se llega aquí con from>=3, significa que ya hay qa-report.json
  const qaPath = join(OUT_DIR, "qa-report.json");
  if (existsSync(qaPath)) {
    const qa = JSON.parse(await readFile(qaPath, "utf8"));
    console.log(`✓ QA report cargado: ${qa.passed}/${qa.total} pass`);
    if (qa.failed > 0) {
      console.log(`\n⚠  Hay ${qa.failed} slides failed. Revisar qa-report.json:`);
      for (const s of qa.slides.filter(x => x.verdict === "fail")) {
        console.log(`   - ${s.id}: ${s.notes}`);
      }
      console.log(`\nOpciones:`);
      console.log(`  a) Regenerar slides fail con prompts ajustados y volver a --from=2`);
      console.log(`  b) Continuar igual (--force) para seguir con overlay`);
      if (!args.force) {
        console.log(`\nDetenido. Usa --force para continuar.`);
        return;
      }
    }
  }

  // ── ETAPA 2.5: Layout analysis (image-aware) ──────────────────────
  if (from <= 2.5) {
    CURRENT_STAGE = 2.5;
    printStageHeader("2.5", "Layout analysis (sub-agente ugc-layout-architect)");
    printAgentInvocation({
      agent: "ugc-layout-architect",
      input: `dir=${OUT_DIR}`,
      output: `${OUT_DIR}/layout-plan.json`,
    });
    console.log(`Instrucción para Claude Code:`);
    console.log(`  Invoca 'ugc-layout-architect' con el dir ${OUT_DIR}.`);
    console.log(`  El agente leerá cada PNG con Read (vision) y decidirá posición, color,`);
    console.log(`  sombra, glow, scrim, tamaños y ubicación del logo por slide.`);
    console.log(`  Output: layout-plan.json. Luego reanuda con --from=3.`);
    return;
  }

  // ── ETAPA 3: Copy overlay ─────────────────────────────────────────
  if (from <= 3) {
    CURRENT_STAGE = 3;
    printStageHeader(3, "Copy overlay (sub-agente ugc-copy-overlay)");
    const layoutPath = join(OUT_DIR, "layout-plan.json");
    if (!existsSync(layoutPath)) {
      console.log(`⚠ No existe layout-plan.json. Ejecutando etapa 3 con defaults.`);
      console.log(`  (Para layout image-aware, correr etapa 2.5 con ugc-layout-architect primero.)`);
    } else {
      console.log(`✓ layout-plan.json detectado — copy se adaptará a decisiones de layout.`);
    }
    printAgentInvocation({
      agent: "ugc-copy-overlay",
      input: `dir=${OUT_DIR}  brief=${briefPath}  layout=${layoutPath}`,
      output: `${OUT_DIR}/overlay-copy.json`,
    });
    console.log(`Instrucción:`);
    console.log(`  Invoca 'ugc-copy-overlay' con brief ${briefPath}, dir ${OUT_DIR}`);
    console.log(`  y si existe layout-plan.json, adaptarse a sus posiciones/colores.`);
    console.log(`  Luego reanuda con --from=4.`);
    return;
  }

  // ── ETAPA 4: Compose overlay ──────────────────────────────────────
  if (from <= 4) {
    CURRENT_STAGE = 4;
    printStageHeader(4, "Compose overlay (sharp + resvg)");
    const overlayPath = join(OUT_DIR, "overlay-copy.json");
    if (!existsSync(overlayPath)) {
      console.error(`No existe ${overlayPath}. Ejecuta etapa 3 primero.`);
      process.exit(1);
    }
    await runNode(
      join(REPO_ROOT, "scripts/image-gen/compose-overlay.mjs"),
      [`--dir=${OUT_DIR}`]
    );
    console.log(`✓ Slides finales con overlay escritos.`);
  }

  // ── ETAPA 5: Caption ──────────────────────────────────────────────
  if (from <= 5) {
    CURRENT_STAGE = 5;
    printStageHeader(5, "Caption (sub-agente ugc-caption-writer)");
    printAgentInvocation({
      agent: "ugc-caption-writer",
      input: `dir=${OUT_DIR}`,
      output: `${OUT_DIR}/caption.md`,
    });
    console.log(`Instrucción:`);
    console.log(`  Invoca 'ugc-caption-writer' con el dir ${OUT_DIR}.`);
    console.log(`  Luego reanuda con --from=6.`);
    return;
  }

  // ── ETAPA 6: Calendar ─────────────────────────────────────────────
  if (from <= 6) {
    CURRENT_STAGE = 6;
    printStageHeader(6, "Calendar publisher (sub-agente ugc-calendar-publisher)");
    printAgentInvocation({
      agent: "ugc-calendar-publisher",
      input: `dir=${OUT_DIR}`,
      output: `content/calendar/YYYY-MM/YYYYMMDD-${concept}.md`,
    });
    console.log(`Instrucción:`);
    console.log(`  Invoca 'ugc-calendar-publisher' con el dir ${OUT_DIR}.`);
    console.log(`  Este es el paso final — al terminar, todo está listo para Tanya.`);
    return;
  }

  // ── FINAL ─────────────────────────────────────────────────────────
  console.log(`\n🎉 Pipeline completo. Entregable:\n`);
  console.log(`📁 ${OUT_DIR}/`);
  console.log(`   ├── slide-01…10-final.png   (PNGs con overlay + logo)`);
  console.log(`   ├── raw/slide-01…10.png     (backup sin overlay)`);
  console.log(`   ├── caption.md              (caption + hashtags)`);
  console.log(`   ├── manifest.json           (generación Nanobanana)`);
  console.log(`   ├── qa-report.json          (validación visual)`);
  console.log(`   ├── layout-plan.json        (análisis image-aware por slide)`);
  console.log(`   ├── overlay-copy.json       (fuente de textos)`);
  console.log(`   └── compose-report.json     (resultado compositor)\n`);
  console.log(`📅 Entry de calendario en content/calendar/YYYY-MM/`);
  console.log(`\nEntregable listo para Tanya ✨`);
}

main().catch((err) => {
  console.error("Fatal:", err?.message ?? err);
  process.exit(1);
});
