const { mdToPdf } = require('md-to-pdf');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const PACKS_DIR = path.join(ROOT, 'content', 'viralidad', 'packs');
const VIRALIDAD_DIR = path.join(ROOT, 'content', 'viralidad');
const OUT_DIR = path.join(ROOT, 'pdfs', 'viralidad');
const CONSOLIDATED_DIR = path.join(PACKS_DIR, '_consolidated');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(CONSOLIDATED_DIR)) fs.mkdirSync(CONSOLIDATED_DIR, { recursive: true });

// Define consolidation groups
const packs = {
  'PACK-VIRAL-ALEXANDER': [
    'PACK-VIRAL-ALEXANDER.md',
    'PACK-VIRAL-ALEXANDER-P1.md',
    'PACK-VIRAL-ALEXANDER-P2.md',
    'PACK-VIRAL-ALEXANDER-P3.md',
    'PACK-VIRAL-ALEXANDER-P4.md',
    'PACK-VIRAL-ALEXANDER-P5.md',
  ],
  'PACK-VIRAL-DIANA': [
    'PACK-VIRAL-DIANA-P1.md',
    'PACK-VIRAL-DIANA-P1-G14-25.md',
    'PACK-VIRAL-DIANA-P1-CARRUSELES.md',
    'PACK-VIRAL-DIANA-P2.md',
  ],
  'PACK-VIRAL-TANYA': [
    'PACK-VIRAL-TANYA.md',
    'PACK-VIRAL-TANYA-P2.md',
  ],
  'PACK-VIRAL-SAMUEL': [
    'PACK-VIRAL-SAMUEL.md',
    'PACK-VIRAL-SAMUEL-parte1.md',
    'PACK-VIRAL-SAMUEL-parte2.md',
    'PACK-VIRAL-SAMUEL-parte3.md',
    'PACK-VIRAL-SAMUEL-parte4.md',
  ],
  'PACK-VIRAL-BRIAN': [
    'PACK-VIRAL-BRIAN-P1.md',
    'PACK-VIRAL-BRIAN-P2.md',
  ],
};

// Additional standalone files to convert
const standalone = [
  { src: path.join(VIRALIDAD_DIR, '00-modelo-maestro-viralidad.md'), name: '00-MODELO-MAESTRO-VIRALIDAD' },
  { src: path.join(VIRALIDAD_DIR, '01-benchmark-referentes-virales.md'), name: '01-BENCHMARK-REFERENTES-VIRALES' },
  { src: path.join(VIRALIDAD_DIR, '02-calendario-julio-2026.md'), name: '02-CALENDARIO-JULIO-2026' },
  { src: path.join(VIRALIDAD_DIR, '02-calendario-agosto-2026.md'), name: '03-CALENDARIO-AGOSTO-2026' },
  { src: path.join(VIRALIDAD_DIR, '02-calendario-septiembre-2026.md'), name: '04-CALENDARIO-SEPTIEMBRE-2026' },
];

const pdfOptions = {
  css: `
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 10px;
      line-height: 1.55;
      color: #1a1a1a;
      max-width: 100%;
    }
    h1 {
      color: #0A0A0A;
      border-bottom: 3px solid #FFD60A;
      padding-bottom: 8px;
      font-size: 22px;
      page-break-before: always;
    }
    h1:first-of-type { page-break-before: auto; }
    h2 {
      color: #1a1a1a;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 4px;
      font-size: 16px;
      margin-top: 20px;
    }
    h3 { color: #333; font-size: 13px; margin-top: 16px; }
    h4 { color: #444; font-size: 11px; }
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 9px;
      margin: 10px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 5px 7px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background-color: #0A0A0A;
      color: #FFD60A;
      font-weight: 600;
    }
    tr:nth-child(even) { background-color: #f9f9f9; }
    code {
      background: #f4f4f4;
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 9px;
    }
    pre {
      background: #f4f4f4;
      padding: 10px;
      border-radius: 4px;
      font-size: 9px;
      overflow-x: auto;
      white-space: pre-wrap;
    }
    blockquote {
      border-left: 4px solid #FFD60A;
      margin: 10px 0;
      padding: 6px 14px;
      background: #fffdf0;
    }
    hr {
      border: none;
      border-top: 1px solid #e5e5e5;
      margin: 16px 0;
    }
    a { color: #2563eb; }
    strong { color: #0A0A0A; }
    ul, ol { padding-left: 20px; }
  `,
  pdf_options: {
    format: 'A4',
    margin: {
      top: '18mm',
      bottom: '18mm',
      left: '14mm',
      right: '14mm',
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:7px;color:#999;width:100%;text-align:center;margin-top:4mm;">UGC Colombia — Modelo de Viralidad</div>',
    footerTemplate: '<div style="font-size:7px;color:#999;width:100%;text-align:center;margin-bottom:4mm;">Pagina <span class="pageNumber"></span> de <span class="totalPages"></span> | Uso interno | 2026-04-11</div>',
  },
};

async function consolidatePack(name, files) {
  const parts = [];
  for (const file of files) {
    const fullPath = path.join(PACKS_DIR, file);
    if (fs.existsSync(fullPath)) {
      parts.push(fs.readFileSync(fullPath, 'utf-8'));
    }
  }
  const consolidated = parts.join('\n\n---\n\n');
  const outPath = path.join(CONSOLIDATED_DIR, `${name}.md`);
  fs.writeFileSync(outPath, consolidated, 'utf-8');
  return outPath;
}

async function toPdf(mdPath, pdfName) {
  const outputPath = path.join(OUT_DIR, `${pdfName}.pdf`);
  try {
    const pdf = await mdToPdf(
      { path: mdPath },
      { ...pdfOptions, dest: outputPath }
    );
    if (pdf) {
      console.log(`OK: ${pdfName}.pdf`);
    }
  } catch (err) {
    console.error(`ERROR: ${pdfName} -> ${err.message}`);
  }
}

async function main() {
  console.log('=== Generando PDFs de Viralidad ===\n');

  // 1. Consolidate + convert packs
  for (const [name, files] of Object.entries(packs)) {
    console.log(`\nConsolidando ${name}...`);
    const consolidated = await consolidatePack(name, files);
    await toPdf(consolidated, name);
  }

  // 2. Convert standalone documents
  console.log('\n=== Documentos base ===');
  for (const doc of standalone) {
    if (fs.existsSync(doc.src)) {
      await toPdf(doc.src, doc.name);
    } else {
      console.log(`SKIP: ${doc.name} no encontrado`);
    }
  }

  console.log('\n=== PDFs generados en pdfs/viralidad/ ===');
}

main();
