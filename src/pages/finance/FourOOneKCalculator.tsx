import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

const ACCENT = "#3B82F6";

const faqs = [
  { q: "What is a 401(k)?", a: "A 401(k) is a tax-advantaged retirement savings plan offered by US employers. You contribute pre-tax dollars (traditional) or after-tax dollars (Roth), reducing your taxable income now or in retirement. Many employers match a percentage of your contributions — that match is essentially free money." },
  { q: "How much should I contribute to my 401(k)?", a: "At minimum, contribute enough to get your full employer match — otherwise you're leaving free money on the table. Beyond that, the general rule is to save 15% of your gross income for retirement (including employer match). The 2025 IRS contribution limit is $23,500 for employees under 50, and $31,000 for those 50 and over (catch-up contributions)." },
  { q: "What is employer matching?", a: "Employer matching is when your company contributes to your 401(k) based on what you put in. A common match is 50% of your contributions up to 6% of salary — meaning if you earn $80,000 and contribute 6% ($4,800), your employer adds $2,400. Always contribute at least enough to get the full match." },
  { q: "What rate of return should I use?", a: "The US stock market has historically returned around 7–10% annually before inflation, or roughly 5–7% after inflation. A conservative estimate is 6%, moderate is 7–8%, and optimistic is 10%. The calculator defaults to 7% as a reasonable long-term average for a diversified portfolio." },
  { q: "What's the difference between traditional and Roth 401(k)?", a: "Traditional 401(k): contributions are pre-tax, reducing your taxable income now — you pay tax when you withdraw in retirement. Roth 401(k): contributions are after-tax — withdrawals in retirement are completely tax-free. Roth is generally better if you expect to be in a higher tax bracket in retirement." },
];

function fmt(n: number, currency = "$") {
  return currency + Math.round(n).toLocaleString("en-US");
}

export default function FourOOneKCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentBalance, setCurrentBalance] = useState("10000");
  const [annualSalary, setAnnualSalary] = useState("75000");
  const [contributionPct, setContributionPct] = useState("10");
  const [employerMatchPct, setEmployerMatchPct] = useState("50");
  const [employerMatchUpTo, setEmployerMatchUpTo] = useState("6");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [annualRaise, setAnnualRaise] = useState("2");
  const [result, setResult] = useState<{
    totalBalance: number;
    employeeTotal: number;
    employerTotal: number;
    growthTotal: number;
    yearsToRetirement: number;
    monthlyContribution: number;
  } | null>(null);

  const calculate = () => {
    const age = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const balance = parseFloat(currentBalance) || 0;
    const salary = parseFloat(annualSalary);
    const contribPct = parseFloat(contributionPct) / 100;
    const matchPct = parseFloat(employerMatchPct) / 100;
    const matchUpTo = parseFloat(employerMatchUpTo) / 100;
    const returnRate = parseFloat(annualReturn) / 100;
    const raise = parseFloat(annualRaise) / 100;

    if (isNaN(age) || isNaN(retAge) || isNaN(salary) || retAge <= age) return;

    const years = retAge - age;
    let totalBalance = balance;
    let employeeContribTotal = 0;
    let employerContribTotal = 0;
    let currentSalary = salary;

    for (let y = 0; y < years; y++) {
      const empContrib = currentSalary * contribPct;
      const empMatch = currentSalary * Math.min(contribPct, matchUpTo) * matchPct;
      employeeContribTotal += empContrib;
      employerContribTotal += empMatch;
      totalBalance = (totalBalance + empContrib + empMatch) * (1 + returnRate);
      currentSalary *= (1 + raise);
    }

    const growthTotal = totalBalance - employeeContribTotal - employerContribTotal - balance;

    setResult({
      totalBalance,
      employeeTotal: employeeContribTotal,
      employerTotal: employerContribTotal,
      growthTotal,
      yearsToRetirement: years,
      monthlyContribution: (salary * contribPct) / 12,
    });
  };

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass = "w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors";

  return (
    <>
      <SEO
        title="401(k) Calculator — Retirement Savings Calculator | The Calculator App"
        description="Free 401(k) calculator. See how your retirement savings grow with employer matching, compound interest, and annual raises. Plan your US retirement in 60 seconds."
        keywords="401k calculator, 401(k) calculator, retirement savings calculator, employer match calculator, 401k growth calculator, retirement planning calculator"
        canonicalUrl="https://www.thecalculatorapp.org/finance/401k-calculator"
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "401(k) Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://www.thecalculatorapp.org/finance/401k-calculator"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/8">
          <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
          <Link to="/finance/us-salary-calculator" className="text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white transition-colors">US Salary Calculator →</Link>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-white/40 text-[10px] font-heading uppercase tracking-[0.3em] mb-3">Retirement Planning</p>
          <h1 className="font-display text-5xl md:text-6xl uppercase text-white leading-[0.85] tracking-tight mb-4">
            401(k)<br />Calculator
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-2xl mb-10">
            See how your 401(k) grows over time with employer matching and compound returns. Enter your details to project your retirement balance.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Inputs */}
            <div className="space-y-5">
              <div className="border border-white/8 bg-white/[0.015] p-6">
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5">Your Details</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Current Age</label>
                      <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className={inputClass} placeholder="30" />
                    </div>
                    <div>
                      <label className={labelClass}>Retirement Age</label>
                      <input type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} className={inputClass} placeholder="65" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Annual Salary ($)</label>
                    <input type="number" value={annualSalary} onChange={e => setAnnualSalary(e.target.value)} className={inputClass} placeholder="75000" />
                  </div>
                  <div>
                    <label className={labelClass}>Current 401(k) Balance ($)</label>
                    <input type="number" value={currentBalance} onChange={e => setCurrentBalance(e.target.value)} className={inputClass} placeholder="10000" />
                  </div>
                  <div>
                    <label className={labelClass}>Your Contribution (% of salary)</label>
                    <input type="number" value={contributionPct} onChange={e => setContributionPct(e.target.value)} className={inputClass} placeholder="10" />
                  </div>
                </div>
              </div>

              <div className="border border-white/8 bg-white/[0.015] p-6">
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5">Employer Match</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Match Rate (%)</label>
                      <input type="number" value={employerMatchPct} onChange={e => setEmployerMatchPct(e.target.value)} className={inputClass} placeholder="50" />
                      <p className="text-white/25 text-[10px] mt-1">e.g. 50 = 50¢ per $1</p>
                    </div>
                    <div>
                      <label className={labelClass}>Match Up To (% salary)</label>
                      <input type="number" value={employerMatchUpTo} onChange={e => setEmployerMatchUpTo(e.target.value)} className={inputClass} placeholder="6" />
                      <p className="text-white/25 text-[10px] mt-1">e.g. 6 = up to 6%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-white/8 bg-white/[0.015] p-6">
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5">Growth Assumptions</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Annual Return (%)</label>
                    <input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} className={inputClass} placeholder="7" />
                  </div>
                  <div>
                    <label className={labelClass}>Annual Raise (%)</label>
                    <input type="number" value={annualRaise} onChange={e => setAnnualRaise(e.target.value)} className={inputClass} placeholder="2" />
                  </div>
                </div>
              </div>

              <button
                onClick={calculate}
                className="w-full py-4 bg-white text-black font-heading text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
              >
                Calculate Retirement Balance →
              </button>
            </div>

            {/* Results */}
            <div className="space-y-3">
              {result ? (
                <>
                  <div className="border border-white/8 bg-white/[0.015] p-6">
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Projected Balance at Retirement</p>
                    <p className="font-display text-5xl text-white mb-1">{fmt(result.totalBalance)}</p>
                    <p className="text-zinc-500 text-xs">After {result.yearsToRetirement} years</p>
                  </div>

                  <div className="border border-white/8 bg-white/[0.015] p-6 space-y-4">
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Breakdown</p>
                    {[
                      ["Your contributions", fmt(result.employeeTotal), "text-blue-400"],
                      ["Employer match", fmt(result.employerTotal), "text-green-400"],
                      ["Investment growth", fmt(result.growthTotal), "text-purple-400"],
                    ].map(([label, val, color]) => (
                      <div key={label} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <span className="text-zinc-400 text-sm">{label}</span>
                        <span className={`font-mono text-sm font-bold ${color}`}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border border-white/8 bg-white/[0.015] p-6">
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Monthly contribution</p>
                    <p className="text-white text-2xl font-display">{fmt(result.monthlyContribution)}<span className="text-zinc-500 text-sm font-sans ml-1">/month from your salary</span></p>
                  </div>

                  <div className="border border-white/8 bg-white/[0.015] p-4">
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      Employer match adds <span className="text-green-400 font-medium">{fmt(result.employerTotal)}</span> over your career — that's{" "}
                      <span className="text-white font-medium">{Math.round((result.employerTotal / result.employeeTotal) * 100)}%</span> of your own contributions added for free.
                    </p>
                  </div>
                </>
              ) : (
                <div className="border border-white/8 bg-white/[0.015] p-8 text-center">
                  <p className="text-zinc-600 text-sm">Enter your details and click calculate to see your projected 401(k) balance at retirement.</p>
                </div>
              )}
            </div>
          </div>

          {/* Educational content */}
          <div className="space-y-0 mt-12">
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">What is a 401(k)?</p>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
                A 401(k) is a tax-advantaged retirement savings plan sponsored by US employers. Named after section 401(k) of the Internal Revenue Code, it allows employees to contribute pre-tax income directly from their paycheck. Contributions grow tax-deferred — you don't pay tax until you withdraw in retirement. Many employers sweeten the deal with matching contributions, making the 401(k) one of the most powerful wealth-building tools available to American workers.
              </p>
            </div>

            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">The growth formula</p>
              <div className="bg-black/40 border border-white/10 rounded-lg px-6 py-4 font-mono text-sm text-zinc-200 mb-4 max-w-xl">
                FV = PV × (1+r)^n + C × [((1+r)^n − 1) / r]
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-zinc-400 max-w-xl">
                {[["FV","Future value (retirement balance)"],["PV","Present value (current balance)"],["r","Annual return rate"],["n","Years to retirement"],["C","Annual contribution (yours + employer)"]].map(([v,d]) => (
                  <div key={v} className="bg-white/[0.03] border border-white/10 rounded-lg p-3"><span className="text-blue-400 font-bold">{v}</span> — {d}</div>
                ))}
              </div>
            </div>

            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">2025 401(k) contribution limits</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-zinc-300">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["","Under 50","50 and over"].map(h => (
                        <th key={h} className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Employee limit","$23,500","$31,000"],
                      ["Total limit (incl. employer)","$70,000","$77,500"],
                      ["IRA limit","$7,000","$8,000"],
                    ].map(([label, a, b]) => (
                      <tr key={label} className="border-b border-white/5">
                        <td className="py-3 pr-6 text-white">{label}</td>
                        <td className="py-3 pr-6 text-green-400 font-medium">{a}</td>
                        <td className="py-3 text-green-400 font-medium">{b}</td>
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
                {[["US Salary Calculator","/finance/us-salary-calculator"],["Compound Interest","/finance/compound-interest"],["Savings Calculator","/finance/savings"],["Retirement Calculator","/finance/retirement"]].map(([l,p]) => (
                  <Link key={p} to={p} className="px-4 py-2 text-xs font-heading uppercase tracking-wider text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all">{l}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <FinancialDisclosure variant="investment" />
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
