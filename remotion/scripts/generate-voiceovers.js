/**
 * generate-voiceovers.js
 * Genera los archivos de audio MP3 para los 10 guiones
 * usando la API de ElevenLabs con la voz "Cristian Sanchez"
 *
 * Uso:
 *   ELEVENLABS_API_KEY=tu_key node scripts/generate-voiceovers.js
 *   ELEVENLABS_API_KEY=tu_key node scripts/generate-voiceovers.js --only=1,5
 *   ELEVENLABS_API_KEY=tu_key node scripts/generate-voiceovers.js --only=1
 *
 * Output: public/audio/g01-voiceover.mp3 ... g10-voiceover.mp3
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

// ─── Configuración ElevenLabs ─────────────────────────────────────────────

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_NAME = "Cristian Sanchez";
const MODEL_ID = "eleven_multilingual_v2";

// Voice settings para acento paisa colombiano
const VOICE_SETTINGS = {
  stability: 0.55,
  similarity_boost: 0.80,
  style: 0.20,
  use_speaker_boost: true,
};

// ─── Scripts importados ───────────────────────────────────────────────────
// Se usa require dinámico sobre el archivo compilado, o se lee directamente
// del JSON de datos. Aquí cargamos desde el source .ts usando tsx si está disponible.

async function getScripts() {
  try {
    // Intenta cargar con tsx/ts-node si está disponible
    const { reelScripts } = await import("../src/data/scripts.ts");
    return reelScripts;
  } catch {
    // Fallback: cargar el voiceover text directamente parseando el archivo
    console.warn("No se pudo importar TypeScript directamente. Usa: npx tsx scripts/generate-voiceovers.js");
    process.exit(1);
  }
}

// ─── Buscar Voice ID por nombre ──────────────────────────────────────────

async function findVoiceId(apiKey, voiceName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.elevenlabs.io",
      path: "/v1/voices",
      method: "GET",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const voice = json.voices?.find(
            (v) => v.name.toLowerCase() === voiceName.toLowerCase()
          );
          if (!voice) {
            console.error(`Voz "${voiceName}" no encontrada. Voces disponibles:`);
            json.voices?.forEach((v) => console.log(`  - ${v.name} (${v.voice_id})`));
            reject(new Error(`Voz no encontrada: ${voiceName}`));
          } else {
            console.log(`Voz encontrada: ${voice.name} → ${voice.voice_id}`);
            resolve(voice.voice_id);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

// ─── Generar audio para un script ────────────────────────────────────────

async function generateAudio(apiKey, voiceId, text, outputPath) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: VOICE_SETTINGS,
      output_format: "mp3_44100_128",
    });

    const options = {
      hostname: "api.elevenlabs.io",
      path: `/v1/text-to-speech/${voiceId}`,
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errData = "";
        res.on("data", (c) => { errData += c; });
        res.on("end", () => reject(new Error(`ElevenLabs error ${res.statusCode}: ${errData}`)));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close();
        resolve(outputPath);
      });
      fileStream.on("error", reject);
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  if (!ELEVENLABS_API_KEY) {
    console.error("Error: ELEVENLABS_API_KEY no definida.");
    console.error("Uso: ELEVENLABS_API_KEY=tu_key node scripts/generate-voiceovers.js");
    process.exit(1);
  }

  // Filtro --only=1,5
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const onlyIds = onlyArg
    ? onlyArg.replace("--only=", "").split(",").map(Number)
    : null;

  // Directorio de salida
  const outputDir = path.resolve(__dirname, "../public/audio");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Iniciando generación de voiceovers...");
  console.log(`Voz: ${VOICE_NAME}`);
  console.log(`Modelo: ${MODEL_ID}`);
  console.log(`Output: ${outputDir}`);
  console.log("─".repeat(50));

  // Cargar scripts
  const scripts = await getScripts();
  const filtered = onlyIds
    ? scripts.filter((s) => onlyIds.includes(s.id))
    : scripts;

  // Buscar voice ID
  const voiceId = await findVoiceId(ELEVENLABS_API_KEY, VOICE_NAME);

  // Generar uno por uno (respetar rate limits de ElevenLabs)
  for (const script of filtered) {
    const filename = `g${String(script.id).padStart(2, "0")}-voiceover.mp3`;
    const outputPath = path.join(outputDir, filename);

    // Skip si ya existe (evitar re-generar y gastar créditos)
    if (fs.existsSync(outputPath)) {
      console.log(`[G${script.id}] Saltando — ya existe: ${filename}`);
      continue;
    }

    console.log(`[G${script.id}] Generando: "${script.title}"`);
    console.log(`         Caracteres: ${script.voiceoverText.length}`);

    try {
      await generateAudio(ELEVENLABS_API_KEY, voiceId, script.voiceoverText, outputPath);
      console.log(`[G${script.id}] OK → ${filename}`);

      // Pausa entre requests para no saturar la API
      if (filtered.indexOf(script) < filtered.length - 1) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    } catch (err) {
      console.error(`[G${script.id}] ERROR: ${err.message}`);
    }
  }

  console.log("─".repeat(50));
  console.log("Voiceovers generados. Coloca los MP3 en public/audio/");
  console.log("Luego renderiza con: npm run render:g01");
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
