import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowRight, TrendingUp, Smartphone } from "lucide-react";

const faqs = [
  { q: "Is there a free compound interest calculator app?", a: "Yes. The Calculator App is a free compound interest calculator that works on iPhone and Android with no download. It supports monthly contributions, lump sum deposits, and different compounding frequencies." },
  { q: "What is the best compound interest app in the UK?", a: "The best UK compound interest app lets you model weekly or monthly contributions, add one-off lump sums, and see the effect of inflation. The Calculator App does all of this — free, with no sign-up." },
  { q: "Can I calculate weekly investing vs monthly in the app?", a: "Yes. The Calculator App's compound interest tool lets you switch between weekly and monthly contribution frequency, so you can see the exact difference in final balance over 10, 20, or 30 years." },
  { q: "Does the compound interest app work without internet?", a: "Yes. Once loaded, the app works offline on both iPhone and Android. Add it to your homescreen as a PWA and it caches the calculator locally." },
  { q: "How do I use the compound interest calculator?", a: "Enter your starting amount, monthly contribution, annual interest rate, and number of years. The calculator instantly shows your final balance, total contributions, and total interest earned. You can also add a one-off lump sum deposit in a specific month and year." },
];

const tools = [
  { title: "Compound Interest Calculator", desc: "Model growth with monthly contributions, lump sums and compounding frequency", path: "/finance/compound-interest" },
  { title: "Savings Calculator", desc: "See how your savings grow with regular deposits and compound AER", path: "/finance/savings" },
  { title: "ISA Calculator", desc: "Project ISA growth with annual allowance top-ups", path: "/finance/isa-calculator" },
  { title: "ROI Calculator", desc: "Calculate return on investment and annualised ROI", path: "/finance/irr" },
  { title: "Retirement Calculator", desc: "Plan your pension pot using compound growth projections", path: "/finance/retirement" },
  { title: "APY Calculator", desc: "Convert between APR and APY across compounding frequencies", path: "/finance/apy" },
];

export default function CompoundInterestApp() {
  return (
    <>
      <SEO
        title="Compound Interest Calculator App — Free | The Calculator App"
        description="Free compound interest calculator app. No download needed. Works on iPhone and Android. Model weekly vs monthly investing, lump sums, and 30-year growth projections."
        keywords="compound interest calculator app, compound interest app, free compound interest app, investment calculator app, compound interest app uk, compound interest app iphone, compound interest app android"
        canonicalUrl="https://www.thecalculatorpage.com/app/compound-interest-app"
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Compound Interest Calculator App",
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
            <Link to="/finance/compound-interest" className="hover:text-white transition-colors flex items-center gap-1">Open Calculator <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="text-white/40 text-xs font-heading uppercase tracking-[0.3em] mb-4">The Calculator App</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase text-white leading-[0.85] tracking-tight mb-6">
            Compound Interest<br />Calculator App
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            The best free compound interest calculator app. Model monthly or weekly contributions, lump sum deposits, and 30-year growth projections. No download. Works on iPhone and Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/finance/compound-interest" className="px-8 py-4 bg-white text-black font-heading text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">
              Open Calculator →
            </Link>
            <Link to="/app#how-to-install" className="px-8 py-4 border border-white/20 text-white font-heading text-sm uppercase tracking-widest hover:border-white/50 transition-colors flex items-center justify-center gap-2">
              <Smartphone className="h-4 w-4" /> Add to Homescreen
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-white/8">
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">Investment tools in the app</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map(({ title, desc, path }) => (
              <Link key={path} to={path} className="group border border-white/8 hover:border-white/25 bg-white/[0.015] p-6 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <TrendingUp className="h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors" />
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
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">What is a compound interest calculator app?</p>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">A compound interest calculator app projects how your investments or savings grow over time when interest is earned on both your original deposit and the accumulated interest. The best apps let you model regular contributions, one-off lump sums, and different compounding frequencies — showing the gap between weekly and monthly investing, which can be worth £50,000+ over 30 years.</p>
            </div>
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">The formula</p>
              <div className="bg-black/40 border border-white/10 rounded-lg px-6 py-4 font-mono text-sm text-zinc-200 mb-4 max-w-xl text-center">
                A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) / (r/n)]
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-zinc-400 max-w-2xl">
                {[["A","Final balance"],["P","Starting deposit"],["r","Annual rate (decimal)"],["n","Compounds per year"],["t","Years"],["PMT","Regular contribution"]].map(([v,d]) => (
                  <div key={v} className="bg-white/[0.03] border border-white/10 rounded-lg p-3"><span className="text-blue-400 font-bold">{v}</span> — {d}</div>
                ))}
              </div>
            </div>
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Worked example — weekly vs monthly investing</p>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
                {[
                  { label: "Monthly — £500/month", items: ["Rate: 8% annualised","Period: 30 years","Final balance: £745,180"], highlight: false },
                  { label: "Weekly — £115/week", items: ["Rate: 8% annualised","Period: 30 years","Final balance: £813,240"], highlight: true },
                ].map(({ label, items, highlight }) => (
                  <div key={label} className={`border rounded-lg p-5 ${highlight ? "border-blue-400/40 bg-blue-400/5" : "border-white/10 bg-white/[0.03]"}`}>
                    <p className={`font-medium text-sm mb-3 ${highlight ? "text-blue-400" : "text-white"}`}>{label}</p>
                    {items.map(i => <p key={i} className="text-zinc-400 text-xs mb-1">{i}</p>)}
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-xs mt-4 max-w-2xl">Weekly investing generates <strong className="text-white">£68,060 more</strong> — same money, same rate, just invested more frequently. Model your own numbers in the calculator.</p>
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
                {[["Mortgage Calculator App","/app/mortgage-calculator-app"],["Salary Calculator App","/app/salary-calculator-app"],["Savings Calculator App","/app/savings-calculator-app"],["Percentage Calculator App","/app/percentage-calculator-app"]].map(([l,p]) => (
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
