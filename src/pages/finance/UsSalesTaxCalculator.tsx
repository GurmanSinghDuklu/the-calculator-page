import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

const ACCENT = "#3B82F6";

const STATE_RATES: Record<string, { rate: number; name: string }> = {
  AL: { rate: 4.00, name: "Alabama" },
  AK: { rate: 0.00, name: "Alaska" },
  AZ: { rate: 5.60, name: "Arizona" },
  AR: { rate: 6.50, name: "Arkansas" },
  CA: { rate: 7.25, name: "California" },
  CO: { rate: 2.90, name: "Colorado" },
  CT: { rate: 6.35, name: "Connecticut" },
  DE: { rate: 0.00, name: "Delaware" },
  FL: { rate: 6.00, name: "Florida" },
  GA: { rate: 4.00, name: "Georgia" },
  HI: { rate: 4.00, name: "Hawaii" },
  ID: { rate: 6.00, name: "Idaho" },
  IL: { rate: 6.25, name: "Illinois" },
  IN: { rate: 7.00, name: "Indiana" },
  IA: { rate: 6.00, name: "Iowa" },
  KS: { rate: 6.50, name: "Kansas" },
  KY: { rate: 6.00, name: "Kentucky" },
  LA: { rate: 4.45, name: "Louisiana" },
  ME: { rate: 5.50, name: "Maine" },
  MD: { rate: 6.00, name: "Maryland" },
  MA: { rate: 6.25, name: "Massachusetts" },
  MI: { rate: 6.00, name: "Michigan" },
  MN: { rate: 6.875, name: "Minnesota" },
  MS: { rate: 7.00, name: "Mississippi" },
  MO: { rate: 4.225, name: "Missouri" },
  MT: { rate: 0.00, name: "Montana" },
  NE: { rate: 5.50, name: "Nebraska" },
  NV: { rate: 6.85, name: "Nevada" },
  NH: { rate: 0.00, name: "New Hampshire" },
  NJ: { rate: 6.625, name: "New Jersey" },
  NM: { rate: 5.00, name: "New Mexico" },
  NY: { rate: 4.00, name: "New York" },
  NC: { rate: 4.75, name: "North Carolina" },
  ND: { rate: 5.00, name: "North Dakota" },
  OH: { rate: 5.75, name: "Ohio" },
  OK: { rate: 4.50, name: "Oklahoma" },
  OR: { rate: 0.00, name: "Oregon" },
  PA: { rate: 6.00, name: "Pennsylvania" },
  RI: { rate: 7.00, name: "Rhode Island" },
  SC: { rate: 6.00, name: "South Carolina" },
  SD: { rate: 4.20, name: "South Dakota" },
  TN: { rate: 7.00, name: "Tennessee" },
  TX: { rate: 6.25, name: "Texas" },
  UT: { rate: 4.85, name: "Utah" },
  VT: { rate: 6.00, name: "Vermont" },
  VA: { rate: 4.30, name: "Virginia" },
  WA: { rate: 6.50, name: "Washington" },
  WV: { rate: 6.00, name: "West Virginia" },
  WI: { rate: 5.00, name: "Wisconsin" },
  WY: { rate: 4.00, name: "Wyoming" },
  DC: { rate: 6.00, name: "Washington D.C." },
};

const faqs = [
  { q: "Which US states have no sales tax?", a: "Five states have no state sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, some localities in Alaska can charge local sales tax. Delaware, Montana, New Hampshire, and Oregon have no sales tax at all — making them popular for large purchases." },
  { q: "Is sales tax included in the price in the US?", a: "No — unlike the UK where VAT is always included in the displayed price, US prices are shown before sales tax. Tax is added at checkout. This is why a $99.99 item often costs $106+ at the register depending on your state." },
  { q: "What is the highest sales tax state in the US?", a: "California has the highest state sales tax at 7.25%. When you add local taxes, some areas of California, Tennessee, Arkansas, and Louisiana can exceed 10% combined." },
  { q: "Do I pay sales tax when shopping online?", a: "Yes. Since the 2018 Supreme Court ruling (South Dakota v. Wayfair), online retailers are required to collect sales tax in states where they have significant sales, even without a physical presence. Most major online retailers now collect the correct state sales tax automatically." },
  { q: "What is the difference between sales tax and VAT?", a: "Sales tax (US) is only applied at the final point of sale to consumers, and is not included in the displayed price. VAT (used in the UK and most of Europe) is applied at every stage of production and is always included in the price you see. The end result is similar — both are consumption taxes — but the mechanics differ." },
];

export default function UsSalesTaxCalculator() {
  const [price, setPrice] = useState("100");
  const [state, setState] = useState("CA");
  const [localRate, setLocalRate] = useState("1.25");
  const [mode, setMode] = useState<"add" | "extract">("add");
  const [result, setResult] = useState<{
    stateRate: number;
    localRateVal: number;
    totalRate: number;
    taxAmount: number;
    priceBeforeTax: number;
    priceAfterTax: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const stateRate = STATE_RATES[state]?.rate || 0;
    const local = parseFloat(localRate) || 0;
    const totalRate = (stateRate + local) / 100;

    if (isNaN(p) || p <= 0) return;

    let priceBeforeTax: number, taxAmount: number, priceAfterTax: number;

    if (mode === "add") {
      priceBeforeTax = p;
      taxAmount = p * totalRate;
      priceAfterTax = p + taxAmount;
    } else {
      priceAfterTax = p;
      priceBeforeTax = p / (1 + totalRate);
      taxAmount = p - priceBeforeTax;
    }

    setResult({ stateRate, localRateVal: local, totalRate: stateRate + local, taxAmount, priceBeforeTax, priceAfterTax });
  };

  const fmt = (n: number) => "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass = "w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors";

  return (
    <>
      <SEO
        title="US Sales Tax Calculator — All 50 States | The Calculator App"
        description="Free US sales tax calculator for all 50 states. Add or extract sales tax instantly. See state and local tax rates for California, Texas, New York, Florida, and more."
        keywords="sales tax calculator, us sales tax calculator, sales tax by state, california sales tax calculator, texas sales tax calculator, new york sales tax calculator"
        canonicalUrl="https://www.thecalculatorpage.com/finance/us-sales-tax-calculator"
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "US Sales Tax Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://www.thecalculatorpage.com/finance/us-sales-tax-calculator"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/8">
          <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
          <Link to="/finance/401k-calculator" className="text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white transition-colors">401(k) Calculator →</Link>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-white/40 text-[10px] font-heading uppercase tracking-[0.3em] mb-3">US Finance</p>
          <h1 className="font-display text-5xl md:text-6xl uppercase text-white leading-[0.85] tracking-tight mb-4">
            Sales Tax<br />Calculator
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-2xl mb-10">
            Calculate US sales tax for all 50 states instantly. Add tax to a price or extract tax from a total — with state and local rates.
          </p>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-8">
            {[["add","Add tax to price"],["extract","Extract tax from total"]].map(([m, label]) => (
              <button
                key={m}
                onClick={() => setMode(m as "add" | "extract")}
                className={`px-5 py-2.5 text-xs font-heading uppercase tracking-widest transition-colors ${mode === m ? "bg-white text-black" : "border border-white/20 text-white/50 hover:text-white hover:border-white/40"}`}
              >{label}</button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-5">
              <div className="border border-white/8 bg-white/[0.015] p-6 space-y-4">
                <div>
                  <label className={labelClass}>{mode === "add" ? "Price before tax ($)" : "Total price including tax ($)"}</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={inputClass} placeholder="100" />
                </div>

                <div>
                  <label className={labelClass}>State</label>
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                  >
                    {Object.entries(STATE_RATES).sort((a,b) => a[1].name.localeCompare(b[1].name)).map(([code, { name, rate }]) => (
                      <option key={code} value={code}>{name} — {rate}%</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Local / City Tax Rate (% — optional)</label>
                  <input type="number" value={localRate} onChange={e => setLocalRate(e.target.value)} className={inputClass} placeholder="1.25" step="0.01" />
                  <p className="text-white/25 text-[10px] mt-1">Add your city/county rate if known (e.g. LA city = 2.25%)</p>
                </div>

                <button
                  onClick={calculate}
                  className="w-full py-4 bg-white text-black font-heading text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
                >
                  Calculate Sales Tax →
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {result ? (
                <>
                  <div className="border border-white/8 bg-white/[0.015] p-6">
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Tax Amount</p>
                    <p className="font-display text-5xl text-white mb-1">{fmt(result.taxAmount)}</p>
                    <p className="text-zinc-500 text-xs">at {result.totalRate.toFixed(3)}% combined rate</p>
                  </div>
                  <div className="border border-white/8 bg-white/[0.015] p-6 space-y-3">
                    {[
                      ["Price before tax", fmt(result.priceBeforeTax), "text-white"],
                      ["Tax amount", fmt(result.taxAmount), "text-yellow-400"],
                      ["Total after tax", fmt(result.priceAfterTax), "text-green-400"],
                    ].map(([label, val, color]) => (
                      <div key={label} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <span className="text-zinc-400 text-sm">{label}</span>
                        <span className={`font-mono text-sm font-bold ${color}`}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border border-white/8 bg-white/[0.015] p-4 space-y-2">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>State tax ({STATE_RATES[state]?.name})</span>
                      <span>{result.stateRate}%</span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Local / city tax</span>
                      <span>{result.localRateVal}%</span>
                    </div>
                    <div className="flex justify-between text-xs text-white font-medium border-t border-white/10 pt-2 mt-2">
                      <span>Combined rate</span>
                      <span>{result.totalRate.toFixed(3)}%</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="border border-white/8 bg-white/[0.015] p-8 text-center">
                  <p className="text-zinc-600 text-sm">Select your state and enter a price to calculate sales tax.</p>
                </div>
              )}
            </div>
          </div>

          {/* State rates table */}
          <div className="space-y-0 mt-12">
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Sales tax rates by state (2025)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-zinc-300">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["State","State Rate","No Tax?"].map(h => (
                        <th key={h} className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(STATE_RATES).sort((a,b) => b[1].rate - a[1].rate).slice(0, 15).map(([code, { name, rate }]) => (
                      <tr key={code} className="border-b border-white/5">
                        <td className="py-2 pr-6 text-white">{name}</td>
                        <td className="py-2 pr-6 text-zinc-300">{rate}%</td>
                        <td className="py-2">{rate === 0 ? <span className="text-green-400">No sales tax</span> : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Related calculators</p>
              <div className="flex flex-wrap gap-3">
                {[["US Salary Calculator","/finance/us-salary-calculator"],["401(k) Calculator","/finance/401k-calculator"],["VAT Calculator (UK)","/finance/vat-calculator"],["Tip Calculator","/misc/tip"]].map(([l,p]) => (
                  <Link key={p} to={p} className="px-4 py-2 text-xs font-heading uppercase tracking-wider text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all">{l}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-black border-t border-white/10 py-8 px-6 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
            <p className="text-xs text-white/20 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
