import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowRight, Wallet, Smartphone } from "lucide-react";

const faqs = [
  { q: "Is there a free salary calculator app for the UK?", a: "Yes. The Calculator App includes a free UK salary calculator that works on iPhone and Android with no download. It calculates take-home pay after Income Tax, National Insurance, student loan deductions, and pension contributions." },
  { q: "What is the best salary calculator app in the UK?", a: "The best UK salary calculator app accounts for all deductions — PAYE Income Tax across all bands, Class 1 National Insurance, Plan 1/2/4 student loans, and pension contributions. The Calculator App covers all of these accurately for the 2025/26 tax year." },
  { q: "Does the salary app calculate National Insurance?", a: "Yes. The UK Salary Calculator in The Calculator App calculates Class 1 National Insurance contributions at the current rates, broken down alongside Income Tax so you can see exactly what you pay." },
  { q: "Can I calculate my take-home pay after student loan?", a: "Yes. The salary calculator includes Plan 1, Plan 2, and Plan 4 student loan repayment options, so your take-home pay figure is accurate whether you're a recent graduate or have an older loan." },
  { q: "Does the salary calculator app work for self-employed?", a: "The current tool focuses on PAYE employment. For self-employed income, use it alongside the savings and tax calculators to estimate your net position after Class 2/4 NI and Income Tax." },
];

const tools = [
  { title: "UK Salary Calculator", desc: "PAYE take-home pay after tax, NI, student loans and pension", path: "/finance/salary" },
  { title: "Budget Planner", desc: "Apply 50/30/20 or zero-based budgeting to your take-home pay", path: "/finance/budget" },
  { title: "Savings Goal Calculator", desc: "Work out how much to save each month from your salary", path: "/finance/savings" },
  { title: "ISA Calculator", desc: "Model ISA growth using your monthly savings from salary", path: "/finance/isa-calculator" },
  { title: "Loan Calculator", desc: "Calculate monthly loan repayments against your take-home pay", path: "/finance/loan" },
  { title: "Compound Interest Calculator", desc: "Invest your monthly surplus and model 30-year growth", path: "/finance/compound-interest" },
];

export default function SalaryCalculatorApp() {
  return (
    <>
      <SEO
        title="Salary Calculator App UK — Free Take-Home Pay App | The Calculator App"
        description="Free UK salary calculator app. No download needed. Works on iPhone and Android. Calculate take-home pay after Income Tax, National Insurance, student loan and pension deductions."
        keywords="salary calculator app, uk salary calculator app, take home pay app, salary calculator app uk, free salary calculator app, salary app iphone, salary app android, paye calculator app"
        canonicalUrl="https://www.thecalculatorpage.com/app/salary-calculator-app"
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "UK Salary Calculator App",
          "alternateName": "The Calculator App",
          "applicationCategory": "FinanceApplication",
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
            <Link to="/finance/salary" className="hover:text-white transition-colors flex items-center gap-1">Open Calculator <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="text-white/40 text-xs font-heading uppercase tracking-[0.3em] mb-4">The Calculator App</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase text-white leading-[0.85] tracking-tight mb-6">
            UK Salary<br />Calculator App
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            The best free UK salary calculator app. Calculate your exact take-home pay after Income Tax, National Insurance, student loan, and pension deductions. No download. Works on iPhone and Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/finance/salary" className="px-8 py-4 bg-white text-black font-heading text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">
              Open Salary Calculator →
            </Link>
            <Link to="/app#how-to-install" className="px-8 py-4 border border-white/20 text-white font-heading text-sm uppercase tracking-widest hover:border-white/50 transition-colors flex items-center justify-center gap-2">
              <Smartphone className="h-4 w-4" /> Add to Homescreen
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-white/8">
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">Salary and budgeting tools in the app</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map(({ title, desc, path }) => (
              <Link key={path} to={path} className="group border border-white/8 hover:border-white/25 bg-white/[0.015] p-6 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <Wallet className="h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors" />
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
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">UK Income Tax bands 2025/26</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-zinc-300 max-w-2xl">
                  <thead><tr className="border-b border-white/10">{["Band","Income","Rate"].map(h => <th key={h} className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">{h}</th>)}</tr></thead>
                  <tbody>
                    {[["Personal Allowance","Up to £12,570","0%"],["Basic Rate","£12,571–£50,270","20%"],["Higher Rate","£50,271–£125,140","40%"],["Additional Rate","Over £125,140","45%"]].map(([b,i,r]) => (
                      <tr key={b} className="border-b border-white/5">
                        <td className="py-3 pr-6 text-white">{b}</td>
                        <td className="py-3 pr-6 text-zinc-400">{i}</td>
                        <td className="py-3 text-blue-400 font-semibold">{r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Worked example — £45,000 salary</p>
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 max-w-md text-sm text-zinc-300 space-y-2">
                <div className="flex justify-between"><span>Gross salary</span><span className="text-white">£45,000</span></div>
                <div className="flex justify-between"><span>Income Tax</span><span className="text-red-400">−£6,486</span></div>
                <div className="flex justify-between"><span>National Insurance</span><span className="text-red-400">−£3,753</span></div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-1"><span className="font-medium">Take-home pay</span><span className="text-blue-400 font-bold">£34,761/yr (£2,897/mo)</span></div>
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
                {[["Mortgage Calculator App","/app/mortgage-calculator-app"],["Compound Interest App","/app/compound-interest-app"],["Savings Calculator App","/app/savings-calculator-app"],["Percentage Calculator App","/app/percentage-calculator-app"]].map(([l,p]) => (
                  <Link key={p} to={p} className="px-4 py-2 text-xs font-heading uppercase tracking-wider text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all">{l}</Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
            <p className="text-xs text-white/20 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
