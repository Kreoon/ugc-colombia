#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import process from 'node:process';

const envPath = process.argv[2] ?? '.env';
const cfgPath = path.join(os.homedir(), '.claude.json');

if (!fs.existsSync(envPath)) {
  console.error(`No se encontró ${envPath}`);
  process.exit(1);
}

const match = fs.readFileSync(envPath, 'utf8').match(/^\s*STRIPE_SECRET_KEY\s*=\s*(.+?)\s*$/m);
if (!match) {
  console.error(`STRIPE_SECRET_KEY no encontrada en ${envPath}`);
  process.exit(1);
}
const key = match[1].trim().replace(/^["']|["']$/g, '');

if (!fs.existsSync(cfgPath)) {
  console.error(`No se encontró ${cfgPath}`);
  process.exit(1);
}

fs.copyFileSync(cfgPath, `${cfgPath}.bak`);
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));

let hits = 0;
const walk = (obj) => {
  if (!obj || typeof obj !== 'object') return;
  if (obj.mcpServers?.stripe?.args) {
    obj.mcpServers.stripe.args = obj.mcpServers.stripe.args.map((a) =>
      typeof a === 'string' && a.startsWith('--api-key=') ? `--api-key=${key}` : a
    );
    hits++;
  }
  for (const v of Object.values(obj)) walk(v);
};
walk(cfg);

if (!hits) {
  console.error(`MCP "stripe" no encontrado en ${cfgPath}`);
  process.exit(1);
}

fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
console.log(`OK: stripe key actualizada en ${hits} entrada(s).`);
console.log(`Backup: ${cfgPath}.bak`);
console.log(`Siguiente paso: ejecuta "claude mcp list | grep stripe" y reinicia la sesión.`);
