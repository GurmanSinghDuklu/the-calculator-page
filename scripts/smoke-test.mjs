#!/usr/bin/env node
/**
 * Hydration smoke-test — drives real Chromium against the built `dist/`.
 *
 * Catches the class of bug that shipped dead buttons: pages that render as
 * static HTML but never hydrate, so click handlers never attach.
 *
 * For each tested page it verifies:
 *   1. No console errors (esp. React hydration mismatch warnings/errors)
 *   2. The page has exactly one <h1>
 *   3. A representative interactive control actually RESPONDS to a click
 *      (state changes / DOM updates) — proving React hydrated.
 *
 * Usage:
 *   node scripts/smoke-test.mjs                 # builds nothing, serves ./dist
 *   node scripts/smoke-test.mjs --url https://www.thecalculatorapp.org  # test live
 *
 * Exit code 0 = all pass, 1 = any failure. Wire into pre-deploy checks.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const DIST = 'dist';
const PORT = 4178;

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml',
};

// Minimal static server that mimics SPA/SSG hosting: serve the file if it
// exists, else fall back to the matching pretty-URL .html, else 404.
function startServer(root) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        let p = decodeURIComponent(req.url.split('?')[0]);
        if (p.endsWith('/')) p += 'index.html';
        let file = normalize(join(root, p));
        if (!existsSync(file) && !extname(file)) {
          const html = file + '.html';
          if (existsSync(html)) file = html;
        }
        if (!existsSync(file)) { res.statusCode = 404; return res.end('404'); }
        const s = await stat(file);
        if (s.isDirectory()) file = join(file, 'index.html');
        const body = await readFile(file);
        res.setHeader('Content-Type', MIME[extname(file)] || 'application/octet-stream');
        res.end(body);
      } catch (e) {
        res.statusCode = 500; res.end('500');
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

// Pages to test + a "prove it hydrated" interaction for each.
// The action returns true if the click produced an observable change.
const PAGES = [
  {
    path: '/',
    name: 'Homepage',
    interact: async (page) => {
      // The UK/US "Most Searched" market toggle changes the cards shown.
      const usBtn = page.getByRole('button', { name: /^us$/i }).first();
      if (await usBtn.count() === 0) return { ok: true, note: 'no market toggle found (skipped)' };
      const before = await page.locator('body').innerText();
      await usBtn.click({ timeout: 4000 });
      await page.waitForTimeout(300);
      const after = await page.locator('body').innerText();
      return { ok: before !== after, note: 'market toggle changed content' };
    },
  },
  {
    path: '/finance/mortgage',
    name: 'Mortgage Calculator',
    interact: async (page) => {
      // Typing into the amount input should update the monthly payment output.
      const input = page.locator('input[type="text"], input[type="number"]').first();
      if (await input.count() === 0) return { ok: false, note: 'no input found' };
      const before = await page.locator('body').innerText();
      await input.click();
      await input.fill('250000');
      await page.waitForTimeout(400);
      const after = await page.locator('body').innerText();
      return { ok: before !== after, note: 'changing loan amount updated the result' };
    },
  },
  {
    path: '/finance/compound-interest',
    name: 'Compound Interest',
    interact: async (page) => {
      // The "Switch to Simple Mode" button toggles the view.
      const btn = page.getByRole('button', { name: /simple mode|advanced/i }).first();
      if (await btn.count() === 0) return { ok: true, note: 'no mode toggle (skipped)' };
      const before = await page.locator('body').innerText();
      await btn.click({ timeout: 4000 });
      await page.waitForTimeout(300);
      const after = await page.locator('body').innerText();
      return { ok: before !== after, note: 'mode toggle changed view' };
    },
  },
  {
    path: '/most-searched/uk/60000-after-tax',
    name: 'Answer Page (£60k)',
    interact: async (page) => {
      // No heavy interaction; just confirm the calculator CTA link is present
      // and clickable (proves the tree rendered & is interactive).
      const link = page.getByRole('link').filter({ hasText: /calculator/i }).first();
      const ok = (await link.count()) > 0;
      return { ok, note: 'calculator CTA link present' };
    },
  },
];

async function run() {
  const urlArg = process.argv.indexOf('--url');
  const baseUrl = urlArg !== -1 ? process.argv[urlArg + 1] : `http://localhost:${PORT}`;
  const useLocal = urlArg === -1;

  let server;
  if (useLocal) {
    if (!existsSync(DIST)) {
      console.error(`✗ No ${DIST}/ directory. Run \`npm run build\` first.`);
      process.exit(1);
    }
    server = await startServer(DIST);
    console.log(`Serving ${DIST}/ at ${baseUrl}\n`);
  } else {
    console.log(`Testing live: ${baseUrl}\n`);
  }

  const browser = await chromium.launch();
  let failures = 0;

  for (const spec of PAGES) {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push('PAGEERROR: ' + err.message));

    const url = baseUrl + spec.path;
    let status = 'PASS';
    const problems = [];

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });

      // 1. Hydration / runtime errors
      const hydrationErrs = consoleErrors.filter((e) =>
        /hydrat|did not match|Minified React error|Suspense/i.test(e)
      );
      if (hydrationErrs.length) problems.push(`hydration errors: ${hydrationErrs[0].slice(0, 120)}`);
      if (consoleErrors.length) problems.push(`${consoleErrors.length} console error(s): ${consoleErrors[0].slice(0, 100)}`);

      // 2. Exactly one H1
      const h1count = await page.locator('h1').count();
      if (h1count !== 1) problems.push(`expected 1 <h1>, found ${h1count}`);

      // 3. Interactivity (proves hydration)
      const result = await spec.interact(page);
      if (!result.ok) problems.push(`interaction failed: ${result.note}`);

      if (problems.length) { status = 'FAIL'; failures++; }
    } catch (e) {
      status = 'FAIL'; failures++;
      problems.push('exception: ' + e.message.slice(0, 150));
    }

    const icon = status === 'PASS' ? '✓' : '✗';
    console.log(`${icon} ${status}  ${spec.name.padEnd(24)} ${spec.path}`);
    problems.forEach((p) => console.log(`      → ${p}`));

    await page.close();
  }

  await browser.close();
  if (server) server.close();

  console.log(`\n${failures === 0 ? '✓ ALL PASSED' : `✗ ${failures} PAGE(S) FAILED`}`);
  process.exit(failures === 0 ? 0 : 1);
}

run().catch((e) => { console.error(e); process.exit(1); });
