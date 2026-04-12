import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowRight, Percent, Smartphone } from "lucide-react";

const faqs = [
  { q: "Is there a free percentage calculator app?", a: "Yes. The Calculator App includes a free percentage calculator that works on iPhone and Android with no download. Calculate percentage increases, decreases, differences, and find what percentage one number is of another." },
  { q: "What is the best percentage calculator app?", a: "The best percentage calculator app handles all three core calculations in one place: percentage of a number, percentage increase/decrease, and percentage difference between two values. The Calculator App does all of these instantly, free, with no sign-up." },
  { q: "How do I calculate a percentage increase?", a: "Percentage increase = ((New Value − Old Value) / Old Value) × 100. For example, a price rising from £80 to £100 is a 25% increase: ((100 − 80) / 80) × 100 = 25%." },
  { q: "How do I calculate a percentage of a number?", a: "Percentage of a number = (Percentage ÷ 100) × Number. For example, 15% of £240 = (15 ÷ 100) × 240 = £36." },
  { q: "Does the percentage app work for VAT calculations?", a: "For quick percentage maths, yes. For dedicated UK VAT (adding or removing 20%), the app also includes a standalone VAT Calculator that splits net amount, VAT, and gross price." },
];

const tools = [
  { title: "Percentage Calculator", desc: "Percentage of, increase, decrease and difference", path: "/misc/percentage" },
  { title: "Percentage Change Calculator", desc: "Calculate the % change between any two numbers", path: "/misc/percentage-change" },
  { title: "Discount Calculator", desc: "Find the final price after any percentage discount", path: "/misc/discount" },
  { title: "VAT Calculator", desc: "Add or remove 20% UK VAT from any price instantly", path: "/finance/vat-calculator" },
  { title: "Tip Calculator", desc: "Split bills and calculate gratuity for any service", path: "/misc/tip" },
  { title: "Cashback Calculator", desc: "Calculate annual cashback from credit card spending", path: "/finance/cashback" },
];

export default function PercentageCalculatorApp() {
  return (
    <>
      <SEO
        title="Percentage Calculator App — Free Online % Calculator | The Calculator App"
        description="Free percentage calculator app. No download needed. Works on iPhone and Android. Calculate percentage of a number, percentage increase, decrease, and difference instantly."
        keywords="percentage calculator app, free percentage calculator app, percent calculator app, percentage app iphone, percentage app android, percentage increase calculator app, discount calculator app"
        canonicalUrl="https://www.thecalculatorpage.com/app/percentage-calculator-app"
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Percentage Calculator App",
          "alternateName": "The Calculator App",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorpage.com"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/8">
          <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
          <div className="flex items-center gap-6 text-xs font-heading uppercase tracking-widest text-white/40">
            <Link to="/app" className="hover:text-white transition-colors">App Home</Link>
            <Link to="/misc/percentage" className="hover:text-white transition-colors flex items-center gap-1">Open Calculator <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="text-white/40 text-xs font-heading uppercase tracking-[0.3em] mb-4">The Calculator App</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase text-white leading-[0.85] tracking-tight mb-6">
            Percentage<br />Calculator App
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Free percentage calculator app. Calculate percentage of a number, percentage increase, percentage decrease, and percentage difference. No download. Works on iPhone and Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/misc/percentage" className="px-8 py-4 bg-white text-black font-heading text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">
              Open Percentage Calculator →
            </Link>
            <Link to="/app#how-to-install" className="px-8 py-4 border border-white/20 text-white font-heading text-sm uppercase tracking-widest hover:border-white/50 transition-colors flex items-center justify-center gap-2">
              <Smartphone className="h-4 w-4" /> Add to Homescreen
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-white/8">
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">Percentage and discount tools in the app</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map(({ title, desc, path }) => (
              <Link key={path} to={path} className="group border border-white/8 hover:border-white/25 bg-white/[0.015] p-6 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <Percent className="h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors" />
                  <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/8">
          <div className="space-y-0">
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">The three percentage formulas</p>
              <div className="space-y-4 max-w-2xl">
                {[
                  { label: "Percentage of a number", formula: "Result = (Percentage ÷ 100) × Number", example: "15% of £240 = (15 ÷ 100) × 240 = £36" },
                  { label: "Percentage increase", formula: "% Change = ((New − Old) ÷ Old) × 100", example: "£80 → £100 = ((100−80) ÷ 80) × 100 = 25% increase" },
                  { label: "Percentage difference", formula: "% Diff = (|A − B| ÷ ((A + B) ÷ 2)) × 100", example: "50 vs 70 = (20 ÷ 60) × 100 = 33.3% difference" },
                ].map(({ label, formula, example }) => (
                  <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                    <p className="text-white font-medium text-xs mb-2 uppercase tracking-wider font-heading">{label}</p>
                    <div className="bg-black/40 border border-white/10 rounded px-4 py-2 font-mono text-xs text-zinc-300 mb-2">{formula}</div>
                    <p className="text-zinc-500 text-xs">{example}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6">Frequently asked questions</p>
              <div className="space-y-6 max-w-3xl">
                {faqs.map(({ q, a }) => (
                  <div key={q} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <p className="text-white font-medium text-sm mb-2">{q}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Related calculator apps</p>
              <div className="flex flex-wrap gap-3">
                {[["Mortgage Calculator App","/app/mortgage-calculator-app"],["Compound Interest App","/app/compound-interest-app"],["Salary Calculator App","/app/salary-calculator-app"],["Savings Calculator App","/app/savings-calculator-app"]].map(([l,p]) => (
                  <Link key={p} to={p} className="px-4 py-2 text-xs font-heading uppercase tracking-wider text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all">{l}</Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
            <p className="text-xs text-white/20 uppercase tracking-widest">© 2026 The Calculator Page.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
