const { mdToPdf } = require('md-to-pdf');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'pdfs');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const files = [
  '00-INDICE-GENERAL.md',
  '01-PACK-ALEXANDER-CEO.md',
  '02-PACK-DIANA-CREATORS.md',
  '03-PACK-BRIAN-FINANCE.md',
  '04-PACK-TANYA-COMMUNITY.md',
  '05-PACK-SAMUEL-TECH.md',
  'EXECUTIVE-SUMMARY.md',
];

const pdfOptions = {
  stylesheet: [],
  css: `
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11px;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 100%;
    }
    h1 {
      color: #0A0A0A;
      border-bottom: 3px solid #FFD60A;
      padding-bottom: 8px;
      font-size: 24px;
    }
    h2 {
      color: #1a1a1a;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 4px;
      font-size: 18px;
    }
    h3 { color: #333; font-size: 14px; }
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 10px;
      margin: 12px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 6px 8px;
      text-align: left;
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
      font-size: 10px;
    }
    pre {
      background: #f4f4f4;
      padding: 12px;
      border-radius: 4px;
      font-size: 10px;
      overflow-x: auto;
    }
    blockquote {
      border-left: 4px solid #FFD60A;
      margin: 12px 0;
      padding: 8px 16px;
      background: #fffdf0;
    }
    hr {
      border: none;
      border-top: 1px solid #e5e5e5;
      margin: 20px 0;
    }
    a { color: #2563eb; }
    strong { color: #0A0A0A; }
  `,
  pdf_options: {
    format: 'A4',
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '15mm',
      right: '15mm',
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:8px;color:#999;width:100%;text-align:center;margin-top:5mm;">UGC Colombia — Documento Operativo</div>',
    footerTemplate: '<div style="font-size:8px;color:#999;width:100%;text-align:center;margin-bottom:5mm;">Pagina <span class="pageNumber"></span> de <span class="totalPages"></span> | ugccolombia.co | Fecha de corte: 2026-04-09</div>',
  },
};

async function generateAll() {
  console.log('Generando PDFs...\n');

  for (const file of files) {
    const inputPath = path.join(ROOT, file);
    if (!fs.existsSync(inputPath)) {
      console.log(`SKIP: ${file} no encontrado`);
      continue;
    }

    const outputPath = path.join(OUT_DIR, file.replace('.md', '.pdf'));
    try {
      const pdf = await mdToPdf(
        { path: inputPath },
        {
          ...pdfOptions,
          dest: outputPath,
        }
      );
      if (pdf) {
        console.log(`OK: ${file} -> pdfs/${file.replace('.md', '.pdf')}`);
      }
    } catch (err) {
      console.error(`ERROR: ${file} -> ${err.message}`);
    }
  }

  console.log('\nPDFs generados en carpeta /pdfs/');
}

generateAll();
