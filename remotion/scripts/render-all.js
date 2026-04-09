/**
 * render-all.js
 * Renderiza todos los Reels de lanzamiento en secuencia
 *
 * Uso:
 *   node scripts/render-all.js
 *   node scripts/render-all.js --only=1,5,10
 *   node scripts/render-all.js --format=reels
 *   node scripts/render-all.js --quality=high
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ─── Composiciones a renderizar ───────────────────────────────────────────

const REELS = [
  { id: 1,  compositionId: "Reel-G01-El-problema-con-tu-UGC",          filename: "g01-el-problema-con-tu-ugc" },
  { id: 2,  compositionId: "Reel-G02-Por-qu--tus-ads-se-ven-b",         filename: "g02-ads-se-ven-bien-no-convierten" },
  { id: 3,  compositionId: "Reel-G03-3-tipos-de-video-que-s--c",        filename: "g03-3-tipos-video-convierten" },
  { id: 4,  compositionId: "Reel-G04-Dejen-de-contratar-influen",       filename: "g04-dejen-contratar-influencers" },
  { id: 5,  compositionId: "Reel-G05-UGC-de--800-que-gener--",         filename: "g05-ugc-800-genero-12000" },
  { id: 6,  compositionId: "Reel-G06-De-1-2x-a-3-4x-ROAS-en-6",       filename: "g06-1.2x-a-3.4x-roas-60-dias" },
  { id: 7,  compositionId: "Reel-G07-Lo-que-pasa-antes-de-grab",       filename: "g07-lo-que-pasa-antes-de-grabar" },
  { id: 8,  compositionId: "Reel-G08-Dirigiendo-un-creator-en-",       filename: "g08-dirigiendo-creator-bogota" },
  { id: 9,  compositionId: "Reel-G09-La-realidad-del-UGC-barato",      filename: "g09-realidad-ugc-barato" },
  { id: 10, compositionId: "Reel-G10-Qu--hace-diferente-UGC-Col",      filename: "g10-que-hace-diferente-ugc-colombia" },
];

// ─── Parse args ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const onlyArg = args.find((a) => a.startsWith("--only="));
const qualityArg = args.find((a) => a.startsWith("--quality="));

const onlyIds = onlyArg
  ? onlyArg.replace("--only=", "").split(",").map(Number)
  : null;

const isHighQuality = qualityArg?.includes("high");

// ─── Flags de render ──────────────────────────────────────────────────────

const RENDER_FLAGS = [
  "--codec=h264",
  "--pixel-format=yuv420p",
  `--jpeg-quality=${isHighQuality ? 98 : 90}`,
  "--log=info",
].join(" ");

// ─── Output dir ───────────────────────────────────────────────────────────

const outDir = path.resolve(__dirname, "../out/reels");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// ─── Main ─────────────────────────────────────────────────────────────────

function main() {
  const toRender = onlyIds
    ? REELS.filter((r) => onlyIds.includes(r.id))
    : REELS;

  console.log(`Renderizando ${toRender.length} reels...`);
  console.log(`Output: ${outDir}`);
  console.log(`Calidad: ${isHighQuality ? "alta" : "estándar"}`);
  console.log("─".repeat(50));

  const results = { ok: [], failed: [] };

  for (const reel of toRender) {
    const outputFile = path.join(outDir, `${reel.filename}.mp4`);
    const audioFile = path.resolve(
      __dirname,
      `../public/audio/g${String(reel.id).padStart(2, "0")}-voiceover.mp3`
    );

    // Advertir si el audio no existe
    if (!fs.existsSync(audioFile)) {
      console.warn(
        `[G${reel.id}] ADVERTENCIA: Audio no encontrado en ${audioFile}`
      );
      console.warn(`           Genera con: npm run generate:voiceovers -- --only=${reel.id}`);
    }

    console.log(`[G${reel.id}] Renderizando: ${reel.filename}`);

    const command = [
      "npx remotion render",
      `"${reel.compositionId}"`,
      `"${outputFile}"`,
      RENDER_FLAGS,
    ].join(" ");

    const startTime = Date.now();

    try {
      execSync(command, {
        stdio: "inherit",
        cwd: path.resolve(__dirname, ".."),
      });

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const size = fs.existsSync(outputFile)
        ? (fs.statSync(outputFile).size / 1024 / 1024).toFixed(1)
        : "?";

      console.log(`[G${reel.id}] OK → ${reel.filename}.mp4 (${size} MB, ${elapsed}s)`);
      results.ok.push(reel.id);
    } catch (err) {
      console.error(`[G${reel.id}] ERROR al renderizar`);
      results.failed.push(reel.id);
    }
  }

  console.log("─".repeat(50));
  console.log(`Completado: ${results.ok.length} OK, ${results.failed.length} fallidos`);

  if (results.failed.length > 0) {
    console.log(`Fallidos: G${results.failed.join(", G")}`);
    console.log(`Re-intentar: node scripts/render-all.js --only=${results.failed.join(",")}`);
  }

  if (results.ok.length > 0) {
    console.log(`Videos en: ${outDir}`);
  }
}

main();
