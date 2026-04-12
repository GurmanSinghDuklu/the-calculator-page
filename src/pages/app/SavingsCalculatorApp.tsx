import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowRight, PiggyBank, Smartphone } from "lucide-react";

const faqs = [
  { q: "Is there a free savings calculator app in the UK?", a: "Yes. The Calculator App is a free savings calculator that works on iPhone and Android with no download. Enter your starting amount, monthly contributions, AER, and time period — it instantly shows your final balance and total interest earned." },
  { q: "What is the best savings calculator app?", a: "The best savings calculator app lets you model different account types (Cash ISA, fixed-rate bond, easy access), add regular contributions, and compare AER rates. The Calculator App does this for free with no sign-up." },
  { q: "How do I calculate my savings with interest?", a: "Use the compound interest formula: FV = P(1 + r/n)^(nt) + PMT × [((1+r/n)^(nt) − 1) / (r/n)]. Or just open The Calculator App, enter your numbers, and get the answer instantly." },
  { q: "What is AER and why does it matter?", a: "AER (Annual Equivalent Rate) is the true annual return on savings, accounting for compounding. It's the number you should compare between accounts — a 4.5% AER monthly account beats a 4.5% AER annual account in practice because interest compounds more often." },
  { q: "Does the savings app include Cash ISA calculations?", a: "Yes. The savings calculator works for any account type. For Cash ISAs specifically, there is also a dedicated ISA Calculator in the app that models annual allowance top-ups and tax-free growth over 10–30 years." },
];

const tools = [
  { title: "Savings Calculator", desc: "Project savings growth with AER and regular contributions", path: "/finance/savings" },
  { title: "ISA Calculator", desc: "Model Cash ISA and Stocks & Shares ISA growth tax-free", path: "/finance/isa-calculator" },
  { title: "Compound Interest Calculator", desc: "Full investment growth model with weekly/monthly contributions", path: "/finance/compound-interest" },
  { title: "Savings Goal Calculator", desc: "Calculate how long to reach a savings target", path: "/finance/how-long-to-save" },
  { title: "How Much to Save", desc: "Work out monthly savings needed to hit a goal by a deadline", path: "/finance/how-much-to-save" },
  { title: "Retirement Calculator", desc: "Model pension pot growth to your target retirement age", path: "/finance/retirement" },
];

export default function SavingsCalculatorApp() {
  return (
    <>
      <SEO
        title="Savings Calculator App — Free UK Savings App | The Calculator App"
        description="Free UK savings calculator app. No download. Works on iPhone and Android. Calculate savings growth with AER, regular contributions, and Cash ISA projections."
        keywords="savings calculator app, free savings calculator app, uk savings app, savings app iphone, savings app android, isa calculator app, savings interest calculator app"
        canonicalUrl="https://www.thecalculatorapp.org/app/savings-calculator-app"
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Savings Calculator App",
          "alternateName": "The Calculator App",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorapp.org"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/8">
          <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
          <div className="flex items-center gap-6 text-xs font-heading uppercase tracking-widest text-white/40">
            <Link to="/app" className="hover:text-white transition-colors">App Home</Link>
            <Link to="/finance/savings" className="hover:text-white transition-colors flex items-center gap-1">Open Calculator <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="text-white/40 text-xs font-heading uppercase tracking-[0.3em] mb-4">The Calculator App</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase text-white leading-[0.85] tracking-tight mb-6">
            Savings<br />Calculator App
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Free UK savings calculator app. Model savings growth with any AER, regular contributions, and one-off deposits. No download. Works on iPhone and Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/finance/savings" className="px-8 py-4 bg-white text-black font-heading text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">
              Open Savings Calculator →
            </Link>
            <Link to="/app#how-to-install" className="px-8 py-4 border border-white/20 text-white font-heading text-sm uppercase tracking-widest hover:border-white/50 transition-colors flex items-center justify-center gap-2">
              <Smartphone className="h-4 w-4" /> Add to Homescreen
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-white/8">
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">Savings tools in the app</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map(({ title, desc, path }) => (
              <Link key={path} to={path} className="group border border-white/8 hover:border-white/25 bg-white/[0.015] p-6 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <PiggyBank className="h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors" />
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
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">UK savings account rates at a glance (2026)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-zinc-300 max-w-2xl">
                  <thead><tr className="border-b border-white/10">{["Account","Typical AER","Interest Taxed?"].map(h => <th key={h} className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">{h}</th>)}</tr></thead>
                  <tbody>
                    {[["Easy Access","3.5–5.0%","Yes (PSA applies)"],["Fixed Rate Bond (1yr)","4.0–5.2%","Yes (PSA applies)"],["Cash ISA","3.5–5.0%","No — fully sheltered"],["Lifetime ISA","up to 6.25% incl. bonus","No"],["Premium Bonds","~4.4% prize equivalent","No"]].map(([t,r,x]) => (
                      <tr key={t} className="border-b border-white/5">
                        <td className="py-3 pr-6 text-white">{t}</td>
                        <td className="py-3 pr-6 text-blue-400 font-semibold">{r}</td>
                        <td className="py-3 text-zinc-400">{x}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Worked example</p>
              <p className="text-zinc-300 text-sm mb-4"><strong className="text-white">£5,000 starting</strong>, <strong className="text-white">£300/month</strong>, <strong className="text-white">4.5% AER</strong>, <strong className="text-white">10 years</strong>:</p>
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 max-w-md text-sm text-zinc-300 space-y-2">
                <div className="flex justify-between"><span>Starting deposit</span><span className="text-white">£5,000</span></div>
                <div className="flex justify-between"><span>Total contributions</span><span className="text-white">£36,000</span></div>
                <div className="flex justify-between"><span>Total invested</span><span className="text-white">£41,000</span></div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-1"><span className="font-medium">Final balance</span><span className="text-blue-400 font-bold">~£51,200</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Interest earned</span><span className="text-zinc-400">~£10,200</span></div>
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
                {[["Mortgage Calculator App","/app/mortgage-calculator-app"],["Compound Interest App","/app/compound-interest-app"],["Salary Calculator App","/app/salary-calculator-app"],["Percentage Calculator App","/app/percentage-calculator-app"]].map(([l,p]) => (
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
