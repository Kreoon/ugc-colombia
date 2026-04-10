# image-gen — Generador de imágenes brandeadas

Usa **Gemini 2.5 Flash Image** (alias *nano banana*) con un sistema de prompts anclado al branding de UGC Colombia.

## Setup

```bash
cd scripts/image-gen
npm install
```

Requiere `GEMINI_API_KEY` en `web/.env.local` (el script lo carga automáticamente).

## Uso

```bash
# Generar todos los prompts de un batch
npm run casos

# Generar solo uno
node generate.mjs casos caso-skincare
```

Las imágenes salen en `web/public/brand/casos/`.

## Arquitectura

- **`brand-system.mjs`** — base de marca + negative prompt + `buildPrompt()`. Toda imagen nueva parte de aquí para mantener consistencia editorial.
- **`prompts/<batch>.mjs`** — un archivo por colección de prompts (`casos`, `hero`, `og`, etc.). Cada entrada exporta `{ id, filename, aspectRatio, prompt }`.
- **`generate.mjs`** — runner. Llama al modelo, extrae el `inlineData` base64 y lo escribe a disco.

## Añadir un batch nuevo

1. Crea `prompts/<nombre>.mjs` exportando un array.
2. Cada item usa `buildPrompt({ concept, composition, extra })` para heredar la marca.
3. Corre `node generate.mjs <nombre>`.
