/**
 * Divide los dos MDs monolíticos de guiones (10-guiones-lanzamiento.md y
 * 20-guiones-lote-2.md) en 20 archivos individuales G01.md ... G20.md
 * para que cada tarjeta del admin abra SOLO su propio guion.
 *
 * Uso: npx tsx web/scripts/split-guiones.ts
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';

const REPO_ROOT = join(__dirname, '..', '..');
const WEB_CONTENT = join(REPO_ROOT, 'web', 'content', 'sistemas', 'contenido');

const SOURCES = [
  join(WEB_CONTENT, '10-guiones-lanzamiento.md'),
  join(WEB_CONTENT, '20-guiones-lote-2.md'),
];

const OUT_DIR = join(WEB_CONTENT, 'guiones');

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  let totalWritten = 0;

  for (const src of SOURCES) {
    const raw = await readFile(src, 'utf-8');

    // Split por "# GUION N — Titulo" o "# GUION N - Titulo"
    const blocks = raw
      .split(/(?=^# GUION \d+)/m)
      .filter((b) => /^# GUION/.test(b));

    for (const block of blocks) {
      const match = block.match(/^# GUION\s+(\d+)\s*[—-]\s*(.+?)$/m);
      if (!match) continue;

      const num = parseInt(match[1], 10);
      const slug = `G${num.toString().padStart(2, '0')}`;
      const title = match[2].trim();

      // Limpiar bloque: quitar separadores finales "---\n---"
      const cleaned = block
        .replace(/^# GUION \d+\s*[—-]\s*(.+?)$/m, `# ${slug} — $1`)
        .replace(/\n---\s*\n---\s*$/m, '\n')
        .trim();

      const frontmatter = [
        '---',
        `slug: ${slug}`,
        `title: "${title.replace(/"/g, '\\"')}"`,
        `source_file: ${src.replace(REPO_ROOT, '').replace(/\\/g, '/').replace(/^\//, '')}`,
        'category: guiones',
        '---',
        '',
      ].join('\n');

      const outPath = join(OUT_DIR, `${slug}.md`);
      await writeFile(outPath, frontmatter + cleaned + '\n', 'utf-8');
      console.log(`✓ ${slug}.md  —  ${title}`);
      totalWritten++;
    }
  }

  console.log(`\n${totalWritten} archivos escritos en ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
