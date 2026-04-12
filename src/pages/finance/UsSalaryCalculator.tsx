import { Logo } from "@/components/Logo";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

const ACCENT = "#3B82F6";

type FilingStatus = "single" | "married_joint" | "married_separate" | "head_household";

const usTaxBrackets: Record<FilingStatus, { min: number; max: number; rate: number }[]> = {
  single:           [{ min: 0, max: 11600, rate: .10 },{ min: 11600, max: 47150, rate: .12 },{ min: 47150, max: 100525, rate: .22 },{ min: 100525, max: 191950, rate: .24 },{ min: 191950, max: 243725, rate: .32 },{ min: 243725, max: 609350, rate: .35 },{ min: 609350, max: Infinity, rate: .37 }],
  married_joint:    [{ min: 0, max: 23200, rate: .10 },{ min: 23200, max: 94300, rate: .12 },{ min: 94300, max: 201050, rate: .22 },{ min: 201050, max: 383900, rate: .24 },{ min: 383900, max: 487450, rate: .32 },{ min: 487450, max: 731200, rate: .35 },{ min: 731200, max: Infinity, rate: .37 }],
  married_separate: [{ min: 0, max: 11600, rate: .10 },{ min: 11600, max: 47150, rate: .12 },{ min: 47150, max: 100525, rate: .22 },{ min: 100525, max: 191950, rate: .24 },{ min: 191950, max: 243725, rate: .32 },{ min: 243725, max: 365600, rate: .35 },{ min: 365600, max: Infinity, rate: .37 }],
  head_household:   [{ min: 0, max: 16550, rate: .10 },{ min: 16550, max: 63100, rate: .12 },{ min: 63100, max: 100500, rate: .22 },{ min: 100500, max: 191950, rate: .24 },{ min: 191950, max: 243700, rate: .32 },{ min: 243700, max: 609350, rate: .35 },{ min: 609350, max: Infinity, rate: .37 }],
};
const usStandardDeduction: Record<FilingStatus, number> = { single: 14600, married_joint: 29200, married_separate: 14600, head_household: 21900 };
const stateTaxRates: Record<string, { rate: number; name: string }> = {
  none: { rate: 0, name: "No state tax" },
  CA: { rate: 0.0725, name: "California" },
  NY: { rate: 0.0685, name: "New York" },
  TX: { rate: 0, name: "Texas (no income tax)" },
  FL: { rate: 0, name: "Florida (no income tax)" },
  WA: { rate: 0, name: "Washington (no income tax)" },
  IL: { rate: 0.0495, name: "Illinois" },
  PA: { rate: 0.0307, name: "Pennsylvania" },
  OH: { rate: 0.04, name: "Ohio" },
  GA: { rate: 0.055, name: "Georgia" },
  NC: { rate: 0.0525, name: "North Carolina" },
  NJ: { rate: 0.0637, name: "New Jersey" },
  VA: { rate: 0.0575, name: "Virginia" },
  MA: { rate: 0.05, name: "Massachusetts" },
  AZ: { rate: 0.025, name: "Arizona" },
  CO: { rate: 0.044, name: "Colorado" },
  MI: { rate: 0.0425, name: "Michigan" },
  MN: { rate: 0.0985, name: "Minnesota" },
  OR: { rate: 0.099, name: "Oregon" },
};

function calcUSTax(salary: number, filing: FilingStatus, state: string) {
  const deduction = usStandardDeduction[filing];
  const taxableIncome = Math.max(0, salary - deduction);
  let federal = 0, remaining = taxableIncome;
  for (const b of usTaxBrackets[filing]) {
    if (remaining <= 0) break;
    const taxable = Math.min(remaining, b.max - b.min);
    federal += taxable * b.rate;
    remaining -= taxable;
  }
  const socialSecurity = Math.min(salary, 168600) * 0.062;
  const medicare = salary * 0.0145 + (salary > 200000 ? (salary - 200000) * 0.009 : 0);
  const stateIncomeTax = salary * (stateTaxRates[state]?.rate || 0);
  const totalDeductions = federal + socialSecurity + medicare + stateIncomeTax;
  const takeHome = salary - totalDeductions;
  return { federal, socialSecurity, medicare, stateIncomeTax, totalDeductions, takeHome, effectiveRate: (totalDeductions / salary) * 100 };
}

const faqs = [
  { q: "How is federal income tax calculated in the US?", a: "The US uses a progressive tax bracket system. You pay different rates on different portions of your income. In 2025, the brackets for single filers range from 10% (up to $11,600) to 37% (over $609,350). Crucially, only the income within each bracket is taxed at that rate — not your entire salary. This is why effective tax rates are always lower than the marginal (top bracket) rate." },
  { q: "What is FICA tax?", a: "FICA stands for Federal Insurance Contributions Act. It covers Social Security (6.2% on income up to $168,600 in 2025) and Medicare (1.45% on all income, plus an additional 0.9% on income over $200,000). Your employer pays a matching amount. Self-employed people pay both halves — 15.3% total — as self-employment tax." },
  { q: "Which states have no income tax?", a: "Nine states have no state income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. This can make a significant difference to take-home pay — a $100,000 salary in California costs roughly $7,250 more in state tax than the same salary in Texas." },
  { q: "What is the standard deduction for 2025?", a: "The 2025 standard deduction is $14,600 for single filers, $29,200 for married filing jointly, $14,600 for married filing separately, and $21,900 for head of household. This is the amount subtracted from your gross income before federal tax is calculated. Most Americans claim the standard deduction rather than itemising." },
  { q: "What does take-home pay mean?", a: "Take-home pay (also called net pay) is your salary after all deductions — federal income tax, state income tax, Social Security, and Medicare. It's the amount that actually hits your bank account. Pre-tax deductions like 401(k) contributions and health insurance premiums reduce your taxable income further." },
];

export default function UsSalaryCalculator() {
  const [salary, setSalary] = useState("75000");
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [state, setState] = useState("none");
  const [result, setResult] = useState<ReturnType<typeof calcUSTax> | null>(null);

  const calculate = () => {
    const s = parseFloat(salary);
    if (isNaN(s) || s <= 0) return;
    setResult(calcUSTax(s, filing, state));
  };

  const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass = "w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors";
  const selectClass = "w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors";
  const annualSalary = parseFloat(salary) || 0;

  return (
    <>
      <SEO
        title="US Salary Calculator — Federal Tax, FICA & State Tax 2025 | The Calculator App"
        description="Free US salary calculator for 2025. Calculate take-home pay after federal income tax, Social Security, Medicare, and state tax. All 50 states supported."
        keywords="us salary calculator, salary calculator usa, take home pay calculator usa, federal tax calculator, paycheck calculator, net pay calculator us, salary after tax us"
        canonicalUrl="https://www.thecalculatorapp.org/finance/us-salary-calculator"
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "US Salary Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://www.thecalculatorapp.org/finance/us-salary-calculator"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/8">
          <Logo linkTo="/" size="sm" />
          <Link to="/finance/401k-calculator" className="text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white transition-colors">401(k) Calculator →</Link>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-white/40 text-[10px] font-heading uppercase tracking-[0.3em] mb-3">US Finance</p>
          <h1 className="font-display text-5xl md:text-6xl uppercase text-white leading-[0.85] tracking-tight mb-4">
            US Salary<br />Calculator
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-2xl mb-10">
            Calculate your take-home pay after federal income tax, Social Security, Medicare, and state income tax. Updated for 2025 tax brackets.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-5">
              <div className="border border-white/8 bg-white/[0.015] p-6 space-y-4">
                <div>
                  <label className={labelClass}>Annual Gross Salary ($)</label>
                  <input type="number" value={salary} onChange={e => setSalary(e.target.value)} className={inputClass} placeholder="75000" />
                </div>
                <div>
                  <label className={labelClass}>Filing Status</label>
                  <select value={filing} onChange={e => setFiling(e.target.value as FilingStatus)} className={selectClass}>
                    <option value="single">Single</option>
                    <option value="married_joint">Married Filing Jointly</option>
                    <option value="married_separate">Married Filing Separately</option>
                    <option value="head_household">Head of Household</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <select value={state} onChange={e => setState(e.target.value)} className={selectClass}>
                    {Object.entries(stateTaxRates).map(([code, { name }]) => (
                      <option key={code} value={code}>{name}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={calculate}
                  className="w-full py-4 bg-white text-black font-heading text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
                >
                  Calculate Take-Home Pay →
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {result ? (
                <>
                  <div className="border border-white/8 bg-white/[0.015] p-6">
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Annual Take-Home Pay</p>
                    <p className="font-display text-5xl text-white mb-1">{fmt(result.takeHome)}</p>
                    <p className="text-zinc-500 text-xs">Effective tax rate: {result.effectiveRate.toFixed(1)}%</p>
                  </div>

                  <div className="border border-white/8 bg-white/[0.015] p-6 space-y-3">
                    {[
                      ["Gross salary", fmt(annualSalary), "text-white"],
                      ["Federal income tax", `–${fmt(result.federal)}`, "text-red-400"],
                      ["Social Security (6.2%)", `–${fmt(result.socialSecurity)}`, "text-orange-400"],
                      ["Medicare (1.45%+)", `–${fmt(result.medicare)}`, "text-orange-400"],
                      ["State income tax", `–${fmt(result.stateIncomeTax)}`, "text-yellow-400"],
                      ["Take-home (net)", fmt(result.takeHome), "text-green-400"],
                    ].map(([label, val, color]) => (
                      <div key={label} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                        <span className="text-zinc-400 text-xs">{label}</span>
                        <span className={`font-mono text-sm font-bold ${color}`}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border border-white/8 bg-white/[0.015] p-4 grid grid-cols-2 gap-3">
                    {[
                      ["Monthly", fmt(result.takeHome / 12)],
                      ["Weekly", fmt(result.takeHome / 52)],
                      ["Daily (5-day)", fmt(result.takeHome / 260)],
                      ["Hourly (40hr)", fmt(result.takeHome / 2080)],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-white/[0.03] border border-white/5 rounded p-3">
                        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-white text-sm font-mono font-bold">{val}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="border border-white/8 bg-white/[0.015] p-8 text-center">
                  <p className="text-zinc-600 text-sm">Enter your salary and click calculate to see your take-home pay.</p>
                </div>
              )}
            </div>
          </div>

          {/* Educational content */}
          <div className="space-y-0 mt-12">
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">2025 US federal tax brackets (single filer)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-zinc-300">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["Tax Rate","Income Range","Tax on This Bracket"].map(h => (
                        <th key={h} className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["10%","$0 – $11,600","Up to $1,160"],
                      ["12%","$11,600 – $47,150","Up to $4,266"],
                      ["22%","$47,150 – $100,525","Up to $11,745"],
                      ["24%","$100,525 – $191,950","Up to $21,940"],
                      ["32%","$191,950 – $243,725","Up to $16,568"],
                      ["35%","$243,725 – $609,350","Up to $128,011"],
                      ["37%","Over $609,350","37¢ per $1 above"],
                    ].map(([rate, range, tax]) => (
                      <tr key={rate} className="border-b border-white/5">
                        <td className="py-2 pr-6 text-blue-400 font-bold">{rate}</td>
                        <td className="py-2 pr-6 text-white">{range}</td>
                        <td className="py-2 text-zinc-400">{tax}</td>
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
                {[["401(k) Calculator","/finance/401k-calculator"],["US Sales Tax","/finance/us-sales-tax-calculator"],["UK Salary Calculator","/finance/salary"],["Compound Interest","/finance/compound-interest"]].map(([l,p]) => (
                  <Link key={p} to={p} className="px-4 py-2 text-xs font-heading uppercase tracking-wider text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all">{l}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <FinancialDisclosure variant="general" />
          </div>
        </div>

        <footer className="bg-black border-t border-white/10 py-8 px-6 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo linkTo="/" size="sm" />
            <p className="text-xs text-white/20 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
