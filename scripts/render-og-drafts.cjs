const { chromium } = require("playwright");
const path = require("path");

const SRC = "C:/Users/User/AppData/Local/Temp/claude/c--Users-User-the-calculator-page/6d19ab07-2738-4192-8de0-6ee995084c57/scratchpad";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const filePath = "file:///" + path.join(SRC, "og-designs.html").replace(/\\/g, "/");
  await page.goto(filePath);

  const ids = ["A", "B", "C", "D", "A-guides"];
  for (const id of ids) {
    const el = await page.$("#" + id);
    await el.screenshot({ path: path.join(SRC, `og-${id}.png`) });
    console.log("wrote og-" + id + ".png");
  }
  await browser.close();
})();
