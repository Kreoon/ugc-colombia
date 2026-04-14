// Genera el Manual de Marca desde HTML usando Puppeteer (bundled con md-to-pdf)
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const HTML_SRC = path.join(ROOT, 'brand', 'manual-marca.html');
const OUT_PDF = path.join(ROOT, 'pdfs', 'MANUAL-DE-MARCA.pdf');

async function generate() {
  // Reuse puppeteer from md-to-pdf
  const puppeteerPath = require.resolve('puppeteer', { paths: [ROOT] });
  const puppeteer = require(puppeteerPath);

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const htmlUrl = 'file:///' + HTML_SRC.replace(/\\/g, '/');
  console.log('Loading:', htmlUrl);
  await page.goto(htmlUrl, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait for fonts
  await page.evaluateHandle('document.fonts.ready');

  console.log('Generating PDF...');
  await page.pdf({
    path: OUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true
  });

  await browser.close();
  console.log('OK:', OUT_PDF);
  console.log('Size:', (fs.statSync(OUT_PDF).size / 1024).toFixed(0) + ' KB');
}

generate().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
