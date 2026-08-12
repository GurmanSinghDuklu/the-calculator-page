// Renders the new brand mark (public/favicon.svg) to every PNG size the
// site references: favicon, apple-touch-icon, PWA maskable icons.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const svgPath = path.join(ROOT, "public", "favicon.svg");
const svgContent = fs.readFileSync(svgPath, "utf-8");

// [filename, pixel size, padding fraction (maskable icons need ~10% safe margin)]
const targets = [
  ["favicon-16.png", 16, 0],
  ["favicon-32.png", 32, 0],
  ["favicon-48.png", 48, 0],
  ["favicon.png", 192, 0],           // referenced generically by SEO.tsx
  ["apple-touch-icon.png", 180, 0],  // iOS home screen — must be PNG
  ["icon-192.png", 192, 0],
  ["icon-512.png", 512, 0],
  ["icon-maskable-512.png", 512, 0.14], // extra padding so Android's mask doesn't clip the mark
];

(async () => {
  const browser = await chromium.launch();
  for (const [file, size, pad] of targets) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    const padPx = Math.round(size * pad);
    const inner = size - padPx * 2;
    await page.setContent(`
      <html><body style="margin:0;padding:0;">
        <div style="width:${size}px;height:${size}px;background:#111318;display:flex;align-items:center;justify-content:center;box-sizing:border-box;">
          <div style="width:${inner}px;height:${inner}px;">${svgContent.replace(/width="512" height="512"/, `width="${inner}" height="${inner}"`)}</div>
        </div>
      </body></html>
    `);
    await page.screenshot({ path: path.join(ROOT, "public", file) });
    console.log("wrote", file);
    await page.close();
  }
  await browser.close();
})();
