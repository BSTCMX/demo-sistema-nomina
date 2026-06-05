import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../output/screenshots');
const baseUrl = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173/demo-sistema-nomina/';

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const shots = [
  { name: '01_vista_pc', width: 1280, height: 900 },
  { name: '02_vista_tablet', width: 768, height: 1024, rol: 'Contador' },
  { name: '03_calculos_empleado', width: 1280, height: 900, selectFirst: true },
];

for (const shot of shots) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  if (shot.rol) {
    await page.locator('#rol-usuario').selectOption(shot.rol);
  }
  if (shot.selectFirst) {
    await page.locator('tbody tr').first().click();
  }
  await page.screenshot({ path: path.join(outDir, `${shot.name}.png`), fullPage: true });
  await page.close();
}

await browser.close();
console.log('Capturas guardadas en', outDir);
