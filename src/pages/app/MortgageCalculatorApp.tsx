import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowRight, Home, Smartphone } from "lucide-react";

const faqs = [
  { q: "Is there a free mortgage calculator app?", a: "Yes. The Calculator App is a free mortgage calculator app that works on iPhone and Android with no download required. Open it in Safari or Chrome, add to your homescreen, and it runs like a native app." },
  { q: "What is the best mortgage calculator app in the UK?", a: "The best UK mortgage calculator app is one built specifically for UK mortgages — with SDLT (Stamp Duty), overpayment modelling, and weekly vs monthly payment comparison. The Calculator App covers all of these in one free tool." },
  { q: "Does the mortgage calculator app work offline?", a: "Yes. Once loaded, the mortgage calculator works without an internet connection on iOS and Android. It uses PWA caching to store the app locally on your device." },
  { q: "Can I calculate mortgage overpayments in the app?", a: "Yes. The Calculator App includes a dedicated Mortgage Overpayment Calculator that shows how much interest you save and how many years you cut by making extra payments." },
  { q: "Does the app include Stamp Duty?", a: "Yes. There is a full UK Stamp Duty (SDLT) calculator built into the app, covering first-time buyer relief, second homes, and the 2025 rate changes." },
];

const tools = [
  { title: "Mortgage Calculator", desc: "Monthly repayments on any loan amount, rate and term", path: "/finance/mortgage" },
  { title: "Mortgage Overpayment Calculator", desc: "See how much interest you save by paying extra each month", path: "/finance/mortgage-overpayment" },
  { title: "Stamp Duty Calculator", desc: "UK SDLT for first-time buyers, movers and second homes", path: "/finance/stamp-duty" },
  { title: "Weekly Mortgage Calculator", desc: "Switch to weekly payments and cut years off your mortgage", path: "/finance/weekly-mortgage" },
  { title: "Mortgage Cost Comparison", desc: "Compare two mortgage deals side by side over the full term", path: "/finance/mortgage-cost-comparison" },
  { title: "Future House Value", desc: "Project what your home will be worth in 5, 10 or 20 years", path: "/finance/future-house-value" },
];

export default function MortgageCalculatorApp() {
  return (
    <>
      <SEO
        title="Mortgage Calculator App — Free UK Mortgage App | The Calculator App"
        description="Free mortgage calculator app for UK users. No download needed. Works on iPhone and Android. Calculate monthly repayments, overpayments, Stamp Duty, and more."
        keywords="mortgage calculator app, free mortgage calculator app, uk mortgage calculator app, mortgage app iphone, mortgage app android, best mortgage calculator app uk"
        canonicalUrl="https://www.thecalculatorpage.com/app/mortgage-calculator-app"
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Mortgage Calculator App",
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
            <Link to="/finance/mortgage" className="hover:text-white transition-colors flex items-center gap-1">Open Calculator <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="text-white/40 text-xs font-heading uppercase tracking-[0.3em] mb-4">The Calculator App</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase text-white leading-[0.85] tracking-tight mb-6">
            Mortgage<br />Calculator App
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            The best free mortgage calculator app for UK buyers. No download. Works on iPhone and Android. Calculate monthly repayments, overpayments, Stamp Duty, and compare mortgage deals — all in one app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/finance/mortgage" className="px-8 py-4 bg-white text-black font-heading text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">
              Open Mortgage Calculator →
            </Link>
            <Link to="/app#how-to-install" className="px-8 py-4 border border-white/20 text-white font-heading text-sm uppercase tracking-widest hover:border-white/50 transition-colors flex items-center justify-center gap-2">
              <Smartphone className="h-4 w-4" /> Add to Homescreen
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-white/8">
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">All mortgage tools in the app</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map(({ title, desc, path }) => (
              <Link key={path} to={path} className="group border border-white/8 hover:border-white/25 bg-white/[0.015] p-6 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <Home className="h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors" />
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
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">What is a mortgage calculator app?</p>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">A mortgage calculator app helps you work out how much your monthly mortgage repayments will be based on the loan amount, interest rate, and term. The best mortgage calculator apps go further — showing the total interest paid over the full term, the impact of overpayments, and how different rates compare. The Calculator App does all of this, for free, with no download required.</p>
            </div>
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">The mortgage repayment formula</p>
              <div className="bg-black/40 border border-white/10 rounded-lg px-6 py-4 font-mono text-sm text-zinc-200 mb-4 max-w-xl">
                M = P × [r(1+r)^n] / [(1+r)^n − 1]
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-zinc-400 max-w-xl">
                {[["M","Monthly repayment"],["P","Loan amount (principal)"],["r","Monthly interest rate (annual ÷ 12)"],["n","Total number of monthly payments"]].map(([v,d]) => (
                  <div key={v} className="bg-white/[0.03] border border-white/10 rounded-lg p-3"><span className="text-blue-400 font-bold">{v}</span> — {d}</div>
                ))}
              </div>
            </div>
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Worked example</p>
              <p className="text-zinc-300 text-sm mb-4"><strong className="text-white">£250,000 mortgage</strong> at <strong className="text-white">4.5% interest</strong> over <strong className="text-white">25 years</strong>:</p>
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 font-mono text-sm text-zinc-300 max-w-md space-y-1">
                <div>Monthly rate = 4.5% ÷ 12 = 0.375%</div>
                <div>n = 25 × 12 = 300 payments</div>
                <div className="text-blue-400 font-bold border-t border-white/10 pt-2 mt-1">Monthly repayment = £1,389</div>
                <div className="text-zinc-500 text-xs">Total repaid: £416,700 — Interest: £166,700</div>
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
                {[["Compound Interest App","/app/compound-interest-app"],["Salary Calculator App","/app/salary-calculator-app"],["Savings Calculator App","/app/savings-calculator-app"],["Percentage Calculator App","/app/percentage-calculator-app"]].map(([l,p]) => (
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
