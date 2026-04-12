import { readFileSync, writeFileSync } from "fs";
import { glob } from "glob";

const files = await glob("src/**/*.tsx", { cwd: "/Users/mandeepduklu/Downloads/thecalculatorpage-main" });

let changed = 0;

for (const file of files) {
  const fullPath = `/Users/mandeepduklu/Downloads/thecalculatorpage-main/${file}`;
  let content = readFileSync(fullPath, "utf8");
  const original = content;

  // Replace <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
  content = content.replace(
    /<Link\s+to="\/"\s+className="font-display text-2xl tracking-widest text-white uppercase">\s*Calculator App\s*<\/Link>/g,
    '<Logo linkTo="/" size="sm" />'
  );

  // Replace <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">\n...Calculator App\n...</Link>
  content = content.replace(
    /<Link\s+to="\/"\s+className="font-display text-2xl tracking-widest text-white uppercase">\s*\n\s*Calculator App\s*\n\s*<\/Link>/g,
    '<Logo linkTo="/" size="sm" />'
  );

  // Replace <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span>
  content = content.replace(
    /<span\s+className="font-display text-2xl tracking-widest text-white uppercase">\s*Calculator App\s*<\/span>/g,
    '<Logo size="sm" />'
  );

  if (content !== original) {
    // Add Logo import if not already present
    if (!content.includes("import") || !content.includes("Logo")) {
      // Find first import line and add after it
      content = content.replace(
        /^(import .+from .+;)$/m,
        `$1\nimport { Logo } from "@/components/Logo";`
      );
    }
    writeFileSync(fullPath, content, "utf8");
    changed++;
    console.log(`✓ ${file}`);
  }
}

console.log(`\nDone — ${changed} files updated.`);
