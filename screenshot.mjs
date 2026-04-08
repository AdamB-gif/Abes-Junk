import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

// Auto-increment filename
const existing = fs.readdirSync(screenshotDir).filter(f => f.endsWith('.png'));
const nums = existing.map(f => {
  const m = f.match(/^screenshot-(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
});
const next = nums.length ? Math.max(...nums) + 1 : 1;
const filename = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`;
const filepath = path.join(screenshotDir, filename);

const PUPPETEER_CACHE = 'C:/Users/nateh/.cache/puppeteer';
const executablePath = (() => {
  // Find Chrome in puppeteer cache
  const base = 'C:/Users/useri/.cache/puppeteer';
  for (const dir of [base, PUPPETEER_CACHE]) {
    if (fs.existsSync(dir)) {
      const walk = (d, depth = 0) => {
        if (depth > 4) return null;
        for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
          const full = path.join(d, entry.name);
          if (entry.isFile() && entry.name.toLowerCase().includes('chrome') && entry.name.endsWith('.exe')) return full;
          if (entry.isDirectory()) { const r = walk(full, depth + 1); if (r) return r; }
        }
        return null;
      };
      const found = walk(dir);
      if (found) return found;
    }
  }
  return null;
})();

const launchOpts = { headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
if (executablePath) launchOpts.executablePath = executablePath;

(async () => {
  const browser = await puppeteer.launch(launchOpts);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: filepath, fullPage: true });
  await browser.close();
  console.log(`Screenshot saved: ${filepath}`);
})();
